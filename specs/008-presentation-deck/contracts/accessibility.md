# Contract: Accessibility — deck route

## Keyboard

| Key(s) | Action | Guard |
|---|---|---|
| → ↓ Space PageDown | Next slide (no wrap) | Arrows/Space yield inside local regions; Space yields on buttons/links; PageDown always fires |
| ← ↑ Shift+Space PageUp | Previous slide (no wrap) | Same; PageUp always fires |
| Home / End | First / last slide | Always fires |
| R | Reset current slide | Only when the slide is resettable; yields inside local regions |
| Esc | Collapse navigator (and blur it) | Yields inside local regions |
| Tab / Shift+Tab | Native focus order | Never captured |
| ⌘K | Nothing (palette not mounted) | — |

**Local regions** (arrows/Space/R/Esc yield): `input, select, textarea,
[contenteditable]:not([contenteditable="false"]), [role="listbox"], [role="slider"],
[role="tablist"], [role="radiogroup"], [data-deck-keys="local"]`. Any key with ⌘/Ctrl/Alt held, or
during IME composition, or already `defaultPrevented`, is ignored.

Inside `DeckStepper` and the email flow (`data-deck-keys="local"`), ←/→ step the embed.

## Focus management

- Each slide renders `<article role="group" aria-roledescription="slide" aria-label="Slide N of
  T: <title>" tabIndex={-1}>` with exactly one `<h1>`.
- After navigation and after reset, focus moves to the slide `<article>`. Next's route announcer
  reads the new `<title>` (`"N of T · <title>"`).
- Reset also updates a polite live region with "Slide reset".
- Focus rings: `.frame :focus-visible { outline-width: 3px }` and the same inside
  `.replicaFrame`, so rings remain visible when the frame is scaled to ~0.6.

## Navigator semantics

`<nav aria-label="Deck navigation">`; a 2px progress rule (`aria-hidden`); an always-tabbable
toggle `<button aria-expanded aria-controls>` showing "N / T" with visually-hidden "Slides";
expanded list: `<ol>` of section links (`aria-current="true"` on the current section) with the
current section's slides nested (`aria-current="page"` on the current slide). Collapsed list is
`visibility: hidden` (out of the tab order). Expands on `:hover`, `:focus-within`, or toggle.

## Headings

Slide `<h1>` → hidden `<h2>` per embed wrapper (e.g. "Organization settings", "Personal
settings", "Before: accordion shell") → replica components' own `<h3>`s.

## Reduced motion

- No slide cross-fade under `prefers-reduced-motion: reduce`.
- Embedded demos keep their own reduced-motion behavior (toast fade variants, discrete steps).
- Nothing animates on load or scroll at any time.

## No-JS

- Without `html.deck-js` the frame is unscaled and flows; every slide renders headline, body,
  `staticDescription`, and links; navigator links are real `<a href>`s.
- Demo slides render `<noscript>` with the description and "Interactive version requires
  JavaScript".

## Contrast & focus inside `.replicaFrame`

Unchanged from `/work`: AA contrast holds inside the frame; the deck only widens focus outlines.

## Verification

- axe (CI) on six deck URLs under the `ci` slug: zero violations.
- Manual: keyboard table end-to-end, including from inside a Dropdown listbox, the language
  `<select>`, the ContentLanguagePicker search input, a DeckStepper, and the email flow.
- VoiceOver (Jason-gated): slide title announced on navigate; "Slide reset" on R; navigator
  sections/slides with current state.
- Reduced motion, no-JS, 1280-wide scroll-leak check, 375-wide phone pass.
