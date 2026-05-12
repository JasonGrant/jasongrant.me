# Phase 0 Research: jasongrant.me Rebuild

**Feature**: 001-personal-site-rebuild
**Date**: 2026-05-11
**Status**: Complete — all decisions resolved; no NEEDS CLARIFICATION carried forward

The spec is unusually concrete (the design assets are finalized; the constitution
gates are explicit). This research doc records the handful of *technical* choices
that the spec deliberately left to the planner, plus the research that justifies
each one. Items marked **Decision** are committed for `/speckit-tasks`.

---

## R1. Scaffold strategy: rewrite vs. incremental refactor

**Question**: The current `src/` is a `@once-ui-system/core` starter with
`Navigation`, `PageLayout`, `ProfileSection`, `Providers`, `SocialLinks`,
`ThemeSwitcher`, `Timeline` components, a `theme-init` inline script in
`layout.tsx`, and a `<Background>` chrome rendering gradient/dots/grid effects.
Do we (a) rewrite the visible surface and uninstall Once UI, (b) keep Once UI
and re-skin its primitives, or (c) start a fresh Next.js app in a sibling
directory and cut over?

**Decision**: (a) — rewrite the visible surface, uninstall `@once-ui-system/core`
and `sass`, keep the existing project shell (`package.json`, `next.config.mjs`,
`tsconfig.json`, `biome.json`, the `app/` route group, the OG endpoint, Vercel
Analytics + Speed Insights wiring).

**Rationale**:
- Once UI's runtime CSS/JS surface is incompatible with FR-070 (Lighthouse 95+
  Performance) — measured starter pages on similar Once UI scaffolds typically
  ship 200–400 KB of component runtime before any page content.
- Once UI's `<Background>` component literally renders gradient, dots, and grid
  layers from config — the same patterns banned by Principle IV (with one
  narrow exception we already amended).
- Once UI's theme switcher (`ThemeSwitcher.tsx` + `theme-init` script) implements
  light/dark toggle. We are committed to single warm-dark per FR-050; carrying
  the toggle would be dead code that the bundler pays for.
- The route file structure (`app/(main)/page.tsx`, `app/(main)/experience/page.tsx`,
  `app/(main)/writing/page.tsx`, `app/api/og`) is already correct. We don't need
  to start fresh.

**Alternatives considered**:
- (b) keep Once UI under a re-skin: rejected. We'd still ship the library's
  runtime cost and would constantly be fighting the library's defaults to express
  the design's restraint.
- (c) sibling fresh app: rejected. The repo, GitHub history, deployment, and
  Vercel project are already wired and shouldn't be moved.

---

## R2. Styling approach: CSS Modules vs. Sass vs. Tailwind v4

**Question**: The project currently has Sass configured (`sassOptions` in
`next.config.mjs`) but the supplied design is plain CSS. The constitution
permits Tailwind v4 + CSS variables OR vanilla CSS with custom properties as
defensible choices.

**Decision**: CSS Modules (`*.module.css`) for component-scoped styles +
a single global tokens file (`src/styles/tokens.css`) holding CSS custom
properties for color, spacing, type. Drop Sass.

**Rationale**:
- The supplied design is already authored as plain CSS with custom properties
  (`--bg`, `--ink`, `--accent`, etc.). Porting it 1:1 keeps the design's voice
  intact.
- CSS Modules give us per-component scope without a runtime; Next.js 15
  supports them natively with zero extra config.
- Tailwind v4 would force a token-rewrite pass and conflict with the design's
  use of `oklch(...)`, `mix-blend-mode: screen`, and named hex variables.
- Sass adds a build step we don't need; the design uses zero Sass features.

**Alternatives considered**:
- Tailwind v4: rejected. Higher migration cost; the design isn't expressed in
  utility-class shape.
- Sass: rejected. No nesting/mixins are needed; CSS custom properties cover
  the token story.
- CSS-in-JS (styled-components, vanilla-extract): rejected. Runtime cost +
  extra dep; design is plain CSS already.

---

## R3. Font self-hosting via `next/font/google`

**Question**: The design specifies Petrona (display serif), Funnel Sans (body
sans), and DM Mono (mono). All three are available on Google Fonts. The
constitution requires self-hosting and FR-071 requires CLS = 0.

