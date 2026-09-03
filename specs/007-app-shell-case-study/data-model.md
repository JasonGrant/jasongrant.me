# Data Model: App Shell Evolution at Hi Marley

**Phase 1 output.** The study reuses the existing `CaseStudy` DSL
(`src/content/studies/types.ts`) and adds one generic block kind plus a study-specific figure
registry. No runtime store; `tsc --noEmit` + build-time registry assertions are the validators.

## 1. DSL extension — the `figure` block

Add a new `ContentBlock` variant that mirrors the existing `demo`/`embedDemo` precedent: a
generic block that names a figure component the renderer looks up in a registry. The figure id
union is where this study's figures are declared — the same shape as the existing `DemoId`.

```ts
// types.ts — additive

/** Study-specific recreated/diagram figures. Extend this union per study; the
 *  renderer maps each id to a component in FIGURE_COMPONENTS. */
export type AppShellFigureId =
  | "context-strip"       // four-step sequenced thumbnails (beat 1)
  | "shell-before"        // real screenshot walkthrough of the old shell (beat 1b/2) — see D8a
  | "shell-after"         // recreated rail + details bar, resolved (beat 3)
  | "nav-footprint"       // annotated diagram: 10% → 2.5% / 8.5% (beat 3)
  | "details-space"       // annotated diagram: 62% → 100% (beat 3)
  | "risk-tiers";         // high / medium / low positional-memory illustration (beat 4)

export type FigureId = AppShellFigureId; // future studies widen this union

export interface FigureBlock {
  kind: "figure";
  id: string;
  figure: FigureId;
  /** Optional section heading; omit for a figure that rides under the prior prose. */
  heading?: string;
  /** Optional terse label for the section rail (only when heading is set). */
  navLabel?: string;
  /** Rendered above the figure at the reading measure. */
  intro?: RichText;
  /** Standout stat (reuses the existing callout treatment) — e.g. the two headline numbers. */
  callout?: { figure: string; text: string; source?: { label: string; href: string } };
  /** Figure caption, rendered below at reading measure. */
  caption?: string;
  /** Static description for no-JS / assistive tech when the figure animates (FR-019a, US2.3). */
  staticDescription: string;
}

export type ContentBlock =
  | ProseSection
  | ConceptDemoBlock
  | StudyWalkthroughSegment
  | EmailFlowBlock
  | FigureBlock;            // NEW
```

`ProseSection` is reused unchanged — its existing `callout`, `showTimeline`, and `image` fields
already cover the meta-block overview, the milestone timeline, and any incidental figure. The
two headline numbers use `FigureBlock.callout` (or `ProseSection.callout`) so they render in the
established large-figure treatment.

## 2. Renderer change — `StudyPage.tsx`

One new registry and one new block branch. The i18n `DEMO_COMPONENTS` map, block branches, and
player wiring are untouched.

```ts
// StudyPage.tsx — additive
import { ContextStrip } from "@/components/work/app-shell/ContextStrip";
import { ShellBeforeScreens } from "@/components/work/app-shell/ShellBeforeScreens";
// … ShellAfter, NavFootprintDiagram, DetailsSpaceDiagram, RiskTiers

const FIGURE_COMPONENTS: Record<FigureId, ComponentType> = {
  "context-strip": ContextStrip,
  "shell-before": ShellBeforeScreens,
  "shell-after": ShellAfter,
  "nav-footprint": NavFootprintDiagram,
  "details-space": DetailsSpaceDiagram,
  "risk-tiers": RiskTiers,
};

// in the blocks.map switch:
if (block.kind === "figure") return <FigureBlock key={block.id} block={block} />;
```

`FigureBlock` (the component) renders: optional `<h2>` (when `heading` set, so the rail picks it
up), `intro` rich text at reading measure, optional `callout`, the wide figure wrapper
(`.wide`), the looked-up figure component, an optional `<figcaption>`, and a `<noscript>` note
carrying `staticDescription` for any animated figure.

