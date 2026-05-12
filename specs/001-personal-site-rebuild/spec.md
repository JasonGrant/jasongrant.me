# Feature Specification: jasongrant.me Rebuild

**Feature Branch**: `001-personal-site-rebuild`
**Created**: 2026-05-11
**Status**: Draft
**Input**: User description: Rebuild the personal portfolio site (jasongrant.me) to position
Jason Grant as a design engineering leader during an 18-month VP search. Three pages
(Home, Experience, Writing), strict design-engineer craft constraints, WCAG AA and
Lighthouse 95+ as pass/fail gates, with a finalized warm-dark visual design supplied
as `homepage.jsx` + `styles.css` mockup assets.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recruiter / hiring exec landing on the homepage (Priority: P1)

A recruiter or hiring executive who has never met Jason arrives on the homepage from
LinkedIn, an email intro, or a search result. They have approximately 30 seconds before
they decide whether to keep reading or close the tab. In that window the page must
communicate the positioning ("design leader who ships production code, leads at Hi
Marley, founded an AI products studio called Hypoth") without scrolling, and the visual
craft of the page must itself be evidence for the claim.

**Why this priority**: This is the highest-leverage moment in the entire 18-month VP
search and the single screen that does ~80% of the site's job. Every other page is
optional context for visitors who have already decided to keep reading.

**Independent Test**: Show the homepage to five unaffiliated reviewers (peer design
leaders or recruiters) without context. After 30 seconds, ask each to describe in one
sentence what kind of role Jason is targeting. At least four out of five should
describe a senior design leadership role with a design-engineering or AI-native
emphasis. No reviewer should describe him as a generalist or as "side hustler with a
day job."

**Acceptance Scenarios**:

1. **Given** the homepage is loaded on a 1440px-wide desktop browser, **When** a first-time
   visitor scans for 30 seconds, **Then** the hero positioning sentence, the "now"
   freshness signal, and at least the first selected-work entry (Hi Marley) are visible
   without scrolling.
2. **Given** the homepage is loaded on a 375px-wide mobile browser, **When** the same
   visitor scans for 30 seconds, **Then** the hero positioning sentence and the
   updated-this-month signal remain immediately legible and the work shelf is reachable
   with a single thumb scroll.
3. **Given** the visitor has accessibility preferences enabled (reduced motion, larger
   text, screen reader), **When** they load the homepage, **Then** the same positioning
   message arrives without animation flourishes and reads correctly to assistive tech.
4. **Given** the visitor is using only a keyboard, **When** they tab through the
   page, **Then** every interactive element receives a visible focus indicator in a
   logical reading order and the command palette can be opened and dismissed with
   keyboard alone.

---

### User Story 2 - Visitor doing a 5-minute deep-dive on Experience (Priority: P2)

A visitor who was convinced enough by the homepage to want proof clicks through to the
Experience page. They are looking for a chronological, scan-friendly resume-style page
with quantified outcomes for each role, presented with the same craft as the homepage.
The page must read as a body of work, not a wall of text.

**Why this priority**: Without this page, the homepage's claims have no inspectable
backing. With it, the recruiter can verify the spike before scheduling a conversation.

**Independent Test**: A reviewer who has read the homepage navigates to `/experience`
and describes, in one sentence per role, what Jason did and what changed because of it.
Every role they describe should include at least one specific outcome (a number, a
named system, or a named enterprise customer where appropriate).

**Acceptance Scenarios**:

1. **Given** the Experience page is loaded, **When** the visitor scans the page, **Then**
   roles appear in reverse chronological order and each entry shows: organization, title,
   date range, optional reporting line, and 2–4 outcome-focused bullets.
2. **Given** the visitor is interested in founder work, **When** they reach the Hypoth
   entry, **Then** Hypoth appears as a top-level entry equal in weight to Hi Marley
   (not buried in an "other experience" section), with experiments listed beneath.
3. **Given** the visitor wants the formal artifact, **When** they look for a downloadable
   resume, **Then** a PDF is reachable from the Experience page or footer.

---

### User Story 3 - Reader who wants to dig into the writing (Priority: P3)

A visitor (often a peer design leader or podcast host) wants to read Jason's published
thinking. They click through to the Writing page and find a curated "Selected" list at
the top followed by a complete chronological archive. Each post links out to Substack;
the personal site is the curation layer, Substack is the distribution layer.

**Why this priority**: This is the audience that converts into long-term professional
relationships and inbound opportunities, but it is a smaller and less time-sensitive
audience than the recruiter scan in P1.

**Independent Test**: A reviewer navigates to `/writing` and is asked which five posts
Jason considers most representative of his thinking. They should be able to identify
the Selected list without ambiguity, and the full archive should let them count every
post Jason has published.

**Acceptance Scenarios**:

1. **Given** the Writing page is loaded, **When** the visitor scans it, **Then** the
   Selected (curated) section appears above the Archive (chronological) section.
2. **Given** the visitor clicks any post title, **When** the click resolves, **Then**
   they land on the corresponding Substack post in a new context (new tab) so that the
   personal site remains in the previous tab.
3. **Given** the visitor wants to subscribe, **When** they see the inline newsletter
   signup, **Then** they can submit their email and receive a confirmation cue without
   leaving the page.

---

### User Story 4 - Power user / peer design engineer using the keyboard palette (Priority: P4)

A peer designer or design-engineer (the kind of audience who notices Cmd+K palettes,
view-source comments, and RSS feeds) lands on the site and reaches for the keyboard.
They expect the site itself to behave like a small piece of well-made software.

**Why this priority**: This audience is small but disproportionately influential — they
share, they introduce, they recommend. They are also the audience least likely to be
moved by the prose alone; they are moved by the experience of using the page.

**Independent Test**: A peer reviewer presses `Cmd+K` (or `Ctrl+K`) on any page,
navigates with arrow keys, and reaches a target without touching the mouse. The
view-source / colophon experience should reward them with a credible build credit and
a path to the public repo.

**Acceptance Scenarios**:

1. **Given** the site is loaded on any page, **When** the visitor presses `Cmd+K` (Mac)
   or `Ctrl+K` (Windows/Linux), **Then** a command palette opens, focuses an input,
   and lists navigation, work, external-link, and meta groups.
2. **Given** the palette is open, **When** the visitor types a query, **Then** items
   filter live; arrow keys move selection; `Enter` activates the selected item; `Esc`
   closes the palette.
3. **Given** the visitor opens "View source" in the browser, **When** they read the
   first comment in the source, **Then** they find a build credit and an email/repo
   pointer that align with the site's positioning.

---

### Edge Cases

- A visitor with `prefers-reduced-motion: reduce` MUST receive the same content
  without the cursor-tracked background halo, the animated grain texture, or the
  scroll-reveal entrance animations.
- A visitor whose browser has not yet loaded the display serif font MUST not see a
  flash of unstyled text or a layout shift when the font arrives (CLS must remain 0).
- A visitor on a slow connection MUST receive a usable, readable page in under 1
  second on a cold cache; non-essential decoration may degrade gracefully.
- A visitor who arrives via deep-link to a section anchor (`#now`, `#work`,
  `#hi-marley`, etc.) MUST land on the correct section with appropriate scroll
  offset and have the left-rail / nav reflect the active section.
- A visitor whose viewport is below 980px MUST not see the fixed left-rail (which is
  desktop-only); navigation must remain available via the top bar and command palette.
- A visitor who attempts to subscribe to the newsletter with an invalid email MUST
  see an inline validation cue rather than a silent failure or a server-error page.
- A returning visitor MUST see the "updated [Month Year]" line reflect the current
  month within reason; a date more than ~6 weeks stale on production is a content bug.

## Requirements *(mandatory)*

### Functional Requirements

#### Information architecture

- **FR-001**: The site MUST consist of exactly three primary pages: Home (`/`),
  Experience (`/experience`), and Writing (`/writing`).
- **FR-002**: The site MAY include a `/colophon` page that names the typefaces,
  framework, hosting, and design tokens used.
- **FR-003**: The site MUST NOT include a portfolio page, an `/about` page, a
  `/contact` page, or any page that exposes proprietary screens from operator roles.
- **FR-004**: A site-wide top bar MUST appear on every page, containing the site
  wordmark (linking home), a command-palette trigger, and a portrait avatar.
- **FR-005**: Footer links MUST appear on every page and MUST include GitHub,
  LinkedIn, Substack, and an email address (`hello@jasongrant.me`).

#### Homepage content

- **FR-010**: The homepage hero MUST display the positioning sentence: "I'm a
  design leader who ships production code. I lead design at Hi Marley and founded
  Hypoth, an AI products studio." Two phrases ("ships production code." and
  "Hypoth,") MUST receive italic display-serif emphasis and accent color.
