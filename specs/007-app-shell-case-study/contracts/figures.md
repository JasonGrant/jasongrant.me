# Contract: Figure block & recreation rules

Defines the authoring surface added for this study (the `figure` block) and the rules every
recreated/diagram figure must satisfy. This is the app-shell counterpart to feature 002's
`study-content-schema.md`, scoped to figures.

## The `figure` block (authoring)

```ts
{
  kind: "figure",
  id: "solution-nav-footprint",     // unique within the study
  figure: "nav-footprint",          // must be a FigureId with a FIGURE_COMPONENTS entry
  heading?: "…",                    // set → appears as <h2>; omit → rides under prior prose
  navLabel?: "…",                   // rail label (only meaningful with heading)
  intro?: RichText,                 // reading-measure text above the figure
  callout?: { figure: "10% → 2.5% / 8.5%", text: "…", source?: {…} },
  caption?: "…",                    // reading-measure text below the figure
  staticDescription: "…",           // REQUIRED — non-visual equivalent (see accessibility.md)
}
```

Rules:
- `figure` MUST be a declared `FigureId`; unknown ids are a compile error, missing
  `FIGURE_COMPONENTS` mappings a build error (data-model.md §5).
- `staticDescription` MUST be non-empty and MUST carry the figure's information in words (the
  before/after contrast, the numbers) so no-JS and assistive-tech readers lose nothing.
- Figures render at the breakout `.wide` width; the block's `intro`/`callout`/`caption` render at
  the reading measure (research D7).

## Recreation rules (every figure except `shell-before`)

1. **No real screenshots.** No `<img>`/`next/image` may reference a product screenshot. Recreated
   UI is React + CSS Modules over native elements (FR-017). **Exception: `shell-before`** — see
   below.
2. **Fictional data only.** All names, carriers, partners, claims, and case data are fictional
   per the sanitization map (research D9). Hi Marley's own branding is permitted. **Exception:
   `shell-before`** — see below.
3. **Before dated, after resolved.** `shell-before` reads as accordion/cramped; `shell-after` as
   rail + full-height details/resolved — legible without the caption (FR-018).

### Exception: `shell-before` is real screenshots (FR-017a)

`shell-before` renders `ShellBeforeScreens` → `ImageStepper`, stepping through five **real**
screenshots of Jason's own Hi Marley demo account (`public/work/app-shell/shell-before-*.png`),
not a recreation. This is permitted under the constitution's owner-cleared-real-artifact
exception (research D8a): Jason explicitly cleared these specific screenshots, and every visible
contact (Lily Davenport, Julia Voicemail Test, Jennifer Jones) is a pre-existing test/demo entry,
never a real customer. Rules 1–2 above do not apply to this one figure; rule 3 still does — these
screens must read as dated/cramped, which they do by being the genuine article. Do not extend
this exception to any other figure without a new dated decision from Jason.
4. **Diagrams are schematic, not pixel-faithful.** `nav-footprint` and `details-space` present
   the comparisons as annotated layout diagrams with the figures called out prominently, not as
   product replicas (FR-019).
5. **Depth is scoped.** Product-authentic depth (elevation/shadow/richer borders) is allowed
   ONLY inside `.replicaFrame` (`shell-before`/`shell-after`); diagrams, context strip, risk
   tiers, and all study chrome stay flat (research D5; constitution replica-craft exception).
6. **Static-first.** Figures render their final state server-side; any animation is a client
   wrapper that snaps to the final state under reduced motion / no-JS (research D4).
7. **Contrast & focus.** WCAG AA contrast inside recreations; any interactive element keeps a
   visible focus ring (constitution replica-craft conditions b–c).

## Figure inventory & required content

| `figure` id | Must show |
|---|---|
| `context-strip` | four sequenced steps (Q4'25 settings/library 4→1 → Q1'26 list pages → Q2'26 thread → Q3'26 shell), one line each, + the "lowest-risk-first, toward the core" sentence |
| `shell-before` | accordion right panel with headers consuming most of the panel; unused reserved top/left space; a mixed global/contextual CTA; sample fictional case |
| `shell-after` | collapsible icon rail; right details bar at full height; common action area; a partner section (Ironline) as one rail icon; same fictional case |
| `nav-footprint` | 10% (before, 1800×1169) vs 2.5% collapsed / 8.5% expanded (after), prominent |
| `details-space` | 62% (before, 5 categories) vs 100% (after, 20+ categories), prominent |
| `risk-tiers` | high (Create-case relocation, case actions), medium (three areas consolidated, triggers stable), low (templates replace overlays; same location/flow) |

## Provenance (SC-007)

Every number and tier example above is traced to the source decks in research.md (D10/D12) and
verified before ship; anything unverifiable is dropped, never approximated.
