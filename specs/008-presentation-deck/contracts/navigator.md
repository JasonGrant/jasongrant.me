# Contract: Navigator (progress + disclosure)

## States

| State | Trigger | Rendering |
|---|---|---|
| Collapsed | default | Only a small toggle button ("7 / 24") in the bottom-right corner, at low emphasis. No separate bar or rule — the button is the only chrome reserved when collapsed. |
| Expanded | `:hover` on the nav, `:focus-within`, or the toggle (`aria-expanded="true"`) | A hairline-topped panel rises from the bottom edge: sections spaced across the full width (current marked), each with its own slide list underneath, always shown (current section/slide marked). |
| Collapsing | pointer leaves, focus leaves, Esc, or toggle | Panel hides; toggled state resets. |

Two levels, both always visible: every section shows its own slide list, not just the current
one — a presenter can jump directly to any slide in any section without visiting it first.

## Semantics

- `<nav aria-label="Deck navigation">` — a full-width, zero-height positioning anchor with no
  background of its own; its only visible content when collapsed is the toggle button, so nothing
  is reserved beyond that button.
- Toggle: `<button type="button" aria-expanded aria-controls="deck-nav-panel">`, visible text
  "7 / 24", visually-hidden prefix "Slides".
- Panel: `<div id="deck-nav-panel">` containing `<ol>` of sections, spaced across the panel width
  (`justify-content: space-between`); each section is a `<Link prefetch={false}>` to its first
  slide with `aria-current="true"` when current, and every section's `<li>` — not only the
  current one — contains a nested `<ol>` of slide `<Link>`s, with `aria-current="page"` on the
  current slide within the current section.
- Collapsed panel is `visibility: hidden` so it is out of the tab order; the toggle is always
  tabbable, which is how keyboard users reach `:focus-within`.
- Esc collapses and blurs.

## Visual

- Flat: text only, no shadow; elevated background tone for the panel per Principle IV
  framed-device rule; mono labels at the deck meta size.
- Emphasis: the toggle text is `--ink-mute`; current section/slide use `--ink` and a hairline
  underline.

## Prefetch policy

- Navigator links are `<Link prefetch={false}>` (24 auto-prefetching links would fetch every
  slide as soon as the nav scrolls into view).
- `DeckShell` prefetches only the previous and next slide via `router.prefetch` after each
  navigation, so keyboard steps are instant.
