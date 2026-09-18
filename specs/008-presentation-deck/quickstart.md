# Quickstart: Presentation deck

Local dev, the build path, and the per-PR gate checklist. Assumes the repo's standard toolchain
(Next.js 15 / React 19 / npm). Never run `next build` while `next dev --turbopack` is running
(the shared `.next` corrupts); stop dev first or build with an isolated `distDir`.

## Local dev

```bash
npm run dev
# open http://localhost:3000/deck/dev/intro/cover   (DECK_SLUG unset → "dev")
```

Author slides in `src/content/deck/*.ts`; build components under `src/components/deck/`. Routes
appear automatically from the content module — no route file to add per slide.

## Build & gates (all must pass before merge)

```bash
npx tsc --noEmit                              # 1. types clean — incl. DeckEmbedId / EMBEDS exhaustiveness
npx biome check .                             # 2. Biome: no errors
DECK_SLUG=ci npm run build                    # SSG build under the CI placeholder; assertDeck runs at import
ls .next/server/app/deck                      #    → only "ci"
npm run start &                               # serve the production build for the scans below
node scripts/axe-check.mjs                    # 3. axe: 0 WCAG 2.1 AA violations (deck URLs under /deck/ci/)
npx lhci autorun --config=lighthouserc.desktop.json   # 4. Lighthouse desktop (mobile exempt for /deck)
```

Gate targets on `/deck/…` (constitution v1.3.0 deck band):

| Category | Target |
|---|---|
| Performance | ≥ 90 (desktop) |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | off (deliberate noindex) |
| CLS | 0 |

## Route & secret checks (SC-003)

```bash
curl -sI localhost:3000/deck/ci | grep -i location            # 307 → /deck/ci/intro/cover
curl -sI localhost:3000/deck/ci/app-shell | grep -i location  # 307 → section's first slide
curl -sI localhost:3000/deck/nope/intro/cover | head -1       # 404
curl -s localhost:3000/deck/ci/intro/cover | grep -io 'name="robots"[^>]*'   # noindex, nofollow
curl -s localhost:3000/deck/ci/intro/cover | grep -c 'og:'    # 0
curl -s localhost:3000/sitemap.xml | grep -c deck             # 0
curl -s localhost:3000/robots.txt | grep -c deck              # 0
git grep -n DECK_SLUG                                         # identifiers only: deckSlug.ts, quality.yml, specs
git grep -n '<the real slug>'                                 # nothing (run locally; never paste the value into the repo)
```

## Manual passes (Principle III — no functional test suite)

- **Keyboard**: the full table in contracts/accessibility.md, including from inside a Dropdown
  listbox, the language `<select>`, the ContentLanguagePicker search input, a stepper, and the
  email flow; PageUp/PageDown/Home/End still move slides from inside those.
- **Reset**: on `the-cascade`, save French in Organization, confirm Personal inherits, press R →
  both panels back to English and no inherited value; same via the button; leave and return →
  clean. Repeat on `translation-flow`, `baseline`, `enablement-decision`, `the-problem`,
  `see-it-break`.
- **Screen reader** (Jason-gated, VoiceOver): slide title announced on navigate; "Slide reset";
  navigator sections/slides with current state.
- **Reduced motion**: no fade between slides; replica toasts use their reduced variant.
- **No-JS**: every slide renders unscaled and flowing with working links; demo slides show the
  `<noscript>` note.
- **Scroll leak**: at a 1280-wide window, Tab through `the-cascade`; the viewport must not shift.
- **Phone**: 375×667 and 390×844 — stage fits, no horizontal scroll, navigator tappable.
- **Visual**: every slide at 1280×720 and 1920×1200; stage chrome flat; replica depth only inside
  `.replicaFrame`.

## Isolation checklist (SC-004)

- [ ] `/deck` absent from `sitemap.ts`, `robots.ts`, `palette.ts`, `LeftRail`, and every nav.
- [ ] `.next/app-build-manifest.json`: `/(main)/page` identical; `/work/[slug]/page` same module
      set (chunk hashes may repartition).
- [ ] `/work` edits are additive only: `resetOrgSettings`, `SHELL_BEFORE_SLIDES`,
      `DESIGN_HANDOFF_SLIDES`, `arrowKeys` prop; study content modules untouched.

## PR record

Record in the PR: desktop Lighthouse scores for the five deck URLs, axe result, the
build-isolation diff, the "no secret in repo/CI" note, and screenshots at 1280×720 and 375×667.
Squash-merge (standing preference). After merge: set `DECK_SLUG` in Vercel (Production +
Preview) and redeploy.
