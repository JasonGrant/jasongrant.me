# Data Model: Ask Jason chat widget (feature 009)

Everything here is client-side TypeScript under `src/components/ask/` and `src/content/ask.ts`.
Wire shapes mirror `~/Repos/cortex/specs/007-site-chat/contracts/chat-api.md` and its data
model; they are copied as types, never re-interpreted. Field names stay snake_case on the wire
and camelCase in the store.

## 1. Build-time configuration — `src/lib/askJasonFlag.ts`

```ts
export type AskJasonMode = "off" | "private" | "on";

// Literal comparisons only: webpack inlines the variable and drops dead branches (research D2).
export const ASK_JASON_MODE: AskJasonMode =
  process.env.NEXT_PUBLIC_ASK_JASON === "on"
    ? "on"
    : process.env.NEXT_PUBLIC_ASK_JASON === "private"
      ? "private"
      : "off";
```

| Variable | Scope | Values | Read by |
|---|---|---|---|
| `NEXT_PUBLIC_ASK_JASON` | build, public | `off` · `private` · `on` (explicit in every environment) | flag module, layouts, palette |
| `NEXT_PUBLIC_ASK_JASON_API` | build, public | `https://api.jasongrant.me` · `standin` | client factory (D4) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | build, public | real key; Cloudflare test keys in development | `turnstile.ts` |
| `ASK_JASON_PREVIEW_SECRET` | build, server-only | long random string; required when mode is `private` | `next.config.mjs` only |
| `NEXT_PUBLIC_ASK_JASON_KEY_HASH` | derived at build by `next.config.mjs` | SHA-256 hex of the secret | `keyGate.ts` |

## 2. Site-authored content — `src/content/ask.ts`

```ts
export interface Starter {
  /** Shown on the card and typed by the rotation; ≤ 40 characters (asserted at build). */
  label: string;
  /** Sent as the message when the card is activated. */
  prompt: string;
}

export const ask = {
  greeting: "Ask me about my work, how I lead, or what I've written.",
  placeholder: "Ask about my work, how I lead, or what I've written",
  followUpPlaceholder: "Ask a follow-up",
  closedLabel: "Chat closed · email me",
  starters: [/* three Starter entries, Jason's copy */] as const,
  // The only site-authored lines besides the above (spec contract note 3).
  lines: {
    ended: "That's the end of this conversation.",
    resting: "The chat is resting for now.",
    network: "The chat didn't respond. Check your connection and try again.",
    contact: "You can reach me directly:",
  },
} as const;
```

Validation at import: exactly three starters, each `label` ≤ 40 characters, each `prompt`
non-empty; the module throws otherwise (a `tsc`-time `satisfies` plus a runtime assertion, as
`assertDeck` does in 008).

## 3. Wire types — `src/components/ask/wire.ts`

```ts
export type ChatAvailability = "ok" | "capped" | "down";
export type ReplyMode = "answer" | "options" | "deflect" | "none";
export type ErrorCode =
  | "bad_request" | "bot_check_failed" | "session_required" | "session_closed"
  | "session_expired" | "input_too_long" | "input_not_text" | "address_limit"
  | "turn_limit" | "voice_limit" | "voice_unavailable" | "chat_capped" | "unavailable";

export interface Health {
  chat: ChatAvailability;
  voice: "ok" | "off";
  disclosure: string;
  notice: string;
  limits: { input_chars: number; turns: number; voice_plays: number };
  build: { corpus_commit: string; built_at: string; api_version: number };
}

export interface ApiError { error: { code: ErrorCode | string; message: string } }

export interface SessionResponse {
  session: string;
  limits: Health["limits"];
  voice_available: boolean;
}

export interface Source { entry_id: string; title: string; url: string | null }
export interface OptionEntry { entry_id: string; title: string; summary: string; prompt: string }

export interface ReplyMeta {
  turn_id: string;
  mode: ReplyMode;
  sources: Source[];            // empty unless mode = answer
  confidence: string | null;
  options: OptionEntry[];       // exactly 3 when mode = options
  voice_available: boolean;     // ignored by this feature (FR-011)
  session: { turns_left: number; voice_plays_left: number };
}

export type ChatEvent =
  | { event: "meta"; data: ReplyMeta }
  | { event: "text"; data: { delta: string } }
  | { event: "correction"; data: { text: string; meta: ReplyMeta } }
  | { event: "done"; data: { turn_id: string; latency_ms: number } }
  | { event: "error"; data: ApiError["error"] };
```