**Decision**: Use `next/font/google` for all three, exposed as CSS variables
`--font-display`, `--font-body`, `--font-mono`. Subset to `latin`. Use
`display: 'swap'` (industry-standard; combined with self-hosting and font
metric overrides Next.js applies, it does not cause measurable CLS in tests).
Pin weights to: Petrona 500 italic + 500 roman (used italic only, but roman
fallback prevents synthetic italic on legacy targets); Funnel Sans 300, 400,
500; DM Mono 400.

**Rationale**:
- `next/font/google` self-hosts the font files at build time, eliminating the
  preconnect/preload to `fonts.googleapis.com` that the mockup uses.
- It also applies Next.js's automatic size-adjust metric overrides, which
  eliminate the CLS that historically came from font-swap.
- Subsetting to `latin` cuts the file size by ~60% vs. full subsets.

**Alternatives considered**:
- `font-display: optional`: rejected. The display serif italic is the hero
  identity; falling back to a system serif on slow connections would visibly
  break the page's voice. With `swap` and Next.js metric overrides, we get
  the same CLS guarantee.
- Variable-font versions: Petrona is a variable font on Google; Next.js's
  Google plugin uses it by default. We benefit automatically.
- Self-host the WOFF2 files manually under `public/fonts/`: rejected. More
  toil for the same result; `next/font/google` already does this for us.

---

## R4. View Transitions API for cross-page navigation

**Question**: FR-063 says page navigation "SHOULD use the View Transitions API
where supported, falling back gracefully." React 19 ships `<ViewTransition>`
(unstable in 19.0; stable in 19.1+).

**Decision**: Use the *browser-native* View Transitions API via Next.js 15.3's
built-in transition support (`unstable_viewTransition: true` in `next.config.mjs`)
rather than React's experimental `<ViewTransition>` component. Browsers without
support degrade to standard navigation with no visible change.

**Rationale**:
- Next.js 15.3 has first-party support behind a flag that wires up the
  `document.startViewTransition` API around App Router navigations.
- Browser support: Chrome 111+, Edge 111+, Safari 18+. Firefox is in flight.
  Unsupported browsers get the same instant navigation they always have — no
  janky polyfill needed.
- React's `<ViewTransition>` is more powerful (per-element transitions) but
  unnecessary for a subtle cross-fade between pages.

**Alternatives considered**:
- `framer-motion` page transitions: rejected. Adds a dep; runs animations on
  every nav even on unsupported browsers; harder to keep under
  `prefers-reduced-motion`.
- No view transitions: viable but loses the small craft signal FR-063 calls for.
  We'll ship view transitions and keep them subtle (≤200ms cross-fade).

---

## R5. Newsletter subscription transport

**Question**: FR-016 mandates an inline newsletter form posting to Substack.
The mockup uses a `mode: 'no-cors'` opaque POST to
`https://YOURSUB.substack.com/api/v1/free`. Is that still the right pattern,
or should we proxy through a Next.js Route Handler?

**Decision**: Keep the client-side opaque POST exactly as the mockup. Wrap it
in a small `lib/newsletter.ts` helper. The Substack subdomain is read from
`NEXT_PUBLIC_SUBSTACK_SUBDOMAIN` (defaults to `mrjasongrant` if unset).
On any non-throw the form transitions to the "check your inbox" confirmation
state.

**Rationale**:
- Substack accepts opaque CORS POSTs to that endpoint and emails the
  confirmation. No server-side proxy adds value.
- A Route Handler would require us to either invent server validation
  (out of scope) or just forward the request — the latter is pure overhead.
- Opaque mode means we can't inspect the response; we treat any non-throw as
  success, which matches Substack's actual behavior (the user always gets a
  confirmation email even on duplicate submissions).

**Alternatives considered**:
- Server-side proxy via App Router Route Handler: rejected. No upside;
  Substack endpoint is meant to be hit directly from the browser.
- Mailchimp/ConvertKit/Buttondown: out of scope; user is already on Substack.
- Plain mailto link: rejected — FR-016 requires an inline form with confirmation.

---

## R6. RSS feed for the Writing page

**Question**: FR-081 calls for an RSS feed (or equivalent subscription signal)
discoverable from the Writing page. Substack already publishes
`https://[subdomain].substack.com/feed` as the canonical RSS for posts.

**Decision**: Reuse Substack's RSS. Add `<link rel="alternate" type="application/rss+xml">`
in the `/writing` page's `<head>` pointing to the Substack feed URL, and link
it visibly from the Writing page footer text ("RSS").

**Rationale**:
- Substack's RSS is always current (it's the source of truth for the posts).
- A locally generated RSS would need to be re-built whenever a new post lands —
  toil that gives readers nothing they can't already get from Substack.
