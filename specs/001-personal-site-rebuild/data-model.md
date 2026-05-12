# Phase 1 Data Model: jasongrant.me Rebuild

**Feature**: 001-personal-site-rebuild
**Date**: 2026-05-11

This site has no database. "Data" is hand-authored TypeScript content
modules under `src/content/` and the constraints they need to satisfy.
This document fixes the shape of those modules and the validation rules
that the page components rely on.

All types live at `src/types/content.ts`. Content modules live at
`src/content/*.ts` and are tree-shakeable, type-checked at build time
(strict TypeScript), and the *only* place where copy lives — page
components import them and render them.

---

## Entity: WorkEntry

Represents a single role on the homepage Selected Work shelf and on
the Experience page (which renders the long form).

```ts
export interface WorkEntry {
  /** URL anchor and DOM id, e.g. "hi-marley" */
  id: string;
  /** Organization name as displayed, e.g. "Hi Marley" */
  org: string;
  /** Optional URL when the org links out (e.g. Hypoth → hypoth.ai) */
  orgHref?: string;
  /** Optional logo/monogram component reference, e.g. "marley" | "hypoth" | "outline:K" */
  mark?: MarkRef;
  /** Role title, e.g. "Director of Product Design" */
  role: string;
  /** Optional reporting line for the Experience page, e.g. "reporting to CPO" */
  reportingLine?: string;
  /** Date range as displayed, e.g. "2025 — present" */
  dates: string;
  /** Single short description for the homepage row (markdown-lite: bold via **, links via [] not supported) */
  homeDescription: string;
  /** 2–4 outcome bullets for the Experience page */
  experienceBullets: string[];
  /** Optional related links (Case study, Site, etc.) */
  links?: WorkLink[];
  /** Optional nested experiments (Hypoth uses this for Wren / Olllo) */
  experiments?: HypothExperiment[];
}

export interface WorkLink {
  label: string;     // "Case study" | "Site" | …
  href: string;
  external?: boolean;
}

export type MarkRef =
  | { kind: "logo"; key: "marley" }                         // brand logo SVG
  | { kind: "monogram"; letter: string; style: "solid" | "outline" | "accent" };
```

**Validation rules**:

- `id` MUST be a non-empty kebab-case string and MUST be unique across the
  module. It maps directly to `<section id={...}>` and Cmd+K palette deep-links.
- `homeDescription.length` SHOULD be ≤ 320 characters (one short paragraph).
  Build will warn (not fail) above 400.
- `experienceBullets.length` MUST be in the range `[2, 4]` per FR-021.
- Each `experienceBullets[i].length` SHOULD be ≤ 280 characters.
- `experiments` MAY be present only on entries where `id === "hypoth"` (build
  asserts this — the design's Hypoth-as-parent structure is a feature decision,
  not a generic capability).
- `links` for Hi Marley MAY include a `Case study` entry; until the Three
  Fidelities post is published, it MUST either be omitted or marked
  `pending: true` and rendered as muted text per FR-014's parenthetical.

**Relationships**:

- `WorkEntry[]` is rendered in declared order on both Home and Experience.
- `WorkEntry.experiments[]` is rendered as a sub-list under its parent
  on Home only; on Experience the experiments may be linked but not nested
  (decided at component level).

---

## Entity: HypothExperiment

A nested studio experiment under the Hypoth WorkEntry.

```ts
export interface HypothExperiment {
  /** Hypothesis index, e.g. "H-01", "H-02" */
  index: string;
  /** Display name, e.g. "Wren", "Olllo" */
  name: string;
  /** External URL */
  href: string;
  /** Stage tag, e.g. "in beta", "shipped", "post-mortem" */
  stage: string;
  /** Single-line description */
  description: string;
  /** Mark/monogram for the chip */
  mark: MarkRef;
  /** Optional related links (Case study, etc.) */
  links?: WorkLink[];
}
```

**Validation rules**:

- `index` MUST match the regex `^H-\d{2}$` (matches Hypoth's hypothesis indexing).
- `name`, `href`, `stage`, `description` MUST all be non-empty.
- `description.length` SHOULD be ≤ 200 characters.

---

## Entity: WritingEntry

A published Substack post surfaced on the Home and Writing pages.

```ts
export interface WritingEntry {
  /** Post title as displayed */
  title: string;
  /** Display date string, e.g. "Apr 2026" */
  date: string;
  /** ISO 8601 date for sorting and `<time datetime="">`, e.g. "2026-04-15" */
  isoDate: string;
  /** Substack URL */
  href: string;
  /** Optional one-line description (used by SelectedList on /writing) */
  blurb?: string;
  /** True if this post is in the curated five */
  selected?: boolean;
}
```

**Validation rules**:

- `isoDate` MUST be a valid YYYY-MM-DD; build fails on invalid dates.
- The Selected list on Home and the Selected section on `/writing` MUST
  render the same five entries — those marked `selected: true`. Build
  asserts exactly five `selected: true` entries.
- `blurb.length` SHOULD be ≤ 160 characters.

**Relationships**:

- `WritingEntry[]` is sorted descending by `isoDate` for the Archive list on
  `/writing`.
- For the Home Selected Writing shelf, the *display* order matches the
  rebuild plan's curated ordering (not strict chronological), expressed in
  the content module via array order with `selected: true`.

---

## Entity: NowLine

A single bullet inside the Home Now block.

```ts
export interface NowLine {
  /** Plain text or a small inline structure */
  text: string;
  /** Optional bound link */
  href?: string;
  /** True if the link is external */
  external?: boolean;
  /** Optional emphasis on a specific noun (renders the noun in --ink) */
  emphasis?: string;
}
```

The Now block module (`src/content/now.ts`) also exports an `updated`
field:

```ts
export const updated: { month: string; year: string } = {
  month: "May",
  year: "2026",
};
```

**Validation rules**:

- `updated` MUST be present and SHOULD be no more than 6 weeks behind the
  current date on production (operational, per SC-008). Build does not
  enforce this — covered by quickstart `monthly checklist`.
- `text.length` SHOULD be ≤ 80 characters per line.
- The page renders `~/now` (path) on the left and `updated {month} {year}`
  on the right of the fence header, both lowercased.

---

## Entity: CommandPaletteItem

A single keyboard-actionable target in the Cmd+K palette.

```ts
export interface CommandPaletteItem {
  /** Visual + filter group */
  group: "Navigate" | "Work" | "External" | "Meta";
  /** Display label */
  label: string;
  /** Right-aligned hint, e.g. "jump", "↗", "copy" */
  hint: string;
  /** What happens on activation */
  action: PaletteAction;
}

export type PaletteAction =
  | { kind: "scroll-to"; targetId: string }                // anchor on current page
  | { kind: "navigate"; href: string }                     // internal route
  | { kind: "open-external"; href: string }                // window.open(_, "_blank")
  | { kind: "copy"; value: string }                        // navigator.clipboard.writeText
  | { kind: "view-source" };                               // window.open("view-source:" + location.href)
```

**Validation rules**:

- `group` MUST be one of the four enumerated values; the palette UI groups
  items in this order: Navigate, Work, External, Meta.
- `scroll-to` actions MUST reference a `targetId` that exists in the rendered
  document; this is enforced manually for v1 (a future task could codegen
  palette entries from page-side `id` registrations).
- For each `WorkEntry.id` there SHOULD be a corresponding `Work` group palette
  entry; build does not enforce, but the content review checklist does.

---

## Entity: NewsletterSubmission (transient)

Not persisted; included for completeness of the `/lib/newsletter.ts`
contract.

```ts
export interface NewsletterSubmission {
  email: string;
  // optional referrer captured client-side
  firstReferrer?: string;
}

export type NewsletterSubmitResult =
  | { state: "ok" }
  | { state: "validation-error"; reason: "empty" | "invalid-format" }
  | { state: "network-error"; message?: string };
```

**Validation rules**:

- `email` MUST match a permissive RFC 5322-ish regex on the client *before*
  the network call. The form `<input type="email" required>` provides the
  primary validation; the helper guards against programmatic submissions.
- A `state: "ok"` result on the opaque CORS POST means "no exception was
  thrown"; we cannot distinguish between Substack accepting and Substack
  silently rejecting. This is the established pattern.

---

## Site-wide content (`src/content/site.ts`)

```ts
export const site = {
  title: "jasongrant.me",
  authorName: "Jason Grant",
  email: "hello@jasongrant.me",
  baseURL: "https://jasongrant.me",
  github: "https://github.com/jasongrant/jasongrant.me",
  socials: {
    github: "https://github.com/jasongrant",
    linkedin: "https://www.linkedin.com/in/jasongrant",
    substack: "https://designingforward.substack.com",
    bluesky: "https://bsky.app/profile/jasongrant.me",
  },
  buildCredit: {
    // The literal text rendered into the first-of-<head> HTML comment per FR-080.
    headComment: [
      "Hi. You looked at the source — that's the design-engineering tell.",
      "This site is hand-rolled in Next.js 15 + React 19 with plain CSS.",
      "Repo: https://github.com/jasongrant/jasongrant.me",
      "If you're building at the intersection of design and code, reach out:",
      "hello@jasongrant.me",
    ].join("\n"),
    // Visible footer build credit per the design.
    footer: "Built by hand · Next.js · ",
  },
  newsletter: {
    name: "Designing Forward",
    cadence: "on Substack · ~monthly",
    pitch: "Notes on design leadership, AI-native product work, and the post-Figma craft. No spam, easy to leave.",
    // Subdomain is read from process.env.NEXT_PUBLIC_SUBSTACK_SUBDOMAIN at build time.
  },
} as const;
```

**Validation rules**:

- `email` MUST be a deliverable mailbox (operational; not enforced by build).
- All `socials.*` URLs MUST resolve at launch (FR-093 cleanup pre-launch
  link verification step).
- `buildCredit.headComment` MUST NOT contain `-->` (would close the comment
  early). Build assertion in the `<HeadComment />` component.

---

## Module index

| Module | Exports | Consumed by |
|---|---|---|
| `src/content/site.ts` | `site` | `RootLayout`, `Footer`, `<HeadComment>`, OG generator |
| `src/content/now.ts` | `nowLines: NowLine[]`, `updated: { month, year }` | `<NowBlock>` |
| `src/content/work.ts` | `workEntries: WorkEntry[]` | `<WorkShelf>` (Home), `Experience/page.tsx` |
| `src/content/writing.ts` | `writing: WritingEntry[]` | `<WritingShelf>` (Home), `Writing/page.tsx` |
| `src/content/palette.ts` | `paletteItems: CommandPaletteItem[]` | `<CommandPalette>` |

All five modules are imported as server-side modules (`Home/page.tsx` etc.
are React Server Components by default). The Cmd+K palette and Newsletter
form are the two `"use client"` islands.
