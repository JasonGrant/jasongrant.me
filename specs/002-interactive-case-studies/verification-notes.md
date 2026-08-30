# Verification Notes: 002-interactive-case-studies

Real evidence gathered during autonomous implementation (2026-08-30), not projections.
Environment note: this sandbox has no system Chrome; Lighthouse and axe were pointed at
Playwright's bundled Chromium via `CHROME_PATH` — same browser the repo's own
`scripts/axe-check.mjs` already uses.

## TBT / early performance guard (research D5, T017)

Ran the mobile Lighthouse config against the full study (not a skeleton — the real
content was already in place by the time this ran). Result: Performance 98,
Accessibility 100, Best Practices 100 (median of 3 runs). The TBT risk research D5
flagged (5 demos + player hydrating under 4x mobile CPU throttle) did not materialize.
No mitigation needed.

## Provenance pass (SC-007, T025/T039)

- Text expansion, formatting, and cultural-elements (flags) facts verified against
  the live public Ascent pages captured 2026-08-29 (see research.md provenance notes).
- Word-order guideline quoted verbatim from Jason's deck ("do not insert form inputs
  in the middle of text strings") — that Ascent page remains password-protected.
- **Impact section (FR-023) — OPEN ITEM, not resolved autonomously.** The candidate
  figure discussed at spec time (international revenue share moving 31% → 41.5%) does
  NOT appear on any of the 12 posts currently live at mrjasongrant.substack.com
  (checked via WebFetch of the archive, 2026-08-30), nor in the public
  `src/content/work.ts` Klaviyo entry. Per FR-023/FR-024, an unverified figure must be
  dropped rather than approximated — so the shipped Impact section is qualitative-only
  and does NOT currently satisfy FR-023's "at least one published quantified outcome"
  requirement. This needs Jason: either confirm/locate where that figure is actually
  published (so it can be cited correctly), approve a different already-published
  figure, or approve publishing a new figure now.
- Design-proposal labeling (FR-024): no walkthrough segment in the current content
  depicts a shipped-vs-proposed ambiguity requiring a label — all three segments
  describe the org/personal/email settings model as built.

## SC-004 — core-page isolation

Built `main` (pre-feature) in an isolated git worktree and compared against this
branch's build:

| Route | main (pre-feature) | This branch |
|---|---|---|
| `/` | 113 kB First Load JS | 113 kB — unchanged |
| `/experience` | 113 kB | 113 kB — unchanged |
| `/writing` | 112 kB | 112 kB — unchanged |
| `/colophon` | 112 kB | 112 kB — unchanged |
| Shared chunks | 451 (46.8kB) + f5e865f6 (63.1kB) + other (1.96kB) | identical, other chunk +0.01kB (routing-table bookkeeping only) |

`.next/app-build-manifest.json` file-list diff: every core page (`/(main)/page`,
`/(main)/experience/page`, `/(main)/writing/page`, `/(main)/colophon/page`) references
exactly the same 6 shared/own files as before. The work-route-specific chunk
(`874-*.js`, from the route layout) appears ONLY in `/work/layout`'s file list — no
core page references it. SC-004 confirmed structurally, not just by byte count.

## SC-005 — unlisting verification (T034)

- `curl /sitemap.xml`: zero `/work` URLs.
- Study page HTML: `<meta name="robots" content="noindex, nofollow">` present
  (derived from `listed: false`).
- `src/content/palette.ts`, LeftRail: no study references (unchanged files).
- `src/app/robots.ts`: no `/work` Disallow line (verified absent, as required).
- Unknown slug (`/work/nonexistent-slug`): returns the site's standard 404 (curl
  confirmed `404` status).

## Lighthouse (T032/T036) — both configs, full 5-route runs

Real scores, median of 3 runs each, via `@lhci/cli autorun`:

