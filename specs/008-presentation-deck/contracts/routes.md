# Contract: Routes, secret, metadata & CI — `/deck/[secret]/[section]/[slide]`

## URL grammar

```
/deck/<secret>                         → 307 to /deck/<secret>/intro/cover
/deck/<secret>/<section>               → 307 to that section's first slide
/deck/<secret>/<section>/<slide>       → the slide
```

- `<secret>`: value of `DECK_SLUG` at build time, validated `^[a-z0-9]+(?:-[a-z0-9]+)*$`,
  fallback `dev`. CI: `ci`.
- `<section>`: `intro | internationalization | app-shell | close`.
- `<slide>`: the slide's slug from `src/content/deck/`.

## Rendering

- All three levels are SSG with `dynamicParams = false`. The leaf `generateStaticParams` returns
  `{ secret, section, slide }` triples for every slide; the two intermediate pages return
  `{ secret }` and `{ secret, section }` respectively and call `redirect()` to content-derived
  first slides (research D3). Any other segment → the site's standard `not-found`.
- `src/lib/deckSlug.ts` is the only reader of `DECK_SLUG`. It is imported from server code only.

## Metadata

`src/app/deck/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: { absolute: "Deck" },
  robots: { index: false, follow: false, noarchive: true, nosnippet: true, noimageindex: true },
  openGraph: null,
  twitter: null,
};
```

Leaf `generateMetadata` sets only `title: { absolute: "<n> of <N> · <slide title>" }`. No slug,
no description, no OG image.

## Secret hygiene (SC-003)

The secret appears only in the rendered deck's own `href`s. It MUST NOT appear in `<title>`,
metadata, JSON-LD, analytics event names, `robots.ts`, `sitemap.ts`, `palette.ts`, `LeftRail`,
any committed file, or CI output. Accepted private surfaces: Vercel build logs, Vercel Analytics
pathnames.

## Environment

| Where | Variable | Value |
|---|---|---|
| Local dev | unset | builds under `dev` |
| CI (`quality.yml` build steps) | `DECK_SLUG` | `ci` |
| Vercel Production + Preview | `DECK_SLUG` | the real value, set in Project Settings → Environment Variables; same for both |

Rotation: change the value and redeploy. No `vercel.json`, no `middleware.ts`.

## Discoverability (verified-unchanged touchpoints)

| Surface | File | Expectation |
|---|---|---|
| Sitemap | `src/app/sitemap.ts` | Fixed allowlist; **no** `/deck` entry. |
| Robots | `src/app/robots.ts` | **Unchanged — no Disallow for `/deck`** (a Disallow would publish the path). |
| Command palette | `src/content/palette.ts` | No deck item. |
| Section rail | `src/components/chrome/LeftRail.tsx` | No `/deck` in `SECTIONS_BY_PATH`. |
| Site chrome | `(main)` and `/work` layouts | Unchanged; the deck mounts none of it. |
| Case-study pages | `src/content/studies/*` | No link to the deck. |

## CI

| Config | Change |
|---|---|
| `lighthouserc.desktop.json` | `collect.url` += `/deck/ci/intro/cover`, `/deck/ci/internationalization/the-cascade`, `/deck/ci/internationalization/translation-flow`, `/deck/ci/app-shell/baseline`, `/deck/ci/app-shell/outcome`; `assertMatrix` += band `^http://localhost:3000/deck/` → perf 0.9 / a11y 0.95 / bp 0.95 / seo off. |
| `lighthouserc.mobile.json` | **Unchanged** (constitution v1.3.0: mobile exempt for `/deck`). |
| `scripts/axe-check.mjs` | `URLS` += the same five plus `/deck/ci/app-shell/overview`. |
| `.github/workflows/quality.yml` | `env: DECK_SLUG: ci` on both `npm run build` steps. |

## Acceptance (maps to spec)

- Direct load of any slide renders it (FR-001); intermediate levels redirect (FR-003); unknown
  segments 404 (FR-003).
- Deck pages serve noindex/nofollow and no OG/Twitter (FR-023, SC-003).
- `git grep` for the real secret returns nothing; CI logs show only `ci` (FR-002, SC-003).
- Core pages and `/work` routes unchanged in module set (FR-024, SC-004).