`SUPPORTED_API_VERSION = 1`; any other `build.api_version` is the call-to-action state.

## 4. Chat client — `src/components/ask/chatClient.ts`

```ts
export interface ChatClient {
  health(signal?: AbortSignal): Promise<Health>;
  createSession(input: { turnstileToken: string; referrer: string | null }): Promise<SessionResponse>;
  /** Resolves to a stream of events; `abort()` stops reading (the turn is still spent). */
  chat(input: { session: string; message: string; signal: AbortSignal }): Promise<AsyncIterable<ChatEvent>>;
}
export class ChatHttpError extends Error { constructor(public status: number, public body: ApiError) }
export class ChatNetworkError extends Error {}   // fetch failed, stream dropped, or 20 s without meta
```

Two implementations (research D4): `httpChatClient.ts` and, behind
`process.env.NEXT_PUBLIC_ASK_JASON_API === "standin"`, `scriptedChatClient.ts`.

## 5. Store — `src/components/ask/store.ts`

```ts
export type Role = "visitor" | "jason";

export interface VisitorMessage { id: string; role: "visitor"; text: string; at: number }

export interface ReplyMessage {
  id: string;                    // local id; turnId once meta arrives
  role: "jason";
  turnId: string | null;
  mode: ReplyMode | null;        // null until meta
  text: string;                  // committed text (what the pacer has released)
  pending: string;               // received but not yet released by the pacer
  sources: Source[];
  options: OptionEntry[];
  optionsUsed: boolean;          // cards disabled once any later message is sent
  status: "thinking" | "streaming" | "complete" | "stopped" | "failed";
  updated: boolean;              // a correction replaced the text
  errorMessage: string | null;   // API `error.message` when status = failed
}

export type Message = VisitorMessage | ReplyMessage;

export type Container = "panel" | "sheet";

export type WidgetState =
  | "closed" | "loading" | "empty" | "conversation"      // conversation covers sending/streaming/answer/...
  | "ended" | "address-limit" | "cta" | "network-error";

export type BotCheck = "idle" | "loading-script" | "ready" | "checking" | "interactive" | "verified" | "failed";
export type BarMode = "rotating" | "static" | "follow-up" | "closed";

export interface AskStore {
  mode: AskJasonMode;            // build-time
  armed: boolean;                // private mode: key gate passed (always true in `on`)
  container: Container;
  widget: WidgetState;
  open: boolean;                 // panel/sheet visible
  health: Health | null;
  healthAt: number | null;       // refresh after 60 s closed (D9)
  session: string | null;
  turnsLeft: number | null;      // from the last meta
  inputLimit: number;            // health.limits.input_chars, default 500 until health answers
  draft: string;                 // shared value of the bar field and the panel composer
  messages: Message[];
  inFlight: { abort: () => void } | null;
  botCheck: BotCheck;
  turnstileToken: { value: string; at: number } | null;
  bar: BarMode;
  rotationCycles: number;        // ≤ 3 per page view
  nudges: number;                // ≤ 3 per page view
  interacted: boolean;           // first focus/hover/pointer/keystroke on the bar (stops rotation and nudge for good)
  inlineError: string | null;    // input_too_long / input_not_text under the composer
  networkRetry: (() => void) | null;
  opener: HTMLElement | null;    // where focus returns on close
}
```

The store is a module singleton with `getSnapshot()`, `subscribe()` and typed actions; React
reads it through `useSyncExternalStore`. It is created once per page lifetime, so layout
remounts keep it (research D1).

## 6. State machine (spec FR-030)

| State | Enter when | Shows | Leaves to |
|---|---|---|---|
| `closed` | initial; Close, Escape, swipe, bar re-activation | bar only (`BarMode` below) | `loading` / `empty` / `conversation` on open |
| `loading` | open before health answers | shell: header with reserved disclosure, "Connecting…" after 300 ms, composer enabled | `empty` or `conversation` on health ok; `cta` on capped/down/version; `network-error` on failure |
| `empty` | health ok, no messages | greeting, starters, composer, notice | `conversation` on send |
| `conversation` | first message sent | transcript, composer (Send/Stop), hints | `ended` at turns 0 / turn_limit / session_closed; `address-limit`; `cta` on capped/unavailable mid-session; `network-error` per turn (see note) |
| `ended` | turnsLeft 0 after a reply; `turn_limit`; `session_closed` | transcript + ended block with CTA, no composer | `closed` only (reopen returns here) |
| `address-limit` | `429 address_limit` | message in reply slot, CTA replaces composer | `closed` only |
| `cta` | health capped/down, unknown api_version, `503 chat_capped`/`unavailable` from session or chat, missing site key | message (API or site line) + CTA; no starters, no composer | `closed`; re-evaluated on next open (health refetch) |
| `network-error` | health fetch failed; session fetch failed | one site line + Try again, no composer | `loading` on Try again |

