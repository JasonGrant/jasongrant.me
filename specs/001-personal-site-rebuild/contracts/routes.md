# Contract: HTTP Routes

**Feature**: 001-personal-site-rebuild

The site exposes only static + edge routes. No mutating endpoints. The
"contract" surface that downstream consumers (search engines, RSS readers,
deep-linkers, OG fetchers) depend on is fixed below.

## Page routes (App Router)

| Method | Path           | Source                              | Cache              | Notes |
|--------|----------------|-------------------------------------|--------------------|-------|
| GET    | `/`            | `src/app/(main)/page.tsx`           | static, revalidate weekly | Home — Hero, NowBlock, Work, Writing |
| GET    | `/experience`  | `src/app/(main)/experience/page.tsx`| static, revalidate weekly | Experience — chronological roles |
| GET    | `/writing`     | `src/app/(main)/writing/page.tsx`   | static, revalidate weekly | Writing — Selected + Archive |
| GET    | `/colophon`    | `src/app/(main)/colophon/page.tsx`  | static              | Optional colophon |
| GET    | `/not-found`   | `src/app/not-found.tsx`             | static              | 404, restyled to match |

All page routes return HTML (text/html; charset=utf-8). All pages MUST
include the chrome contract: `<TopBar>` + `<LeftRail>` (≥980px) +
`<BackgroundFX>` + `<CommandPalette>` + `<Footer>`. All pages MUST emit
`<link rel="canonical">` and OpenGraph tags via the layout `metadata`.

## Static asset routes

| Method | Path                | Source                | Cache               | Notes |
|--------|---------------------|-----------------------|---------------------|-------|
| GET    | `/resume.pdf`       | `public/resume.pdf`   | static, immutable   | FR-025; SC-009 verifies on launch |
| GET    | `/jason.jpeg`       | `public/jason.jpeg`   | static, immutable   | Portrait used in TopBar |
| GET    | `/favicon.ico`      | `public/favicon.ico`  | static, immutable   |   |

## Generated routes

| Method | Path           | Source                       | Cache       | Notes |
|--------|----------------|------------------------------|-------------|-------|
| GET    | `/api/og`      | `src/app/api/og/route.ts`    | edge, immutable per param | Per-page OG image via `next/og::ImageResponse` |

`/api/og` accepts `?page=home|experience|writing|colophon` and renders a
1200×630 PNG. Unknown `page` values fall back to the home OG.

## Anchor contract (in-page section IDs)

The Cmd+K palette and visitors deep-linking from external sources rely on
these stable in-page anchors. They MUST NOT be renamed without updating
`src/content/palette.ts` and the `redirects` config (none today).

| Page | Anchor | Section |
|------|--------|---------|
| `/`  | `#now`         | NowBlock |
| `/`  | `#work`        | Work shelf |
| `/`  | `#writing`     | Writing shelf |
| `/`  | `#hi-marley`   | Hi Marley work entry |
| `/`  | `#hypoth`      | Hypoth work entry |
| `/`  | `#klaviyo`     | Klaviyo work entry |
| `/`  | `#vertex`      | Vertex work entry |

## RSS discovery (FR-081)

`/writing` MUST emit a `<link rel="alternate" type="application/rss+xml"
title="Designing Forward" href="https://designingforward.substack.com/feed">`
in `<head>`, and MUST render a visible "RSS →" link in the page footer
area pointing at the same URL. (Substack subdomain is the
`NEXT_PUBLIC_SUBSTACK_SUBDOMAIN` env var; default `designingforward`.)

## SEO contract

Every page MUST include:

- `<title>` — page-specific
- `<meta name="description">` — page-specific (~150 char)
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<link rel="canonical">` — page-specific absolute URL
- `<meta property="og:title|og:description|og:image|og:type|og:url">`
- `<meta name="twitter:card" content="summary_large_image">` and matching
  `twitter:image`
- `<html lang="en">`

These are rendered via the App Router `metadata` export per page. Lighthouse
SEO ≥95 (FR-070) verifies completeness.

## Robots & sitemap

- `/robots.txt`: standard `User-agent: * / Allow: /`
- `/sitemap.xml`: generated via Next.js metadata API listing the four primary
  routes plus `/colophon`
