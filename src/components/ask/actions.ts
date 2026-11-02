"use client";

// The widget's behaviour: health, the bot check, the session, and the send path
// from a typed question to a finished reply. It follows
// specs/009-ask-jason-chat/contracts/widget-states.md; read that for the tables.
//
// Ground rules from the widget contract (cortex 007 widget.md, "Must not"):
//   - nothing is sent but the session token, the message, the referrer host and the
//     Turnstile token;
//   - POST /api/chat is never retried on its own (a retry would spend another turn);
//   - the only error text shown is the API's `error.message`, plus the four lines in
//     content/ask.ts for cases the API cannot speak to.
import { ask } from "@/content/ask";
import { announce, summarizeReply } from "./announce";
import { type ChatClient, ChatHttpError, ChatNetworkError, getChatClient } from "./chatClient";
import { type Pacer, createPacer } from "./pacer";
import {
  type Message,
  type OpenedBy,
  type Rect,
  type ReplyMessage,
  type VisitorMessage,
  countChars,
  getAsk,
  patchReply,
  setAsk,
  uid,
} from "./store";
import { getToken, loadTurnstile, prewarmToken, resetToken } from "./turnstile";
import { type Health, SUPPORTED_API_VERSION } from "./wire";

const HEALTH_MAX_AGE_MS = 60_000;
const THINKING_MIN_MS = 300;
const SESSION_KEY = "ask-jason.session";

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// ---- session token: sessionStorage, with a memory fallback --------------------------------

let memorySession: string | null = null;

function readSession(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY) ?? memorySession;
  } catch {
    return memorySession;
  }
}

function writeSession(token: string | null): void {
  memorySession = token;
  try {
    if (token) sessionStorage.setItem(SESSION_KEY, token);
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage can be blocked; the in-memory copy covers this page view.
  }
}

/** Adopt a session left by an earlier page of this tab. */
export function hydrateSession(): void {
  const token = readSession();
  if (token && !getAsk().session) setAsk({ session: token });
}

function referrerHost(): string | null {
  try {
    return document.referrer ? new URL(document.referrer).host : null;
  } catch {
    return null;
  }
}

// ---- opening and closing ------------------------------------------------------------------

export function openChat(by: OpenedBy, rect: Rect | null, focus: "composer" | "heading"): void {
  setAsk({ phase: "opening", openedBy: by, morphFrom: rect, openFocus: focus, settled: false });
  void ensureHealth();
}

export function requestClose(): void {
  if (getAsk().phase === "open" || getAsk().phase === "opening") setAsk({ phase: "closing" });
}

export function markOpen(): void {
  setAsk({ phase: "open" });
}

export function markClosed(): void {
  setAsk({ phase: "closed" });
}

/** The visitor's first focus or tap on the bar: start the things that take time, not the check itself. */
export function firstIntent(): void {
  void ensureHealth();
  void getChatClient().then((client) => {
    if (client.botCheck.kind === "turnstile" && !getAsk().session) {
      loadTurnstile().catch(() => {});
    }
  });
}

/** The first keystroke (either field) or starter tap: run the bot check quietly so most visitors never wait for it. */
export function firstKeystroke(): void {
  void getChatClient().then((client) => {
    if (client.botCheck.kind === "turnstile" && !getAsk().session) {
      prewarmToken(client.botCheck.siteKey);
    }
  });
}

// ---- health -------------------------------------------------------------------------------

let healthRun: Promise<void> | null = null;

function unavailable(health: Health): boolean {
  return health.chat !== "ok" || health.build?.api_version !== SUPPORTED_API_VERSION;
}

function applyHealth(health: Health): void {
  setAsk((s) => {
    const keep = s.terminal?.kind === "ended" || s.terminal?.kind === "address-limit";
    return {
      health,
      healthState: "ok",
      healthAt: Date.now(),
      inputLimit: health.limits.input_chars,
      terminal: keep
        ? s.terminal
        : unavailable(health)
          ? { kind: "cta", message: null }
          : s.terminal?.kind === "cta" || s.terminal?.kind === "network-error"
            ? null
            : s.terminal,
    };
  });
}

export function ensureHealth(force = false): Promise<void> {
  const s = getAsk();
  const fresh =
    s.healthState === "ok" && s.healthAt !== null && Date.now() - s.healthAt < HEALTH_MAX_AGE_MS;
  if (!force && fresh) return Promise.resolve();
  if (healthRun) return healthRun;
  if (!s.health) setAsk({ healthState: "loading" });
  healthRun = (async () => {
    try {
      const client = await getChatClient();
      applyHealth(await client.health());
    } catch {
      // A failed refresh keeps the last known health; only a first failure is an error state.
      if (!getAsk().health) {
        setAsk({ healthState: "error" });
        if (getAsk().phase !== "closed") {
          setAsk({ terminal: { kind: "network-error", message: null } });
        }
      }
    } finally {
      healthRun = null;
    }
  })();
  return healthRun;
}

/** "Try again" on the network-error body. */
export function retryHealth(): void {
  setAsk({ terminal: null, healthState: "loading" });
  void ensureHealth(true);
}

