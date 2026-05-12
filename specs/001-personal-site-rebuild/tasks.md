---

description: "Task list for jasongrant.me personal site rebuild"
---

# Tasks: jasongrant.me Rebuild

**Input**: Design documents from `/specs/001-personal-site-rebuild/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Per Constitution Principle III and FR — explicitly NO automated
functional tests in this project. Verification is `tsc --noEmit` + Biome +
Lighthouse 95+ + axe + manual keyboard / VoiceOver. Test tasks are therefore
**omitted entirely** from this plan.

**Organization**: Tasks are grouped by user story (US1–US4) to enable
independent shipping. The MVP is US1 alone (homepage). US2 (Experience),
US3 (Writing), and US4 (Cmd+K palette) each ship independently after the
foundation is in place.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- All file paths are repo-relative

## Path Conventions

Single Next.js 15 App Router project at the repository root.

- App routes: `src/app/`
- Components: `src/components/`
- Content: `src/content/`
- Library helpers: `src/lib/`
- Styles: `src/styles/`
- Types: `src/types/`
- Static assets: `public/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Demolition + project shell preparation. After this phase the
project still builds and serves a blank page, but every Once UI dependency is
gone and the new directory structure exists.

- [ ] T001 Uninstall `@once-ui-system/core` and `sass` from `package.json` (`npm uninstall @once-ui-system/core sass`); commit the resulting `package.json` + `package-lock.json` delta
- [ ] T002 Remove `sassOptions` block from `next.config.mjs` and enable Next.js View Transitions experimental flag (`experimental: { viewTransition: true }`) per research R4
- [ ] T003 [P] Delete obsolete Once UI components: `src/components/Navigation.tsx`, `src/components/NavigationItems.tsx`, `src/components/PageLayout.tsx`, `src/components/ProfileSection.tsx`, `src/components/Providers.tsx`, `src/components/SocialLinks.tsx`, `src/components/ThemeSwitcher.tsx`, `src/components/Timeline.tsx`
- [ ] T004 [P] Delete obsolete Once UI configuration: `src/resources/once-ui.config.js`, `src/resources/custom.css`, and the `src/resources/icons.ts` if unused after Once UI removal (verify with grep first)
- [ ] T005 [P] Create new top-level source directories: `src/components/chrome/`, `src/components/home/`, `src/components/experience/`, `src/components/writing/`, `src/components/primitives/`, `src/content/`, `src/lib/`, `src/styles/`, `src/types/`
- [ ] T006 [P] Create `.env.example` at repo root documenting `NEXT_PUBLIC_SUBSTACK_SUBDOMAIN=designingforward` (default value); add a one-line comment per quickstart §1
- [ ] T007 Run `npm run build` to verify the project still builds with everything Once UI-related removed (expect transient errors in `src/app/(main)/page.tsx`, `experience/page.tsx`, `writing/page.tsx`, and `src/app/layout.tsx` referencing deleted modules — Phase 2 fixes these)

**Checkpoint**: Once UI is fully uninstalled. Directory shell is ready. The build is intentionally broken at four known locations; do not attempt to ship from here.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Design system tokens, typography pipeline, shared content
modules, and the site-wide chrome that every page renders. **No user story
work can begin until this phase is complete.**

### 2A. Tokens, fonts, and global styles

- [ ] T010 Create `src/styles/tokens.css` with the warm-dark token set ported from the mockup's `styles.css` variant `vc`: `--bg: #15120D`, `--bg-elev: #1E1A13`, `--ink: #ECE3CF`, `--ink-soft: #A39C8B`, `--ink-mute: #6E695C`, `--rule: rgba(236,227,207,0.10)`, `--rule-strong: rgba(236,227,207,0.20)`, `--accent: oklch(0.78 0.10 195)`, `--accent-strong: oklch(0.84 0.10 195)`, `--accent-soft: oklch(0.78 0.10 195 / 0.14)`, plus type variables (defaults reference `--font-display`, `--font-body`, `--font-mono`) and spacing scale variables
- [ ] T011 [P] Create `src/styles/reset.css` — minimal reset (margin/padding zero on `html, body`, list-style none, anchor color inherit, button defaults, `box-sizing: border-box` everywhere)
- [ ] T012 [P] Create `src/styles/globals.css` that imports `./reset.css` and `./tokens.css` and sets `:root` defaults (font-feature-settings `"ss01", "ss02", "kern"`, smoothing, text-rendering), body `background: var(--bg)` and `color: var(--ink)`, `scroll-behavior: smooth`, `scroll-padding-top: 40px`, and global focus-visible style using `--accent`. Top-of-file comment per FR-062 / FR-045: `/* No transform: scale() on hover anywhere. No bounce. No drop-shadow. See constitution Principle IV. */`
- [ ] T013 Create `src/lib/fonts.ts` exporting Petrona, Funnel Sans, and DM Mono via `next/font/google` with `latin` subset and weight pins per research R3 (Petrona 500 italic + 500 roman; Funnel Sans 300/400/500; DM Mono 400). Export `--font-display`, `--font-body`, `--font-mono` CSS variable names

