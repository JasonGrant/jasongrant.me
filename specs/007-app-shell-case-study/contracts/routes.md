# Contract: Route, metadata & CI — `/work/app-shell`

Reuses the `/work/[slug]` route contract established by feature 002. No new route or endpoint.

## Route

- **URL**: `/work/app-shell`, served by `src/app/work/[slug]/page.tsx`.
- **Rendering**: SSG. `generateStaticParams()` returns one `{ slug }` per registered study;
  `dynamicParams = false`, so any other work slug → the site's standard `not-found`.
- **Prerequisite**: `appShellStudy` is exported and registered in
  `src/content/studies/index.ts`; `assertRegistry` passes at import (unique slug, non-empty
  blocks, figure/registry assertions per data-model.md §5).

## Metadata (from `generateMetadata`, driven by the study object)

- `title` = `study.title` → "App Shell Evolution at Hi Marley".
- `description` = `study.description` → a preview-safe one-liner with **no** proprietary
  specifics (no partner names, staff names, versions, internal systems).
- `robots` = `{ index: false, follow: false }` because `study.listed === false` (FR-002).
- OpenGraph/Twitter: title + description + `/api/og?study=app-shell`, `type: "article"`.

## Discoverability (verified-unchanged touchpoints)

| Surface | File | Expectation |
|---|---|---|
| Sitemap | `src/app/sitemap.ts` | Fixed allowlist; **no** `/work/*` entry added. |
| Robots | `src/app/robots.ts` | Unchanged (permissive; unlisting is via noindex + no links). |
| Command palette | `src/content/palette.ts` | **No** app-shell item. |
| Section rail | `src/components/chrome/LeftRail.tsx` | No `/work` entry in `SECTIONS_BY_PATH`. |
| Home work shelf | work content | No inbound link to the study. |

## OG image

- `src/app/api/og/route.tsx` **already** renders any registered study via `?study=<slug>`
  (`getStudy(studySlug)` → `card(study.title, "Case study · " + study.company, …)`). So
  `/api/og?study=app-shell` works with **no OG edit** once the study is registered — this is a
  verify-only touchpoint (confirm a valid 1200×630 card renders), not a change.

## CI (unlisted routes are shipped pages — every gate applies)

| Config | Change |
|---|---|
| `lighthouserc.mobile.json` | add `http://localhost:3000/work/app-shell` to `collect.url`. |
| `lighthouserc.desktop.json` | add the same URL. |
| Assertions | none — the existing `^http://localhost:3000/work/` band already asserts Perf ≥0.90, A11y ≥0.95, BP ≥0.95, SEO off (constitution v1.2.6). |
| `scripts/axe-check.mjs` | add the same URL to the `URLS` list. |

## Acceptance (maps to spec)

- Direct load renders full study; unknown slug → not-found (SC / FR-004).
- Sitemap/palette/nav inspection shows zero app-shell references; page serves noindex (SC-004).
- Core pages and other `/work` routes unchanged in the build manifest (SC-005).