Within `conversation`, a per-reply status (`thinking → streaming → complete | stopped | failed`)
and per-turn errors live on the `ReplyMessage` (so the transcript stays); a turn-level network
failure sets `networkRetry`, returns the text to `draft`, and keeps the widget in
`conversation`. `BotCheck` runs orthogonally and gates sending.

### Bar mode (`BarMode`)

| Mode | When | Field | Button |
|---|---|---|---|
| `rotating` | no conversation, not interacted, not reduced motion, rotation cycles < 3 | rotating overlay, native placeholder hidden | "Ask Jason →" |
| `static` | otherwise before a conversation | static placeholder | "Ask Jason →" |
| `follow-up` | conversation exists, widget `conversation` and closed | "Ask a follow-up" | "Ask Jason →" |
| `closed` | widget `ended`, `address-limit` or `cta` and closed | no field; the bar is one button | "Chat closed · email me" |

### Focus targets

| Transition | Focus |
|---|---|
| open by send from the bar | panel composer (`draft` already sent) |
| open with empty draft (button, palette) | panel heading |
| close (any way) | the bar's field, or its button in `closed` bar mode |
| Stop disappears | panel composer |

## 7. Announcements (status region, FR-041)

| Moment | Text |
|---|---|
| send accepted | "Jason is answering" |
| `done` | full text if ≤ 600 characters, else "Answer ready, N paragraphs" |
| `correction` | "Answer updated" + same rule |
| bot check interactive | "Verification needed" |
| any API or network error shown | the message |
| turnsLeft reaches 1 / 0 | "1 question left" / "No questions left" |
| Stop | "Stopped" |

Queue rule: clear, wait 350 ms, insert; identical consecutive messages are re-announced only
through that cycle.

## 8. Storage keys

| Key | Store | Value | Lifetime |
|---|---|---|---|
| `ask-jason.session` | `sessionStorage` (memory fallback) | session token | tab; cleared on 401/410 |
| `ask-jason.preview-key` | `localStorage` | `{ key, expiresAt }` | 30 days; disarmed when the hash no longer matches |

Nothing else is written. No cookies.

## 9. Stand-in scenarios — `scriptedChatClient.ts`

Selected with `?ask=<id>` in development and CI builds (`standin` only). Each scripts health,
session and one or more turns with realistic timing.

| id | Produces |
|---|---|
| `empty` | health ok, no turns scripted |
| `slow-health` | health answers after 2 s (loading state) |
| `answer-1`, `answer-3` | answer with one internal source / three mixed sources, ~5 s stream |
| `options` | options reply with three cards; tapping grounds an answer |
| `deflect`, `none` | fixed replies |
| `correction-text`, `correction-options` | answer, then a correction to new text / to options |
| `long` | 700-token reply for Stop and Jump to latest |
| `error-event` | `meta` then `error` |
| `no-meta` | nothing for 25 s (timeout path) |
| `drop` | stream closes mid-text |
| `too-long`, `not-text` | 400s under the composer |
| `address-limit` | 429 on the second message |
| `countdown` | turns_left 3 → 0 across replies, then ended |
| `turn-limit`, `session-closed`, `session-expired` | the 409/410 paths |
| `capped-health`, `down-health`, `capped-session`, `unavailable-chat`, `old-version` | call-to-action paths |
| `voice-on` | `voice: "ok"` and `voice_available: true`; nothing must change |
| `bot-pass`, `bot-fail`, `bot-interactive` | selects the matching Cloudflare test site key |

`&open=1` opens the panel on load (focus rules apply); `&container=sheet` forces the sheet at
any width for screenshots.

## 10. Validation rules

- `ReplyMeta.options.length === 3` when `mode === "options"`; otherwise the reply is rendered
  as text only and a console warning is logged in development (the API guarantees this).
- `Source.url` null → the pill renders as plain text, not a link.
- Draft length counts Unicode code points after trim (research D18); Send disabled above
  `inputLimit`, when empty, during `inFlight`, before health, or before the session when a
  send is already queued.
- Starters: exactly three, labels ≤ 40 characters.
- The status region never receives a string longer than 600 characters.
