"use client";

import type { ApiErrorBody, ChatEvent, Health, SessionResponse } from "./wire";

/** The API said no. `status` is the HTTP status, `body` the `{ error: { code, message } }` it sent. */
export class ChatHttpError extends Error {
  constructor(
    public status: number,
    public body: ApiErrorBody,
  ) {
    super(body.message);
  }
}

/** The request never completed: fetch failed, the stream dropped, or no `meta` came in time. */
export class ChatNetworkError extends Error {}

/** How the bot check runs. Real clients use Turnstile; the stand-in can skip it or fake each outcome. */
export type BotCheckMode =
  | { kind: "turnstile"; siteKey?: string }
  | { kind: "skip" }
  | { kind: "fake"; outcome: "pass" | "fail" | "interactive" };

export interface ChatClient {
  readonly botCheck: BotCheckMode;
  health(signal?: AbortSignal): Promise<Health>;
  createSession(input: {
    turnstileToken: string;
    referrer: string | null;
  }): Promise<SessionResponse>;
  /** Resolves with the event stream once the response has started. Abort the signal to stop reading. */
  chat(input: {
    session: string;
    message: string;
    signal: AbortSignal;
  }): Promise<AsyncIterable<ChatEvent>>;
}

let clientPromise: Promise<ChatClient> | null = null;

/**
 * The one chat client for this page view. The environment comparison must stay a
 * literal in this file so a production build drops the scripted stand-in (and its
 * fixtures) entirely; Vercel builds set the variable to the real API URL.
 */
export function getChatClient(): Promise<ChatClient> {
  if (!clientPromise) {
    clientPromise =
      process.env.NEXT_PUBLIC_ASK_JASON_API === "standin"
        ? import("./scriptedChatClient").then((m) => m.createScriptedClient())
        : import("./httpChatClient").then((m) =>
            m.createHttpChatClient(process.env.NEXT_PUBLIC_ASK_JASON_API ?? ""),
          );
  }
  return clientPromise;
}
