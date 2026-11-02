"use client";

// The Ask Jason widget's state: one module-level store, read through
// useSyncExternalStore. It lives at module level (not in React state or context)
// because the main pages and the case studies are different layout trees, so
// moving between them remounts the widget. Module state survives that, which is
// how the conversation does too (spec FR-004, Story 1 scenario 7). Only the
// session token is ever persisted (actions.ts); the transcript is memory only.
import { useSyncExternalStore } from "react";
import type { Health, OptionEntry, ReplyMode, Source } from "./wire";

export interface VisitorMessage {
  id: string;
  role: "visitor";
  text: string;
}

export type ReplyStatus = "thinking" | "streaming" | "complete" | "stopped" | "failed";

export interface ReplyMessage {
  id: string;
  role: "jason";
  turnId: string | null;
  /** Null until `meta` arrives. */
  mode: ReplyMode | null;
  /** Released text, one entry per word (with its trailing space) so each can fade in. */
  chunks: string[];
  sources: Source[];
  options: OptionEntry[];
  /** True once any later message is sent: the cards stay but stop being buttons. */
  optionsUsed: boolean;
  status: ReplyStatus;
  /** A correction replaced the text. */
  updated: boolean;
  /** Bumped by each correction so the text component can crossfade. */
  correctionEpoch: number;
  /** The API's `error.message`, or the one network line. */
  errorMessage: string | null;
  /** Offer "Try again" under the error. */
  retryable: boolean;
}

export type Message = VisitorMessage | ReplyMessage;

export type Container = "panel" | "sheet";
export type Phase = "closed" | "opening" | "open" | "closing";
export type OpenedBy = "bar" | "palette" | "button";
export type BotCheck = "idle" | "checking" | "interactive" | "verified" | "failed";
export type BarMode = "rotating" | "static" | "follow-up" | "closed";

/** What replaces the composer (and sometimes the body) when the conversation cannot continue. */
export interface Terminal {
  kind: "ended" | "address-limit" | "cta" | "network-error";
  /** The API's message, or null to use the site's line. */
  message: string | null;
}

/** Set by the bar, consumed by AskJasonRoot once its chunk has loaded. */
export type OpenRequest =
  | { kind: "send"; text: string; rect: Rect | null }
  | { kind: "open"; by: OpenedBy; rect: Rect | null };

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export type WidgetView =
  | "loading"
  | "empty"
  | "conversation"
  | "ended"
  | "address-limit"
  | "cta"
  | "network-error";

export interface AskState {
  container: Container;
  phase: Phase;
  openedBy: OpenedBy;
  /** Where focus lands when the panel opens: the composer after a sent question, else the heading. */
  openFocus: "composer" | "heading";
  request: OpenRequest | null;
  /** The bar's rect when the open morph started (and where close returns to). */
  morphFrom: Rect | null;
  health: Health | null;
  healthState: "idle" | "loading" | "ok" | "error";
  healthAt: number | null;
  session: string | null;
  turnsLeft: number | null;
  inputLimit: number;
  /** The shared value of the bar field and the panel composer. */
  draft: string;
  messages: Message[];
  inFlight: boolean;
  botCheck: BotCheck;
  /** Bot-check failure line shown with "Try again". */
  botCheckMessage: string | null;
  /** The stand-in's fake challenge is waiting for its button. */
  fakeChallenge: boolean;
  terminal: Terminal | null;
  /** `input_too_long` / `input_not_text` text shown under the composer. */
  inlineError: string | null;
  /** The visitor's first focus, hover, press or keystroke on the bar (ends rotation and nudge). */
  interacted: boolean;
  /** Set when everything has stopped moving; read by the axe and visual passes. */
  settled: boolean;
}

const INITIAL: AskState = {
  container: "panel",
  phase: "closed",
  openedBy: "bar",
  openFocus: "heading",
  request: null,
  morphFrom: null,
  health: null,
  healthState: "idle",
  healthAt: null,
  session: null,
  turnsLeft: null,
  inputLimit: 500,
  draft: "",
  messages: [],
  inFlight: false,
  botCheck: "idle",
  botCheckMessage: null,
  fakeChallenge: false,
  terminal: null,
  inlineError: null,
  interacted: false,
  settled: false,
};

let state: AskState = INITIAL;
const listeners = new Set<() => void>();

export function getAsk(): AskState {
  return state;
}

export function setAsk(patch: Partial<AskState> | ((s: AskState) => Partial<AskState>)): void {
  const next = typeof patch === "function" ? patch(state) : patch;
  state = { ...state, ...next };
  for (const listener of listeners) listener();
}

export function patchReply(id: string, fn: (reply: ReplyMessage) => Partial<ReplyMessage>): void {
  setAsk((s) => ({
    messages: s.messages.map((m) => (m.role === "jason" && m.id === id ? { ...m, ...fn(m) } : m)),
  }));
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Read a slice of the state. The selector must return a stable value (a primitive or an existing reference). */
export function useAsk<T>(selector: (s: AskState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(INITIAL),
  );
}

/** Which body the panel shows. */
export function viewOf(s: AskState): WidgetView {
  if (s.terminal) return s.terminal.kind;
  if (s.healthState !== "ok") return "loading";
  return s.messages.length > 0 ? "conversation" : "empty";
}

/** What the entry bar looks like right now (data-model.md bar-mode table). */
export function barModeOf(s: AskState): BarMode {
  if (s.terminal && s.terminal.kind !== "network-error") return "closed";
  if (s.messages.length > 0) return "follow-up";
  return s.interacted ? "static" : "rotating";
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

/**
 * Characters the way the API counts them: Unicode code points after trimming
 * (cortex src/lib/chat/limits.ts: `Array.from(text.trim()).length`). The API also
 * rejects, as `input_not_text`, a message with a code fence, a base64 data URL or a
 * control character other than tab and line breaks. The widget does not pre-check
 * those: the only error text it may show is the API's own `error.message`.
 */
export function countChars(text: string): number {
  return Array.from(text.trim()).length;
}
