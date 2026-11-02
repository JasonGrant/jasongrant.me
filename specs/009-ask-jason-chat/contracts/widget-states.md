# Contract: Widget states and transitions

Spec FR-030 to FR-037; data-model §6. Every open state keeps the header with the disclosure.
"Reply slot" means the position of the pending reply in the transcript.

## Opening

| Trigger | Preconditions | Result |
|---|---|---|
| Submit from the bar with text | health not yet known | panel opens (morph), visitor message appended, reply slot shows the thinking mark, health + session + chat proceed in order; focus → composer |
| Submit from the bar, empty | — | panel opens to `empty` (or `conversation` if one exists); focus → heading |
| Tap the bar (phone) | — | sheet opens; focus → sheet composer; no message sent |
| Palette "Ask Jason" | — | panel fades in (no morph); focus → heading |
| Bar in `closed` mode | — | panel opens showing the ended / call-to-action block |

First intent (focus, tap, palette) starts: chat module import, `health()`, Turnstile script
load. First keystroke or starter tap starts: `turnstile.execute()`, then `createSession()`.

## The send path

```
draft non-empty, ≤ limit, no inFlight
  → append VisitorMessage, append ReplyMessage(status thinking), clear draft, announce "Jason is answering"
  → await health (ok?)            ── capped/down/version → cta (message kept in draft)
  → await turnstile token         ── failed → bot-check failed surface; draft restored
  → await session                 ── 403 bot_check_failed → failed surface; 503 → cta
  → chat(): meta → text* → (correction)? → done | error
```

Send is disabled, not hidden, while a step is pending; the button shows a waiting state after
300 ms.

## Event handling during a turn

| Event | Effect |
|---|---|
| `meta` | set `mode`, `sources`, `options`, `turnId`, `turnsLeft`; status → streaming; answer: render "From" row now; options/deflect/none: text follows in one `text` event |
| `text` | append to `pending`; the pacer moves words into `text` (D6) |
| `correction` | replace `text` and `pending` with the event text (crossfade), set `updated`, re-render sources or options from its meta, announce "Answer updated" |
| `done` | flush the pacer, status → complete, announce the reply (≤ 600 chars) or "Answer ready, N paragraphs"; if `turnsLeft === 0` → `ended` |
| `error` | status → failed, `errorMessage` replaces the partial text, announce; composer stays usable |
| abort (Stop) | status → stopped, eyebrow "Stopped", announce "Stopped"; focus → composer |
| no `meta` in 20 s / stream drops / fetch throws | status → failed with the site network line, "Try again" control, `draft` restored to the visitor's text; a later Try again resends on activation only |

## HTTP errors before the stream

| Status · code | State | What shows | Composer |
|---|---|---|---|
| 400 `input_too_long` / `input_not_text` | `conversation` | message under the composer (error tone, hidden "Error:" prefix); visitor message and reply slot removed | kept with text |
| 400 `bad_request` | `conversation` | message in the reply slot | usable |
| 401 `session_required` / 410 `session_expired` | `conversation` | nothing; session cleared, bot check re-run, message resent once the new session exists | waiting |
| 403 `bot_check_failed` | `conversation` / `empty` | bot-check surface: message + Try again | kept |
| 409 `turn_limit` / `session_closed` | `ended` | ended block: message + CTA | replaced |
| 429 `address_limit` | `address-limit` | message in the reply slot; CTA replaces the composer | replaced |
| 503 `chat_capped` / `unavailable` | `cta` | message + CTA; starters hidden | replaced |
| other / unparseable | `conversation` | site network line + Try again | kept |

Health `capped` / `down` and `api_version ≠ 1` → `cta` with the site line "The chat is resting
for now." (there is no API message to show).

## Local end of conversation

When `turnsLeft` reaches 0 after a completed reply, the widget enters `ended` without calling
the API again: ended block = site line "That's the end of this conversation." + CTA. Announce
"No questions left". The bar becomes `closed`.

## Turn hint and counter

- Hint above the composer when `turnsLeft ≤ 3`: "3 questions left", "2 questions left",
  "1 question left". Announce at 1 and 0 only.
- Counter from 80 % of `inputLimit`: "N left" (mono, `--ink-mute`); at or over: "N over" in the
  error tone, Send disabled, notice line replaced by "Keep it under {limit} characters."

## Options cards

- Exactly three; rendered under the reply text; activation sends `prompt` as a new visitor
  message through the normal send path.
- `optionsUsed = true` on the reply once any later message is sent; cards render disabled and
  stay in the transcript.

## Closing

| Trigger | Result |
|---|---|
| Close, Escape (focus inside), bar re-activation, sheet swipe or scrim tap | panel morphs back to the bar (D11); `open = false`; transcript and `draft` kept; focus → bar field (or bar button in `closed` mode) |
| Navigation between chrome pages | nothing closes; the store survives the layout remount |
| Reload | store gone; session token kept; next open starts a fresh view of the same session |

Reopen after more than 60 s closed refetches health first (so a cap tripped meanwhile shows).

## Bot-check sub-states

| `BotCheck` | Visible | Announce |
|---|---|---|
| `idle` / `loading-script` / `ready` | nothing | — |
| `checking` | "Checking…" in the hint slot | — |
| `interactive` | the surface with the challenge, "Quick check before we start" | "Verification needed" |
| `verified` | nothing (surface fades out) | — |
| `failed` | the surface with the API message + Try again | the message |

Token age > 270 s at send time → execute again silently (`checking`).