- **FR-011**: A context paragraph MUST follow the hero, naming Hi Marley, Klaviyo,
  Vertex, and Hypoth with inline links to their respective in-page anchors or
  external sites.
- **FR-012**: A "Now" block MUST appear above the work shelf, styled as a terminal
  fence (header reading `~/now` and `updated [Month Year]`), with at least three
  current-status lines.
- **FR-013**: The "Selected work" section MUST list, in this order, exactly four
  top-level entries: Hi Marley, Hypoth (with Wren and Olllo nested as
  experiments), Klaviyo, and Vertex Pharmaceuticals.
- **FR-014**: Each top-level work entry MUST display organization, role, date range,
  a short outcome paragraph, and (where applicable) a "Case study" or "Site" link.
- **FR-015**: The "Selected writing" section MUST list exactly five posts (titles
  and dates) followed by an "All writing on Substack →" link.
- **FR-016**: An inline newsletter subscription form MUST appear on the homepage
  Writing section, posting to the Substack subscribe endpoint, and MUST display a
  confirmation cue on success.

#### Experience page content

- **FR-020**: The Experience page MUST present roles in a single column, reverse
  chronological order, in the pattern of Cap Watkins / Diana Mounter / Karri
  Saarinen text-first proof pages.
- **FR-021**: Each Experience entry MUST contain: role title, organization, date
  range, optional reporting line where it adds credibility, and 2–4 outcome-focused
  bullets quantified where possible.
