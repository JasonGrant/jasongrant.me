# Implementation Plan: App Shell Evolution at Hi Marley (case study)

**Branch**: `007-app-shell-case-study` | **Date**: 2026-09-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-app-shell-case-study/spec.md`

## Summary

Ship the second soft-unlisted case study at `/work/app-shell` — "App Shell Evolution at
Hi Marley" — on the existing `/work/[slug]` framework, under the same constitution v1.2.6
unlisted-case-studies and replica-craft exceptions the Internationalization study uses. The
study reuses the page scaffold, header/meta treatment, milestone timeline, section rail, site
chrome, `listed:false` noindex gating, sitemap omission, and OG pipeline unchanged. It adds
**no interactive walkthrough player and no interactive concept demos** (explicit non-goal);
instead it introduces one new, study-agnostic **figure block** and a small **recreated
app-shell UI kit** — before/after shell recreations plus two annotated layout diagrams that
carry the argument in numbers (nav footprint 10% → 2.5% collapsed / 8.5% expanded; details area
62% → 100%).

Technical approach (research.md D1–D14): extend the typed content DSL with a `figure`
`ContentBlock` and a `FIGURE_COMPONENTS` registry that mirrors the existing `embedDemo` /
`DEMO_COMPONENTS` precedent, so `StudyPage` gains exactly one new block branch and the i18n
study is untouched. Recreated screens are flat, server-rendered React components inside
`.replicaFrame` (replica-craft depth permitted on `/work/[slug]`); the two comparison diagrams
are schematic and stay under the sitewide flat bans. Figures are **static-first** — server
rendered to their final state — so no-JS readability (FR-019a/SC-008), CLS 0, and the reduced-motion
peer experience come for free; any figure animation is opt-in progressive enhancement gated on
`usePrefersReducedMotion`. All product UI is recreated with **fictional, sanitized data** — the
two source decks are Jason's proprietary internal materials and are **never committed to this
public repo**; they are referenced by location from research.md, and every proprietary string
(partner names, employee names, Jira/Confluence URLs, version numbers, internal team names) is
dropped or fictionalized (Hi Marley's own branding is permitted on the unlisted route). Every
headline number is Jason's own, owner-cleared figure, verified against the source decks
(PPTX slides 5–9). CI gains `/work/app-shell` in both Lighthouse configs and the axe script;
sitemap.ts and palette.ts are verified-unchanged touchpoints.

## Technical Context

**Language/Version**: TypeScript 5.8 (strict), React 19.0, Next.js 15.3 App Router
**Primary Dependencies (added)**: none — the no-new-runtime-dependencies default holds; native
  elements + CSS Modules cover every recreated control and diagram
**Primary Dependencies (kept)**: `next`, `react`, `react-dom`, `classnames`, `sharp`,
  `@vercel/analytics`, `@vercel/speed-insights`
**Storage**: N/A — one typed content module under `src/content/studies/app-shell/`; no database,
  no CMS, no runtime fetching
**Testing**: No functional test suites (Principle III). Gates: `tsc --noEmit`, Biome,
  Lighthouse (Perf ≥90 / A11y ≥95 / BP ≥95 / SEO off) mobile+desktop on the study route, axe
  zero violations, manual keyboard/screen-reader/reduced-motion passes, build-output comparison
  for core-page isolation (SC-005), figure-by-figure recreation audit (SC-006), line-by-line
  provenance pass against the source decks (SC-007)
**Target Platform**: Evergreen browsers per repo browserslist (Chrome 105+, Safari 15.4+,
  Firefox 102+); Vercel static hosting
**Project Type**: Web (Next.js App Router, single project, fully SSG; zero new network egress —
  every figure is static or client-only over no external data)
**Performance Goals**: Lighthouse Performance ≥90, Accessibility ≥95, Best Practices ≥95 on
  `/work/app-shell`, mobile + desktop (constitution v1.2.6 `/work/[slug]` band); SEO off by the
  deliberate noindex; CLS = 0; core pages and other `/work` routes byte-identical
**Constraints**: WCAG 2.1 AA; constitution v1.2.6 replica-craft exception (depth only inside
  `.replicaFrame`); breakout-demonstrations exception (figures break wider than the reading
  measure, prose holds ~640–720px); sitewide flat + motion bans everywhere else; soft-unlisted
  (no sitemap, noindex, no nav); no horizontal page scroll on mobile; no real screenshots, no
  proprietary source committed, fictional data only
**Scale/Scope**: 0 new route patterns (reuses `/work/[slug]`); +1 static page at ship; 1 new
  DSL block kind (`figure`) + registry; ~5–7 recreated/diagram figure components under a new
  `app-shell/` folder; 1 study content module; 0 new glossary terms required (optional);
  CI +1 URL in two Lighthouse configs and the axe script

## Constitution Check

*GATE: evaluated against `.specify/memory/constitution.md` v1.2.6.*

| Principle | Status | Evidence |
|---|---|---|
| **I. WCAG 2.1 AA (NON-NEGOTIABLE)** | PASS | contracts/accessibility.md: figures are static, server-rendered, and carry their meaning in text (headings, alt/description, captions) so the before/after contrast and both headline numbers are non-visual too (US2.3); any figure animation is reduced-motion-suppressed with no information loss (FR-019a); focus order and visible focus preserved; axe CI extended to the route (D13). |
| **II. Performance Budget (NON-NEGOTIABLE)** | PASS | Route already covered by both Lighthouse configs' `/work/` band — Perf ≥0.90, A11y/BP ≥0.95, SEO off (v1.2.6). CLS 0 via static server-rendered figures (D4). Zero JS added to core pages and other `/work` routes — the study is content-only plus a new figure folder, verified by build comparison (SC-005). No new dependencies, no new egress. |
| **III. Verification Without Functional Tests** | PASS | No test framework added. The DSL's typed `figure` id union is a compile-time check (`tsc --noEmit`); build-time registry assertions extend `assertStudy` (data-model.md). Gates enumerated in quickstart.md. |
| **IV. Design-Engineer Craft** | PASS | Replica-craft exception satisfied: product-authentic depth is scoped strictly inside `.replicaFrame` on this route (D5); the schematic comparison diagrams and all study chrome stay flat. No interactive player/demos ship (non-goal), so the scripted-demonstrations exception is not invoked; figures are static-first with animation as reduced-motion-safe progressive enhancement only (D6). Breakout-demonstrations exception governs the wide figure width (D7). Site chrome untouched. |
| **V. Content Discipline & Network Coherence** | PASS | Unlisted-case-studies exception satisfied: soft-unlisted (D2/D3: `listed:false` noindex, sitemap allowlist unchanged, no nav/palette links), fully gated (D13), recreated-content-only with fictional sanitized data (D8/D9; FR-017–018), Hi Marley branding permitted on the unlisted route, proprietary source decks never committed (D1). Every quantified outcome is an owner-cleared real figure verified against the source (D10; FR-020/SC-007). Three-page IA and other `/work` routes untouched. |
| **Stack & Delivery Constraints** | PASS | No framework change; no new dependencies; CSS Modules + tokens (permitted styling); fonts untouched; public-repo "view source" quality applies to the new figure kit. |
| **Workflow & Quality Gates** | PASS | All 8 gates + the unlisted-routes-are-shipped-pages clarification honored; quickstart.md is the per-PR checklist; Lighthouse scores + build-isolation table recorded in the PR. |

**Initial Constitution Check: PASS** — no violations, no Complexity Tracking entries needed.

**Post-Design Constitution Check (after Phase 1): PASS.** The design artifacts introduce
nothing beyond the checked surface:

- Contract surface adds zero routes and zero endpoints — it reuses `/work/[slug]` and the
  existing `/api/og?study=` pipeline (contracts/routes.md); the only new authoring surface is
  the `figure` block (contracts/figures.md).
- The data model is entirely compile-time TypeScript; figures are static server components with
  no runtime state to leak (any lightly-animated figure holds only local, discardable state).
- Adding the `figure` block as a generic kind + registry — rather than hardcoding app-shell ids
  into shared logic — keeps the framework study-agnostic and leaves the i18n study's types and
  rendering path untouched.
- Accessibility contract keeps every figure perceivable without color, motion, or pointer.
- CI touchpoints: two Lighthouse configs + axe script gain one URL each; sitemap.ts and
  palette.ts are verified-unchanged; the OG route is verified to render the new study slug.

## Project Structure

### Documentation (this feature)

```text
specs/007-app-shell-case-study/
├── spec.md              # Feature specification (committed)
├── plan.md              # This file
├── research.md          # Phase 0 — 14 decisions (incl. source-material handling + sanitization)
├── data-model.md        # Phase 1 — figure block DSL extension, figure kit inventory, validation
├── quickstart.md        # Phase 1 — dev + gate checklist
├── contracts/
│   ├── routes.md                  # /work/app-shell reuse + metadata + CI contract
│   ├── figures.md                 # figure-block authoring contract + recreation rules
│   └── accessibility.md           # Static figures, reduced motion, non-visual equivalence, no-JS
├── checklists/requirements.md     # Spec quality checklist (from /speckit-specify)
└── tasks.md             # Phase 2 — /speckit-tasks (not yet created)
```

Proprietary source material (NOT committed): `Application Shell Async Inform.pptx` and
`nav-release-preview-v8.html` live in Jason's private storage (currently `~/Downloads`) and are
referenced by location from research.md only. Their real screenshots are reference-only and are
never shipped (D1/D8).

### Source Code (repository root)

```text
src/
├── app/
│   ├── (main)/…                       # UNTOUCHED
│   └── work/
│       ├── [slug]/
│       │   ├── page.tsx               # UNTOUCHED — app-shell served via generateStaticParams
│       │   ├── layout.tsx             # UNTOUCHED — rail derived from prose spine
│       │   └── layout.module.css      # UNTOUCHED
│       └── spike/…                    # UNTOUCHED
├── components/
│   └── work/
│       ├── StudyPage.tsx              # EDIT — one new `figure` block branch + FIGURE_COMPONENTS map
│       ├── StudyPage.module.css       # EDIT (additive) — figure wrapper styles reuse `.wide`
│       ├── Timeline.tsx               # REUSED unchanged (stacked meta + context-strip use)
│       ├── GlossaryChip.tsx           # REUSED (optional; no new terms required)
│       ├── usePrefersReducedMotion.ts # REUSED by any lightly-animated figure
│       ├── demos/… player/… replica/… # UNTOUCHED (i18n study)
│       └── app-shell/                 # NEW — recreated app-shell UI kit (this study only)
│           ├── app-shell-tokens.css   #   scoped depth tokens under .replicaFrame
│           ├── ShellBefore.tsx        #   accordion shell, cramped/dated (recreated)
│           ├── ShellAfter.tsx         #   rail + right details bar, resolved (recreated)
│           ├── NavFootprintDiagram.tsx#   annotated 10% → 2.5%/8.5% (schematic, flat)
│           ├── DetailsSpaceDiagram.tsx#   annotated 62% → 100% (schematic, flat)
│           ├── ContextStrip.tsx       #   four-step sequenced thumbnails
│           ├── RiskTiers.tsx          #   high/medium/low positional-memory illustration
│           └── *.module.css           #   co-located, flat + tokens (depth only inside .replicaFrame)
├── content/
│   └── studies/
│       ├── index.ts                   # EDIT — register appShellStudy; extend assertStudy for figures
│       ├── types.ts                   # EDIT — add FigureBlock + AppShellFigureId; extend ContentBlock
│       ├── glossary.ts                # OPTIONAL edit — only if app-shell terms are used
│       └── app-shell/
│           └── index.ts               # NEW — the app-shell study (prose + figures + milestones)
└── styles/…                           # UNTOUCHED

src/app/api/og/route.tsx               # VERIFY — renders /api/og?study=app-shell card
lighthouserc.desktop.json              # +1 URL (/work/app-shell)
lighthouserc.mobile.json               # +1 URL (/work/app-shell)
scripts/axe-check.mjs                  # +1 URL (/work/app-shell)
src/app/sitemap.ts                     # verified unchanged (allowlist)
src/content/palette.ts                 # verified unchanged (no study entries)
```

**Structure Decision**: Reuse the existing single-project `/work/[slug]` framework. The study
is authored as one content module plus a new, self-contained `components/work/app-shell/` figure
kit; the only shared-surface edits are additive (a generic `figure` block kind, its registry
branch in `StudyPage`, and the study registry). This is the physical form of the spec's reuse
constraint: nothing the i18n study depends on changes, and no other `/work` page is touched.

## Complexity Tracking

No constitution violations to justify. Adding a `figure` block kind is not new complexity beyond
the existing DSL pattern — it mirrors the `demo`/`embedDemo` precedent already in `types.ts`, and
exists precisely so recreated figures satisfy FR-017–019 without a study-specific fork of
`StudyPage`.
