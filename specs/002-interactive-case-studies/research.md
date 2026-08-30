# Phase 0 Research: Interactive Case Studies

**Feature**: 002-interactive-case-studies | **Date**: 2026-08-29
**Input**: [spec.md](./spec.md), constitution v1.2.0, repo reconnaissance (CI configs,
route structure, content modules), Ascent guideline capture (2026-08-29), Jason's
free-to-paid PRDs (private storage — location in research notes below)

All Technical Context unknowns resolved. Sixteen decisions.

## D1 — Route placement: dedicated route group outside `(main)`

**Decision**: Case studies live at `src/app/work/[slug]/page.tsx` — a sibling of the
`(main)` route group, NOT inside it. The work route gets its own minimal `layout.tsx`
(skip link, small wordmark link home, footer line) instead of inheriting TopBar,
LeftRail, CommandPalette, Footer, and BackgroundFX.

**Rationale**: (a) FR-012/SC-004 demand zero added script on the three core pages —
keeping every case-study import outside `(main)` makes that guarantee structural
rather than hopeful; (b) the study page doesn't want the palette/left-rail chrome
(they must not link to studies anyway — FR-002); (c) an unlisted page shared with a
recruiter should read as a focused artifact, not a fourth site section.

**Alternatives considered**: Inside `(main)` for chrome reuse — rejected: couples the
study bundle to the shared layout chunk and violates the spirit of soft-unlisting.
A separate Next.js app — absurd overhead for the same repo.

## D2 — SSG + unknown slugs

**Decision**: `generateStaticParams()` returns slugs from the study registry;
`export const dynamicParams = false` so unknown slugs render the site's standard
404 (FR-004). The site remains fully static — no ISR, no runtime data.

**Rationale**: Matches the 001 SSG posture; `dynamicParams=false` is the one-line
guarantee for FR-004.

## D3 — Noindex without touching global robots

**Decision**: `metadata.robots = { index: false, follow: false }` emitted by the
study page's `generateMetadata`, derived from the study's `listed` flag (noindex
whenever unlisted) — making `listed` the single flip point FR-003 requires —
overriding the root layout's `robots: { index: true, follow: true }`.
`src/app/robots.ts` stays permissive (no `Disallow: /work`) — a Disallow line would
*advertise* the path in a public file while also preventing crawlers from ever seeing
the noindex directive.

**Rationale**: noindex-via-metadata is the correct soft-unlist mechanism: crawlable,
explicitly not indexable, invisible in robots.txt. Sitemap already excludes it (D4).

**Alternatives considered**: robots.txt Disallow — rejected (leaks the path,
suppresses noindex discovery). X-Robots-Tag header — needs middleware/headers config;
redundant with metadata.

## D4 — Sitemap and navigation exclusion are no-ops by design

**Decision**: `src/app/sitemap.ts` is an explicit allowlist of the four pages — no
change needed; the task list documents WHY it must not gain a work entry.
`src/content/palette.ts` (command palette) similarly gains no study entries.
LeftRail reads sections of `(main)` pages only — untouched.

**Rationale**: The five CI touchpoints from the program plan are each accounted for:
lighthouserc.desktop.json + lighthouserc.mobile.json + scripts/axe-check.mjs gain the
study URL (D14); sitemap.ts + palette.ts are verified-unchanged touchpoints.

## D5 — Rendering model: server-render the static state, hydrate the demos

**Decision**: The study page is a server component tree. Interactive demos and the
player are client components imported normally (bundled into the work route's chunk —
which only /work loads), server-rendered to their initial/representative state at
build time, hydrated in the browser. NOT `next/dynamic` with `ssr: false`.

TBT guard: run the mobile Lighthouse config against a skeleton study early in
implementation (player + one replica screen + two demos) — hydrating five demos
plus the player under Lighthouse's 4× CPU throttle is the live risk to the 95
bar. If TBT threatens it, the sanctioned lever is rendering only the active
walkthrough segment's replica screen (others mount on segment entry) —
plan-compatible, no contract change.

**Rationale**: Build-time HTML of the initial state gives FR-013's no-JS static
fallback for free, guarantees CLS 0 (no client-side layout pop-in), and keeps LCP
fast. Route-level code splitting already isolates the JS to /work routes — `ssr:
false` would only *remove* the static fallback. `<noscript>` notes accompany each
demo region ("interactive version requires JavaScript").

