# Research: Presentation deck (feature 008)

Decisions are numbered D1–D15 and cited from plan.md, data-model.md, and the contracts.

## D1 — Secret model: build-time env segment, not middleware or auth

**Decision**: `/deck/<secret>/…` where `<secret>` is read from `process.env.DECK_SLUG` inside
`generateStaticParams` (via `src/lib/deckSlug.ts`), so the whole deck is prerendered like every
other route. `dynamicParams = false` makes any other secret a 404.

**Rejected**: (a) `middleware.ts` checking a token — adds an Edge function to a fully static site
and a new runtime surface; (b) HTTP basic auth or Vercel Deployment Protection — a login wall
changes the "open the link and present" flow and Deployment Protection would gate the whole site;
(c) hash-based routing — slides would not have distinct server-rendered URLs, failing FR-004 and
no-JS.

**Consequence**: the secret's only appearances are the rendered deck HTML's own `href`s (they
*are* the URL) and Vercel's private build log (prerendered path list). See D2.

## D2 — Fallbacks and exposure surfaces

**Decision**: `getDeckSlug()` validates against `^[a-z0-9]+(?:-[a-z0-9]+)*$` and falls back to
`dev` when unset or invalid, so a fresh clone builds. CI sets `DECK_SLUG=ci` on the build steps
so Lighthouse/axe URLs in committed config are `http://localhost:3000/deck/ci/…` — no real value
in the repo or in CI logs. Vercel production and preview use the same real value (user decision).

**Accepted exposure**: Vercel build logs list prerendered paths; Vercel Analytics records
pathnames. Both are private to the project. Optional later hardening: an Analytics `beforeSend`
redaction; out of scope.

**Hygiene rule** (contracts/routes.md): the slug never appears in `<title>`, metadata, JSON-LD,
analytics event names, `robots.ts`, `sitemap.ts`, `palette.ts`, `LeftRail`, or any committed file.

## D3 — Intermediate routes redirect to first slides

**Decision**: `/deck/<secret>` and `/deck/<secret>/<section>` are statically generated pages that
call `redirect()` to the deck's / section's first slide, derived from content so they never drift.

**Rejected**: 404 on the intermediate levels (unfriendly when a presenter trims the URL);
`redirects()` in `next.config.mjs` (hardcodes the first slide and publishes the pattern).

**Fallback** if a static `redirect()` misbehaves under `next start`: render a static `<ol>` of
section/slide links instead (also a useful no-JS table of contents).

## D4 — Chrome-less layout under the root

**Verified**: `BackgroundFX`, `LeftRail`, `TopBar`, `Footer`, `CommandPalette`, and `ClickTracker`
are mounted in `src/app/(main)/layout.tsx` and again in `src/app/work/[slug]/layout.tsx`, not in
the root layout. The root contributes `globals.css`, the three `next/font` variables, `HeadComment`,
`JsonLd`, analytics (when `VERCEL`), default metadata (`robots: index true`, home OG) and viewport.

**Decision**: `src/app/deck/layout.tsx` renders `<main>` only and overrides metadata with
`robots: { index:false, follow:false, noarchive, nosnippet, noimageindex }`, `openGraph: null`,
`twitter: null`, `title: { absolute: "Deck" }`. No ⌘K listener exists on the deck because
`CommandPalette` is not mounted.

## D5 — Client shell lives in the `[secret]` layout

**Decision**: `DeckShell` (client) is rendered by `src/app/deck/[secret]/layout.tsx`, so it
persists across slide navigations (only the page subtree swaps). It derives the current section
and slide from `useSelectedLayoutSegments()` (returns `[section, slide]` below that layout) and
receives a serializable `DeckOutline` from the server.

## D6 — Stage scaling: parser-blocking inline script sets `--deck-scale`