### 2B. Types and content modules

- [ ] T014 Create `src/types/content.ts` with the type definitions from data-model.md: `WorkEntry`, `WorkLink`, `MarkRef`, `HypothExperiment`, `WritingEntry`, `NowLine`, `CommandPaletteItem`, `PaletteAction`, `NewsletterSubmission`, `NewsletterSubmitResult`
- [ ] T015 [P] Create `src/content/site.ts` exporting the `site` constant from data-model.md (title, authorName, email `hello@jasongrant.me`, baseURL `https://jasongrant.me`, github, socials.{github,linkedin,substack,bluesky}, buildCredit.{headComment, footer}, newsletter.{name, cadence, pitch})
- [ ] T016 [P] Create `src/content/now.ts` exporting `nowLines: NowLine[]` (three entries: leading design @ Hi Marley; building Wren and Olllo @ Hypoth; writing Designing Forward on Substack) and `updated: { month: "May", year: "2026" }`
- [ ] T017 [P] Create `src/content/work.ts` exporting `workEntries: WorkEntry[]` with exactly four entries in this order, all values matching spec FR-013/FR-014 verbatim: Hi Marley (id `hi-marley`, mark logo marley, role "Director of Product Design", dates "2025 — present"), Hypoth (id `hypoth`, mark monogram H solid, orgHref `https://hypoth.ai`, with `experiments` array containing Wren H-02 + Olllo H-01), Klaviyo (id `klaviyo`, role "Director of Product Design · fractional interim VP", dates "2023 — 2025"), Vertex Pharmaceuticals (id `vertex`, role "Head of Design", dates "2017 — 2021"). Hi Marley `links` includes a `Case study` entry marked `pending: true` until the Three Fidelities post lands. Each entry includes both `homeDescription` (per FR-014) and `experienceBullets` (2–4 per FR-021)
- [ ] T018 [P] Create `src/content/writing.ts` exporting `writing: WritingEntry[]` containing at minimum the five `selected: true` posts from spec §3 — "Execution Collapsed. Direction Didn't." (Apr 2026), "Your Org Chart Decides Your Speed" (May 2026), "Post-Figma Design: Real UI, Real Data" (Jul 2025), "Design Isn't Dead. It Just Needs to Split." (Jul 2025), "Why Every Company Needs a UX Engineer" (Oct 2024) — each with valid `isoDate` and a Substack `href`. The build assertion (exactly 5 `selected: true`) is documented in data-model.md; no runtime check required
- [ ] T019 [P] Create `src/content/palette.ts` exporting `paletteItems: CommandPaletteItem[]` with the 18 items enumerated in `contracts/keyboard.md` (Navigate × 6, Work × 4, External × 5, Meta × 4) — actions typed per `PaletteAction` discriminated union

### 2C. Shared chrome components