## D6 — Walkthrough script DSL

**Decision**: Study content is TypeScript modules under `src/content/studies/<slug>/`.
A study exports `CaseStudy` whose `blocks` is a discriminated union:
`ProseSection | ConceptDemoBlock | WalkthroughSegment` — glossary terms bind
inline inside prose RichText nodes (FR-015), not as a block type. Each
`WalkthroughStep` carries `{ target, action, highlight, caption, narrationText,
durationMs }`. `target` values are stable replica anchor ids; replica components
expose them as `data-anchor` attributes; a type-level registry of valid anchor ids
per replica screen keeps `target` typos a compile error, not a runtime mystery.

**Rationale**: TS modules = type-checked content (`tsc --noEmit` is already a gate),
zero runtime parsing, and the compile-time anchor check enforces SC-006's
data/player separation mechanically.

**Alternatives considered**: JSON/YAML + schema — loses compile-time anchor
validation and adds a parser; MDX — heavier machinery than three content types need.

## D7 — Replica kit

**Decision**: `src/components/work/replica/` — purpose-built CSS Modules components
over native HTML elements (`<select>`, `<input>`, `<button>`, `<table>`): SidebarNav,
SettingsPanel, PreviewCard, EmailEditor, TranslateModal (an overlay of the email-editor screen), Toast
(visual only — announced via the player live region per contracts/accessibility.md), Tabs,
FieldRow. Styling is flat per FR-013a: hairline borders, elevated background tones,
no shadows/gradients. Fictional-brand design tokens live in one
`replica-tokens.css` scoped under a `.replicaFrame` class so replica styling can
never leak into site chrome. Working fictional names (Jason may rename at design
review): platform **"Meridian"**, customer **"Cascara Coffee Co."**

**Rationale**: Native elements are the shortest path through axe + the manual
keyboard/VoiceOver gates; CSS Modules matches the repo; the scoped token sheet keeps
Principle V network coherence intact outside the frame.

**Alternatives considered**: shadcn/Radix — rejected earlier in planning: shadcn
requires Tailwind (absent here), and replicas need product-flavored styling anyway.
A single headless primitive remains the sanctioned escape hatch if a control ever
exceeds native semantics — none is anticipated.

## D8 — Reduced-motion implementation

**Decision**: The player uses a local `usePrefersReducedMotion` hook inside
`src/components/work/` — a deliberate five-line duplicate of the
`src/lib/motion.ts` hook, because importing a module shared with `(main)`'s
client graph could cause the bundler to re-partition shared chunks and muddy
SC-004's isolation diff. Behavior when
reduced, step transitions apply instantly (no transitional CSS), pacing becomes
fully manual (no auto-advance timers), captions render identically. Concept demos
are direct-manipulation with instant state changes by design (FR-010b), so reduced
motion changes nothing for them; any incidental CSS transitions sit behind
`@media (prefers-reduced-motion: no-preference)`.

## D9 — Mobile-fit variants (FR-012a)

**Decision**: Media queries, not container queries — the repo's browserslist
includes Safari 15.4, and container queries need Safari 16. Concept demos get
phone-first layouts (stacked controls, full-width bars). The walkthrough player on
narrow screens renders the step's focus region: each step declares an optional
`focusRegion` (a replica anchor); the mobile player shows that region's subtree
framed, with the caption below, instead of shrinking the whole desktop screen.
Desktop shows the full replica. The page never scrolls horizontally.

**Alternatives considered**: scale-transform the desktop replica — rejected
(illegible, tap targets shrink below 44px, reads as a screenshot).

## D10 — Live locale formatting

**Decision**: The formatting demo calls `Intl.NumberFormat` directly in the browser
across the demo locales (en-US, de-DE, fr-FR, fr-CA, it-CH, cs-CZ, tr-TR, ja-JP,
ko-KR, pl-PL, ar-KW). At mount, `Intl.NumberFormat.supportedLocalesOf()` filters the
list; an unsupported locale row renders the spec's stated fallback ("this browser
can't format <locale>") instead of wrong output (spec edge case).

