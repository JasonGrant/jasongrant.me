# Quickstart: Ask Jason chat widget

Local dev, the build path, and the per-PR gate checklist. Assumes the repo's standard toolchain
(Next.js 15 / React 19 / npm, Node 24 as CI). Never run `next build` while `next dev --turbopack`
is running (the shared `.next` corrupts); stop dev first or build with an isolated `distDir`.

## Local dev

```bash
npm run dev
# open http://localhost:3000 — the bar is at the bottom centre of every chrome page
```

`.env.development` (committed) sets `NEXT_PUBLIC_ASK_JASON=on`,
`NEXT_PUBLIC_ASK_JASON_API=standin` and Cloudflare's always-pass test site key, so a fresh clone
runs the widget against the scripted stand-in with no setup and no network.

State picker (stand-in builds only): append `?ask=<scenario>` to any chrome page, plus `&open=1`
to open on load and `&container=sheet` to force the phone container. Scenario ids are in
data-model.md §9, e.g.:

```
/?ask=answer-3&open=1          answer with three sources
/?ask=options&open=1           three cards
/?ask=correction-text&open=1   a reply that gets corrected
/?ask=countdown&open=1         turns 3 → 0, then ended
/?ask=capped-health&open=1     call to action instead of the input
/?ask=bot-interactive          Turnstile forces the visible challenge (test key 3x…FF)
```

Against the live API, create `.env.local` (ignored):

```
NEXT_PUBLIC_ASK_JASON_API=https://api.jasongrant.me
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<real site key>
```

This needs `http://localhost:3000` on the API's `CHAT_ALLOWED_ORIGINS` and `localhost` on the
Turnstile widget's hostnames (Jason's two dashboard changes); until then a session attempt shows
the network-error state, which is itself a useful check.

To test private mode locally:

```
NEXT_PUBLIC_ASK_JASON=private
ASK_JASON_PREVIEW_SECRET=<any 32+ character string>
```

Build (`npm run build && npm run start`), confirm no bar, then open
`http://localhost:3000/#ask=<that string>`: the bar appears, the fragment disappears, and it
stays armed across reloads until the secret changes.

## Build & gates (all must pass before merge)

```bash
npx tsc --noEmit                                   # 1. types clean (incl. the starters' satisfies)
npx biome check .                                  # 2. Biome: no errors

NEXT_PUBLIC_ASK_JASON=off npm run build            # 3a. off build
node scripts/check-ask-jason-bundle.mjs off        #     → 0 markers anywhere
rm -rf .next
NEXT_PUBLIC_ASK_JASON=private ASK_JASON_PREVIEW_SECRET=ci-placeholder-secret-32chars npm run build
node scripts/check-ask-jason-bundle.mjs private    # 3b. → 0 markers in HTML / first-load scripts
rm -rf .next
NEXT_PUBLIC_ASK_JASON=on NEXT_PUBLIC_ASK_JASON_API=standin npm run build   # 3c. the gate build
node scripts/check-ask-jason-bundle.mjs on         #     → bar on every chrome page

npm run start &                                    # serve the gate build for the scans below
node scripts/axe-check.mjs                         # 4. axe: 0 violations, incl. the open-state URLs
npx lhci autorun --config=lighthouserc.mobile.json   # 5. Lighthouse mobile (unchanged URL list)
npx lhci autorun --config=lighthouserc.desktop.json  # 6. Lighthouse desktop
```

Gate targets (constitution v1.3.0, unchanged by this feature):

| Pages | Performance | Accessibility | Best Practices | SEO | CLS |
|---|---|---|---|---|---|
| `/`, `/experience`, `/writing`, `/colophon` | ≥ 95 | ≥ 95 | ≥ 95 | ≥ 95 | 0 |
| `/work/*` | ≥ 90 | ≥ 95 | ≥ 95 | off | 0 |

Compare every score with the pre-feature run (spec SC-002: within one point).

## Verification against the live API (on a preview, once allowlisted)

```bash
# health and version
curl -s https://api.jasongrant.me/api/health | python3 -m json.tool | grep -E '"chat"|"api_version"|"voice"'
# preflight from the preview alias (expect 204 once Jason adds it; 403 before)
curl -s -o /dev/null -w "%{http_code}\n" -X OPTIONS -H "Origin: https://preview.jasongrant.me" \
  -H "Access-Control-Request-Method: POST" https://api.jasongrant.me/api/session
```

Then on the preview: send a starter, a typed follow-up, a question that misses the corpus
(options), a salary question (deflect), and read the turn hint count down. Record the
first-words latency from the Network panel (spec SC-004).

## Manual passes (Principle III — no functional test suite)

- **Keyboard**: the table in contracts/accessibility.md, on desktop (panel) and at 375 px
  (sheet); Escape closes only with focus inside; Tab leaves the non-modal panel into the page.
- **Screen reader** (VoiceOver, Safari): open by send → composer focus, "Jason is answering",
  one completion announcement; open by palette → heading focus, disclosure read; cards named
  "Ask about …"; "Answer updated" once on `correction-text`; close → focus on the bar; the
  rotating placeholder is silent; the counter is read on focus only.
- **Reduced motion** (OS setting on): no morph (crossfade), static placeholder, no nudge, no
  word fade, static thinking mark.
- **Rotation and nudge**: on a fresh page, the first question types at 2 s; three cycles then
  static; the nudge never before 20 s, never twice within 45 s, never after focusing the bar;
  tab hidden pauses both.
- **Phone, on hardware** (iOS Safari and Android Chrome): tap the bar → sheet with composer
  focus and keyboard up, header and composer visible; swipe down closes; no page scroll behind
  the sheet; 320 px and 200 % zoom with no horizontal scroll inside the sheet.
- **Layout shift**: Performance panel, Layout Shifts track empty during open, bot-check
  appearance (`bot-interactive`), streaming (`long`) and correction, desktop and phone.
- **Performance**: no dropped frames during the morph at 6× CPU throttling; Layout count flat
  during a rotation cycle.
- **Visual**: every state in sketches.md §4 at 360 px (sheet) and in the 400 px panel; the bar
  on every chrome page at 320, 768, 1280 and 1440 px; the footer's last row clear of the bar.
- **Private mode**: the local test above, plus a rotation (change the secret, rebuild) disarms.
- **Isolation**: `/deck/ci/intro/cover` has no bar, no marker, no chat request; `robots.ts`,
  `sitemap.ts` unchanged.

## Secret and storage hygiene

```bash
git grep -n ASK_JASON_PREVIEW_SECRET          # next.config, workflow placeholder, specs only
git grep -n '<the real secret>'                # nothing (run locally; never paste it anywhere)
```

In DevTools → Application: only `sessionStorage["ask-jason.session"]` (and, in private mode,
`localStorage["ask-jason.preview-key"]`); no cookies set by the site.

## PR record

Paste into the PR: Lighthouse scores for the six URLs on both profiles against the previous
run; axe summary (page count, open-state count, 0 violations); the three bundle-check lines;
first-words latency from the preview; the constitution version (v1.4.0 if D19 lands, else the
PR note on the bounded unprompted motion); and the Vercel environment values set (names only).