Section-rail note: `layout.tsx` currently derives the rail from `prose` blocks only. To let a
figure-only beat appear in the rail, either (a) give each beat a leading `prose` block (preferred
— every beat has narrative anyway), or (b) widen the rail filter to include `figure` blocks with
a `heading`. **Decision: (a)** — keeps `layout.tsx` untouched; each of the six beats opens with a
prose section, and figures hang beneath. Recorded so `/speckit-tasks` doesn't touch layout.tsx.

## 3. Figure kit inventory — `src/components/work/app-shell/`

All flat + token-based, except depth permitted inside `.replicaFrame` (research D5). Static
server components unless marked.

| Component | Kind | Depth? | Fictional data it carries |
|---|---|---|---|
| `ContextStrip` | schematic thumbnails | flat | four beat labels + one line each |
| `ShellBeforeScreens` | **real screenshots** (client, `ImageStepper`) | n/a — genuine product UI, not a recreation | five real screens from Jason's demo account (Lily Davenport et al., pre-existing test data) — see research D8a |
| `ShellAfter` | recreated product UI | `.replicaFrame` | icon rail, full-height details, common action area, fictional sample case + Ironline partner section |
| `NavFootprintDiagram` | annotated diagram | flat | 10% / 2.5% / 8.5% callouts, 1800×1169 basis note |
| `DetailsSpaceDiagram` | annotated diagram | flat | 62% / 100% callouts, 5 → 20+ categories note |
| `RiskTiers` | schematic cards | flat | high/medium/low tier examples (Create case, actions; consolidations; templates) |

`ShellBeforeScreens` renders `ImageStepper` (`src/components/work/app-shell/ImageStepper.tsx`) —
a client component (Back/dot-row/Next, identical control language to the i18n study's
`EmailTranslationFlow`) that steps through the five real screenshots in
`public/work/app-shell/shell-before-*.png`. It is the one figure in this study that is not a
recreation; see research D8a for why and under what constraint.

Optional light animation (research D4/D6), all reduced-motion-suppressed: `NavFootprintDiagram`
and `DetailsSpaceDiagram` may grow their bars on first in-view. If animated, they become thin
client wrappers over a static server-rendered final state.

`app-shell-tokens.css` scopes depth tokens (elevation, border, radius) under `.replicaFrame`,
mirroring `replica/replica-tokens.css`.

### 3a. Shared sample-case fixture (the after-recreation's data)

`ShellAfter` (and any other recreated figure showing product data) MUST consume a **single
fictional fixture** — `src/components/work/app-shell/sampleCase.ts` — so that every recreated
figure differs from every other only in design, never in data. This keeps sanitization (research
D9) in one place. It does not extend to `ShellBeforeScreens`: those are real screenshots showing
Jason's own demo data (Lily Davenport et al.), captured independently of this fixture — the
before/after pairing is no longer "the same case," and the page's captions say so (research D8a).