- **FR-022**: Hi Marley and Klaviyo entries MAY cite enterprise customer names
  (e.g., USAA, Allstate) where the citation strengthens the outcome.
- **FR-023**: Hypoth MUST appear as a top-level Experience entry alongside
  Hi Marley, dated 2025–present, NOT in an "Other experience" section.
- **FR-024**: The architecture-firms 1997–2011 entry MUST be cut from the
  Experience page (a single line in a footer bio is acceptable if used at all).
- **FR-025**: A downloadable resume PDF MUST be reachable from the Experience page
  or footer for recruiters who want the formal artifact.

#### Writing page content

- **FR-030**: The Writing page MUST present a two-tier structure on a single page:
  a "Selected" section listing the same five posts curated on the homepage with
  one-line descriptions, followed by an "Archive" section listing every Substack
  post chronologically with title and date only.
- **FR-031**: Every Writing entry on `/writing` MUST link to the corresponding
  Substack post.
- **FR-032**: The Writing page MUST NOT mirror Substack post bodies into local
  MDX in v1.

#### Visual design system

- **FR-040**: The site MUST use a three-voice typography system: a display serif
  used italic for hero and major emphasis (Petrona), a body sans for paragraphs
  and UI (Funnel Sans), and a mono for metadata, dates, code, and small caps
  labels (DM Mono). System UI fallbacks MUST be defined in each font stack.
- **FR-041**: Active type sizes MUST be limited to four scales: hero display
  (~58px at desktop), section headings, body (~15–17px), and meta-mono (~10–13px).
