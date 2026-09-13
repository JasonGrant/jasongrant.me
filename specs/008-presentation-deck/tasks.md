# Tasks: Presentation deck (secret slideshow of the case studies)

**Input**: Design documents from `/specs/008-presentation-deck/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: None (constitution Principle III — no functional test suites). Verification tasks map
to the quickstart gates and the spec's success criteria instead.

**Organization**: Tasks grouped by user story. Setup carries the constitution amendment, the env
reader, the DSL, CI wiring, and the additive `/work` exports. Foundational builds the stage shell
every slide depends on. US1 (present) and US2 (demo + reset) are the MVP; US3/US4/US5 verify and
harden.

**Jason-gated tasks** (require Jason personally): T031 (VoiceOver pass), T036 (copy/craft
sign-off), T038 (set `DECK_SLUG` in Vercel).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: US1–US5 (Setup/Foundational/Polish carry no story label)

---

## Phase 1: Setup (constitution + env + DSL + CI + additive exports)

- [X] T001 Amend `.specify/memory/constitution.md` to v1.3.0: Sync Impact Report, Principle II deck band, Principle IV presentation-stage exception, Principle V unlisted-deck exception, gate note, version line; update `CLAUDE.md` SPECKIT block and `.specify/feature.json` (research D13/D14)
- [X] T002 [P] Create `src/lib/deckSlug.ts`: `getDeckSlug()` reading `DECK_SLUG`, validated `^[a-z0-9]+(?:-[a-z0-9]+)*$`, fallback `"dev"`; server-only comment (contracts/routes.md, research D1/D2)
- [X] T003 [P] Create `src/content/deck/types.ts` per data-model.md §1 (`DeckEmbedId` via `Extract<>` on `DemoId`/`FigureId`, templates, layouts, `DeckOutline`)
- [X] T004 Create `src/content/deck/index.ts`: `deck`, `assertDeck` (data-model.md §5), `INTERACTIVE_EMBEDS`, `getOutline`, `getSlide`, `FIRST_SLIDE`, `firstSlideOf`; register skeleton section modules (depends on T003)
- [X] T005 [P] Additive `/work` exports: `resetOrgSettings()` in `src/components/work/replica/orgSettingsStore.ts`; `export const SHELL_BEFORE_SLIDES` in `src/components/work/app-shell/ShellBeforeScreens.tsx`; `export const DESIGN_HANDOFF_SLIDES` in `DesignHandoffScreens.tsx`; optional `arrowKeys?: boolean` (default `false`) on `src/components/work/replica/EmailTranslationFlow.tsx` — no behavior change on `/work` (research D10/D11)
- [X] T006 [P] CI wiring: `lighthouserc.desktop.json` (+5 `/deck/ci/` URLs, +`^…/deck/` band), `scripts/axe-check.mjs` (+6 URLs), `.github/workflows/quality.yml` (`DECK_SLUG: ci` on both build steps); `lighthouserc.mobile.json` untouched (contracts/routes.md, research D13)

**Checkpoint**: `npx tsc --noEmit` passes with the skeleton deck; `/work` pages unchanged.

---

## Phase 2: Foundational (route tree + stage shell — blocks every slide)

- [X] T007 Route tree: `src/app/deck/layout.tsx` (+ `layout.module.css`; replica-tokens.css first, deck-global.css, noindex + OG/Twitter null, `<main>`), `src/app/deck/[secret]/layout.tsx` (`DeckShell`), `[secret]/page.tsx` and `[secret]/[section]/page.tsx` (static params + `redirect()`), `[secret]/[section]/[slide]/page.tsx` (static triples, `generateMetadata`, slide render) (contracts/routes.md, research D3/D4/D5)
- [X] T008 [P] `src/components/deck/Stage.tsx` (+ `.module.css`) and `deck-global.css`: viewport + 1920×1080 frame, inline scale script with `biome-ignore`, `html.deck-js` mode, no-JS unscaled fallback, `overflow: clip` fallback + scroll-reset, focus-ring widths (research D6/D7)
- [X] T009 [P] `src/components/deck/useDeckReset.ts` (context `{ nonce, reset }`; `resetOrgSettings()` before nonce bump) and `DeckSlideFrame.tsx` (keyed remount, 160ms opacity fade off under reduced motion, focus to `<article>`, polite live region) (research D8/D10)
- [X] T010 [P] `src/components/deck/useDeckKeyboard.ts`: window keydown, bubble phase, `defaultPrevented`/modifier/IME bail, `LOCAL_SELECTOR` guard with PageUp/PageDown/Home/End carve-out, Space-on-button guard, key map (contracts/accessibility.md, research D9)
- [X] T011 [P] `src/components/deck/Navigator.tsx` (+ `.module.css`): `<nav>`, progress rule, toggle button, two-level `<ol>` with `aria-current`, `:hover`/`:focus-within`/toggle expansion, Esc collapse, `prefetch={false}` links (contracts/navigator.md)
- [X] T012 `src/components/deck/DeckShell.tsx` (+ `.module.css`): composes Stage, Navigator, ResetButton, DeckSlideFrame; `useSelectedLayoutSegments`; neighbour `router.prefetch`; `router.push(href, { scroll: false })`; pathname effect calling `resetOrgSettings()` (depends on T008–T011)
- [X] T013 [P] `src/components/deck/ResetButton.tsx`: "Reset slide", `aria-keyshortcuts="R"`, rendered only when the current slide is resettable

**Checkpoint**: `/deck/dev/intro/cover` renders a placeholder slide inside a scaled stage; arrows navigate between skeleton slides; navigator expands; unknown secret 404s.

---

## Phase 3: User Story 1 — Present the deck end to end from the keyboard (P1) 🎯 MVP

**Goal**: All 24 slides authored and rendering in both templates and five layouts; keyboard traversal complete.

**Independent Test**: US1 acceptance scenarios 1–5 at 1440×900, 1280×720, 1920×1200.

- [X] T014 [P] [US1] `src/components/deck/Slide.module.css`: deck type scale (h1 88px, body 34px, meta 22px in design px), Transition + Content layouts (`statement`, `text-figure` 7fr/9fr grid, `figure`, `demo`, `numbers`), `.srOnly`, `.callout*` copied from `StudyPage.module.css`
- [X] T015 [P] [US1] `src/components/deck/DeckText.tsx`: `renderDeckText` (copy of `StudyPage.renderRun` minus `GlossaryChip`)
- [X] T016 [US1] `src/components/deck/TransitionSlide.tsx` and `ContentSlide.tsx`: `<article role="group" aria-roledescription="slide" aria-label tabIndex={-1}>`, one `<h1>`, hidden `staticDescription`, layout switch, `<noscript>` on demo layout (depends on T014/T015)
- [X] T017 [P] [US1] `src/components/deck/SlideEmbed.tsx`: `EMBEDS: Record<DeckEmbedId, ComponentType>` + hidden `<h2>` wrapper (data-model.md §3)
- [X] T018 [P] [US1] `src/components/deck/embeds/DeckImage.tsx` and `DeckStepper.tsx` (+ `.module.css`): copy of `ImageStepper` with stage-fraction `sizes`, ←/→ keys, `data-deck-keys="local"`, stage-sized controls; `ShellBeforeDeck.tsx` / `DesignHandoffDeck.tsx` wrappers (research D11/D12)
- [X] T019 [P] [US1] `src/components/deck/embeds/CareerStrip.tsx` (+ `.module.css`, static: Dassault → Vertex → Klaviyo → Hi Marley + Hypoth) and `I18nTimeline.tsx` (`MilestoneTimeline` over the i18n study's milestones)
- [X] T020 [P] [US1] `src/components/deck/embeds/SettingsCascade.tsx` (+ `.module.css`): two `SettingsPanel`s side by side with hidden `<h2>`s; `EmailFlowDeck.tsx` wrapper with `data-deck-keys="local"` + `arrowKeys` (research D10)
- [X] T021 [US1] Author `src/content/deck/intro.ts` (cover, career-strip, how-i-work) and `close.ts` (thanks with links to both `/work` pages) per the outline's intro beats and close (contracts/deck-content.md)
- [X] T022 [US1] Author `src/content/deck/internationalization.ts` (11 slides: overview, frame, the-bet-before-the-bet, audit-as-change-management, see-it-break, operating-model, team, sequencing, the-cascade, translation-flow, outcomes) with numbers and sources matching the study
- [X] T023 [US1] Author `src/content/deck/app-shell.ts` (9 slides: overview, frame, baseline, sequencing-as-risk-strategy, the-problem, explorations, enablement-decision, risk-management, outcome)
- [X] T024 [US1] Walk US1 scenarios 1–5 in the Browser pane at three viewport sizes; fix layout findings; confirm no slide clips

**Checkpoint**: full deck traversable by keyboard; every slide renders inside the stage.

---

## Phase 4: User Story 2 — Live demo + reset without reload (P1)

- [X] T025 [US2] Reset pass on `the-cascade`: save French in Organization → Personal inherits → R → both English, store null, no late toast; leave/return clean (SC-002)
- [ ] T026 [P] [US2] Reset pass on `translation-flow`, `baseline`, `enablement-decision`, `the-problem`, `see-it-break` via key and button; Reset control absent on static slides (FR-020)
- [X] T027 [US2] Focus-guard pass: from inside a Dropdown listbox, the language `<select>`, the ContentLanguagePicker input, a stepper, and the email flow — arrows/Space/R stay local, PageUp/PageDown/Home/End move slides (FR-018)

**Checkpoint**: every resettable slide resets by key and button; demos keep their own keys.

---

## Phase 5: User Story 3 — Unlisted, unguessable, isolated (P2)

- [X] T028 [P] [US3] Route checks per quickstart: 307s on intermediate levels, 404 on unknown segments, noindex meta, zero `og:` tags, sitemap/robots outputs unchanged (SC-003)
- [X] T029 [P] [US3] Secret hygiene: `git grep DECK_SLUG` shows identifiers only; `DECK_SLUG=ci npm run build` → only `ci` under `.next/server/app/deck`; plain build → only `dev` (SC-003)
- [ ] T030 [US3] Build isolation: diff `.next/app-build-manifest.json` pre/post — `/(main)/page` identical, `/work/[slug]/page` same module set; confirm `robots.ts`, `sitemap.ts`, `palette.ts`, `LeftRail.tsx`, and study content modules untouched (SC-004)

---

## Phase 6: User Story 4 — Equal access (P2)

- [ ] T031 [US4] VoiceOver pass: slide title on navigate, "Slide reset", navigator current-state *(Jason-gated)*; run `node scripts/axe-check.mjs` for zero violations on the six deck URLs (SC-006)
- [ ] T032 [P] [US4] Reduced-motion pass: no fade; embeds' reduced variants; nothing on load/scroll (FR-026)
- [X] T033 [P] [US4] No-JS pass: every slide unscaled and flowing, links work, `<noscript>` notes on demo slides (SC-007)
- [ ] T034 [US4] Scroll-leak and focus-ring pass at 1280 wide: Tab through `the-cascade`; viewport does not shift; rings visible on every control (research D7)

---

## Phase 7: User Story 5 — Phones do not break (P3)

- [X] T035 [US5] 375×667 and 390×844 pass on five representative slides: stage fits, no horizontal scroll, navigator and reset tappable (SC-008)

---

## Phase 8: Polish & cross-cutting gates

- [ ] T036 Copy and craft pass across all 24 slides *(Jason-gated: sign-off on the leadership-cut copy and numbers)*
- [ ] T037 Lighthouse desktop on the five deck URLs under `DECK_SLUG=ci`: Perf ≥90, A11y ≥95, BP ≥95, SEO off, CLS 0; fix or revert (SC-005)
- [ ] T038 After merge: set `DECK_SLUG` in Vercel Production + Preview and redeploy; open the real URL once *(Jason-gated)*
- [X] T039 Final gate sweep: `npx tsc --noEmit`, `npx biome check .`; record in the PR the desktop Lighthouse scores, axe result, manifest diff, secret-hygiene note, and screenshots at 1280×720 and 375×667 (quickstart.md)

---

## Dependencies & execution order

- **Setup (T001–T006)** → gates everything; T004 depends on T003.
- **Foundational (T007–T013)** → T012 depends on T008–T011.
- **US1 (T014–T024)** = MVP with US2. T016 depends on T014/T015; T021–T023 depend on T016–T020.
- **US2 (T025–T027)** after US1's demo slides exist.
- **US3 (T028–T030)**, **US4 (T031–T034)**, **US5 (T035)** verify after US1/US2; independent of each other.
- **Polish (T036–T039)** last; T038 after merge.

## Parallel opportunities

- Setup: T002, T003, T005, T006 in parallel.
- Foundational: T008–T011, T013 in parallel once T007's tree exists.
- US1: T014/T015/T017–T020 in parallel; content T021–T023 in parallel once components land.