- [ ] T020 [P] Create `src/lib/motion.ts` exporting `useReducedMotion()` (matchMedia hook returning live boolean) and `useReveal()` (IntersectionObserver hook that adds `is-in` class to every `[data-reveal]` element on first intersection, with per-element `--reveal-delay: ${(i % 4) * 60}ms` stagger; both no-op under reduced motion) — ported from mockup `homepage.jsx::useReveal`
- [ ] T021 [P] Create `src/lib/keyboard.ts` exporting an `useGlobalCmdK(callback)` hook that listens for `Cmd+K`/`Ctrl+K`, prevents default, and dispatches an `open-cmdk` CustomEvent; plus an `useEscape(callback)` hook
- [ ] T022 [P] Create `src/lib/newsletter.ts` exporting `subscribeToNewsletter(email: string): Promise<NewsletterSubmitResult>` performing the `mode: 'no-cors'` POST per `contracts/newsletter.md`, with client-side regex validation and `state: "ok"` on any non-throw
- [ ] T023 [P] Create `src/components/primitives/ArrowOut.tsx` — the 9×9 SVG out-arrow icon from mockup `homepage.jsx::ArrowOut`, marked `aria-hidden="true"`
- [ ] T024 [P] Create `src/components/primitives/MarkTile.tsx` rendering monogram/logo chips per `MarkRef` (solid, outline, accent, plus the special `marley` waves SVG from mockup `homepage.jsx::MarleyMark`) + co-located `MarkTile.module.css` styled from mockup `styles.css::.mark-tile`
- [ ] T025 [P] Create `src/components/primitives/SectionLabel.tsx` — the uppercase mono "Selected work" / "Selected writing" label with `data-reveal` and the slide-in hairline rule per mockup `styles.css::.seclabel`, plus co-located CSS module
- [ ] T026 Create `src/components/chrome/HeadComment.tsx` (server component) rendering the FR-080 first-of-`<head>` HTML comment via `<script type="text/html" dangerouslySetInnerHTML>` per `contracts/view-source.md`; throws at build if `site.buildCredit.headComment` contains `-->`
- [ ] T027 Create `src/components/chrome/BackgroundFX.tsx` (client component, `"use client"`) — fixed-position halo + grain layers per mockup `homepage.jsx::BackgroundFX` and `styles.css::.bg-halo,.bg-grain`. Halo: cursor-following radial gradient at peak 4% opacity, `mix-blend-mode: screen`; pointer listener attached ONLY when `useReducedMotion()` is false. Grain: animated `feTurbulence` SVG data URL at 5% opacity, `mix-blend-mode: overlay`, animation suppressed under reduced motion. Also call `useReveal()` (from `src/lib/motion.ts`) once from this component so the reveal-on-enter observer is mounted exactly once for the whole document. Co-located CSS module
- [ ] T028 Create `src/components/chrome/CommandPalette.tsx` (client component) — full Cmd+K palette per `contracts/keyboard.md`: opens on `open-cmdk` event AND on Cmd/Ctrl+K, focus moves to search input on open, live substring filter, arrow-key navigation, group separators, ARIA dialog/listbox markup, focus return on close. Reads items from `src/content/palette.ts`. Co-located CSS module ported from mockup `.cmdk*` rules
- [ ] T029 Create `src/components/chrome/TopBar.tsx` — site wordmark (left), Cmd+K trigger button (dispatches `open-cmdk` CustomEvent) + Portrait avatar (right). Server component with the trigger broken out as a tiny client island. Portrait uses `next/image` for `/jason.jpeg`, square 48×48 with explicit width/height (no CLS)
- [ ] T030 Create `src/components/chrome/LeftRail.tsx` (client component) — fixed left section indicator showing Now / Selected work / Writing. Uses IntersectionObserver against sections (`#now`, `#work`, `#writing`) with `rootMargin: '-30% 0px -55% 0px'`. Hidden at `<980px` via CSS module media query
- [ ] T031 Create `src/components/chrome/Footer.tsx` — footer links from `site.socials` + build credit text + Cmd+K trigger button + colophon string. Per spec FR-005 and mockup `homepage.jsx::Footer`
- [ ] T032 Rewrite `src/app/layout.tsx`: remove Once UI imports (`Schema`, `Meta`, `Flex`, `Background`, `opacity`, `SpacingToken`), remove `Providers`, remove the inline `theme-init` script entirely (research R10), remove `<Background>` chrome (research R1). Import `src/styles/globals.css` and the three `next/font/google` instances from `src/lib/fonts.ts`. Render `<HeadComment />` as the first child of `<head>`. Body keeps `<Analytics />` and `<SpeedInsights />` (already non-blocking per constitution Stack & Delivery Constraints). Export `metadata` and `viewport` via the App Router `metadata` API
- [ ] T033 Rewrite `src/app/(main)/layout.tsx`: render `<BackgroundFX />`, `<TopBar />`, `<LeftRail />`, `{children}`, `<Footer />`, `<CommandPalette />`. No Once UI components. The shared chrome is the wrap that every primary page passes through
- [ ] T034 [P] Restyle `src/app/not-found.tsx` to match the warm-dark theme: monospace 404 label, link back to `/`, hairline rule, no Once UI components. Keep it short
- [ ] T035 [P] Replace the OG image template in `src/app/api/og/route.ts` (existing route handler) with a warm-dark Petrona+DM Mono template per research R12, using `next/og::ImageResponse`. Accept `?page=home|experience|writing|colophon` and fall back to home OG for unknown values
- [ ] T036 [P] Copy `assets/jason.jpeg` from `/tmp/personal-site-design/assets/` (or `/tmp/personal-site-design/uploads/JasonHeadshot2025.jpeg`) to `public/jason.jpeg`; verify it is square ≥256px (resize/crop with `sharp` if needed)
- [ ] T037 Run `npx tsc --noEmit` and `npx biome check .` — both MUST return clean. Run `npm run build` — MUST succeed with the empty `(main)/page.tsx` returning `null` or a placeholder

