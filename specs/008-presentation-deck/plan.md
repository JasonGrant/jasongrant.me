# Implementation Plan: Presentation deck (secret slideshow of the case studies)

**Branch**: `008-presentation-deck` | **Date**: 2026-09-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-presentation-deck/spec.md`

## Summary

Ship one unlisted, unguessable slideshow at `/deck/<secret>/<section>/<slide>` that presents the
intro and the two shipped case studies in a leadership cut, under a new constitution v1.3.0 deck
exception. The secret segment is read from `DECK_SLUG` at build time inside `generateStaticParams`
so the site stays fully static; local dev falls back to `dev`, CI builds with `ci`. Slides are
authored in a new typed deck content module (`src/content/deck/`) that references the studies'
existing figure and demo components by id — `SettingsPanel`, `EmailTranslationFlow`,
`LanguageBreakDemo`, the app-shell figure kit, the milestone timeline — with deck-authored
headlines and copy. The `/work` study modules and pages are untouched.

Technical approach (research.md D1–D15): a chrome-less `src/app/deck/` route tree; a client
`DeckShell` mounted in the `[secret]` layout so navigator state, keyboard handling, and the reset
nonce persist across slide navigations; a fixed 1920×1080 stage scaled by a parser-blocking inline
script that sets `--deck-scale` before first paint (CLS 0) and degrades to an unscaled flowing
document without JS; two slide templates (`TransitionSlide`, `ContentSlide` with five layouts); a
bottom navigator (`<nav>`, progress rule, hover/focus/toggle disclosure, two levels); a window
`keydown` hook with a focus guard; and reset implemented as `resetOrgSettings()` on the existing
module store plus a keyed remount of the slide subtree. CI gains a `/deck/` desktop Lighthouse
band and axe URLs under the `ci` slug; the mobile config gains nothing; `robots.ts`, `sitemap.ts`,
`palette.ts`, and the site chrome are verified unchanged.

## Technical Context

**Language/Version**: TypeScript 5.8 (strict), React 19.0, Next.js 15.3 App Router
**Primary Dependencies (added)**: none — the no-new-runtime-dependencies default holds
**Primary Dependencies (kept)**: `next`, `react`, `react-dom`, `classnames`, `react-icons`,
  `sharp`, `@vercel/analytics`, `@vercel/speed-insights`
**Storage**: N/A — one typed content module under `src/content/deck/`; the only runtime state is
  per-slide component state plus the existing `orgSettingsStore` module singleton; no fetching
**Testing**: No functional test suites (Principle III). Gates: `tsc --noEmit`, Biome, Lighthouse
  desktop (Perf ≥90 / A11y ≥95 / BP ≥95 / SEO off) on representative deck URLs under the `ci`
  slug, axe zero violations, manual keyboard / screen-reader / reduced-motion / no-JS / phone
  passes, build-manifest comparison for core-page and `/work` isolation (SC-004), secret-hygiene
  search (SC-003)
**Target Platform**: Evergreen browsers per repo browserslist (Chrome 105+, Safari 15.4+,
  Firefox 102+); Vercel static hosting; desktop-first presentation surface
**Project Type**: Web (Next.js App Router, single project, fully SSG; zero new network egress)
**Performance Goals**: Lighthouse desktop Performance ≥90, Accessibility ≥95, Best Practices ≥95
  on deck URLs; SEO off by the deliberate noindex; CLS = 0 via first-paint scaling; core pages and
  `/work` routes byte-identical in module set
**Constraints**: WCAG 2.1 AA; constitution v1.3.0 presentation-stage exception (grid inside the
  stage only, opacity-only ≤200ms fade suppressed under reduced motion), replica-craft exception
  (depth only inside `.replicaFrame`), unlisted-deck exception (noindex, no sitemap, **no robots
  Disallow**, secret never committed); no site chrome; no ⌘K; no new deps; Safari 15.4 floor (no
  `cqw`, no `overflow: clip` without fallback, no unitless `calc` division)
**Scale/Scope**: 1 new route tree (`/deck/[secret]/[section]/[slide]` + two redirect levels);
  24 static slides at ship; 1 new content DSL + module (4 section files); ~14 new components under
  `src/components/deck/`; 4 additive edits to `/work` files; CI: +5 desktop Lighthouse URLs, +1
  assertion band, +6 axe URLs, +1 workflow env var; constitution v1.3.0

## Constitution Check

*GATE: evaluated against `.specify/memory/constitution.md` v1.3.0 (amended in this feature).*

| Principle | Status | Evidence |
|---|---|---|
| **I. WCAG 2.1 AA (NON-NEGOTIABLE)** | PASS | contracts/accessibility.md: each slide is a labeled region with one `<h1>`; slide changes move focus and announce the title; navigator is a `<nav>` landmark with `aria-current`; keyboard table with a focus guard so replica controls keep native semantics; focus rings widened to survive stage scale; every slide carries a `staticDescription`; axe CI extended to deck URLs (D13). |
| **II. Performance Budget (NON-NEGOTIABLE)** | PASS | v1.3.0 deck exception: desktop profile only at Perf ≥0.90 / A11y ≥0.95 / BP ≥0.95 / SEO off; CLS 0 via the parser-blocking scale script (D6); `next/image` `sizes` derived from stage fraction so steppers request displayed width (D12); zero JS added to core pages and `/work` (D11, SC-004); no new dependencies. |
| **III. Verification Without Functional Tests** | PASS | No test framework added. `DeckEmbedId` is `Extract<>`ed from the study unions and the embed registry is `Record<DeckEmbedId, ComponentType>`, so completeness is a `tsc` check; `assertDeck` runs at import (data-model.md §5); gates enumerated in quickstart.md. |
| **IV. Design-Engineer Craft** | PASS | v1.3.0 presentation-stage exception governs the fixed frame and grid layouts inside it (D6/D7); stage chrome stays flat (hairline navigator, no shadows); replica depth stays inside `.replicaFrame`; opacity-only ≤160ms fade off under reduced motion (D8); nothing animates on load or scroll; three-voice type system and tokens reused. |
| **V. Content Discipline & Network Coherence** | PASS | v1.3.0 unlisted-deck exception: noindex/nofollow + OG/Twitter null (D14), absent from sitemap/palette/nav/rail, **not** named in robots (D14), secret from env never committed with CI placeholder (D1/D2), every slide reuses material already permitted on `/work` (spec Assumptions). Three-page IA untouched. |
| **Stack & Delivery Constraints** | PASS | No framework change; no new dependencies; CSS Modules + tokens; fonts untouched; deck code is view-source quality and documents the secret model in comments. |
| **Workflow & Quality Gates** | PASS | All gates honored per v1.3.0 (deck: gate 4 desktop-only); quickstart.md is the per-PR checklist; Lighthouse scores, axe result, manifest diff, and secret-hygiene note recorded in the PR. |

**Initial Constitution Check: PASS** — the constitution amendment (v1.3.0) is part of this
feature; with it in force, no violations and no Complexity Tracking entries.

**Post-Design Constitution Check (after Phase 1): PASS.** The design artifacts introduce nothing
beyond the checked surface:

- Contract surface adds one route tree and zero endpoints; the two intermediate levels are static
  redirects to content-derived first slides (contracts/routes.md).
- The data model is compile-time TypeScript plus one import-time assertion; runtime state is
  per-slide and discardable, plus the pre-existing org-settings singleton, which gains a reset.
- Shared-surface edits are strictly additive (`resetOrgSettings`, two exported slide arrays, one
  optional prop defaulting to current behavior).
- Accessibility contract keeps every slide perceivable without pointer, motion, or script.
- CI touchpoints: desktop Lighthouse config (+URLs, +band), axe script (+URLs), workflow env;
  mobile config, `robots.ts`, `sitemap.ts`, `palette.ts`, `LeftRail` verified unchanged.

## Project Structure

### Documentation (this feature)

```text
specs/008-presentation-deck/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 — 15 decisions (secret model, stage scaling, keyboard guard, reset, gates)
├── data-model.md        # Phase 1 — deck DSL, outline derivation, embed registry, slide inventory, validation
├── quickstart.md        # Phase 1 — dev + gate checklist
├── contracts/
│   ├── routes.md                  # URL grammar, static params, redirects, metadata, env, CI, verified-unchanged
│   ├── deck-content.md            # authoring surface for slides and embeds
│   ├── accessibility.md           # keyboard table, focus, announcements, reduced motion, no-JS
│   └── navigator.md               # progress + disclosure states, prefetch policy
├── checklists/requirements.md     # Spec quality checklist
└── tasks.md             # Phase 2 — task list
```

### Source Code (repository root)

```text
src/
├── lib/
│   └── deckSlug.ts                        # NEW — getDeckSlug(): DECK_SLUG (validated) | "dev"; build-time only
├── app/
│   ├── (main)/…                           # UNTOUCHED
│   ├── work/…                             # UNTOUCHED
│   ├── robots.ts  sitemap.ts              # verified unchanged (no /deck mention — ever)
│   └── deck/
│       ├── layout.tsx                     # NEW — replica-tokens.css + deck-global.css; noindex + OG/twitter null; <main>; no chrome
│       ├── layout.module.css              # NEW
│       └── [secret]/
│           ├── layout.tsx                 # NEW — <DeckShell secret outline>
│           ├── page.tsx                   # NEW — static params [{secret}]; redirect → first slide
│           └── [section]/
│               ├── page.tsx               # NEW — static params; redirect → section's first slide
│               └── [slide]/
│                   └── page.tsx           # NEW — static params (secret×section×slide); generateMetadata; render slide
├── content/
│   ├── studies/…                          # UNTOUCHED (types imported type-only)
│   ├── palette.ts                         # verified unchanged
│   └── deck/
│       ├── types.ts                       # NEW — Deck/Section/Slide DSL, DeckEmbedId (Extract<> of study unions)
│       ├── index.ts                       # NEW — deck, assertDeck, getSlide, getOutline, INTERACTIVE_EMBEDS
│       ├── intro.ts                       # NEW — cover, career-strip, how-i-work
│       ├── internationalization.ts        # NEW — 11 slides
│       ├── app-shell.ts                   # NEW — 9 slides
│       └── close.ts                       # NEW — thanks
└── components/
    ├── chrome/…                           # UNTOUCHED (LeftRail SECTIONS_BY_PATH has no /deck)
    ├── work/
    │   ├── replica/orgSettingsStore.ts    # EDIT (additive) — resetOrgSettings()
    │   ├── replica/EmailTranslationFlow.tsx # EDIT (additive) — optional arrowKeys prop, default false
    │   ├── app-shell/ShellBeforeScreens.tsx   # EDIT (additive) — export SHELL_BEFORE_SLIDES
    │   ├── app-shell/DesignHandoffScreens.tsx # EDIT (additive) — export DESIGN_HANDOFF_SLIDES
    │   └── …                              # REUSED unchanged: SettingsPanel, LanguageBreakDemo, ContextStrip,
    │                                      #   AccordionExample, OptionsExplored, RiskTiers, ShellAfterScreen,
    │                                      #   Timeline (MilestoneTimeline), usePrefersReducedMotion
    └── deck/                              # NEW — everything below
        ├── DeckShell.tsx (+ .module.css)  #   client shell: keyboard, navigator, reset nonce, prefetch, focus
        ├── Stage.tsx (+ .module.css)      #   viewport + 1920×1080 frame + inline scale script
        ├── deck-global.css                #   html.deck-js mode rules; focus-ring widths
        ├── DeckSlideFrame.tsx             #   keyed remount + fade + focus target + live region
        ├── Navigator.tsx (+ .module.css)  #   progress rule + two-level disclosure
        ├── ResetButton.tsx                #   "Reset slide (R)"
        ├── useDeckKeyboard.ts             #   window keydown with focus guard
        ├── useDeckReset.ts                #   context { nonce, reset }
        ├── TransitionSlide.tsx            #   cover / divider / close
        ├── ContentSlide.tsx               #   layout switch
        ├── Slide.module.css               #   deck type scale, layouts, srOnly, callout
        ├── DeckText.tsx                   #   rich-text runs (copy of StudyPage.renderRun minus glossary)
        ├── SlideEmbed.tsx                 #   Record<DeckEmbedId, ComponentType> registry
        └── embeds/
            ├── CareerStrip.tsx (+ .module.css)
            ├── I18nTimeline.tsx
            ├── SettingsCascade.tsx (+ .module.css)
            ├── DeckStepper.tsx (+ .module.css)    # copy of ImageStepper: stage-aware sizes, ←/→, data-deck-keys
            ├── ShellBeforeDeck.tsx / DesignHandoffDeck.tsx
            ├── DeckImage.tsx                      # next/image with stage-fraction sizes
            └── EmailFlowDeck.tsx

lighthouserc.desktop.json              # +5 URLs under /deck/ci/, +1 assertMatrix band (^…/deck/)
lighthouserc.mobile.json               # verified unchanged (mobile exempt)
scripts/axe-check.mjs                  # +6 URLs under /deck/ci/
.github/workflows/quality.yml          # DECK_SLUG: ci on both build steps
.specify/memory/constitution.md        # v1.3.0
CLAUDE.md                              # SPECKIT block → 008
```

**Structure Decision**: A separate `src/app/deck/` route tree rather than a mode of `/work/[slug]`.
The deck needs different chrome (none), a different layout contract (fixed stage), different
metadata (no OG), and a secret path segment, none of which the study route should learn about.
Sharing happens one level down — the deck imports the same figure/demo components the study
renderer does — so the two surfaces stay independent while the recreated UI lives in one place.

## Complexity Tracking

No constitution violations to justify under v1.3.0. The one new abstraction — a deck content DSL
with its own embed registry — mirrors the study DSL's `DemoId`/`FigureId` registries and exists
so the deck can be authored as data while the `/work` renderer and content stay untouched.
