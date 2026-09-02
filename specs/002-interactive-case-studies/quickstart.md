# Quickstart: 002-interactive-case-studies

**Local dev + the verification gates for this feature.** Constitution v1.2.1.

## Develop

```bash
npm run dev          # Turbopack dev server
open http://localhost:3000/work/internationalization
```

Content lives in `src/content/studies/internationalization/`; framework in
`src/components/work/` (player, demos, replica kit); route in `src/app/work/[slug]/`.

## Gate checklist (per PR touching this feature)

1. **Types & lint**
   ```bash
   npx tsc --noEmit && npx @biomejs/biome check .
   ```
2. **Build + core-page isolation (SC-004)**
   ```bash
   npm run build
   ```
   Diff the three core pages' file lists in `.next/app-build-manifest.json`
   against a `main` build: no work-route file referenced, per-page totals
   unchanged (runtime-chunk hash exempt). Record both route tables in the PR.
3. **Lighthouse (mobile + desktop, all ≥95, study route included)**
   ```bash
   npx lhci autorun --config=lighthouserc.desktop.json
   npx lhci autorun --config=lighthouserc.mobile.json
   ```
   CLS must be 0 on `/work/internationalization`. SEO on the study route is
   asserted per the `assertMatrix` split — constitution v1.2.1's
   deliberate-noindex deduction; every other category stays ≥95. Run the
   mobile config against a skeleton study EARLY in implementation (TBT under
   4× throttle is the live risk — research D5). Before merge, spot-check the
   study route on the Vercel preview and record it in the PR.
4. **axe (zero violations)**
   ```bash
   npm run start & node scripts/axe-check.mjs
   ```
5. **Manual passes** (contracts/accessibility.md): full keyboard traversal incl.
   one complete walkthrough; VoiceOver smoke of every demo; OS reduced-motion pass
   + SC-003 side-by-side review; visual check.
6. **Unlisting checks (SC-005)**: built sitemap has no `/work` URLs; study HTML has
   `<meta name="robots" content="noindex, nofollow">`; palette/LeftRail/nav contain
   no study links; `robots.ts` has NO `/work` Disallow (must stay absent — D3).
7. **Provenance pass (SC-007)**: every factual claim vs sources — public Ascent
   pages + published articles + Jason's private materials (referenced by location,
   never committed). Impact figures verified against their specific articles.
8. **First-time tester (SC-001)**: one non-author completes demos + walkthrough
   unaided before the URL is shared outside the project.
9. **Banned-pattern review (constitution gate 8)**: no gradients, shadows,
   patterned backgrounds, scale/bounce hovers, or scroll-triggered animation
   anywhere on the work route — inside AND outside `.replicaFrame`; Principle V
   content rules re-verified.

## Ship

Squash-merge the PR (standing preference). Study stays unlisted: share by direct
URL only. Publicizing later = per-study PR flipping `listed` + adding links, per
FR-003/constitution.