**Checkpoint**: Foundation is complete. The site has design tokens, fonts, content modules, types, the full chrome (TopBar, LeftRail, BackgroundFX, CommandPalette, Footer), and a clean build. User story implementation can begin in parallel.

---

## Phase 3: User Story 1 - Recruiter / hiring exec landing on the homepage (Priority: P1) 🎯 MVP

**Goal**: A recruiter or hiring exec lands on `/` and within 30 seconds reads
the positioning, the Now block, and the first work entry. The visual craft of
the page is itself proof for the claim.

**Independent Test**: Run the dev server, open `/` on a 1440×900 viewport.
The hero positioning sentence, the Now block, and the Hi Marley row must all
be visible without scrolling. On a 375px viewport the hero + Now must remain
legible. Lighthouse home page ≥95 on all four categories, mobile + desktop.
axe scan zero serious/critical issues. Keyboard tab through reaches every
interactive element with a visible focus ring.

### Implementation for User Story 1

- [ ] T040 [P] [US1] Create `src/components/home/Hero.tsx` — renders the FR-010 positioning sentence with italic display-serif accent emphasis on "ships production code." and "Hypoth,", then the FR-011 context paragraph with inline links to `#hi-marley`, `#klaviyo`, `#vertex`, and `https://hypoth.ai`. Co-located CSS module styled from mockup `styles.css::.hero h1`, `.hero h1 .em`, `.hero .context` (variant `vc` values: 58px display, 17px body, 1.65 line-height)
- [ ] T041 [P] [US1] Create `src/components/home/NowBlock.tsx` — terminal-fence card with header `~/now` (left, `--ink-soft`) and `updated {month} {year}` (right, `--accent`) per FR-012. Renders `nowLines` as a `<ul>` with em-dash markers, links inlined. Reads `updated` from `src/content/now.ts`. Co-located CSS module from mockup `.nowfence`. Section id `now` for FR-061 / palette
- [ ] T042 [P] [US1] Create `src/components/home/HypothExperiment.tsx` — sub-row for nested experiments (Wren, Olllo) with mark tile, name+stage+description, optional links. Co-located CSS module from mockup `.work .sub*` rules
- [ ] T043 [US1] Create `src/components/home/WorkEntry.tsx` — single role row with two-column grid (200px meta / 1fr body) per mockup `.work .entry`. Renders MarkTile + org (+ optional `orgHref` external link with ArrowOut) + role + dates in the meta column; `homeDescription` + `links` in the body column. If `experiments` is present, renders them via `HypothExperiment` inside a "Current experiments" sublist with dashed-rule separator. Co-located CSS module
- [ ] T044 [US1] Create `src/components/home/WorkShelf.tsx` — section id `work`, `<SectionLabel>Selected work</SectionLabel>`, then a list of `<WorkEntry>` per entry in `workEntries`. Co-located CSS module
- [ ] T045 [P] [US1] Create `src/components/home/Newsletter.tsx` (client component) — inline Substack subscribe form per FR-016 and `contracts/newsletter.md`. Reads `site.newsletter` for label/cadence/pitch. State machine: idle → sending → done (or error). Calls `subscribeToNewsletter` from `src/lib/newsletter.ts`. Co-located CSS module from mockup `.newsletter`
- [ ] T046 [US1] Create `src/components/home/WritingShelf.tsx` — section id `writing`, `<SectionLabel>Selected writing</SectionLabel>`, filters `writing` for `selected === true`, renders each as `<li>` with title + dotted-leader + date per mockup `.writing ol/li`. Trailing `<a class="archive">All writing on Substack →</a>` linking to `site.socials.substack`. Embeds `<Newsletter />` at the bottom (per design). Co-located CSS module
- [ ] T047 [US1] Rewrite `src/app/(main)/page.tsx` to compose `<Hero />`, `<NowBlock />`, `<WorkShelf />`, `<WritingShelf />` inside the page container `<div class="page">` (max-width 720px, padding 56px). Add `metadata` export with title, description (~150 char from FR-010), and OG image pointing at `/api/og?page=home`. Apply `data-reveal` attribute on section labels and the newsletter block per FR-064
- [ ] T048 [US1] Verify reveal-on-enter behavior on `/`: section labels and the newsletter card fade in on first scroll into view (≤900ms ease, ≤12px translate, fade-only per amended constitution Principle IV), and are fully suppressed under DevTools `prefers-reduced-motion: reduce`. The `useReveal()` hook is mounted inside `<BackgroundFX />` per T027 — this is pure verification, no implementation choice required
- [ ] T049 [US1] Run Lighthouse against `/` (both mobile and desktop) — Performance, Accessibility, Best Practices, SEO each MUST be ≥95. Run axe scan — zero serious/critical issues. Tab through with keyboard — every interactive element has a visible focus ring. Fix anything that fails before declaring US1 done

