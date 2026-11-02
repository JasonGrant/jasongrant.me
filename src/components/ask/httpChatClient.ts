import { type ChatClient, ChatHttpError, ChatNetworkError } from "./chatClient";
import { readEvents } from "./sse";
import type { ApiError, Health, SessionResponse } from "./wire";

// The real client for api.jasongrant.me. It sends exactly what the widget
// contract allows: the session token (header), the message text, the referrer's
// host and the bot-check token. No cookies, no retries, ever: a repeated
// POST /api/chat would spend another turn (widget.md, "Must not").

const REQUEST_TIMEOUT_MS = 20_000;
/** No `meta` within this long means the turn is treated as failed. */
export const NO_META_TIMEOUT_MS = 20_000;

async function asApiError(response: Response): Promise<ChatHttpError> {
  let parsed: ApiError | null = null;
  try {
    parsed = (await response.json()) as ApiError;
  } catch {
    // fall through
  }
  if (parsed?.error && typeof parsed.error.message === "string") {
    return new ChatHttpError(response.status, parsed.error);
  }
  throw new ChatNetworkError(`Unexpected ${response.status} response`);
}

/** Combine an optional caller signal with a timeout. */
function withTimeout(
  signal: AbortSignal | undefined,
  ms: number,
): { signal: AbortSignal; done: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(new ChatNetworkError("The request timed out")),
    ms,
  );
  const onAbort = () => controller.abort(signal?.reason);
  signal?.addEventListener("abort", onAbort);
  return {
    signal: controller.signal,
    done: () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
    },
  };
}

async function request(
  url: string,
  init: RequestInit,
  signal?: AbortSignal,
  ms = REQUEST_TIMEOUT_MS,
) {
  const timeout = withTimeout(signal, ms);
  try {
    return await fetch(url, { ...init, credentials: "omit", signal: timeout.signal });
  } catch (cause) {
    if (signal?.aborted) throw cause;
    throw new ChatNetworkError(cause instanceof Error ? cause.message : "Network error");
  } finally {
    timeout.done();
  }
}

export function createHttpChatClient(base: string): ChatClient {
  const api = base.replace(/\/$/, "");
  return {
    botCheck: { kind: "turnstile" },

    async health(signal) {
      const response = await request(
        `${api}/api/health`,
        { method: "GET", headers: { Accept: "application/json" }, cache: "no-store" },
        signal,
      );
      if (!response.ok) throw await asApiError(response);
      return (await response.json()) as Health;
    },

    async createSession({ turnstileToken, referrer }) {
      const response = await request(`${api}/api/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ turnstile_token: turnstileToken, referrer }),
      });
      if (!response.ok) throw await asApiError(response);
      return (await response.json()) as SessionResponse;
    },

    async chat({ session, message, signal }) {
      // Headers arrive with the first byte; the first-`meta` timer covers the wait for it.
      const timeout = withTimeout(signal, NO_META_TIMEOUT_MS);
      let response: Response;
      try {
        response = await fetch(`${api}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            Authorization: `Bearer ${session}`,
          },
          body: JSON.stringify({ message }),
          credentials: "omit",
          signal: timeout.signal,
        });
      } catch (cause) {
        timeout.done();
        if (signal.aborted) throw cause;
        throw new ChatNetworkError(cause instanceof Error ? cause.message : "Network error");
      }
      if (!response.ok || !response.body) {
        timeout.done();
        if (!response.ok) throw await asApiError(response);
        throw new ChatNetworkError("The response had no body");
      }
      const events = readEvents(response.body);
      // The timer keeps running until the first event (always `meta`) is read.
      return (async function* () {
        let first = true;
        try {
          for await (const event of events) {
            if (first) {
              timeout.done();
              first = false;
            }
            yield event;
          }
        } finally {
          timeout.done();
        }
      })();
    },
  };
}
