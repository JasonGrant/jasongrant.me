import { type ChatClient, ChatHttpError, ChatNetworkError } from "./chatClient";
import { STANDIN_HEALTH, type StreamTurn, defaultTurn } from "./scenarios";
import { readPicker } from "./statePicker";
import type { ChatEvent, Health, ReplyMeta, SessionResponse } from "./wire";

// The scripted stand-in: the same interface as the real client, driven by the
// scenario in the URL (statePicker.ts). Timing is realistic unless &fast=1 is set:
// health 150 ms, session 400 ms, first `meta` 600 ms, then about 25 words a second.

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (ms <= 0) return resolve();
    if (signal?.aborted) return reject(new DOMException("Aborted", "AbortError"));
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

export function createScriptedClient(): ChatClient {
  const { scenario, fast } = readPicker();
  const ms = (n: number) => (fast ? 0 : n);
  let turnIndex = 0;
  let turnsLeft = scenario.startTurns ?? STANDIN_HEALTH.limits.turns;
  let sessions = 0;

  return {
    botCheck: scenario.botCheck ?? { kind: "skip" },

    async health(signal) {
      await sleep(ms(scenario.healthDelayMs ?? 150), signal);
      return { ...STANDIN_HEALTH, ...scenario.health } as Health;
    },

    async createSession() {
      await sleep(ms(400));
      if (scenario.sessionError) {
        throw new ChatHttpError(scenario.sessionError.status, scenario.sessionError.error);
      }
      sessions += 1;
      const response: SessionResponse = {
        session: `standin-${sessions}`,
        limits: STANDIN_HEALTH.limits,
        voice_available: false,
      };
      return response;
    },

    async chat({ message, signal }) {
      const scripted = scenario.turns
        ? scenario.turns[Math.min(turnIndex, scenario.turns.length - 1)]
        : defaultTurn(message);
      turnIndex += 1;
      if (scripted.kind === "http") {
        await sleep(ms(300), signal);
        throw new ChatHttpError(scripted.status, scripted.error);
      }
      turnsLeft = Math.max(0, turnsLeft - 1);
      return stream(scripted, turnsLeft, ms, signal);
    },
  };
}

function metaFor(turn: StreamTurn, turnId: string, turnsLeft: number): ReplyMeta {
  return {
    turn_id: turnId,
    mode: turn.mode,
    sources: turn.mode === "answer" ? (turn.sources ?? []) : [],
    confidence: turn.mode === "answer" ? "verified" : null,
    options: turn.mode === "options" ? (turn.options ?? []) : [],
    voice_available: turn.voiceAvailable ?? false,
    session: { turns_left: turnsLeft, voice_plays_left: 5 },
  };
}

/** Group words into the small bursts a real stream arrives in. */
function bursts(text: string): string[] {
  const words = text.match(/\S+\s*/g) ?? [];
  const out: string[] = [];
  for (let i = 0; i < words.length; i += 3) out.push(words.slice(i, i + 3).join(""));
  return out;
}

async function* stream(
  turn: StreamTurn,
  turnsLeft: number,
  ms: (n: number) => number,
  signal: AbortSignal,
): AsyncGenerator<ChatEvent> {
  const turnId = `standin-turn-${Date.now().toString(36)}`;
  if (turn.noMeta) {
    await sleep(ms(20_000), signal);
    throw new ChatNetworkError("Timed out waiting for the reply to start");
  }
  await sleep(ms(600), signal);
  yield { event: "meta", data: metaFor(turn, turnId, turnsLeft) };

  let sent = 0;
  const chunks = bursts(turn.text);
  for (const chunk of chunks) {
    await sleep(ms(120), signal);
    yield { event: "text", data: { delta: chunk } };
    sent += chunk.match(/\S+/g)?.length ?? 0;
    if (turn.dropAfterWords && sent >= turn.dropAfterWords) {
      throw new ChatNetworkError("The stream was cut off");
    }
    if (turn.errorEvent && sent >= 8) {
      yield { event: "error", data: turn.errorEvent };
      return;
    }
  }
  if (turn.correction) {
    await sleep(ms(500), signal);
    const corrected: StreamTurn = { ...turn, ...turn.correction, kind: "stream" };
    yield {
      event: "correction",
      data: { text: turn.correction.text, meta: metaFor(corrected, turnId, turnsLeft) },
    };
  }
  yield { event: "done", data: { turn_id: turnId, latency_ms: 1200 } };
}