**Decision**: `Stage.tsx` emits, as its first child, a tiny ES5 inline script (with the repo's
`biome-ignore lint/security/noDangerouslySetInnerHtml` precedent from `HeadComment.tsx`) that
adds `deck-js` to `<html>` and sets `--deck-scale = min(clientWidth/1920, innerHeight/1080)`,
re-running on `resize`. The frame is `position:absolute; left:50%; top:50%; width:1920px;
height:1080px; transform: translate(-50%,-50%) scale(var(--deck-scale))`.

**Rejected**: CSS-only (`cqw`, unitless `calc` division, `zoom`) — below the Safari 15.4 /
Firefox 102 browserslist floor; a React `ResizeObserver` effect alone — paints one unscaled frame
before hydration (CLS). No CSP exists, so the inline script does not affect Best Practices.

**No-JS**: without `html.deck-js` the frame is `width: min(100%, 1920px); height: auto;
transform: none` and the page scrolls as a normal document (FR-012).

## D7 — Transform side effects, accepted and mitigated

- **Programmatic scroll leak**: an `overflow: hidden` viewport is still a scroll container, so
  focusing a control laid out beyond the visible area can nudge it. Mitigation: `overflow: hidden;
  overflow: clip;` cascade plus a `scroll` listener that resets the viewport's `scrollTop/Left`.
- **Focus rings** scale with the frame. `.frame :focus-visible { outline-width: 3px }` and the
  same for `.replicaFrame` controls inside the stage.
- **Viewport media queries inside replicas** (`SettingsPanel` 720px, `CampaignEditor` 820px,
  `OptionsExplored` 720/480px, `ContextStrip`/`RiskTiers` 640px) key on the real viewport, so on
  phones replicas switch to stacked layouts inside the 1920 frame. Accepted (phones must not
  break, not look designed); replica CSS is not edited.
- `position: absolute` menus, toasts, and `container-type: inline-size` all use layout
  coordinates and behave under transform. Nothing in the reused set uses `position: fixed` or
  `getBoundingClientRect` (`GlossaryChip`, `TextExpansionButtons`, `Player` are excluded).

## D8 — Slide transition: CSS fade, not React ViewTransition

**Decision**: `DeckSlideFrame` keys its wrapper on `pathname + nonce` and applies a 160ms
opacity-only `@keyframes`, removed under `prefers-reduced-motion: reduce`. React 19.0.0 exports
no `ViewTransition`; Next's `experimental.viewTransition` is unused. Constitution v1.3.0 permits
an opacity-only ≤200ms fade.

## D9 — Keyboard focus guard

**Decision**: one window `keydown` listener in the bubble phase (React handlers on replicas run
first). Bail on `defaultPrevented`, `metaKey`, `ctrlKey`, `altKey`, `isComposing`. Then, if the
target is inside `input, select, textarea, [contenteditable]:not([contenteditable="false"]),
[role="listbox"], [role="slider"], [role="tablist"], [role="radiogroup"], [data-deck-keys="local"]`,
arrows / Space / R / Esc yield; **PageUp / PageDown / Home / End stay deck-wide** (user decision).
Space / Shift+Space also yield when the target is a `button, a, summary, [role="button"],
[role="tab"], [role="radio"], [role="option"]` so activation is not doubled. `defaultPrevented` is
the primary guard (Dropdown, Tabs, ContentLanguagePicker prevent default on the arrows they own);
the selector covers native controls that consume arrows without preventing default.

`data-deck-keys="local"` marks `DeckStepper` and the email-flow wrapper, which handle ←/→.

## D10 — Reset: clear the store, then remount

