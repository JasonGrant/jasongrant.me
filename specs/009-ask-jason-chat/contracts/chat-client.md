# Contract: Chat client — HTTP, SSE parsing, and the development stand-in

Consumes `~/Repos/cortex/specs/007-site-chat/contracts/chat-api.md` (source of truth). This
contract fixes how the widget calls it and what it does with every outcome. Nothing here
changes the API.

## Requests

| Call | Method / path | Headers | Body | Notes |
|---|---|---|---|---|
| health | `GET {API}/api/health` | `Accept: application/json` | — | once per first intent per page view; again on reopen after 60 s closed; `cache: "no-store"` (the edge caches 15 s) |
| session | `POST {API}/api/session` | `Content-Type: application/json` | `{ "turnstile_token": string, "referrer": string \| null }` | `referrer` = `new URL(document.referrer).host` or `null` (host only, FR-016) |
| chat | `POST {API}/api/chat` | `Authorization: Bearer <session>`, `Content-Type: application/json`, `Accept: text/event-stream` | `{ "message": string }` | `signal` from the turn's `AbortController` |

`{API}` is `NEXT_PUBLIC_ASK_JASON_API`. No other request is ever made. No cookies
(`credentials: "omit"`). No retries. Each call has a 20 s timeout except the stream, which has a
20 s first-`meta` timeout and no total timeout.

## What is sent, exhaustively

Session token (header), message text (body), referrer host (body), Turnstile token (body).
Nothing else: no page URL, no user agent beyond the browser's own, no identifiers.

## SSE reader

```
read bytes → TextDecoder(stream) → split on "\n" → accumulate fields until a blank line
  event: <name>      data: <text>   (multiple data lines join with "\n")
  ignore: comments (":"), id, retry, unknown fields, CR
dispatch { event, data: JSON.parse(data) }
```

- Expected order: `meta`, zero or more `text`, optional `correction`, then exactly one of
  `done` or `error`. A `text` before `meta` is ignored and logged in development (the API
  guarantees it cannot happen).
- `done` or `error` ends the read; the reader cancels the body.
- Stream closed before `done` → `ChatNetworkError` (the UI shows the network line; partial text
  stays).
- JSON parse failure of a `data` payload → treat as `ChatNetworkError`.

## Error mapping

Non-2xx responses carry `{ "error": { "code", "message" } }`. The client throws
`ChatHttpError(status, body)`; the widget maps by `code` (see widget-states.md). An unknown
code is shown by its `message` in the reply slot, since every API message is safe to show.

## Version check

`health.build.api_version !== 1` → the widget never calls session or chat and shows the
call-to-action state with the site line. Bumping `SUPPORTED_API_VERSION` is a site change.

## Stand-in (`NEXT_PUBLIC_ASK_JASON_API=standin`)

`scriptedChatClient.ts` implements the same interface from scenario scripts
(data-model §9). Rules:

- Scenario chosen by `?ask=<id>`; default `empty`. `&open=1` opens on load; `&container=sheet`
  forces the sheet.
- Timing is realistic: health 150 ms (`slow-health` 2 s), session 400 ms, first `meta` 600 ms,
  then words at the API's typical rate (~25 words/s) so pacing and Stop can be seen.
- Bot check: real Turnstile with the Cloudflare test site keys; `bot-*` scenarios set the key.
  Tokens are not verified (the stand-in accepts any token).
- The disclosure, notice and fixed strings are the live API's current texts, copied into the
  fixture with the date they were copied; the stand-in is not a source of truth.
- The stand-in and the picker exist only in builds where the API variable is the literal
  `standin`; the bundle check (D16) confirms Vercel builds carry neither.

## Timing targets (spec SC-003, SC-004)

| Moment | Budget |
|---|---|
| bar activation → panel shell visible | ≤ 100 ms |
| first intent → health answered | typically 150–400 ms; the shell never waits for it |
| send → visitor message + thinking mark shown | ≤ 100 ms |
| `meta` → first visible word | ≤ 50 ms (pacer start) |
| widget overhead on first-words latency | ≤ 200 ms over the API's own |
