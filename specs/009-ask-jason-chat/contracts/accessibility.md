# Contract: Accessibility — semantics, focus, keyboard, announcements, motion, contrast

Spec FR-038 to FR-045, Story 5. WCAG 2.1 AA throughout; 2.2's 2.4.11 and 2.5.8 adopted.

## Semantics

| Element | Markup |
|---|---|
| Bar | `<form aria-label="Ask Jason">` → `<input aria-label="Ask Jason">` + `<button type="submit">Ask Jason</button>`; phone: the bar is one `<button aria-label="Ask Jason">` containing the visual field |
| Rotating placeholder | `<span aria-hidden="true">`; never in the accessible name or description |
| Panel (≥ 768 px) | `<section role="dialog" aria-labelledby="ask-title">`; no `aria-modal`; no `inert` on the page |
| Sheet (< 768 px) | `<dialog aria-labelledby="ask-title">` opened with `showModal()` (top layer, page inert, Escape → `cancel` → close) |
| Heading | `<h2 id="ask-title" tabindex="-1">Ask Jason</h2>` |
| Disclosure | `<p id="ask-disclosure">`; the dialog also has `aria-describedby="ask-disclosure"` so it is read on entry |
| Transcript | `<div role="log" aria-live="off" aria-label="Conversation" tabindex="0">` |
| Message | `<article aria-labelledby="<msg-id>-h">` with `<h3 id="<msg-id>-h">You</h3>` / `Jason · AI` (+ `Updated` / `Stopped` / `Didn't send`) |
| Sources row | `<nav aria-label="Sources for this answer">` → `<a>` pills; external: visually hidden "(opens in new tab)" |
| Option / starter cards | `<button aria-label="Ask about {title}">` (summary inside, read as content); disabled: `aria-disabled="true"` + `tabindex="-1"` |
| Composer | `<textarea id="ask-q" aria-label="Your question" aria-describedby="ask-hint ask-count">`; `ask-hint` = "Enter sends, Shift+Enter for a new line" (pointer devices) or empty (touch) + the turn hint; `ask-count` = counter text |
| Send / Stop | `<button type="submit">Send</button>` / `<button type="button">Stop</button>` (swapped, not relabelled) |
| Status region | `<div role="status" aria-live="polite" aria-atomic="true" class="srOnly">` mounted with the panel |
| Bot-check surface | `<div role="group" aria-label="Verification">` with a `<p>` line; the Turnstile iframe inside |
| Contact block | `<p>` + `<a href="mailto:…">` |
| Jump to latest | `<button>Jump to latest</button>` |

## Focus

| Event | Focus goes to |
|---|---|
| open by send from the bar | composer |
| open with empty draft, or from the palette | heading |
| close (Escape, Close, swipe, scrim, bar) | the bar's field; the bar's button when the bar is in `closed` mode; if the bar is off-screen it is scrolled into view first |
| Stop control disappears | composer |
| Try again (network) | composer, with the text restored |
| bot check needs interaction | unchanged (the Turnstile iframe is in tab order via `tabindex=0`); announced |
| navigation while open | unchanged |

No focus trap on the panel (non-modal). The sheet's `showModal()` provides the trap natively.

## Keyboard

| Where | Key | Result |
|---|---|---|
| Page | Tab | reaches the bar's field, then its button |
| Bar field | Enter | submit (send or open) |
| Bar field | Escape | nothing (nothing to close) |
| Panel | Escape | close, when focus is inside the panel |
| Panel | Tab order | Close → transcript (focusable, scrolls with arrows) → cards / pills in reading order → Jump to latest (when shown) → composer → Send/Stop → mail link (CTA states) → out to the page |
| Composer (pointer devices) | Enter / Shift+Enter | send / newline |
| Composer (touch) | Enter | newline; Send submits |
| Cards | Enter / Space | activate |
| Transcript | ↑ ↓ PageUp PageDown Home End | native scrolling of the focused log |
| Sheet | Escape | close (native `cancel`) |

No roving focus and no custom shortcuts beyond these.

## Announcements