- **FR-042**: Content measure MUST be capped at ~720px page width on desktop,
  single column, left-aligned.
- **FR-043**: A teal accent color MUST be the only chromatic accent (defined in
  oklch space; approximately `oklch(0.78 0.10 195)`); the rest of the palette is
  warm-dark ink-on-paper.
- **FR-044**: Section dividers, work entries, and writing rows MUST use hairline
  rules (1px, low-contrast) only — no cards or bordered boxes around content
  blocks except where specified in FR-046.
- **FR-045**: Banned visual patterns: gradients, drop shadows, hero background
  images, decorative illustration, patterned backgrounds, scale-transform or
  bounce hover animations, custom cursors, parallax, scroll-triggered animations
  beyond a single subtle reveal-on-enter.
- **FR-046**: Two deliberate framed devices ARE permitted as exceptions to FR-044:
  the "now" terminal fence and the inline newsletter card. Both use a single
  hairline border and an elevated background tone (`--bg-elev`); no shadows.
- **FR-047**: A subtle background ambient texture MUST be used: a low-opacity
  cursor-tracked radial halo (≤~4% opacity at peak) and a low-opacity animated
  grain overlay (≤~5% opacity). Both MUST be fully suppressed under
  `prefers-reduced-motion: reduce`: the halo's pointer-tracking listener MUST
  NOT be attached and the grain's animation MUST NOT run. Per amended
  constitution Principle IV (v1.1.0), Subtle-craft exceptions, *Ambient
  background texture* clause.

#### Color modes

- **FR-050**: The site MUST ship a single warm-dark theme as v1 (background
  `#15120D` "paper soaked in oil," ink `#ECE3CF`, teal accent). A
  `prefers-color-scheme: light` system preference MUST NOT trigger an alternate
  theme; the warm-dark surface is presented to all visitors. Per amended
  constitution Principle IV (v1.1.0), single-theme allowance: this is the
  deliberate design direction, not an unfinished second mode. A future v2 light
  theme is not committed and not in scope for this rebuild.
- **FR-051**: The shipped warm-dark theme MUST meet WCAG 2.1 AA contrast
  (4.5:1 for body text, 3:1 for large text and non-text UI) for every text and
  UI surface, verified with axe DevTools (or equivalent) before launch.

#### Interaction

- **FR-060**: A command palette MUST be available on every page, opened by `Cmd+K`
  (Mac) or `Ctrl+K` (Windows/Linux), and via a clickable trigger in the top bar
  and footer. It MUST support live filter, arrow-key navigation, `Enter` to
  activate, `Esc` to close, and group items into Navigate / Work / External /
  Meta categories.
- **FR-061**: A fixed left-rail section indicator MUST appear on the homepage at
  viewports ≥980px, showing the active section (Now / Selected work / Writing).
  Below 980px it MUST be hidden.
- **FR-062**: All interactive elements MUST display a visible focus indicator and
  a hover state (subtle: underline appears or color shifts to accent; no scale
  transforms).
- **FR-063**: Page navigation between Home / Experience / Writing SHOULD use the
  View Transitions API where supported, falling back gracefully on browsers that
  lack support.
- **FR-064**: Section labels and content blocks MAY use a single subtle
  reveal-on-enter animation (~700ms ease) on first scroll into view, suppressed
  under `prefers-reduced-motion`.

#### Performance and accessibility (gating)

- **FR-070**: Every shipped page MUST score ≥95 on each of Lighthouse Performance,
  Accessibility, Best Practices, and SEO, on both mobile and desktop profiles,
  measured against the production deployment before any release that changes
  user-visible code (per project constitution Principle II).
- **FR-071**: Cumulative Layout Shift (CLS) MUST be 0 on every page; fonts MUST
  be self-hosted with proper preload, or loaded with `font-display: optional`.
