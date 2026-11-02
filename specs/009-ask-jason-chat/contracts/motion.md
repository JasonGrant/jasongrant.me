# Contract: Motion — the morph, the placeholder rotation, the nudge, and everything else

Spec FR-004a, FR-004b, FR-024, FR-044, FR-046. Research D6, D11, D12. All motion is
`transform`/`opacity` or the frame's geometry; nothing animates `box-shadow`, `filter` or
colour except the nudge's two properties. No bounce, no overshoot, no scale on hover, nothing
on scroll.

## The morph (open)

```
t = 0        frame at the bar's rect; bar contents opacity 1 → 0 over 0–100 ms
t = 0–320    frame top/left/width/height → panel rect (cubic-bezier(0.2, 0, 0, 1))
t = 160–320  panel header, transcript, footer opacity 0 → 1
t = 320      frame = panel; focus moves (composer or heading)
```

- The frame is the panel's background box: `position: fixed`, `contain: strict`,
  `will-change: top, left, width, height` for the duration only, `overflow: hidden`,
  radius interpolated 12 px → 0 (panel) or 12 px → 10 px top corners (sheet).
- Rect source: the bar's `getBoundingClientRect()`; the target measured from the panel rendered
  with `visibility: hidden` one frame earlier.
- Contents never scale: the bar's inner elements and the panel's inner elements are separate
  nodes that only change opacity.
- Interruptible: a close during the open morph reverses from the current state (WAAPI
  `reverse()`), no jump.
- If the Web Animations API is unavailable (it is not, in the supported browsers), fall back to
  the reduced-motion crossfade.

## The morph (close)

```
t = 0–100    panel contents opacity 1 → 0
t = 0–240    frame rect → bar rect (same curve)
t = 140–240  bar contents opacity 0 → 1
t = 240      bar restored; focus → bar
```

On phones the sheet additionally supports drag-to-dismiss: the grabber and header respond to
a vertical pointer drag by translating the sheet; release past 30 % of its height or above
0.5 px/ms velocity closes, else it springs back over 200 ms (ease-out, no bounce).

## From the command palette

No morph. The panel fades in over 200 ms (`opacity` only) with the bar already hidden. Close
from this state still morphs back to the bar.

## Streaming text

- Words appear at 16 ms intervals, each in a `<span>` with `animation: ask-word-in 150ms ease-out`
  (`opacity 0 → 1`, no translate).
- Thinking mark: three dots at `--ink-mute`, `animation: ask-think 1.6s ease-in-out infinite`
  (opacity 0.4 → 1), shown ≥ 300 ms.
- Message arrival (visitor message, reply container): `opacity 0 → 1` over 150 ms.
- Option cards: same fade, staggered 30 ms per card.
- Correction: the reply's text node crossfades (`opacity 1 → 0 → 1`, 100 ms each way) with the
  new text swapped at the midpoint; the "Updated" tag fades in with it.
- Sources row: present from `meta`; no animation of its own.
- "Jump to latest": 120 ms fade in/out.

## Placeholder rotation (FR-004a)

```
t = 2 s        type q1 at 30 ms/char   → hold 3 s → clear (instant)
               type q2                 → hold 3 s → clear
               type q3                 → hold 3 s → clear
               rest 8 s                → repeat   (≤ 3 cycles)
after cycle 3  static placeholder, permanently
```

- Caret: a static `▍` glyph after the typed text (no blink; WCAG 2.2.2).
- Stops permanently on the first of: focus in the field, pointer over the bar, pointerdown,
  input, panel open. Pauses on `document.hidden`; resumes at the same character.
- Never starts when: reduced motion; a conversation exists; `BarMode ≠ rotating`.
- Questions: the three starters from `src/content/ask.ts` (≤ 40 chars); they ellipsize, never
  wrap.

## Nudge (FR-004b)

```
eligible when: t ≥ 20 s since page load · ≥ 45 s since the last nudge · nudges < 3
               · rotation is resting (between cycles or finished) · panel closed
               · !interacted · !document.hidden · !reduced motion
effect:        .nudge class for 600 ms → border-color and button color transition to
               --accent (300 ms) and back (300 ms)
```

Nothing moves, scales or shimmers. The scheduler is a single `setTimeout` chain owned by the
bar; it is torn down on interaction and on unmount.

## Reduced motion

See accessibility.md's table. In code, one `useReducedMotion()` read gates the JS animations
and `@media (prefers-reduced-motion: reduce)` gates the CSS ones; both resolve to the same set.

## Performance gate

- The open and close morphs show no dropped frames in the Performance panel on a mid-tier
  phone (e.g. a 2022 Android) and on a laptop with 6× CPU throttling.
- The rotation's per-character work is one text node update; no layout thrash (verified with
  the Performance panel's layout count during a cycle).
- Layout Shift regions: none during open, bot-check appearance, streaming and correction
  (Performance panel "Layout Shifts" track empty), on desktop and phone.