// ---- the bot check and the session --------------------------------------------------------

let fakeChallenge: (() => void) | null = null;

/** The stand-in's fake challenge button. */
export function completeFakeChallenge(): void {
  fakeChallenge?.();
  fakeChallenge = null;
}

async function acquireToken(client: ChatClient): Promise<string> {
  const mode = client.botCheck;
  if (mode.kind === "skip") return "standin-token";
  if (mode.kind === "fake") {
    setAsk({ botCheck: "checking", botCheckMessage: null });
    if (mode.outcome === "interactive") {
      setAsk({ botCheck: "interactive", fakeChallenge: true });
      announce("Verification needed");
      await new Promise<void>((resolve) => {
        fakeChallenge = resolve;
      });
      setAsk({ botCheck: "checking", fakeChallenge: false });
    }
    await sleep(300);
    setAsk({ botCheck: "verified" });
    return "fake-token";
  }
  return getToken(
    {
      setState(state) {
        setAsk({ botCheck: state, botCheckMessage: null });
        if (state === "interactive") announce("Verification needed");
      },
    },
    mode.siteKey,
  );
}

let sessionRun: Promise<string> | null = null;

async function ensureSession(client: ChatClient, fresh = false): Promise<string> {
  const known = getAsk().session;
  if (known && !fresh) return known;
  if (sessionRun) return sessionRun;
  sessionRun = (async () => {
    try {
      const token = await acquireToken(client);
      const created = await client.createSession({
        turnstileToken: token,
        referrer: referrerHost(),
      });
      writeSession(created.session);
      setAsk({ session: created.session, botCheck: "verified", botCheckMessage: null });
      return created.session;
    } finally {
      sessionRun = null;
    }
  })();
  return sessionRun;
}

/** "Try again" on the bot-check failure: run it fresh and send what is in the composer. */
export function retryBotCheck(): void {
  resetToken();
  setAsk({ botCheck: "idle", botCheckMessage: null });
  void sendMessage(getAsk().draft);
}

// ---- sending ------------------------------------------------------------------------------

interface Turn {
  replyId: string;
  controller: AbortController;
  pacer: Pacer | null;
}

let turn: Turn | null = null;

function newReply(): ReplyMessage {
  return {
    id: uid(),
    role: "jason",
    turnId: null,
    mode: null,
    chunks: [],
    sources: [],
    options: [],
    optionsUsed: false,
    status: "thinking",
    updated: false,
    correctionEpoch: 0,
    errorMessage: null,
    retryable: false,
  };
}

export function setDraft(text: string): void {
  setAsk((s) => ({
    draft: text,
    inlineError: s.inlineError && text !== s.draft ? null : s.inlineError,
  }));
}

export async function sendMessage(raw: string): Promise<void> {
  const start = getAsk();
  const text = raw.trim();
  if (!text || start.inFlight) return;
  if (start.terminal && start.terminal.kind !== "network-error") return;
  if (countChars(text) > start.inputLimit) return;

  const before = start.messages;
  const visitor: VisitorMessage = { id: uid(), role: "visitor", text };
  const reply = newReply();
  setAsk((s) => ({
    messages: [
      ...s.messages.map<Message>((m) =>
        m.role === "jason" && m.options.length > 0 ? { ...m, optionsUsed: true } : m,
      ),
      visitor,
      reply,
    ],
    draft: "",
    inFlight: true,
    inlineError: null,
    botCheck: s.botCheck === "failed" ? "idle" : s.botCheck,
    botCheckMessage: null,
    settled: false,
  }));
  announce("Jason is answering");

  const current: Turn = { replyId: reply.id, controller: new AbortController(), pacer: null };
  turn = current;
  const startedAt = Date.now();

  /** Take this exchange back out of the transcript and give the visitor their text. */
  const rollback = (restoreDraft: boolean) =>
    setAsk((s) => ({
      messages: before,
      draft: restoreDraft ? text : s.draft,
    }));

  try {
    const client = await getChatClient();
    await ensureHealth();
    const health = getAsk().health;
    if (!health) throw new ChatNetworkError("Health is unavailable");
    if (unavailable(health)) {
      rollback(true);
      return;
    }
    let session = await ensureSession(client);
    for (let attempt = 0; ; attempt++) {
      try {
        const events = await client.chat({
          session,
          message: text,
          signal: current.controller.signal,
        });
        await consume(events, current, startedAt);
        return;
      } catch (error) {
        const expired =
          error instanceof ChatHttpError && (error.status === 401 || error.status === 410);
        if (!expired || attempt > 0) throw error;
        // The session ended (expired or never accepted): run the bot check again and resend once.
        writeSession(null);
        setAsk({ session: null });
        session = await ensureSession(client, true);
      }
    }
  } catch (error) {
    if (turn !== current) return; // stopped by the visitor
    fail(error, current, text, rollback);
  } finally {
    if (turn === current) {
      turn = null;
      setAsk({ inFlight: false });
    }
  }
}