```ts
// src/components/work/app-shell/sampleCase.ts — the ONLY place case data is defined.
// All fictional; Northwind Mutual (carrier), Ironline Auto Auctions (salvage partner).

export const sampleInbox = [
  { id: "c1", name: "Dana Whitfield", preview: "Just sent the photos of the front end 📷", status: "in-progress", time: "9:42a", active: true },
  { id: "c2", name: "Marcus Bell",    preview: "Is the rental covered while mine's in the shop?", status: "waiting", time: "9:15a" },
  { id: "c3", name: "Priya Raman",    preview: "The adjuster said he'd call today?", status: "waiting", time: "Yest" },
  { id: "c4", name: "Tyler Okafor",   preview: "Uploaded the police report", status: "new-reply", time: "Yest" },
  { id: "c5", name: "Sofia Nunes",    preview: "When will the estimate be ready?", status: "in-progress", time: "Mon" },
  { id: "c6", name: "Grace Kim",      preview: "Do I need to get a second quote?", status: "closed", time: "Mon" },
] as const;

export const sampleThread = {
  claimant: "Dana Whitfield",
  claimNo: "CLM-40318",
  carrier: "Northwind Mutual",
  line: "Auto — collision",
  messages: [
    { from: "carrier",  author: "Erin", text: "Hi Dana, this is Erin from Northwind Mutual. I'm so sorry about the accident — I'll be helping with claim CLM-40318. Is everyone okay?", time: "8:58a" },
    { from: "claimant", author: "Dana", text: "Hi Erin — yes, we're okay, just shaken up. It was a front-end collision at Elm St and 4th Ave. The airbags went off.", time: "9:03a" },
    { from: "carrier",  author: "Erin", text: "I'm really glad you're safe. Is the car drivable, or has it been towed?", time: "9:05a" },
    { from: "claimant", author: "Dana", text: "It got towed — it's at a lot off Route 9, not drivable.", time: "9:07a" },
    { from: "carrier",  author: "Erin", text: "Understood. Could you send a few photos? Front damage, the airbags, and the VIN plate if you can reach it.", time: "9:09a" },
    { from: "claimant", author: "Dana", text: "Just sent the photos of the front end 📷", time: "9:42a", attachments: 2 },
    { from: "carrier",  author: "Erin", text: "Perfect, got them. I've started an estimate. Given the front-end damage we may need a total-loss evaluation with our salvage partner — I'll keep you posted. Want me to set up a rental in the meantime?", time: "9:44a" },
    { from: "claimant", author: "Dana", text: "Yes please, that would really help.", time: "9:45a" },
    { from: "carrier",  author: "Erin", text: "Done. You'll get a text with pickup details. Anything else for now?", time: "9:46a" },
    { from: "claimant", author: "Dana", text: "That's everything — thank you!", time: "9:47a" },
  ],
} as const;

// Right-panel sections mirror the REAL product anatomy (sanitized) — the field
// shapes come from Jason's product screenshots (reference-only, never shipped).
export const sampleDetails = {
  // DETAILS — the product's default section (screenshot: "Details")
  details: {
    contact: "Dana Whitfield", phone: "+1 (555) 245-7778", email: "N/A",
    claimNumber: "CLM-40318", createdBy: "Erin Castillo",
    marleyNumber: "+1 (202) 932-9202",
    insuranceBranding: "Hi Marley",     // product shows the operator's brand — kept per exception
    caseRole: "Insured",
  },
  // MANAGE — participants + case visibility (screenshot: "Manage")
  manage: {
    contact: "Dana Whitfield",
    primaryOperator: "Erin Castillo",
    secondaryOperators: [],             // "Search to add secondary operator"
    visibility: "public",               // Public case (selected) | Private case
  },
  // FNOL DATA — insured + other party; `ai:true` renders the ✨ AI-populated affordance
  // (screenshot: "FNOL Data"). Missing fields read "Not Reported".
  fnol: {
    insured: {
      policyNumber: "Not Reported", firstName: "Not Reported", lastName: "Not Reported",
      address: "Not Reported",
      vehicleMake: { value: "Honda", ai: true }, vehicleModel: { value: "Civic", ai: true },
      vehicleYear: "2019", licensePlate: "Not Reported",
    },
    otherParty: {
      firstName: { value: "Sam", ai: true }, lastName: { value: "Reyes", ai: true },
      phone: { value: "(555) 018-2245", ai: true },
      insuranceCompany: { value: "Crestline Insurance", ai: true },
      policyNumber: { value: "CL-55821", ai: true },
      vehicleMake: { value: "Jeep", ai: true }, vehicleModel: { value: "Cherokee", ai: true },
      vehicleYear: { value: "2020", ai: true },
    },
  },
  // CASE PROGRESS — the salvage/total-loss timeline (screenshot: "Case Progress")
  caseProgress: [
    { step: "Opened", status: "done", assignedTo: "Erin Castillo" },
    { step: "Ironline assigned", status: "done" },
    { step: "Waiting for release", status: "alert", issue: {
        partner: "Ironline Auto Auctions", date: "May 23, 2026 — 5:08 PM",
        title: "RELEASE ISSUE: Written Release Required",
        body: "Signed owner release required before the vehicle can move to auction." } },
    { step: "Vehicle at yard", status: "pending" },
    { step: "Closed", status: "pending" },
  ],
  // NOTES — internal @-mention threads (screenshot: "Notes")
  notes: [
    { author: "Cassidy Dunn", time: "11 days ago", text: "@Reid Alvarez what are the next steps for this case?",
      replies: [ { author: "Reid Alvarez", time: "11 days ago",
        text: "Nothing needed. We'll send the payment minus their deductible and they cover the rest with the shop." } ] },
  ],
  // MEDIA — mixed types, grid (screenshot: "Media")
  media: [
    { type: "audio",    label: "Voicemail" },
    { type: "photo",    label: "Front-end damage" },
    { type: "document", label: "Vehicle registration" },
    { type: "document", label: "Insurance card" },
  ],
} as const;
```

