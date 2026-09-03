# Contract: Accessibility & no-JS

The study is a shipped page: WCAG 2.1 AA, axe zero violations, CLS 0, and manual
keyboard/screen-reader/reduced-motion passes all apply (constitution; SC-003). Because the study
ships **no interactive player or demos** (research D6), the a11y surface is small — the work is
making static figures fully perceivable without sight, color, motion, or a pointer.

## Non-visual equivalence (US2.3, FR-019a)

- Every `figure` block declares a non-empty `staticDescription` carrying its information in
  words: the before/after contrast and the exact numbers (e.g., "Navigation drops from 10% of the
  page to 2.5% collapsed, 8.5% expanded"). This is rendered for no-JS/assistive contexts and
  MUST match what the figure shows.
- Recreated screens use native semantic elements with text labels (not image sprites), so their
  structure and sample data are read by a screen reader.
- Diagrams (`nav-footprint`, `details-space`) expose their compared values as text, not only as
  bar widths; color is never the sole carrier of the before/after distinction (WCAG 1.4.1).

## Reduced motion (US2.1)

- Figures are static by default. Any opt-in animation (bar growth) is gated on
  `usePrefersReducedMotion`; under reduced motion the figure renders its final state immediately,
  conveying 100% of the information with no transitional motion (constitution replica-craft
  condition c: depth is static; motion, if any, is progressive enhancement only).
- No scroll-driven, parallax, or decorative motion anywhere (sitewide ban holds; the
  scripted-demonstrations exception is not invoked because there is no player).

## Keyboard (US2.2)

- The page's only interactive controls are the reused site chrome (section rail, command
  palette, in-page links) and any source links inside figures — all native, reachable in logical
  order, with a visible focus indicator; no traps, no pointer-only interaction.
- If a figure has any interactive affordance, it is a native `<a>`/`<button>` and keyboard
  operable; none is required to understand the figure.

## Contrast & focus inside `.replicaFrame`

- Recreated shells carry product-authentic depth but MUST hold WCAG AA text contrast and keep
  focus indicators visible on any control (constitution replica-craft conditions b–c). Depth is
  never a substitute for a contrast-passing foreground.

## No-JS (FR-019a, SC-008)

- With scripting unavailable, the full narrative (prose, meta block, milestone timeline) and a
  representative static state for every figure remain present. Any animated figure shows its
  final static state (server-rendered); a `<noscript>` note is unnecessary for purely static
  figures and, where used, carries the `staticDescription`.

## Verification (manual passes, per quickstart)

1. Keyboard-only traversal of the whole page — logical order, visible focus, no trap.
2. Screen-reader pass — both headline numbers, the before/after contrast, and the three risk
   tiers are announced from text, not inferred from layout.
3. Reduced-motion pass — enable OS reduced motion; confirm no figure animates and no information
   is lost versus the animated variant.
4. axe scan on `/work/app-shell` — zero violations (CI, D13).