**Checkpoint**: US1 is the MVP. The homepage ships at this point if needed. Recruiter landing experience is complete; Experience and Writing pages are still placeholders.

---

## Phase 4: User Story 2 - Visitor doing a 5-minute deep-dive on Experience (Priority: P2)

**Goal**: A visitor clicks past the homepage to `/experience` and finds a
chronological proof page with quantified outcomes for each role, Hypoth as a
top-level entry, and a downloadable resume PDF.

**Independent Test**: Navigate from `/` to `/experience` (via TopBar nav and
via Cmd+K). Each role displays org, role title, date range, optional
reporting line, and 2–4 outcome bullets. Hypoth appears as a top-level entry
alongside Hi Marley, not nested under "Other experience." Resume PDF link
resolves to the actual file. Lighthouse `/experience` ≥95 on all four
categories. axe scan clean.

### Implementation for User Story 2

- [ ] T060 [P] [US2] Create `src/components/experience/ExperienceEntry.tsx` — long-form entry: org + role + dates + optional `reportingLine` + 2–4 `experienceBullets` as a `<ul>` with hairline-bordered separators per mockup-derived design. Uses MarkTile for org chips where present (Hi Marley logo, Hypoth monogram). Co-located CSS module — re-use the meta/body two-column grid from `WorkEntry` but allow body to be a bulleted list
- [ ] T061 [US2] Rewrite `src/app/(main)/experience/page.tsx` to render a single `<main>` with `<h1>Experience</h1>` (display serif italic), then map `workEntries` to `<ExperienceEntry>` in array order (reverse chronological). Below the list, render a short downloadable-resume CTA linking to `/resume.pdf` with mono "↓ Resume (PDF)" label. Architecture-firms 1997–2011 entry MUST NOT appear (per FR-024). Add `metadata` export for the page
- [ ] T062 [US2] Add `Download resume` to the Meta group of `src/content/palette.ts` with action `{ kind: "navigate", href: "/resume.pdf" }` and hint `pdf` (per `contracts/keyboard.md`)
- [ ] T063 [US2] Place a current resume PDF at `public/resume.pdf` (placeholder acceptable until Jason provides the final file — but the route MUST resolve, no 404, for SC-009)
- [ ] T064 [US2] Run Lighthouse against `/experience` (mobile + desktop) — ≥95 on all four. Run axe scan — zero serious/critical. Verify resume link resolves (200 OK, application/pdf). Verify the page reads correctly under VoiceOver (semantic `<article>` per entry, heading hierarchy intact)

**Checkpoint**: US1 + US2 both ship. Recruiter has the homepage hook AND the proof page.

---

## Phase 5: User Story 3 - Reader who wants to dig into the writing (Priority: P3)

**Goal**: A reader (peer designer or podcast host) opens `/writing` and finds
a curated Selected list above a chronological Archive, every entry linking
out to Substack, RSS discoverable, newsletter form available.

