# Research: App Shell Evolution at Hi Marley

**Phase 0 output** — decisions that resolve the plan's Technical Context and the spec's
open points. Format per decision: Decision / Rationale / Alternatives considered.

Source-of-truth inputs (Jason's own, proprietary, **not committed** — see D1):
- `Application Shell Async Inform.pptx` — 16-slide internal decision deck (the four headline
  percentage slides, problem framing, risk tiers, env-flag win).
- `nav-release-preview-v8.html` — stakeholder release-preview deck (accordion arithmetic,
  rollout steps, change-aversion research, workstream status).
- Product screenshots (provided in chat) — real Details / Manage / FNOL Data / Case Progress /
  Notes / Media sections + the full inbox+chat shell. **Reference-only**: they establish the
  authentic field structure to recreate; they are never committed or shipped, and their real
  sample data is sanitized (D9).

---

## D1 — Proprietary source material: reference by location, never commit

**Decision**: The two source decks stay in Jason's private storage (currently `~/Downloads`) and
are cited by filename from this research.md only. Neither the files, their real screenshots
(`assets/*.jpg` in the HTML deck), nor their proprietary strings enter the repository. All
shipped product UI is recreated (D8); all shipped data is fictional (D9).

**Rationale**: The repo is public. Constitution Principle V (unlisted-case-studies exception,
"Recreated content, sanitized data") and spec FR-017/FR-020 require recreated
UI, fictional data, and that proprietary sources are referenced by location, never committed.

**Alternatives considered**: Committing sanitized copies of the decks into `specs/` — rejected;
even sanitized, they are derivative of proprietary internal artifacts and add no value the
recreated figures don't. Using the HTML deck's real screenshots as `next/image` figures —
rejected outright by FR-017 (no real screenshots anywhere).

## D2 — Gating: reuse the `listed:false` soft-unlist mechanism

**Decision**: Ship `appShellStudy` with `listed: false`. That single flag drives
`noindex, nofollow` in `generateMetadata` (`src/app/work/[slug]/page.tsx`). Add no sitemap entry
(`src/app/sitemap.ts` is a fixed allowlist) and no nav/palette link (`src/content/palette.ts`,
`LeftRail`, `TopBar`, home shelf). No password/auth wall (none exists; spec clarification
2026-09-02).

**Rationale**: Matches the i18n study exactly and the constitution's unlisted-case-studies
exception. Soft-unlisting (noindex + no sitemap + no inbound links) satisfies "not reachable by
crawling"; direct-URL reach is intended.

**Alternatives considered**: Vercel deployment-protection or new middleware for a real password —
rejected per clarification; diverges from the reach-by-direct-URL model and adds auth scope the
constitution's stack constraints would need to justify.

## D3 — Route: reuse `/work/[slug]`, no new route files

**Decision**: The study serves at `/work/app-shell` purely by joining the `studies` registry;
`generateStaticParams` + `dynamicParams=false` make it SSG. No new `page.tsx`/`layout.tsx`.

**Rationale**: The framework is data-driven; a second study of the same shape needs no route
code. Keeps core-page isolation and the content-driven section rail for free.

**Alternatives considered**: A bespoke `src/app/work/app-shell/page.tsx` (like `spike/`) —
rejected; it would fork the chrome, rail, and metadata handling and violate the reuse constraint.

## D4 — Figures are static-first (server-rendered), animation is progressive enhancement

**Decision**: Every figure renders its complete, final state on the server as flat HTML/CSS.
No figure requires JS to convey its information. Any motion (e.g., a bar growing 62%→100%) is
opt-in enhancement in a client wrapper gated on `usePrefersReducedMotion`, snapping to the final
state under reduced motion or no-JS.

**Rationale**: Delivers FR-019a/SC-008 (no-JS readability), CLS 0 (SC-003), and the reduced-motion peer
experience (US2) as structural properties rather than test obligations. Also keeps Performance
in band by shipping near-zero figure JS.

**Alternatives considered**: Client-rendered animated figures with a static fallback — rejected;
more JS, a CLS risk, and a second code path to keep in sync. The non-goal already forbids the
interactive player/demos, so static-first is the natural fit.

## D5 — Recreated shell depth lives inside `.replicaFrame`; diagrams stay flat

**Decision**: `ShellBefore`/`ShellAfter` render inside a `.replicaFrame` and may use
product-authentic depth (elevation, subtle shadow, richer borders) via `app-shell-tokens.css`
scoped to that frame. The two comparison diagrams (`NavFootprintDiagram`, `DetailsSpaceDiagram`),
the context strip, the risk-tier illustration, and all study prose/chrome stay under the
sitewide flat bans (no shadows/gradients).

**Rationale**: Constitution v1.2.6 replica-craft exception permits depth strictly inside
`.replicaFrame` on `/work/[slug]`, bounded by WCAG AA contrast, visible focus, and static depth
(no depth-driven motion). The diagrams are schematic argument, not recreated product, so they
stay flat.

**Alternatives considered**: Flat recreations everywhere — rejected; a flat shell reads as a
wireframe, undercutting the "recreated product, judged on craft" bar. Depth on the diagrams —
rejected; they aren't product UI, so the exception doesn't cover them.

## D6 — No interactive player or concept demos (non-goal)

**Decision**: This study ships none of the i18n walkthrough player or the five concept demos.
The `walkthrough`/`demo`/`email-flow` block kinds are simply unused by `appShellStudy`.

**Rationale**: Explicit spec non-goal ("no embedded interactive demo in v1"). Keeps scope,
script weight, and the a11y surface small.

**Alternatives considered**: A lightweight before/after toggle demo — deferred; a static
side-by-side pairing (D8) makes the contrast read instantly without interaction, and a toggle
would reintroduce demo-style state and motion the non-goal excludes.

**Amendment (2026-09-03, Jason)**: one exception. The redesigned shell's sidebar
(`components/work/app-shell/nav/AppSidebar`) is built to Hi Marley's own sidebar spec
(Containers / Top / Center / Bottom zones) and Jason asked that it *operate* as specified, so
it is the "after" recreation's single interactive island: the center-zone trigger expands
(12rem, labels shown, tooltips disabled) and collapses (4rem), the sound toggle toggles, and
selecting an item moves the active state. Direct manipulation only (constitution concept-demo
rules): no autoplay, instant state changes, the only motion a 180ms width ease that is off
under `prefers-reduced-motion`; it server-renders collapsed, so no-JS readers get the figure
the study describes. The walkthrough player and concept demos remain out of scope.

**Amendment (2026-09-03, Jason) — D6a**: a second interactive island. `AccordionExample`
(the "problem" section's side figure) gained a segmented control — 5 / 7 / 8 / 9 data
categories — that regrows the accordion-row stack and shrinks the shaded "available" sliver
accordingly. Same governing rules as D6's sidebar: direct manipulation, instant state change,
no autoplay, a reduced-motion-gated `flex-grow` transition only; server-renders the 5-category
default (the real, sourced 62% figure), so no-JS readers see the true baseline and the control
simply does nothing without JS. See D8b for where the 7/8/9 percentages come from.

## D7 — Figures break out to the wide panel; prose holds the reading measure

**Decision**: Figure blocks render at the wider bounded width (reuse `StudyPage.module.css`
`.wide`, the same breakout the player uses); prose sections keep the ~640–720px measure,
left-aligned to the same column.

**Rationale**: Constitution breakout-demonstrations exception. Recreated shells and layout
diagrams need width to read like real interfaces; crushed into the reading measure they read as
thumbnails. Never forces horizontal page scroll (mobile rule holds — figures reflow to phone-fit
layouts).

**Alternatives considered**: Full-bleed bands — rejected by the exception (bounded width,
left-aligned with prose, not full-bleed).

## D8 — Recreate before AND after as components (no screenshots)

**Decision**: Build the accordion "before" and the rail+details "after" as React components with
fictional data. Before reads visibly dated/cramped (stacked accordion headers eating the panel);
after reads resolved (icon rail, full-height details, common action area). The HTML deck's real
screenshots are reference-only.

**Rationale**: FR-017 (no real screenshots), FR-018 (before dated, after resolved, instant
read), and the portfolio-craft bar. Components also give the a11y text layer screenshots can't.

**Alternatives considered**: Annotated screenshots with fictional overlays — rejected by FR-017.

**Superseded in part, 2026-09-03 (Jason) — see D8a**: the "before" recreation was replaced with
real screenshots. The "after" recreation (D8's `ShellAfter`) is unaffected.

## D8a — The before-state walkthrough uses real screenshots, not a recreation

**Decision**: Replace the recreated `ShellBefore` component with `ShellBeforeScreens`, which
steps through five real screenshots of the old Hi Marley shell — Inbox/Details, Details edit,
Manage, Media, Create Case — via a new `ImageStepper` client component (Back/dot-row/Next,
identical control language to the i18n study's `EmailTranslationFlow`). Images live at
`public/work/app-shell/shell-before-{inbox,details-edit,manage,media,create-case}.png`
(3600×2254, sourced 2026-09-03 from Jason's own Hi Marley account).

**Why real screenshots here, when FR-017 otherwise bans them**: Jason judged that a single static
recreation couldn't carry the accordion's real density and the range of screens (Details, Manage,
Media, a modal) the way authentic captures do — the point of the "before" is that it was
genuinely cramped, and a recreation risked reading as *illustratively* cramped rather than
*actually*. This is the constitution's owner-cleared-real-artifact exception (v1.2.5): the
content owner may include a real artifact of their own work on an unlisted, noindexed route when
explicitly cleared and free of third-party PII. Both hold: Jason cleared these five screenshots
by name, and every visible contact — Lily Davenport, Julia Voicemail Test, Jennifer Jones — is a
pre-existing test/demo entry in his own account, not a real customer (Jason, 2026-09-03: "All
screenshots are using demo data so not PII").

**Consequence for the fixture (D9a note)**: the before/after pairing is no longer literally "the
same case" — the real screenshots show Jason's demo contact (Lily Davenport), while `ShellAfter`
still shows the fictional `sampleCase` contact (Dana Whitfield). The two captions were rewritten
to stop claiming otherwise; each figure is honest about its own sourcing.

**Rationale**: Authentic density over illustrated density, for the one section whose entire job
is to make "this was genuinely cramped" visceral rather than asserted.

**Alternatives considered**: A higher-fidelity recreation matching every real screen (Details,
Manage, Media, Create Case) — rejected; multiplies recreation work for a fidelity ceiling that a
real capture clears for free, and the owner-cleared exception exists precisely so this tradeoff
doesn't have to be made. Redacting/blurring the real screenshots — rejected; Jason confirmed no
PII, so redaction would only remove information without a compensating safety benefit.

## D8b — Deriving the 7/8/9-category percentages for `AccordionExample` (D6a)

**Decision**: Jason asked for the interactive illustration to show 5/7/8/9 categories with the
"% available" dropping at each step, naming which categories join at 7 (Case Progress, Partner
Data), 8 (Workflows), and 9 (Assistants) — but not the resulting percentages. Two of his own
sources bear on this, and they don't share a single formula: the PPTX's 62%-at-5-categories
figure (already the page's sourced anchor throughout) and the release-preview HTML deck's
accordion-arithmetic table, which separately states that 5/7/9 sections consume 54%/75%/97% of
a fixed ~520px panel — a consistent ~10.75-point cost per added category ((75−54)/2 and
(97−75)/2 both ≈10.75). Rather than switching the page to the HTML deck's own
5-category baseline (46% available) — which would contradict the 62% figure already stated
everywhere else on the page — the derivation applies that same real, sourced per-category cost
to the existing 62% anchor: 7 → 62−2×10.75 ≈ 40%, 8 → 62−3×10.75 ≈ 30%, 9 → 62−4×10.75 ≈ 19%.
8 has no figure in either source and sits, undated, on the same line between 7 and 9.

**Rationale**: A derived number, transparently computed from Jason's own real unit-cost data and
disclosed as such, over either (a) inventing unrelated figures or (b) importing the HTML deck's
different 5-category baseline and creating an internal contradiction with the rest of the page.
This is presented as an illustration of the same documented mechanism, not as a second set of
historical measurements.

**Alternatives considered**: Ask Jason for exact 7/8/9 figures before shipping — reasonable but
blocking; the derived numbers are auditable and correctable in one place
(`AccordionExample.tsx`'s `AVAILABLE_PCT`) if he supplies real ones later. Using the HTML deck's
own 46%/25%/3% (its 5/7/9 numbers verbatim) — rejected for the baseline mismatch above.

## D9 — Sanitization map (fictional stand-ins for proprietary specifics)

**Decision**: Replace every proprietary specific with fictional data; keep only Hi Marley's own
branding (permitted on the unlisted route). Working fiction set — Jason may rename during review:

| In the source decks (proprietary) | Shipped (fictional / handling) |
|---|---|
| Partner "Copart" (salvage auction) | Fictional salvage partner — **"Ironline Auto Auctions"** |
| Carrier / insurer (implied customer) | Fictional carrier — **"Northwind Mutual"** |
| Employee/decider names (Jackie Booth, Michelle Brooks) | Dropped — the interview study needs no names |
| Jira/Confluence URLs (`marley.atlassian.net/…`) | Dropped |
| Version numbers (2.87, 2.89) | Dropped |
| Internal team names (Conversations, Network, Experience) | Dropped / genericized ("the platform teams") |
| Decision IDs / decider table (D-R1…) | Dropped — internal process, not case-study content |
| Sample case data (claimant, claim #, vehicle, carrier) | Invented — e.g. "Dana Whitfield · CLM-40318 · 2019 Honda Civic · other party 2020 Jeep Cherokee" |
| Screenshot sample names (Lily Davenport, Jason Grant, Cassandra Dewey, Caley Bennett, Antex Yalew, Julia/Jennifer, "Joe Doe") | Invented fictional people (claimant Dana Whitfield; operators Erin Castillo, Cassidy Dunn, Reid Alvarez) |
| Real product URL path + chat/case IDs (`chat.marley.ai/chats/<id>?...`, `asdasdasd`), real phone/Marley numbers | Dropped / invented. The bare public domain `chat.marley.ai` MAY appear in the recreated browser chrome — it is the operator's own product chrome, permitted by the unlisted exception, and carries no PII |

Industry-standard terms that are **not** proprietary stay: "FNOL" (first notice of loss), "app
shell", "accordion", "positional memory". The ✨ **AI-populated field** affordance in FNOL Data
is a genuine product feature (deck: "AI populated fields with the sparkle affordance finally have
room") and is recreated faithfully with `ai:true` fields — not proprietary data, just a UI
pattern.

**Rationale**: Constitution Principle V + spec FR-018/FR-020. Hi Marley branding is explicitly
allowed on unlisted routes; customer/partner identities, staff names, and internal system
coordinates are not portfolio content and carry third-party exposure, so they go.

**Alternatives considered**: De-brand Hi Marley too — unnecessary; the title names Hi Marley and
the exception permits the operator's own branding. Keep Copart as a "real, recognizable partner"
for credibility — rejected; it is a third-party identity with no clearance.

## D10 — Headline numbers: owner-cleared, verified against the PPTX

**Decision**: Ship the four figures exactly as Jason's deck states them, each traced to its slide:
nav footprint **10%** before (PPTX s5, basis 1800×1169) → **2.5%** collapsed (s6) / **8.5%**
expanded (s7); details area **62%** before (s8, 5 categories) → **100%** after (s9, 20+
categories). Secondary framing available if useful (HTML deck: ~520px panel, 56px per accordion
header; 5→7→9 sections = 54%→75%→97% consumed) but the four percentages lead. Each is verified
against the source before ship; any that fails verification is dropped, not approximated.

**Rationale**: FR-020/SC-007 (real, owner-cleared, verified). The percentages are Jason's own
headline framing and match the spec verbatim.

**Alternatives considered**: Lead with the px arithmetic — rejected; less legible as a headline
than the percentages, though it makes a good supporting caption.

## D11 — Success-bar verification sentence

**Decision**: State the defensive success bar (no decrease in task speed or task success for
existing users through the transition) and that it was met, verified via **baseline
instrumentation captured before the change shipped** (the pre-analytics dashboard that had to
land before the flag flipped), giving a before/after comparison of user interaction. No version
numbers, team names, or internal tool names in the shipped sentence.

**Rationale**: Resolves FR-016's bracketed "[if a measurement detail is available]" from the HTML
deck (workstream: "Pre-Analytics dashboard — baseline instrumentation … must land before the
flag flips"), sanitized per D9.

**Alternatives considered**: Omit the verification detail — weaker; the measurement discipline is
part of the product-thinking argument. Name the specific tooling — rejected by D9.

## D12 — Risk section sourcing: real tiers + public change-aversion research

**Decision**: Use the three risk tiers from the PPTX verbatim in structure — high (Create-case
relocation, case actions), medium (three areas consolidated without moving trigger locations),
low (templates replacing overlays; same location/flow, different component) — and reinforce with
the HTML deck's **public** citations: Google's change-aversion curve, Nielsen Norman Group on
week-one reaction fading, Findlater & McGrenere on spatial memory ("relearn a stable layout, but
not one that keeps moving"). Cite these as external sources with links.

**Rationale**: The tiers are Jason's owner-cleared framing (FR-014); the research citations are
public, add credibility, and are safe to reproduce as attributed references.

**Alternatives considered**: Invent supporting research — forbidden (no invented sources).

## D13 — CI: add the route to Lighthouse + axe; verify OG

**Decision**: Add `http://localhost:3000/work/app-shell` to `lighthouserc.mobile.json`,
`lighthouserc.desktop.json` (already carry a `/work/` band at Perf 0.9 / A11y 0.95 / BP 0.95 /
SEO off — no assertion change needed), and to `scripts/axe-check.mjs`'s URL list. Verify
`/api/og?study=app-shell` renders a valid card (the route already imports `getStudy`).

**Rationale**: Constitution: unlisted routes are shipped pages for every gate. The `/work/` band
already encodes v1.2.6.

**Alternatives considered**: Rely on the existing `/work/` band without listing the URL —
rejected; the URL must be in the `collect.url` list to actually be measured.

## D14 — Glossary: optional, no new terms required for v1

**Decision**: Do not extend `GlossaryTermId` for v1. Define any needed term ("positional memory")
inline in prose. Revisit only if a chip materially helps the read.

**Rationale**: Keeps the DSL churn to the `figure` block alone. The i18n glossary terms
(i18n/l10n/…) don't apply here, and forcing app-shell terms into the shared union adds coupling
for little gain.

**Alternatives considered**: Add "positional-memory", "app-shell", "accordion" as glossary terms
— deferred; nice-to-have, not required, and each expands a shared union.