async function consume(
  events: AsyncIterable<import("./wire").ChatEvent>,
  current: Turn,
  startedAt: number,
): Promise<void> {
  const id = current.replyId;
  const pacer = createPacer((chunk) => {
    if (turn === current) patchReply(id, (r) => ({ chunks: [...r.chunks, chunk] }));
  });
  current.pacer = pacer;
  let gotMeta = false;

  for await (const event of events) {
    if (turn !== current) return;
    switch (event.event) {
      case "meta": {
        const wait = THINKING_MIN_MS - (Date.now() - startedAt);
        if (wait > 0) await sleep(wait);
        if (turn !== current) return;
        gotMeta = true;
        patchReply(id, () => ({
          turnId: event.data.turn_id,
          mode: event.data.mode,
          sources: event.data.sources,
          options: event.data.options,
          status: "streaming",
        }));
        setAsk({ turnsLeft: event.data.session.turns_left });
        break;
      }
      case "text":
        // The contract sends nothing before `meta`; ignore anything that does.
        if (gotMeta) pacer.push(event.data.delta);
        break;
      case "correction": {
        pacer.cancel();
        const { text, meta } = event.data;
        patchReply(id, (r) => ({
          chunks: [text],
          mode: meta.mode,
          sources: meta.sources,
          options: meta.options,
          updated: true,
          correctionEpoch: r.correctionEpoch + 1,
        }));
        setAsk({ turnsLeft: meta.session.turns_left });
        break;
      }
      case "done": {
        pacer.flush();
        patchReply(id, () => ({ status: "complete" }));
        const done = getAsk();
        const reply = done.messages.find((m) => m.id === id) as ReplyMessage | undefined;
        const text = reply ? reply.chunks.join("") : "";
        announce(`${reply?.updated ? "Answer updated. " : ""}${summarizeReply(text)}`);
        if (done.turnsLeft === 1) announce("1 question left");
        if (done.turnsLeft === 0) {
          setAsk({ terminal: { kind: "ended", message: null } });
          announce("No questions left");
        }
        return;
      }
      case "error": {
        pacer.cancel();
        patchReply(id, () => ({
          status: "failed",
          chunks: [],
          errorMessage: event.data.message,
          retryable: false,
        }));
        announce(event.data.message);
        return;
      }
    }
  }
}

/** Map a failed send to its state (contracts/widget-states.md, "HTTP errors before the stream"). */
function fail(
  error: unknown,
  current: Turn,
  text: string,
  rollback: (restoreDraft: boolean) => void,
): void {
  const id = current.replyId;
  if (error instanceof ChatHttpError) {
    const { message, code } = error.body;
    switch (code) {
      case "input_too_long":
      case "input_not_text":
        rollback(true);
        setAsk({ inlineError: message });
        announce(message);
        return;
      case "bot_check_failed":
        rollback(true);
        setAsk({ botCheck: "failed", botCheckMessage: message });
        announce(message);
        return;
      case "turn_limit":
      case "session_closed":
        rollback(false);
        setAsk({ terminal: { kind: "ended", message }, turnsLeft: 0 });
        announce(message);
        return;
      case "address_limit":
        patchReply(id, () => ({
          status: "failed",
          chunks: [],
          errorMessage: message,
          retryable: false,
        }));
        setAsk({ terminal: { kind: "address-limit", message: null } });
        announce(message);
        return;
      case "chat_capped":
      case "unavailable":
        rollback(false);
        setAsk({ terminal: { kind: "cta", message } });
        announce(message);
        return;
      default:
        patchReply(id, () => ({
          status: "failed",
          chunks: [],
          errorMessage: message,
          retryable: false,
        }));
        announce(message);
        return;
    }
  }
  // The network failed, the stream dropped, no reply started in time, or the check could not run.
  // Show what arrived, name the failure once, and put the visitor's words back to resend.
  current.pacer?.flush();
  patchReply(id, () => ({ status: "failed", errorMessage: ask.lines.network, retryable: true }));
  setAsk({ draft: text });
  announce(ask.lines.network);
}

/** "Try again" under a failed reply: take the failed exchange out and resend, only now. */
export function retryTurn(replyId: string): void {
  const s = getAsk();
  const index = s.messages.findIndex((m) => m.id === replyId);
  const visitor = s.messages[index - 1];
  if (index < 1 || visitor?.role !== "visitor") return;
  setAsk({ messages: s.messages.filter((_, i) => i !== index && i !== index - 1), draft: "" });
  void sendMessage(visitor.text);
}

/** Stop: keep what is shown, end the display of the rest. The turn is spent. */
export function stop(): void {
  const current = turn;
  if (!current) return;
  turn = null;
  current.pacer?.cancel();
  current.controller.abort();
  patchReply(current.replyId, () => ({ status: "stopped" }));
  setAsk({ inFlight: false });
  announce("Stopped");
}

/** Messages the stand-in plays in order when a scenario is opened with &open=1. */
export async function autoplay(prompts: string[]): Promise<void> {
  for (const prompt of prompts) {
    await sendMessage(prompt);
    if (getAsk().botCheck === "interactive") return;
  }
}