- **FR-072**: The homepage MUST load (Largest Contentful Paint) in under 1 second
  on a cold cache and a mid-tier (4G-equivalent) connection.
- **FR-073**: The site MUST be fully operable by keyboard alone, with logical tab
  order and visible focus rings on every interactive element.
- **FR-074**: The site MUST use real semantic HTML (`<nav>`, `<main>`, `<article>`,
  `<header>`, `<footer>`) and a single, logical heading hierarchy per page,
  verified with VoiceOver smoke test on macOS Safari.
- **FR-075**: All non-decorative images MUST have descriptive `alt` text;
  decorative SVGs MUST be marked `aria-hidden="true"`.
- **FR-076**: User preferences (`prefers-reduced-motion`, `prefers-color-scheme`
  where applicable) MUST be honored.

#### Repo and credibility signals

- **FR-080**: The source repository MUST be public on GitHub; the first comment
  in the page source MUST contain a build credit, a repo link, and an email
  contact, consistent with the site's positioning.
- **FR-081**: The site MUST publish an RSS feed or equivalent subscription signal
  for the Writing page (or rely on Substack's RSS, with a discoverable link).

#### Out of scope (explicit)

- **FR-090**: An AI chat / `/ask` interface is OUT OF SCOPE for this rebuild.
  See follow-up section "Open items and follow-ups" — deferred as Hypoth
  experiment H-04 candidate.
- **FR-091**: A talks/podcasts section is OUT OF SCOPE until at least one talk
  or podcast has aired.
- **FR-092**: A separate `/now` page (Derek Sivers style) is OUT OF SCOPE; the
  homepage Now block covers it.
- **FR-093**: Migrating Hypoth's domain (`hypoth.vercel.app` → `hypoth.ai`),
  reconciling the Hypoth footer founder framing, and updating the Substack
  tagline are pre-launch cleanup items but are NOT changes to this site's
  codebase; tracked separately in the rebuild plan §7.

### Key Entities

- **Page**: One of three top-level routes (Home, Experience, Writing) plus the
  optional Colophon. Each page has a route, a heading hierarchy, and a set of
  sections.
- **Work entry**: A single role on the homepage Selected Work shelf and on the
  Experience page. Attributes: organization, mark/logo, role, date range,
  description, optional reporting line, optional sublist of nested entries,
  optional case-study link.
- **Hypoth experiment (sub-entry)**: A nested item under the Hypoth entry.
  Attributes: name, external URL, hypothesis index (e.g., H-01, H-02), stage
  tag (e.g., "in beta"), short description, optional case-study link.
- **Writing entry**: A published Substack post surfaced on the Home and Writing
  pages. Attributes: title, date, external URL, optional curated description.
- **Now line**: A single bullet inside the homepage Now block. Attributes: text,
  optional link, parent updated-month timestamp.
- **Command palette item**: A keyboard-actionable target. Attributes: group
  (Navigate / Work / External / Meta), label, hint, action handler.
- **Newsletter submission**: An email captured by the inline form and forwarded
  to the Substack subscribe endpoint.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 4 of 5 unaffiliated reviewers, after a 30-second view of
  the homepage, describe Jason as a senior design leader with a design-engineering
  or AI-native emphasis (positioning recall test, qualitative).
- **SC-002**: Every shipped page scores ≥95 on each of Lighthouse Performance,
  Accessibility, Best Practices, and SEO, on both mobile and desktop, measured
  against the production deployment.
- **SC-003**: An automated accessibility scan (axe DevTools or equivalent)
  reports zero serious or critical violations on every shipped page in the
  shipped color theme.
- **SC-004**: Cumulative Layout Shift is 0 on every page, measured on both
  cold-cache and warm-cache loads.
- **SC-005**: The homepage's Largest Contentful Paint is under 1 second on a
  mid-tier (~4G-equivalent) connection with a cold cache.
- **SC-006**: 100% of interactive elements are reachable and operable using
  keyboard alone, with a visible focus indicator on each.
- **SC-007**: A first-time visitor can identify (a) Jason's current role,
  (b) his founder studio, (c) at least one published piece of writing, all
  within 60 seconds of landing on the homepage, without scrolling past one
  viewport on a 1440×900 desktop browser.
- **SC-008**: The visible "updated [Month Year]" timestamp on the homepage Now
  block is no more than 6 weeks behind the current date on production at any
  time after launch (operational freshness commitment).
- **SC-009**: The Experience page resume PDF link resolves to a current PDF
  (no broken downloads, no 404s) verified at launch.
- **SC-010**: The command palette opens via `Cmd+K` / `Ctrl+K` on every page
  and reaches every primary navigation target, every work entry anchor, and
  every external destination listed in the footer.

## Assumptions

- **Tech stack is fixed by the project constitution**: Next.js 15 (App Router) +
  React 19, hosted on Vercel, fonts self-hosted via `next/font`. The supplied
  mockup uses an in-browser Babel transform and CDN React for prototype
  convenience; the production build will not.
- **Design assets are the latest source of truth**: The mockup zip provided on
  2026-05-11 (`/Users/jasongrant/Downloads/Personal Site.zip`, variant "vc") is
  more recent than the rebuild plan's font-stack recommendation and supersedes
  it. Petrona / Funnel Sans / DM Mono replace the plan's earlier suggestion of
  Instrument Serif / Geist / JetBrains Mono.
- **Hypoth structure on the homepage**: Wren and Olllo are presented as nested
  experiments under the Hypoth entry on the homepage (per design), not as
  separate top-level entries (per earlier rebuild plan). The Experience page
  may treat them differently.
- **Newsletter target subdomain**: The inline newsletter form will POST to
  `https://[substack-subdomain].substack.com/api/v1/free`. The exact subdomain
  is a launch-time configuration value (e.g., `designingforward`), not a spec
  decision. A `mode: 'no-cors'` opaque POST is the established pattern.
- **Build-credit copy**: The mockup's "Built by hand · React + plain CSS, no
  build step" line will be rewritten to be truthful for a Next.js production
  build (e.g., "Built by hand · Next.js · view source") so the colophon is not
  a misleading claim.
- **No automated functional tests**: Per constitution Principle III, this
  project explicitly does not require unit, integration, or end-to-end test
  suites. Verification is via Lighthouse + axe + manual keyboard / screen-reader
  passes + TypeScript type-check + Biome.
- **Substack is the canonical home for posts**: Writing entries link out and
  are not mirrored into MDX on this site in v1.
- **Resume PDF**: Jason will provide an up-to-date resume PDF as a static asset
  to be hosted at a stable URL under the site (e.g., `/resume.pdf`).
- **Pre-launch cleanup items are tracked separately**: Hypoth DNS migration,
  Hypoth footer reconciliation, outbound link verification, and the Substack
  tagline update (rebuild plan §7) are launch prerequisites tracked outside
  this codebase and are not coded changes inside this spec.
- **Headshot asset**: Jason will provide a square portrait image (`assets/jason.jpeg`
  or equivalent) at sufficient resolution for a 48px avatar; the supplied
  `JasonHeadshot2025.jpeg` upload is acceptable for this purpose.

## Open Items and Follow-Ups (Tracked, Out of Scope for v1)

- **Three Fidelities Substack post**: Once published, becomes the `[Case study]`
  link from the Hi Marley row on the homepage. Until then the link is suppressed
  or marked "soon."
- **AI chat / `/ask` page (provisional Hypoth H-04)**: Deferred per rebuild plan
  §11; revisit after homepage rebuild and Three Fidelities post ship.
- **Talks / podcasts section**: Add when at least one talk or podcast appearance
  exists.
- **Additional Hi Marley case-study posts** (settings framework, app shell
  redesign): Live as Substack posts, not as portfolio pages on this site.
- **Press bio + headshot pack**: Prepare when the first conference talk lands.