CLS-safe rendering: each row's initial value is a precomputed constant for its
own locale (a truthful no-JS table); SSR and the first client render show
exactly those constants; live `Intl` output replaces them only inside
`useEffect`, never during render; and the table reserves fixed row heights,
stable column widths, and `tabular-nums` so the swap cannot shift layout.

Pinned facts vs live output: `facts.ts` pins linguistic claims ("it-CH groups
with an apostrophe" — U+2019, not ASCII '), never exact glyph strings, and live
output is never string-compared against constants — ICU group separators differ
across browser generations (U+00A0 vs U+202F). ar-KW renders in its default
digit system inside `<bdi>`; its caption states the three-decimal rule rather
than asserting exact glyphs.

**Rationale**: Evergreen browsers ship full ICU; the guard costs three lines and
honors the no-wrong-output-presented-as-truth edge case. It is also the exact API
Jason's published guideline names — authenticity is the point.

## D11 — Demo accessibility pattern

**Decision**: Every concept demo is a labeled `<section>` with: native controls;
outcomes mirrored to a visually-rendered result line that doubles as an
`aria-live="polite"` region (truncation meaning-change moment, locale reformat
results); the truncation tooltip implemented as a focusable trigger with
`aria-describedby` (hover + focus + tap); no keyboard traps. The player is one
`role="group"` with labeled Prev/Next/Play/Pause/Stop buttons, `aria-live` step
captions, and arrow-key support that never captures Tab.

## D12 — Listen-mode readiness without dead UI

**Decision**: `narrationText` is a required step field now; the player renders a
"Transcript" disclosure showing the current step's narration text. No audio element,
no listen button, no player mode switch ships (FR-011). When cortex narration lands,
audio arrives as committed static MP3s addressed by step id — the schema needs no
change.

## D13 — Glossary chips

**Decision**: Inline `GlossaryTerm` rendered as a button that toggles an inline
definition disclosure (native disclosure pattern, `aria-expanded`). Definitions
render in place — no tooltip-only pattern (fails on touch), no modal.

## D14 — CI touchpoint changes

**Decision**: Add `http://localhost:3000/work/internationalization` to the URL
arrays in `lighthouserc.desktop.json`, `lighthouserc.mobile.json`, and
`scripts/axe-check.mjs` (constitution: unlisted routes are shipped pages for every
gate). The Lighthouse configs move from the flat `assertions` block to
`assertMatrix`: core pages keep all four categories ≥0.95 unchanged; `/work/`
URLs assert Performance/Accessibility/Best-Practices ≥0.95 and SEO at the
maximum achievable under the deliberate-noindex crawlability deduction — the
single permitted SEO deduction (constitution v1.2.1 gates note). Adding a
study means adding its URL to all three files — a per-study CI touchpoint the
authoring contract lists. Slug decision: `internationalization` — self-describing in a shared URL,
no jargon collision. sitemap.ts and palette.ts: verified unchanged (D4).

## D15 — SC-004 verification method (core pages untouched)

**Decision**: Diff the three core pages' file lists in
`.next/app-build-manifest.json` pre/post feature: no file referenced by a core
page may contain work-route modules, and per-page totals stay unchanged at
route-table precision (the webpack runtime-chunk hash is exempt — it changes on
any build-graph change). Recorded
in the PR description alongside the Lighthouse scores (matching the constitution's
score-recording practice).

## D16 — Share metadata for unlisted pages

**Decision**: Study routes get title/description written safe-for-preview (spec edge
case) and an OG image via the existing `/api/og` endpoint, extended to accept
study pages (today it is a closed enum of the four core pages, falling back to
the Home card for unknown values). noindex and OG
coexist fine — link previews in DMs/Slack are exactly how an unlisted study gets
shared.

## Source-material provenance (research notes)

- Public: Ascent guideline pages (text expansion, formatting, cultural elements),
  captured 2026-08-29 — facts embedded in spec FR-016..FR-019. Word-order page is
  password-protected; its demo content sources from Jason's deck.
- Private (NEVER committed here): Jason's presentation deck and PRDs, Proton Drive
  `Portfolio/Klaviyo/Free to Paid/` and his i18n case-study deck; enriched star
  stories in the private cortex repo mirror the key facts.
- Impact figures: all figures already published in Jason's articles (FR-023);
  verify each against its article during implementation.
