# Contract: /work/[slug] Routes

**Feature**: 002-interactive-case-studies | Precedent: 001 `contracts/` route contracts

## Route surface

| Route | Kind | Behavior |
|---|---|---|
| `/work/[slug]` | SSG page, one per registry entry | Full study page; `dynamicParams = false` |
| `/work/<unknown>` | — | Site-standard 404 (FR-004) |
| `/work` (bare) | — | Not a route; 404. No index of studies exists anywhere (FR-002) |

## Metadata contract (every study route)

- `robots: { index: false, follow: false }` — overrides root layout's permissive
  default. Verified by inspecting the built HTML `<meta name="robots">`.
- `title`/`description`: from `CaseStudy.title`/`.description`; written safe for
  link previews (research D16).
- OG image via existing `/api/og` pattern; no new endpoint types.
- Not present in `sitemap.ts` output (allowlist — verified by build inspection).
- No `Disallow` line added to `robots.ts` (research D3 — must stay absent).

## Isolation contract

- The work route group (`src/app/work/`) imports NOTHING from `(main)`'s layout
  tree, and `(main)` imports nothing from `src/components/work/` or
  `src/content/work/`. Enforced by review + SC-004's manifest diff: the three core pages' file
  lists in `.next/app-build-manifest.json` reference no file containing
  work-route modules, and per-page totals stay unchanged at route-table
  precision (runtime-chunk hash exempt).
- `src/content/palette.ts` and LeftRail contain no study references.

## CI contract (constitution: unlisted routes are shipped pages)

- `lighthouserc.desktop.json` + `lighthouserc.mobile.json` URL arrays include
  `http://localhost:3000/work/internationalization`, asserted via `assertMatrix`:
  core pages keep all four categories ≥0.95 unchanged; `/work/` URLs assert
  Performance/Accessibility/Best-Practices ≥0.95 and SEO at the maximum
  achievable under the deliberate-noindex crawlability deduction — the single
  permitted SEO deduction (constitution v1.2.1 gates note).
- `scripts/axe-check.mjs` URLS includes the same route; zero WCAG 2.1 AA
  violations required.
- CLS = 0 on the study route (server-rendered initial demo states, D5).