**Independent Test**: Navigate to `/writing`. Selected section shows exactly
the same five posts as the homepage Writing shelf, each with a one-line blurb.
Archive section shows all posts in reverse chronological order. Each post
opens in a new tab/context. `<link rel="alternate" type="application/rss+xml">`
is present in `<head>`. Visible "RSS →" link points at the Substack feed.
Lighthouse ≥95.

### Implementation for User Story 3

- [ ] T070 [US3] Augment `src/content/writing.ts` so that the five `selected: true` entries each carry a `blurb` field per data-model.md (≤160 chars). For now blurbs can be one-line summaries derived from the post titles; final copy will be edited closer to launch
- [ ] T071 [P] [US3] Create `src/components/writing/SelectedList.tsx` — filters `writing` for `selected === true`, renders each as a richer card-less row with title + blurb + date, linking out. Co-located CSS module
- [ ] T072 [P] [US3] Create `src/components/writing/ArchiveList.tsx` — sorts `writing` descending by `isoDate`, renders each as the homepage-style dotted-leader row (title + leader + date). Co-located CSS module
- [ ] T073 [US3] Rewrite `src/app/(main)/writing/page.tsx`: `<h1>Writing</h1>` (display italic), `<SelectedList />`, `<SectionLabel>Archive</SectionLabel>`, `<ArchiveList />`, then a footer "RSS →" link pointing at `https://${NEXT_PUBLIC_SUBSTACK_SUBDOMAIN ?? "designingforward"}.substack.com/feed`. Page `<head>` includes `<link rel="alternate" type="application/rss+xml" title="Designing Forward" href="...feed">` via the `metadata.alternates.types` API. Add `metadata` for title/description/OG
- [ ] T074 [US3] Run Lighthouse against `/writing` (mobile + desktop) — ≥95 on all four. Verify RSS discovery (`curl -s https://localhost:3000/writing | grep 'rel="alternate"'`). Verify every post link opens to a Substack URL (no relative links accidentally introduced). axe scan clean

**Checkpoint**: US1 + US2 + US3 ship. The full three-page rebuild is functional.

---

## Phase 6: User Story 4 - Power user / peer design engineer using the keyboard palette (Priority: P4)

**Goal**: A peer design engineer presses Cmd+K, navigates the palette by
keyboard, copies the email, opens the repo, or views source — and finds the
build credit comment in view-source.

**Independent Test**: On `/`, press `Cmd+K`. Palette opens, focus moves into
the input. Type "wren" — palette filters to the Wren item. Press Enter — new
tab opens to wrenpod.com. Reopen palette, navigate to "Email Jason" with
arrow keys, press Enter — clipboard contains `hello@jasongrant.me`. Reload
the page and open View Source — the first child of `<head>` is the build
credit comment containing the repo URL and contact email.

Most of US4 already shipped in Phase 2 (Foundational) via T026 + T028. This
phase is verification and small polish.

### Implementation for User Story 4

- [ ] T080 [US4] Manually verify every Cmd+K action listed in `contracts/keyboard.md` works end-to-end: 6 Navigate, 4 Work, 5 External, 4 Meta. Document any palette item that fails and fix it in `src/components/chrome/CommandPalette.tsx` or `src/content/palette.ts`
- [ ] T081 [US4] Verify the View-Source contract: open the deployed (or local prod-build) page, View Source, confirm the first child of `<head>` is the HTML comment from `site.buildCredit.headComment`, with the literal substrings `Repo: https://`, `hello@jasongrant.me`, and `Next.js` present
- [ ] T082 [US4] Verify ARIA and keyboard a11y on the palette via VoiceOver: opens announces as dialog; arrow-key navigation announces each item; Escape returns focus to the trigger that opened it (TopBar or Footer button)

**Checkpoint**: All four user stories ship. The site is feature-complete for v1.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Optional `/colophon` page, View Transitions on nav, sitemap +
robots, OG images for non-home pages, final pre-launch verification.