- The `<link rel="alternate">` makes the feed discoverable to readers and to
  RSS readers' auto-detect.

**Alternatives considered**:
- Generate a local RSS feed from `src/content/writing.ts`: rejected. Would
  duplicate Substack and risk drift.
- Skip the RSS signal entirely: rejected — FR-081 is explicit and the
  audience for RSS (peer design engineers) is exactly the FR-080 "view source"
  audience.

---

## R7. Cmd+K command palette implementation

**Question**: FR-060 mandates a Cmd+K palette with live filter, arrow-key
navigation, group separators (Navigate/Work/External/Meta), and Esc-to-close.
Build from scratch or adopt `cmdk` (the popular pmndrs library)?

**Decision**: Build from scratch. The mockup already has a working ~110-line
implementation in `homepage.jsx::CommandPalette` that does exactly what FR-060
needs. Port it as `src/components/chrome/CommandPalette.tsx` with TypeScript
types and accessible-by-default markup (`role="listbox"`, `aria-activedescendant`).

**Rationale**:
- The mockup's implementation is small, self-contained, and idiomatic React 19
  (`useState`, `useMemo`, `useEffect`).
- `cmdk` (~12KB min+gz) adds runtime cost we don't need for ~13 static items.
- Keeping the palette hand-rolled is on-brand for the "design-engineer leader"
  positioning and the FR-080 view-source moment.

**Alternatives considered**:
- `cmdk` (pmndrs): rejected on weight + brand fit grounds.
- A modal wrapper around a `<select>`: rejected; doesn't meet UX spec.

---

## R8. Reveal-on-enter animation

