# Implementation Plan: jasongrant.me Rebuild

**Branch**: `001-personal-site-rebuild` | **Date**: 2026-05-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-personal-site-rebuild/spec.md`

## Summary

Replace the existing `@once-ui-system/core`-based scaffold with a hand-rolled,
single-theme warm-dark Next.js 15 / React 19 site that ships three pages
(Home, Experience, Writing) plus an optional `/colophon`. Source the visible
design from the supplied `homepage.jsx` / `styles.css` mockup (variant `vc`:
Petrona display serif italic + Funnel Sans body + DM Mono labels, teal accent,
`#15120D` background). Deliver against the constitution v1.1.0 gates: WCAG AA,
Lighthouse 95+ on all four categories, CLS=0, <1s cold load, no automated
functional tests. Demolish the Once UI dependency, theme switcher, and
gradient/dots/grid `<Background>` chrome — they conflict with the
restraint-driven design and the performance budget.

Technical approach: port the hand-rolled CSS from the mockup into a single
global tokens stylesheet plus per-component CSS Modules; replace Once UI
primitives with native semantic HTML; self-host the three Google fonts via
`next/font/google`; build the Cmd+K palette, the fixed left-rail section
indicator, the cursor-tracked halo / animated grain (both reduced-motion
guarded per amended Principle IV), and the inline Substack newsletter form;
wire view transitions on nav; verify with Lighthouse + axe per workflow gate.

## Technical Context

**Language/Version**: TypeScript 5.8 (strict), React 19.0, Next.js 15.3 App Router
**Primary Dependencies** (kept): `next`, `react`, `react-dom`, `@vercel/analytics`,
  `@vercel/speed-insights`, `classnames`, `sharp`, `react-icons`
**Primary Dependencies** (removed): `@once-ui-system/core`, `sass` (no longer used
  after Once UI removal — design is plain CSS), and any Once UI-specific config
**Primary Dependencies** (added): none — fonts come from `next/font/google` (built
  into Next.js); RSS link points to Substack's existing feed
**Storage**: N/A — content is hand-authored TypeScript modules under `src/content/`;
  Substack posts and resume PDF are static assets / external links
**Testing**: No automated functional tests (per Constitution Principle III).
  Verification is `tsc --noEmit`, `biome check`, Lighthouse mobile+desktop
  ≥95/95/95/95, axe DevTools zero violations, manual keyboard + VoiceOver pass.
**Target Platform**: Modern evergreen browsers (Chrome 120+, Safari 17+, Firefox 121+,
  Edge 120+); production deployment on Vercel
**Project Type**: Web application (Next.js App Router, single project, no separate
  backend — one client-side `mode: 'no-cors'` POST to Substack is the only
  network egress beyond static assets and analytics)
**Performance Goals**: Lighthouse 95+ on Performance/Accessibility/Best Practices/SEO
  on every page, both mobile and desktop. Homepage LCP <1s on a mid-tier (4G-equivalent)
  connection with cold cache. CLS = 0 on every page.
**Constraints**: WCAG 2.1 AA contrast in shipped warm-dark theme on every text and
  UI surface. Banned visual patterns per FR-045. Texture (halo + grain) and
  reveal-on-enter must fully suppress under `prefers-reduced-motion: reduce`. No
  third-party scripts on the critical path other than Vercel Analytics / Speed
  Insights (already non-blocking).
**Scale/Scope**: 4 routes (`/`, `/experience`, `/writing`, `/colophon`) + 1 OG
  endpoint (existing). Content shape: 4 work entries, 2 Hypoth experiments, 5
  curated writing entries on home, ~20 entries on writing archive (grows over
  time), 3 now-lines. Single site, single deployment, no auth, no database.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Evaluated against `.specify/memory/constitution.md` v1.1.0.