- [ ] T090 [P] Create `src/app/(main)/colophon/page.tsx` per FR-002 — a single short page (≤300 words) naming Petrona / Funnel Sans / DM Mono, Next.js 15 + React 19, Vercel hosting, the warm-dark token set, link to the GitHub repo. Use the same chrome as other pages. Add to Navigate group of `src/content/palette.ts`
- [ ] T091 [P] Create `src/app/sitemap.ts` (Next.js metadata file) listing the four routes: `/`, `/experience`, `/writing`, `/colophon`. Lastmod = build time
- [ ] T092 [P] Create `src/app/robots.ts` returning `{ rules: [{ userAgent: '*', allow: '/' }], sitemap: 'https://jasongrant.me/sitemap.xml' }`
- [ ] T093 [P] Add per-page `metadata` exports with page-specific titles, descriptions, canonical URLs, and OG image URLs (`/api/og?page=experience`, `?page=writing`, `?page=colophon`) for all three non-home pages
- [ ] T094 Verify View Transitions API is active on nav between `/`, `/experience`, `/writing`, `/colophon` on a supporting browser (Chrome 111+ / Safari 18+). On Firefox the navigation should still work (no jank, no broken state)
- [ ] T095 [P] Rewrite the footer build-credit copy to be truthful for the Next.js production build (per Assumptions): "Built by hand · Next.js · view source" (or similar) — the mockup's "no build step" line MUST NOT ship as-is
- [ ] T096 Add a `<noscript>` fallback in `src/app/layout.tsx` for the newsletter form (renders a plain `<a href="https://designingforward.substack.com">Subscribe on Substack</a>`) so the form is reachable when JS is disabled
- [ ] T097 Run a final whole-site verification pass per `quickstart.md` §4: `tsc --noEmit` clean, `biome check` clean, `npm run build` clean. For each of `/`, `/experience`, `/writing`, `/colophon`: Lighthouse ≥95 on all four categories mobile + desktop; axe scan zero serious/critical; CLS = 0; manual keyboard pass; VoiceOver smoke; visual check under both normal AND `prefers-reduced-motion: reduce`. Record scores in the PR description
- [ ] T098 Run the pre-launch checklist from `quickstart.md` §5 to confirm operational items: `public/resume.pdf` is current, `src/content/now.ts::updated` is current, outbound links resolve, Substack subdomain is correct in `.env.local` (and Vercel env). The remaining cleanup items (Hypoth DNS to `hypoth.ai`, Hypoth footer reconciliation, Substack tagline) are tracked outside this codebase per FR-093

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately. T001 → T002 in sequence (both edit project root config); T003/T004/T005/T006 can run in parallel; T007 depends on T001-T006.
- **Foundational (Phase 2)**: Depends on Setup completion. Strict blocker for ALL user stories.
  - 2A: T010 → T011/T012 → T013 (tokens come first, then global styles, then fonts that reference token names)
  - 2B: T014 → T015/T016/T017/T018/T019 (types first, then content modules in parallel)
  - 2C: T020/T021/T022/T023/T024/T025 parallel → T026 → T027/T028 → T029/T030/T031 → T032/T033 → T034/T035/T036 → T037
- **User Stories (Phase 3+)**: All depend on Foundational completion.
  - **US1 (P1, MVP)**: T040/T041/T042/T045 parallel; T043 depends on T024+T042; T044 depends on T043; T046 depends on T045 (reads `writing` directly and filters `selected === true` — does NOT import from `src/components/writing/`); T047 depends on T040/T041/T044/T046; T048/T049 depend on T047
  - **US2 (P2)**: Depends only on Foundational. T060 parallel; T061 depends on T060; T062 [P]; T063 [P]; T064 depends on T061+T062+T063
  - **US3 (P3)**: Depends only on Foundational. T070 [P]; T071/T072 parallel; T073 depends on T071+T072; T074 depends on T073
  - **US4 (P4)**: Mostly verification — depends on US1 (palette must have items to test) and Foundational chrome being in place
- **Polish (Phase 7)**: Depends on US1+US2+US3 shipping; T090-T093 mostly parallel; T097/T098 final

### User Story Dependencies (operational, not coupling)

- US1 is the MVP and is sufficient to ship as a first increment (homepage live with `/experience` and `/writing` returning the Next.js default placeholder or a one-line "coming soon").
- US2 can ship after US1 with no rework of US1.
- US3 can ship after US1 or US2 with no rework.
- US4 is mostly already-built (palette ships in Foundational); this phase is verification + final palette items.

### Parallel Opportunities

