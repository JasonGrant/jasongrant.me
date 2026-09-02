# Contract: Interaction & Accessibility

**Feature**: 002-interactive-case-studies | Constitution v1.2.1 Principles I & IV

## Keyboard map

| Surface | Keys | Behavior |
|---|---|---|
| Page | `Tab`/`Shift+Tab` | Logical order through prose, chips, demos, player. Never trapped |
| Glossary chip | `Enter`/`Space` | Toggle inline disclosure; `aria-expanded` reflects state |
| Concept demo controls | native | `<select>`, sliders (`<input type="range">` with arrow keys), buttons — native semantics only |
| Truncation tooltip | focus/hover/tap | Trigger is focusable; full string via `aria-describedby`; dismissible per WCAG 1.4.13 |
| Player | `Enter`/`Space` on labeled buttons | Play walkthrough / Pause / Stop / Prev / Next |
| Player (focused) | `←`/`→` | Prev/next step; does NOT capture `Tab`; no global hotkeys |

No shortcut conflicts with the site's `Cmd+K` (palette is absent on work routes).

## Announcements

- Each demo owns ONE visible result line that is also `aria-live="polite"` —
  outcomes are text, not color/motion alone (truncation meaning change, locale
  reformat results, flags-rule verdicts) — US2 scenario 3.
- Player step changes announce the step caption via `aria-live="polite"`;
  Pause/Stop announce state.
- Toasts in the replica are decorative-in-frame but still text-rendered and
  announced once via the player's live region (not a second live region storm).

## Motion (constitution v1.2.1 scripted-demonstrations exception, all six conditions)

- (a) No motion before an explicit press of a labeled control; nothing on load or scroll.
- (b) Pause and Stop visible whenever a sequence runs.
- (c) Reduced motion: discrete instant state changes, manual pacing, identical captions.
- (d) No audio ships; the transcript disclosure renders `narrationText` in place.
- (e) Motion = state changes, highlights, focus movement, screen transitions only.
- (f) Scripted animation exists only inside the player. Concept demos are
  direct-manipulation with instant outcomes. Sitewide bans hold everywhere else.

## Visual (Principle IV — FR-013a, constitution v1.2.2 replica-craft exception)

Inside `.replicaFrame` on `/work/[slug]`, product-authentic depth is permitted —
drop shadows, gradients, layered elevation, richer borders — so the recreation
reads like a real, high-craft product (FR-013a). Bounds that still hold inside
the frame: WCAG AA contrast (the replica is shipped UI, not an image); visible
focus indicators on every control (replica styles must not remove `outline`,
and the ring keeps ≥3:1 contrast against the replica surface); and static depth
only — no depth-driven motion (frame motion stays governed by the
scripted-demonstrations exception). Everywhere OUTSIDE the frame the sitewide
flat-styling bans remain in force.

## No-JS / degradation

Server-rendered initial state per demo + `staticCaption` + `<noscript>` note
(FR-013, D5). The prose narrative is complete without any demo interaction.

## Manual verification (Principle III — no test suites)

Per workflow gates: axe (CI, D14), full keyboard pass, VoiceOver pass covering one
complete walkthrough + every demo, reduced-motion OS-level pass, and the SC-003
side-by-side animated-vs-reduced review.
