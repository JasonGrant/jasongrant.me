# Quickstart: App Shell Evolution at Hi Marley

Local dev, the build path, and the per-PR gate checklist for the study. Assumes the repo's
standard toolchain (Next.js 15 / React 19 / npm).

## Local dev

```bash
npm run dev            # turbopack dev server
# open http://localhost:3000/work/app-shell
```

Author the study in `src/content/studies/app-shell/index.ts`; build figures under
`src/components/work/app-shell/`. The route appears automatically once `appShellStudy` is
registered in `src/content/studies/index.ts` — no route file to add.

## Build & gates (all must pass before merge)

```bash
npx tsc --noEmit                 # 1. types clean — incl. FigureId / FIGURE_COMPONENTS exhaustiveness
npx biome check .                # 2. Biome: no errors
npm run build                    # SSG build; assertRegistry + figure assertions run at import
npm run start &                  # serve the production build for the scans below
node scripts/axe-check.mjs       # 3. axe: 0 WCAG 2.1 AA violations on /work/app-shell (+ core)
npx lhci autorun --config=lighthouserc.mobile.json    # 4a. Lighthouse mobile
npx lhci autorun --config=lighthouserc.desktop.json   # 4b. Lighthouse desktop
```

Gate targets on `/work/app-shell` (constitution v1.2.6 `/work/` band):

| Category | Target |
|---|---|
| Performance | ≥ 90 (mobile + desktop) |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | off (deliberate noindex) |
| CLS | 0 |

## Manual passes (Principle III — no functional test suite)

- **Keyboard**: traverse the whole page; logical order, visible focus, no trap.
- **Screen reader**: confirm both headline numbers (10%→2.5%/8.5%, 62%→100%), the before/after
  contrast, and the three risk tiers are announced from text.
- **Reduced motion**: enable OS reduced motion; confirm no figure animates and nothing is lost.
- **No-JS**: disable JS; confirm full narrative + a static state for every figure.
- **Visual**: check every figure in the shipped color mode; before reads dated/cramped, after
  reads resolved.

## Content-integrity checklist (SC-006 / SC-007 — the site's defining bar)

- [ ] No real screenshot anywhere **except** `shell-before` (`ImageStepper`'s five images in
      `public/work/app-shell/`) — every other figure is a recreation (grep `next/image`/`<img>`
      in `app-shell/` and confirm every other hit is a recreated component, not a capture).
- [ ] The `shell-before` screenshots are the specific five Jason cleared (research D8a); no other
      real capture has been added without an equivalent dated clearance.
- [ ] All sample data in recreated figures is fictional per the sanitization map (research D9):
      no "Copart", no staff names, no `marley.atlassian.net` links, no version numbers, no
      internal team names. (Does not apply to the real `shell-before` screenshots — those show
      Jason's own demo data, confirmed non-PII.)
- [ ] Hi Marley branding only where the exception allows (recreated chrome, or the owner-cleared
      `shell-before` screenshots); no third-party PII anywhere, including in `shell-before`.
- [ ] Every headline number, tier example, and the success-bar sentence verified against the
      source decks (research D10/D11/D12). Anything unverifiable is dropped, not approximated.
- [ ] `study.description` is preview-safe (no proprietary specifics).

## Isolation checklist (SC-004 / SC-005)

- [ ] `/work/app-shell` absent from `sitemap.ts`, `palette.ts`, and every nav surface; page
      serves `noindex`.
- [ ] Core pages and other `/work` routes unchanged in the build manifest (diff file lists /
      script payloads pre/post feature; bundler chunk-repartition noise excepted).
- [ ] `layout.tsx`, `sitemap.ts`, `palette.ts`, and all i18n-study files untouched.

## PR record

Record in the PR: the four Lighthouse category scores (mobile + desktop), axe result, the
build-isolation diff, and a note that all figures are recreations with owner-cleared, verified
numbers.