- **Phase 1**: T003, T004, T005, T006 in parallel (different files).
- **Phase 2A**: T011 and T012 parallel; T013 last (depends on tokens for the variable names).
- **Phase 2B**: T015, T016, T017, T018, T019 all parallel after T014 lands.
- **Phase 2C**: T020, T021, T022, T023, T024, T025 parallel after T014 lands. T027, T028 parallel after T020/T021 land. T029, T030, T031 parallel after T024 lands. T034, T035, T036 parallel after T033 lands.
- **Phase 3 (US1)**: T040, T041, T042, T045 parallel.
- **Phase 4 (US2)**: T060, T062, T063 parallel.
- **Phase 5 (US3)**: T070, T071, T072 parallel after T070 lands.
- **Phase 7**: T090, T091, T092, T093, T095 parallel.

---

## Parallel Example: Foundational Phase 2C component scaffolding

After T014 (types) lands, all six primitive/lib tasks can be launched together:

```bash
Task: "Create src/lib/motion.ts with useReducedMotion() and useReveal() hooks"
Task: "Create src/lib/keyboard.ts with useGlobalCmdK and useEscape hooks"
Task: "Create src/lib/newsletter.ts with subscribeToNewsletter helper"
Task: "Create src/components/primitives/ArrowOut.tsx icon component"
Task: "Create src/components/primitives/MarkTile.tsx + MarkTile.module.css"
Task: "Create src/components/primitives/SectionLabel.tsx + SectionLabel.module.css"
```

## Parallel Example: User Story 1 home components

Once Foundational completes, US1's leaf components fan out:

```bash
Task: "Create src/components/home/Hero.tsx + Hero.module.css"
Task: "Create src/components/home/NowBlock.tsx + NowBlock.module.css"
Task: "Create src/components/home/HypothExperiment.tsx + module CSS"
Task: "Create src/components/home/Newsletter.tsx + Newsletter.module.css"
```

T043 (WorkEntry) then composes T042 (HypothExperiment); T044 (WorkShelf)
composes T043; T046 (WritingShelf) composes T045 (Newsletter); T047 (page.tsx)
composes T040/T041/T044/T046.

---

## Implementation Strategy

### MVP First (US1 only)

1. Phase 1: Setup — uninstall Once UI, prepare directories (T001–T007).
2. Phase 2: Foundational — tokens, fonts, content, types, full chrome (T010–T037).
3. Phase 3: US1 — Hero, NowBlock, Work, Writing, Newsletter on the homepage (T040–T049).
4. **STOP and VALIDATE**: Lighthouse 95+ on home; axe clean; manual keyboard + VoiceOver pass.
5. Ship the rebuilt homepage with `/experience` and `/writing` as Next.js default placeholders or a one-line "soon" message. This is the highest-leverage delivery (rebuild plan §1).

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready.
2. Phase 3 (US1) → Test independently → Deploy. **MVP shipped.**
3. Phase 4 (US2) → Test independently → Deploy. /experience live.
4. Phase 5 (US3) → Test independently → Deploy. /writing live.
5. Phase 6 (US4) verification + Phase 7 polish → Final deployment.

Each increment is independently shippable. Per Rebuild Plan §8 the order is
sequenced for highest impact-per-hour.

### Single-developer strategy

This is a one-person rebuild (Jason). Parallel-task markers `[P]` indicate
which tasks could be parallelized by an agent or by batching multi-file
edits, but a single developer will mostly execute sequentially:

- Day 1 (~6h): Phase 1 + Phase 2A + 2B
- Day 2 (~6h): Phase 2C + Phase 3 (US1) implementation
- Day 3 (~3h): US1 verification → ship MVP → Phase 4 (US2)
- Day 4 (~3h): Phase 5 (US3) + Phase 6 (US4) verification
- Day 5 (~4h): Phase 7 polish + final pre-launch verification

Total ≈ 22 focused hours, in line with the rebuild plan estimate (15–25h).

---

## Notes

- `[P]` tasks = different files, no dependencies on incomplete tasks.
- `[Story]` label maps task to its user story for traceability.
- Each user story is independently shippable and independently testable.
- No automated functional tests are generated per Constitution Principle III
  and explicit spec note. Verification = Lighthouse + axe + manual + `tsc` + Biome.
- Commit after each task or each completed checkpoint.
- Stop at any checkpoint to validate the increment independently.
- Avoid: vague tasks, multi-file scope creep on a single task, cross-story
  dependencies that break independence.
