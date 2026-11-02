// Types for the chat API at api.jasongrant.me. They mirror the contract in the
// private cortex repo (specs/007-site-chat/contracts/chat-api.md), which is the
// source of truth: copy changes there, never reinterpret them here. Field names
// stay snake_case, exactly as on the wire.

/** The only `build.api_version` this widget understands. Anything else shows the contact block. */
export const SUPPORTED_API_VERSION = 1;

export type ChatAvailability = "ok" | "capped" | "down";
export type ReplyMode = "answer" | "options" | "deflect" | "none";

export type ErrorCode =
  | "bad_request"
  | "bot_check_failed"
  | "session_required"
  | "session_closed"
  | "session_expired"
  | "input_too_long"
  | "input_not_text"
  | "address_limit"
  | "turn_limit"
  | "voice_limit"
  | "voice_unavailable"
  | "chat_capped"
  | "unavailable";

export interface Limits {
  input_chars: number;
  turns: number;
  voice_plays: number;
}

export interface Health {
  chat: ChatAvailability;
  voice: "ok" | "off";
  disclosure: string;
  notice: string;
  limits: Limits;
  build: { corpus_commit: string; built_at: string; api_version: number };
}

export interface ApiErrorBody {
  /** An unknown code is still shown by its message: every API message is safe to show. */
  code: ErrorCode | (string & {});
  message: string;
}

export interface ApiError {
  error: ApiErrorBody;
}

export interface SessionResponse {
  session: string;
  limits: Limits;
  voice_available: boolean;
}

export interface Source {
  entry_id: string;
  title: string;
  url: string | null;
}

export interface OptionEntry {
  entry_id: string;
  title: string;
  summary: string;
  prompt: string;
}

export interface ReplyMeta {
  turn_id: string;
  mode: ReplyMode;
  /** Empty unless mode is "answer". */
  sources: Source[];
  confidence: string | null;
  /** Exactly three when mode is "options", otherwise empty. */
  options: OptionEntry[];
  /** Ignored by this widget: voice playback is out of scope (spec FR-011). */
  voice_available: boolean;
  session: { turns_left: number; voice_plays_left: number };
}

export type ChatEvent =
  | { event: "meta"; data: ReplyMeta }
  | { event: "text"; data: { delta: string } }
  | { event: "correction"; data: { text: string; meta: ReplyMeta } }
  | { event: "done"; data: { turn_id: string; latency_ms: number } }
  | { event: "error"; data: ApiErrorBody };