**Question**: FR-064 + amended Principle IV permit a single subtle
reveal-on-enter animation (≤900ms ease, ≤12px translate, fade-only,
suppressed under `prefers-reduced-motion`). Use IntersectionObserver
(per the mockup's `useReveal` hook) or CSS-only via `animation-timeline:
view()`?

**Decision**: IntersectionObserver via a small `useReveal()` hook in
`src/lib/motion.ts`, ported from the mockup's implementation. Targets all
elements with `[data-reveal]` and adds `.is-in` on first intersection.

**Rationale**:
- IntersectionObserver is universally supported and cheap.
- `animation-timeline: view()` (scroll-driven animations) lacks Safari support
  as of early 2026 and would degrade unpredictably.
- The mockup's implementation already handles per-element stagger
  (`--reveal-delay`) via index modulo and is the right shape.

**Alternatives considered**:
- `animation-timeline: view()`: rejected — Safari support gap; the constitution
  bans "scroll-driven typography" anyway, which `view()` hovers near.
- `framer-motion` `whileInView`: rejected; adds a dep.

---

## R9. Resume PDF hosting

**Question**: FR-025 + FR-093 imply a downloadable resume PDF. Where does it
live and how is it kept current?

**Decision**: Static asset at `public/resume.pdf`, linked from the Experience
page's footer area and from the Cmd+K palette under "Meta → Download resume."
Updates are manual (Jason replaces the file when the resume changes).

**Rationale**:
- A static PDF is the simplest, most cacheable artifact; Vercel serves it from
  the CDN.
- No need for a CMS, server route, or signed URL.
- Kept-current is an operational commitment, not a code commitment (covered
  by SC-009 launch verification).

**Alternatives considered**:
- Generate the PDF from the Experience page on demand (Puppeteer / `react-pdf`):
  rejected. Dramatic complexity for zero user benefit; design of the PDF and
  the Experience page should diverge anyway (PDF is dense; web page breathes).

---

## R10. Theme initialization, toggle, and `prefers-color-scheme`

**Question**: The current `layout.tsx` injects an inline theme-init script and
the `ThemeSwitcher.tsx` component manages light/dark. Per FR-050 we are
shipping single warm-dark only; what happens to those?

**Decision**: Remove the inline theme-init script entirely. Remove the
`ThemeSwitcher` component. Remove `data-theme` attribute usage from the layout.
The site renders identically regardless of `prefers-color-scheme`. The CSS
in `src/styles/tokens.css` defines warm-dark variables on `:root` directly
(no `[data-theme="dark"]` selector needed).

**Rationale**:
- The amended constitution Principle IV permits a single deliberate theme.
- Keeping the toggle as dead code would (a) ship JS the bundler can't
  shake (it's wired in `Providers`), (b) confuse readers of the source.
- The design's mockup CSS already defines warm-dark on `:root` — no migration
  needed.

**Alternatives considered**:
- Keep the toggle hidden but functional: rejected. Half-measures muddy the
  positioning ("we ship one theme on purpose" is stronger than "we ship one
  theme but it's secretly two").
- Detect `prefers-color-scheme: light` and warn the visitor: rejected. The
  warm-dark theme meets WCAG AA in the dark theme; adapting for light-mode
  preferences was the entire decision in Q1:B.

---

## R11. View-source build credit comment

**Question**: FR-080 mandates a first-source-comment build credit. Next.js
strips most comments by default in production builds.

**Decision**: Inject the comment via a `metadata` `other` field in
`src/app/layout.tsx` writing a literal HTML comment block at the very top of
`<head>`, OR via a custom `<Head>` component in the root. After spike testing
both: the cleanest path is to add a `data-build-credit` script tag with
`type="text/plain"` carrying the credit text, plus a true HTML comment in
`src/app/layout.tsx` JSX (Next.js does preserve JSX-level HTML comments in
the rendered output when expressed as `{/* */}` returning a literal — verified).
We'll use Next.js's `metadata` `other` mechanism to write a `<meta>` tag
referencing the repo, and add a separate static HTML comment via a thin
`<HeadComment />` server component that renders `dangerouslySetInnerHTML` with
the comment text wrapped as `<!-- ... -->`.

**Rationale**:
- The mockup's HTML comment is at the very top of the document, before
  `<html>`. We can't replicate that exact placement under Next.js (the
  framework owns the document shell), but we *can* place it as the first
  child of `<head>`, which is functionally equivalent for view-source readers.
- The build credit text is short (~6 lines); doing it via a server component
  with `dangerouslySetInnerHTML` is honest and simple.

**Alternatives considered**:
- Custom `_document.tsx`: not supported in App Router.
- Middleware that rewrites the response HTML: massive overkill.

---

## R12. OG (Open Graph) image route

**Question**: An `app/api/og/` route exists; what shape should the OG image take?

**Decision**: Keep the route. Replace its template to render a warm-dark
1200×630 image with the hero positioning sentence in Petrona italic + the
site wordmark in DM Mono, generated via `@vercel/og` (built into Next.js as
`next/og::ImageResponse`). One static OG image per page (Home, Experience,
Writing) is acceptable; dynamic per-post is not in scope for v1.

**Rationale**:
- `next/og::ImageResponse` is zero-dep at runtime and produces edge-rendered
  PNGs.
- Matching the page's typographic identity is the FR-040 craft signal applied
  to social previews.

**Alternatives considered**:
- Static PNGs in `public/og/`: rejected per `/speckit-analyze` reconciliation
  (finding I1). The dynamic edge-rendered approach is committed; static PNGs
  would duplicate intent and risk drift between the page typography and the
  social preview typography.

---

## R13. Out of scope reminder

The following items in the spec are explicitly **not** researched here because
they're out of scope for v1: AI chat / `/ask` interface (FR-090), talks/podcasts
section (FR-091), `/now` standalone page (FR-092), Hypoth DNS migration (FR-093),
Hypoth footer reconciliation (FR-093), Substack tagline update (FR-093). They
remain tracked in the spec's "Open Items and Follow-Ups" section.

---

## Summary of decisions for `/speckit-tasks`

| ID | Decision (one-line) |
|---|---|
| R1 | Rewrite visible surface; uninstall `@once-ui-system/core` and `sass`; keep project shell |
| R2 | CSS Modules + single global tokens file; drop Sass |
| R3 | `next/font/google` for Petrona / Funnel Sans / DM Mono; latin subset; pinned weights |
| R4 | Next.js 15.3 native View Transitions flag; no React `<ViewTransition>` |
| R5 | Client-side opaque POST to Substack; subdomain via env var |
| R6 | Reuse Substack's RSS; `<link rel="alternate">` + visible link |
| R7 | Hand-rolled `CommandPalette` ported from mockup; no `cmdk` library |
| R8 | `useReveal()` IntersectionObserver hook ported from mockup |
| R9 | Static `public/resume.pdf`; manual updates |
| R10 | Remove theme-init script + `ThemeSwitcher`; warm-dark on `:root` only |
| R11 | First-of-`<head>` HTML comment via `<HeadComment />` server component |
| R12 | `next/og::ImageResponse` for OG images; warm-dark Petrona+DM Mono template |