| Principle | Status | Evidence in this feature |
|---|---|---|
| **I. WCAG 2.1 AA (NON-NEGOTIABLE)** | PASS | FR-051 (single-theme contrast), FR-073 (keyboard), FR-074 (semantic HTML), FR-075 (alt text), FR-076 (motion prefs). Workflow gate 3 (axe scan) and 6 (manual KB+SR) enforced per release. |
| **II. Performance Budget Lighthouse 95+ (NON-NEGOTIABLE)** | PASS | FR-070 (95+ all four categories, mobile+desktop), FR-071 (CLS=0), FR-072 (<1s LCP). Workflow gate 4 (Lighthouse) and 5 (CLS=0) enforced per release. Decision to remove `@once-ui-system/core` is partly motivated by this budget. |
| **III. Verification Without Functional Tests** | PASS | Spec explicitly excludes test suites; verification is via Lighthouse + axe + manual passes + `tsc` + Biome. No new test framework introduced. |
| **IV. Design-Engineer Craft** | PASS | Three-voice type system (FR-040), single column ≤720px (FR-042), single-theme warm-dark per amended IV / single-theme allowance (FR-050), hairline rules + two named framed devices (FR-044, FR-046). Halo + grain ship under amended IV / Subtle-craft exceptions / Ambient texture (FR-047). Reveal-on-enter ships under amended IV / Subtle-craft exceptions / Reveal-on-enter (FR-064). All other banned patterns (gradients beyond texture, drop shadows, hero bg images, decorative illustration outside texture, scale/bounce hovers, custom cursors, parallax, scroll-driven typography) are NOT used. |
| **V. Content Discipline & Network Coherence** | PASS | Three primary pages + optional `/colophon` only (FR-001..FR-003). Operator work narrated with outcomes; founder work linked (FR-013, FR-014). Resume PDF stays separate (FR-025). Substack remains canonical for posts (FR-031, FR-032). Network coherence with hypoth.ai / wrenpod.com via shared display-italic emphasis idiom and warm-paper voice (Assumptions). |
| **Stack & Delivery Constraints** | PASS | Next.js 15 + React 19 (kept). Vercel hosting + Analytics + Speed Insights (kept). Fonts self-hosted via `next/font/google` (Petrona, Funnel Sans, DM Mono). Styling: CSS Modules + a single global tokens CSS file (one of the constitution's permitted choices: "vanilla CSS with custom properties"). Public GitHub repo (already true). |
| **Workflow & Quality Gates** | PASS | All 8 gates honored per release; documented in `quickstart.md`. Pre-launch cleanup items (FR-093) tracked in spec, executed before sharing the rebuilt site. |

**Initial Constitution Check: PASS.** No violations. The single complexity item
(removing `@once-ui-system/core`) is documented in Complexity Tracking below as a
deliberate scope choice, not a constitution violation.

**Post-Design Constitution Check (after Phase 1): PASS.** All five principles
remain satisfied by the data model + contracts + quickstart. Specifically:

- The contracts surface (4 page routes + 1 OG endpoint + 4 static assets) is
  the smallest viable surface; no new endpoints introduced.
- The data model lives entirely in version-controlled TypeScript modules; no
  database, no CMS, no runtime content fetching that could threaten Lighthouse
  Performance.
- The newsletter contract is opaque-CORS to Substack only; no server-side
  proxy that would add latency or a server-side dependency surface.
- The keyboard contract enumerates only `Cmd+K`, `Esc`, `↑/↓`, `Enter`, `Tab`
  — no global hotkey hijacking that would conflict with assistive tech.
- The view-source contract is a single first-of-`<head>` HTML comment, which
  has zero runtime cost and reinforces FR-080 + Principle V network coherence.
- The quickstart codifies all 8 Workflow & Quality Gates as a per-PR checklist.

No new clarifications surfaced. No re-amendment to the constitution required.

## Project Structure

### Documentation (this feature)

```text
specs/001-personal-site-rebuild/
├── plan.md              # This file (/speckit-plan output)
├── spec.md              # Feature specification
├── research.md          # Phase 0 output — design + tech research
├── data-model.md        # Phase 1 output — content type model
├── quickstart.md        # Phase 1 output — local dev + verification flow
├── contracts/           # Phase 1 output — surface contracts
│   ├── routes.md        # HTTP route contracts (pages, OG endpoint, static assets)
│   ├── newsletter.md    # Substack subscribe POST contract
│   ├── keyboard.md      # Cmd+K palette + global keyboard contract
│   └── view-source.md   # First-comment build credit contract
├── checklists/
│   └── requirements.md  # Spec quality checklist (already exists)
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — fonts, metadata, viewport (REWRITTEN: drop Once UI Background, theme-init script)
│   ├── (main)/
│   │   ├── layout.tsx            # Shared chrome: TopBar + LeftRail + BackgroundFX + CommandPalette + Footer (REWRITTEN)
│   │   ├── page.tsx              # Home (/) — Hero + NowBlock + Work + Writing (REWRITTEN)
│   │   ├── experience/
│   │   │   └── page.tsx          # Experience (/experience) — chronological roles (REWRITTEN)
│   │   ├── writing/
│   │   │   └── page.tsx          # Writing (/writing) — Selected + Archive (REWRITTEN)
│   │   └── colophon/
│   │       └── page.tsx          # Colophon (/colophon) — typefaces, framework, hosting (NEW)
│   ├── api/
│   │   └── og/                   # OG image route (KEPT, restyled to match)
│   ├── not-found.tsx             # 404 (KEPT, restyled)
│   └── favicon.ico               # KEPT (or replaced)
│
├── components/                   # All hand-rolled, no Once UI
│   ├── chrome/
│   │   ├── TopBar.tsx            # Wordmark + Cmd+K trigger + portrait
│   │   ├── LeftRail.tsx          # Fixed section indicator (desktop ≥980px)
│   │   ├── Footer.tsx            # Footer links + build credit
│   │   ├── BackgroundFX.tsx      # Halo (cursor-tracked) + Grain (animated) — both reduced-motion gated
│   │   └── CommandPalette.tsx    # Cmd+K palette
│   ├── home/
│   │   ├── Hero.tsx              # Hero positioning sentence with italic emphasis
│   │   ├── NowBlock.tsx          # Terminal-fence "now" card
│   │   ├── WorkShelf.tsx         # Selected work, four entries with Hypoth sub-list
│   │   ├── WorkEntry.tsx         # Single role row
│   │   ├── HypothExperiment.tsx  # Sub-entry under Hypoth
│   │   ├── WritingShelf.tsx      # Selected writing, five entries + archive link + newsletter
│   │   └── Newsletter.tsx        # Inline Substack subscribe form
│   ├── experience/
│   │   └── ExperienceEntry.tsx   # Single Experience-page role entry (long form)
│   ├── writing/
│   │   ├── SelectedList.tsx      # Curated five with one-line descriptions
│   │   └── ArchiveList.tsx       # Full chronological archive
│   └── primitives/
│       ├── ArrowOut.tsx          # Out-arrow icon
│       ├── MarkTile.tsx          # Monogram chip (Hi Marley/Hypoth/Wren/Olllo)
│       └── SectionLabel.tsx      # Reveal-on-enter section label with hairline rule
│
├── content/                      # Hand-authored TypeScript content
│   ├── work.ts                   # WorkEntry[] for Home + Experience
│   ├── writing.ts                # WritingEntry[] (selected + archive)
│   ├── now.ts                    # NowLine[] + updated month
│   ├── palette.ts                # CommandPaletteItem[] (Navigate/Work/External/Meta)
│   └── site.ts                   # Site-wide metadata, footer links, build credit string
│
├── lib/
│   ├── motion.ts                 # `useReducedMotion()` hook + `useReveal()` IntersectionObserver hook
│   ├── keyboard.ts               # Cmd/Ctrl+K detection, palette open/close events
│   └── newsletter.ts             # Substack opaque POST helper
│
├── styles/
│   ├── tokens.css                # CSS custom properties: warm-dark palette, type stack, spacing, accent
│   ├── reset.css                 # Lightweight reset
│   ├── globals.css               # Imports tokens + reset; sets html/body defaults
│   └── *.module.css              # Per-component CSS Modules co-located with .tsx files
│
└── types/
    └── content.ts                # WorkEntry, HypothExperiment, WritingEntry, NowLine, CommandPaletteItem types

public/
├── resume.pdf                    # Resume PDF (provided by Jason)
├── jason.jpeg                    # Portrait (square ≥256px)
└── favicon.ico
                                  # OG images are generated dynamically by
                                  # src/app/api/og/route.ts (no static PNGs)

(removed during this feature)
src/components/Navigation.tsx, NavigationItems.tsx, PageLayout.tsx,
  ProfileSection.tsx, Providers.tsx, SocialLinks.tsx, ThemeSwitcher.tsx,
  Timeline.tsx                   # All Once UI-based; replaced
src/resources/once-ui.config.js  # Once UI configuration; obsolete
src/resources/custom.css         # Once UI custom overrides; obsolete
package: @once-ui-system/core    # Uninstalled
package: sass                    # Uninstalled (no Sass usage after Once UI removal)
next.config.mjs                  # `sassOptions` removed
```

**Structure Decision**: Single Next.js 15 App Router project at the repository
root (the existing project). The current scaffold is a Once UI starter; the
plan rewrites the visible surface end-to-end while keeping the build system,
hosting, and analytics integration. Content lives in TypeScript modules under
`src/content/` so the writing/work shelves are edited as code (no CMS, no MDX
in v1 per FR-032). Per-component CSS Modules + a single global tokens file
match the design's hand-rolled feel and are explicitly permitted by the
constitution's Stack & Delivery Constraints ("vanilla CSS with custom
properties is acceptable").

## Complexity Tracking

| Item | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| Remove `@once-ui-system/core` and rewrite all 8 existing components from scratch | The library's Flex/Text/Background primitives, theme switcher, and gradient/dots/grid `<Background>` system directly conflict with the design's restraint requirements (FR-040–FR-046) and the Lighthouse 95+ budget (FR-070). The hand-rolled mockup is the design source of truth (Assumptions). | Keeping Once UI under the new design was rejected because (a) the library's component density and runtime CSS-in-JS pull KB the budget can't afford, (b) its built-in light/dark theme machinery contradicts the v1 single-theme decision (FR-050), and (c) its `<Background>` gradient/dots/grid effects are exactly the banned-pattern list constitution Principle IV protects against. A wrapper layer over Once UI would still ship the runtime cost. |
| Two named framed devices (now fence + newsletter card) as exceptions to "no cards" | The "now" terminal fence is a deliberate genre signal (it's the page acknowledging it's a piece of code-adjacent craftsmanship); the newsletter card frames a single CTA without competing with the surrounding text. Both are in the design and read as deliberate, not decorative. | Removing the fences would flatten the home page into uninterrupted paragraphs, losing the rhythm contrast the constitution Principle IV calls out ("the contrast between dense lists and breathing space between sections is the rhythm"). Constitution Principle IV explicitly permits framed devices used sparingly with a single hairline border and elevated background tone. |
| Halo + grain ambient texture | The warm-dark surface reads as flat without subtle texture; the design treats them as the page's "paper" rather than as effects. Gated by ≤6% opacity ceiling and full reduced-motion suppression per amended Principle IV. | Shipping without them was the alternative resolved as Q2:B and rejected by user direction (Q2:A). Constitution amended in same change to make this explicit and bounded. |