`ShellAfter` renders these objects in the icon-rail + full-height details-bar layout. The context
strip and diagrams may pull labels from it too. `ShellBeforeScreens` does NOT consume this
fixture — it shows real screenshots with Jason's own demo data instead (research D8a). No
recreated figure defines its own case data. Renaming the fiction set touches this file only.

## 4. Study content — `src/content/studies/app-shell/index.ts`

```ts
export const appShellStudy: CaseStudy = {
  slug: "app-shell",
  title: "App Shell Evolution at Hi Marley",
  description: "…safe-for-preview one-liner, no proprietary specifics…",
  listed: false,                                  // FR-002 — noindex
  company: "Hi Marley",
  role: "Product Architecture, Front-End Systems, Design Lead",
  milestones: [
    { quarter: "Q4", year: 2025, showYear: true,  label: "Settings framework & component library standardization" },
    { quarter: "Q1", year: 2026, showYear: true,  label: "List pages" },
    { quarter: "Q2", year: 2026, showYear: false, label: "Thread design" },
    { quarter: "Q3", year: 2026, showYear: false, label: "Application shell" },
  ],
  blocks: [ /* 6 beats: prose + figure blocks, see below */ ],
};
```

Block order (beats → blocks):

1. **Context** — `prose` (overview + sequencing sentence, `showTimeline: true`) → `figure`
   (`context-strip`).
1b. **The baseline (early 2025)** — `prose` ("The state of Hi Marley in early 2025") → `figure`
   (`shell-before`): five real screenshots of the shell as it stood (Inbox/Details, Details
   edit, Manage, Media, Create Case), stepped through via `ShellBeforeScreens`/`ImageStepper`
   with Back/Next controls — Jason's own demo account, owner-cleared, no real customer data
   (added 2026-09-02; screenshots swapped in for an earlier recreation, 2026-09-03 — research
   D8a).
2. **The problem** — `prose` (accordion-fails-at-scale + six secondary problems). Prose only;
   the baseline shell above is the figure it refers to.
3. **The solution** — `prose` (rail + details bar) → `figure` (`shell-after`) → `figure`
   (`nav-footprint`, `callout` = "10% → 2.5% / 8.5%") → `figure` (`details-space`, `callout` =
   "62% → 100%").
4. **Managing the risk** — `prose` (positional-memory + rollout) → `figure` (`risk-tiers`).
5. **Details & wins** — `prose` (design tokens as delivery mechanism; env flag win).
6. **Outcome** — `prose` (PLG surfaces unlocked; defensive success bar stated + met + one-line
   verification per research D11).

## 5. Validation (compile-time + build-time)

- **Type safety**: `FigureBlock.figure` is `FigureId`; an unknown id is a `tsc` error naming the
  valid figures. `FIGURE_COMPONENTS` is `Record<FigureId, …>`, so a missing mapping fails the
  build.
- **Registry assertion** (`assertStudy` in `index.ts`, additive): every `figure` block's `figure`
  id has an entry in `FIGURE_COMPONENTS`; every `figure` block declares a non-empty
  `staticDescription`. (Mirrors the existing walkthrough `narrationText` assertion.)
- **Slug uniqueness**: existing `assertRegistry` already rejects a duplicate `app-shell` slug.
- **Provenance (manual, SC-007)**: each headline number, tier example, and the success-bar
  sentence is checked against the source decks (research D10/D11) before ship.
- **Recreation audit (manual, SC-006)**: no `<img>`/`next/image` points at a real screenshot;
  every figure carries only fictional data (D9).

## 6. What is explicitly NOT added

No new route, no new endpoint, no database/store, no new runtime dependency, no player/demo
wiring, no glossary terms (research D14), no change to `layout.tsx`, `sitemap.ts`, `palette.ts`,
or any i18n-study file.