| Route | Desktop Perf/A11y/BP/SEO | Mobile Perf/A11y/BP/SEO |
|---|---|---|
| `/` | 97-98/100/100/100 | 97-98/100/100/100 |
| `/experience` | 98/100/100/100 | 98/100/100/100 |
| `/writing` | 98/100/100/100 | 98/100/100/100 |
| `/colophon` | 98/100/100/100 | 98/100/100/100 |
| `/work/internationalization` | 100/100/100/**63** | 98/100/100/**63** |

SEO 63 on the study route is the deliberate, EXPECTED consequence of the noindex
directive (Lighthouse's `is-crawlable` audit fails by design) — excluded from
assertion via the `assertMatrix` split per constitution v1.2.1's gates note. All other
categories pass ≥95 on both profiles. `lhci autorun` exited clean (all assertions
green) against both configs.

**CLS = 0** on `/work/internationalization`, confirmed via the Lighthouse
`cumulative-layout-shift` audit (desktop, all 3 runs).

## axe (T033/T036)

`node scripts/axe-check.mjs` against all 5 routes: **0 violations** (WCAG 2.1 A/AA +
2.1 tags). Two real, concrete bugs were caught and fixed during this pass:
1. `--rf-ink-mute` (`#8891a1`) failed 4.5:1 contrast against replica backgrounds —
   darkened to `#5c6472` (verified via computed relative luminance against both
   `#ffffff` and `#f4f5f7`; ratios 5.96:1 / 5.47:1).
2. Six `<select>` elements had no accessible name (`FieldRow`'s visual label wasn't
   actually associated with its control; three decorative disabled selects in
   `SidebarNav`/`WordOrderDemo` had none at all). Fixed via explicit `htmlFor`/`id`
   association in `FieldRow` and `aria-label` on the decorative selects.

## SC-008 — no-JS static fallback (T036)

Verified via `curl` (no JS execution): the full narrative text, every concept demo's
representative content, and every `<noscript>` note render server-side. The
walkthrough player's initial (idle) state — including all replica fields and
controls — is also present in the raw HTML. No blank regions.

## Manual passes — genuinely require a human, not simulated here (T028-031, T041)

- Full keyboard traversal: spot-checked via DOM/ref inspection (Tab order, focus
  rings, no traps) during functional testing above; a real keyboard-only pass by a
  human is still the authoritative check per contracts/accessibility.md.
- VoiceOver smoke test (T031): **Jason-gated**, not attempted here.
- Reduced-motion OS-level pass + SC-003 side-by-side review (T030): the code path
  was verified by review (Player renders no Play/Pause/Stop under
  `usePrefersReducedMotion()===true`, per contracts/accessibility.md condition c) —
  this sandbox has no OS-level or DevTools-level way to toggle
  `prefers-reduced-motion` for a live functional check. Needs a human pass.
- First-time tester (T041, SC-001): **Jason-gated**, not attempted here.

## Bugs found and fixed during implementation (beyond the axe findings above)

1. **Real logic bug**: `reduceEmailSteps`'s value-less-step `continue` guard also
   skipped the retranslate-button stale-clearing check (both share the loop, and
   retranslate steps carry no `value`). Caught by driving the actual walkthrough in a
   browser and asserting DOM state after each step — the STALE badge never cleared.
   Fixed by moving the retranslate check above the guard.
2. **Real layout bug**: the hero `<h1>` used the site's fixed `--fs-hero: 58px` token;
   "Internationalization" has no natural break point and overflowed horizontally on a
   375px viewport (violates FR-012a's "no horizontal page scroll on mobile"). Fixed
   with `clamp(32px, 8vw, var(--fs-hero))` + `overflow-wrap: break-word`, scoped to
   this page only (the site's other headings were not touched).

## Study #2 authoring dry-check (T038)

Reviewed the free-to-paid candidate content (private cortex corpus, sourced 2026-08-29)
against contracts/study-content-schema.md: its shapes are representable without
framework changes — variant-toggle concept demos (existing/1A/1B sidebar states) map
directly to a new `ConceptDemoBlock` + demo component; the usage-bar and value-prop
experiments map to new replica screens (new `ReplicaScreenId` + anchor union,
following the exact pattern `SidebarNav`/`SettingsPanel` already establish); no
player change needed. Per-study CI touchpoint (its URL joining both Lighthouse
configs + axe script) is a mechanical addition, same as this study's.