Only through the status region (data-model §7). The transcript announces nothing. The
rotating placeholder, counter and turn hint are never live; the counter and hint are reached
through `aria-describedby` and announced on focus or when the hint changes while the field is
focused, per the GOV.UK character-count pattern (visible update immediately, no announcement
until a pause of 1 s in typing, only at the 80 % threshold crossing and at/over the limit).

## Targets and contrast

- Every control ≥ 24 × 24 CSS px; on touch: bar, bar button, cards, Send, Stop, Close,
  mail link ≥ 44 px tall.
- Text contrast ≥ 4.5:1, measured at implementation (WCAG relative luminance). On `--bg-elev`:
  `--ink` 13.6:1, `--ink-soft` 6.3:1, `--ink-mute` 5.0:1. On the ink @ 4 % card tone: `--ink`
  12.4:1, `--ink-soft` 5.8:1, `--ink-mute` 4.6:1. On the ink @ 6 % visitor-message block: `--ink`
  11.8:1, `--ink-soft` 5.5:1, but `--ink-mute` only **4.4:1, which fails**; so muted text is never
  placed on that block (its eyebrow sits above it on `--bg-elev`, and the text inside is `--ink`).
  The placeholder uses `--ink-mute` on `--bg-elev`.
- Error tone: `--danger` `#ec8a7a`, 7.0:1 on `--bg-elev` and 6.1:1 on the 6 % tone block; never
  the only cue (the text says "over" or carries a hidden "Error:" prefix).
- Non-text: focus ring `--accent` 2 px / 2 px offset (≥ 3:1 against `--bg-elev`); card border
  `--rule-strong` is not the only boundary (tone + padding), so 3:1 is not required of it.
- Disabled Send and disabled cards are exempt from contrast (1.4.3) but keep ≥ 3:1 anyway.
- Zoom 200 % at 320 px: header, disclosure, transcript, composer and notice remain reachable; no
  horizontal scrolling inside the panel; the bar's button never wraps.

## Reduced motion (`prefers-reduced-motion: reduce`)

| Thing | Default | Reduced |
|---|---|---|
| bar → panel | 320 ms FLIP morph | 100 ms crossfade |
| panel → bar | 240 ms reverse | 100 ms crossfade |
| rotating placeholder | runs (bounded) | never starts; static placeholder |
| nudge | runs (bounded) | never |
| thinking mark | slow opacity pulse | static |
| word fade-in | 150 ms | none; plain text append |
| message arrival | 150 ms fade | none |
| card stagger | 30 ms | none |
| correction | 200 ms crossfade | instant replace |
| sheet open / close | 320 ms / 240 ms morph (the frame grows from the bar) | 100 ms crossfade |

`useReducedMotion` from `src/lib/motion.ts` is the single source; CSS uses the media query for
the same cases.

## Turnstile

- Script loaded only on first intent; `language` set from `<html lang>`; `theme: "dark"`
  (never `auto`); `tabindex: 0`; `size: "flexible"`.
- `before-interactive-callback` → announce "Verification needed"; `error-callback` → the failed
  surface with the API's `bot_check_failed` message once the session call returns it, or the
  site network line if the script itself failed to load; both offer Try again and the mail link.
- The iframe is inside the dialog's DOM, so it is reachable in the sheet's modal trap.

## Verification (Principle III)

- axe: 0 violations on every chrome page with the bar (CI), and on the open states listed in
  `flag-and-environments.md` (CI, via the stand-in picker), in the single shipped colour mode.
- Keyboard pass: the Keyboard table above, on desktop (panel) and at 375 px (sheet).
- VoiceOver on Safari: open by send (composer focus, "Jason is answering", one completion
  announcement), open by palette (heading focus, disclosure read), options cards named
  "Ask about …", a correction ("Answer updated"), a close (focus back on the bar), the rotating
  placeholder silent, the counter read on focus only.
- Reduced motion pass: the table above, with the OS setting on.
- Phone pass on hardware (iOS Safari, Android Chrome): keyboard up keeps the composer and
  header visible; swipe-down closes; no page scroll behind the sheet.