**Decision**: add `resetOrgSettings()` to `orgSettingsStore.ts` (sets `current = null`, notifies).
`useDeckReset` provides `{ nonce, reset }`; `reset` calls `resetOrgSettings()` **before**
bumping the nonce so a freshly mounted personal panel's `useSyncExternalStore` snapshot is
`null`. `DeckSlideFrame` remounts the slide subtree by key, discarding every `useState` in
embedded components (steppers' `step`, `AccordionExample`'s `count`, `SettingsPanel` drafts /
overrides / toast timers, `EmailTranslationFlow`'s `step`). A `pathname` effect also calls
`resetOrgSettings()` so arriving at a slide is always clean (FR-022). The R key and the button
call the same `reset`.

## D11 — Embed registry and copy-vs-import

**Decision**: `DeckEmbedId = Extract<DemoId, …> | Extract<FigureId, …> | DeckOnlyEmbedId`, so a
rename in `studies/types.ts` is a `tsc` error in the deck, and `EMBEDS: Record<DeckEmbedId,
ComponentType>` enforces completeness.

- **Import as-is**: `ContextStrip`, `AccordionExample`, `OptionsExplored`, `RiskTiers`,
  `ShellAfterScreen`, `LanguageBreakDemo` (no `annotationLinks`), `SettingsPanel`,
  `EmailTranslationFlow`, `MilestoneTimeline`, `usePrefersReducedMotion`, `orgSettingsStore`.
- **Additive exports in `/work` files**: `SHELL_BEFORE_SLIDES`, `DESIGN_HANDOFF_SLIDES`,
  `resetOrgSettings`, `EmailTranslationFlow`'s `arrowKeys?: boolean` (default `false`).
- **Copy into the deck**: `ImageStepper` → `DeckStepper` (stage-aware `sizes`, ←/→,
  `data-deck-keys`, larger controls); `useEscape` (keep `src/lib/keyboard.ts` and its ⌘K code
  out of the deck graph); `renderRun`, `.srOnly`, `.callout*` from `StudyPage`.
- **Not used**: `Player` (feature-flagged off; the cascade composes `SettingsPanel` directly),
  `stepReducer` (copy the two default strings), `GlossaryChip`, `TextExpansionButtons`.

Bundle isolation: deck code is imported only from `src/app/deck/**`, `src/components/deck/**`,
`src/content/deck/**`, so the `(main)` client graph gains nothing. Shared modules between `/work`
and `/deck` may cause webpack to repartition chunks (hash changes), but the `/work` module set is
unchanged.

## D12 — `next/image` `sizes` under a scaled stage

**Decision**: an image occupying fraction `f` of the 1920 frame is displayed at `f × min(100vw,
177.78vh)` CSS pixels, so `DeckImage`/`DeckStepper` emit
`sizes="(min-aspect-ratio: 16/9) ${f*177.8}vh, ${f*100}vw"`. `priority` only on the first image
of a slide that is the LCP. `ShellAfterScreen` keeps its own `sizes`; if it drags `outcome`
below 90, render the asset via `DeckImage` instead.

## D13 — Gates wiring

- `lighthouserc.desktop.json`: +5 URLs under `/deck/ci/` (cover, the-cascade, translation-flow,
  baseline, outcome) and a third `assertMatrix` band `^http://localhost:3000/deck/` at perf 0.9 /
  a11y 0.95 / bp 0.95 / seo off.
- `lighthouserc.mobile.json`: no deck URLs (v1.3.0 mobile exemption).
- `scripts/axe-check.mjs`: same five + `app-shell/overview` (a Transition slide).
- `.github/workflows/quality.yml`: `DECK_SLUG: ci` on both `npm run build` steps.

## D14 — Discoverability: never name the path

**Decision**: noindex/nofollow (+ noarchive/nosnippet/noimageindex) at the deck layout; OG and
Twitter set to `null` so a pasted link renders no card; absent from `sitemap.ts`, `palette.ts`,
`LeftRail`, and every nav. **No `robots.txt` Disallow** — a Disallow line is a public list of
hidden paths. `robots.ts` and `sitemap.ts` are verified-unchanged touchpoints.

## D15 — Phones: scale only

**Decision**: the stage scales to fit any viewport; no responsive slide layouts. Acceptance is
"no horizontal scroll, navigator tappable, replicas intact but small" (US5). Mobile Lighthouse is
exempt per v1.3.0.
