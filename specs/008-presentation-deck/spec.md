# Feature Specification: Presentation deck (secret slideshow of the case studies)

**Feature Branch**: `008-presentation-deck`
**Created**: 2026-09-12
**Status**: Draft
**Input**: User description: "Keep the work case studies how they are but reuse the content to
create a presentation deck. URL is in env with a unique number so while someone can see it in
GitHub they would never be able to figure out the URL. An intro and two case studies shown in a
slideshow format. Templates for a Content page and a Transition page. A general subtle progress
indicator that on hover shows additional information and allows jumping to a major section and,
within a major section, to a minor (page or topic). Keyboard forward and backward controls are
required. If a slide has interactive elements, state can be reset without a page refresh. Slides
have a distinctive URL. Use the attached outline (45-minute portfolio presentation: 5 intro /
15 internationalization / 15 app shell / 5 buffer) as general recommendations, not absolute
decisions."

## Clarifications

### Session 2026-09-12

- Q: How is the URL kept secret while the code is public? → A: **Build-time secret segment.**
  The deck lives at `/deck/<secret>/<section>/<slide>`; `<secret>` comes from a `DECK_SLUG`
  environment variable read once at build time so the site stays fully static. Local dev falls
  back to `dev`; CI builds with a placeholder `ci` so the real value never appears in a committed
  file or a CI log. The same value is used for Vercel production and preview.
- Q: What do slide URLs look like? → A: **Readable slugs.** Sections `intro`,
  `internationalization`, `app-shell`, `close`; each slide slugged by its title. Reordering slides
  never renumbers URLs.
- Q: How much study content is reused by reference? → A: **Figures and demos, not prose.** Slides
  embed the studies' existing figure and demo components and reuse their numbers and sources;
  headlines and body copy are deck-authored in the outline's leadership cut. The study content
  modules and `/work` pages are untouched.
- Q: Video recording or live demo for the internationalization beat? → A: **Live interactive with
  reset.** The organization → personal settings cascade and the email-translation flow run live
  on slides; a reset control restores initial state without reloading. No video asset.
- Q: How does the stage size itself? → A: **Fixed 16:9 stage scaled to fit.** A 1920×1080 design
  frame scaled to the viewport and letterboxed. Desktop-first; on phones the stage scales down and
  must not break, but no phone-specific layouts are designed.
- Q: How deep is the navigator? → A: **Section → slide, two levels.** Hover or focus reveals the
  four sections; within the current section, its slides.
- Q: Templates? → A: **Two templates, Content with layout variants.** Transition (cover, section
  divider, close) and Content with layouts `statement`, `text-figure`, `figure`, `demo`, `numbers`.
- Q: Presenter aids (timer, notes, appendix)? → A: **None.**
- Q: Keyboard mapping? → A: →/↓/Space/PageDown next; ←/↑/Shift+Space/PageUp back; Home/End
  first/last; R resets the current slide; Esc closes the navigator. Keys yield while focus is
  inside a form control or an embed that owns its own arrow keys, **except** PageUp/PageDown/
  Home/End, which always move slides. No command palette on deck routes.
- Q: Constitution conflict (unlisted routes scoped to `/work`, single column, CI URL lists)? →
  A: **Amend to v1.3.0** with a named deck exception; Lighthouse desktop-only for the deck at
  Perf ≥90 / A11y ≥95 / BP ≥95 / SEO off / CLS 0; mobile Lighthouse exempt; every other gate
  applies in full.
- Q: Delivery? → A: Spec-kit packet, then implementation to a PR on `008-presentation-deck`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Present the deck end to end from the keyboard (Priority: P1)

Jason opens the secret deck URL on a laptop, shares the screen, and presents for 45 minutes. The
cover slide fills the window as a letterboxed 16:9 stage. Pressing → advances through the intro
(career strip, how I work), a section divider for Internationalization at Klaviyo, its eight
content slides, a divider for App Shell Evolution at Hi Marley, its eight content slides, and the
close. Every slide reads in Jason's own visual system: the warm-dark surface, serif-italic display
headlines, mono kickers, and the same figure and demo components the case studies use. A subtle
progress rule sits along the bottom edge; hovering it reveals the four sections and the slides of
the current one, each a link.

**Why this priority**: The deck exists for one presentation. Nothing else has value until the
full run works from the keyboard without touching the mouse.

**Independent Test**: Open the first slide in a clean browser at 1440×900. Using only → and ←,
visit every slide and return to the cover. Confirm each slide's URL changes, its title updates,
and no slide clips or scrolls. Repeat at 1280×720 and 1920×1200.

**Acceptance Scenarios**:

1. **Given** the cover slide URL, **When** it loads, **Then** the stage renders centered and
   letterboxed at the largest 16:9 size that fits, with no layout shift and no motion on load.
2. **Given** any slide, **When** → / ↓ / Space / PageDown is pressed, **Then** the next slide
   renders and the URL changes to that slide's distinct address; ← / ↑ / Shift+Space / PageUp
   return to the previous one; Home and End jump to the cover and the close.
3. **Given** the navigator, **When** the pointer hovers it or keyboard focus enters it, **Then**
   it expands to list the four sections with the current one marked, and the current section's
   slides nested beneath; activating any entry navigates there.
4. **Given** a Transition slide, **When** it renders, **Then** it shows the section kicker,
   headline, and optional subline only; **Given** a Content slide, **Then** it shows the kicker,
   headline, and the layout's body, figure, demo, or numbers strip.
5. **Given** the last slide, **When** → is pressed, **Then** nothing happens (no wrap); the close
   slide links to both `/work` case studies.

---

### User Story 2 - Run a live demo and reset it without reloading (Priority: P1)

On the cascade slide Jason saves French as the organization language and shows the personal
panel inheriting it. On the translation-flow slide he steps through the eight screens. Between
rehearsals, or after a panelist asks him to show it again, he presses R (or clicks Reset) and the
slide returns to its initial state: English everywhere, step one, no toast, and the organization
setting forgotten.

**Why this priority**: The live demo is the deck's proof-of-craft beat and its biggest live risk.
Reset is what makes a live demo safe enough to prefer over a recording.

**Independent Test**: On the cascade slide, change and save settings in both panels; press R.
Both panels show initial values and the personal panel no longer inherits anything. Navigate away
and back; the slide is clean again. Repeat on the translation-flow slide and every stepper.

**Acceptance Scenarios**:

1. **Given** a slide that contains interactive elements, **When** it renders, **Then** a visible
   Reset control is present in the stage chrome, labeled with its keyboard shortcut.
2. **Given** modified state on such a slide, **When** R is pressed or Reset is activated,
   **Then** every embedded component returns to its initial state, any cross-component setting
   published by the organization panel is cleared, and the page does not reload.
3. **Given** the organization panel has been saved on the cascade slide, **When** Jason leaves the
   slide and returns, **Then** the cascade starts clean.
4. **Given** focus is inside a demo's select, listbox, text field, or an embed that owns its own
   arrow keys, **When** ← / → / Space / R are pressed, **Then** the demo handles them and the
   deck does not change slides or reset; PageUp / PageDown / Home / End still move slides.
5. **Given** a slide without interactive elements, **Then** no Reset control is shown.

---

### User Story 3 - Unlisted, unguessable, and isolated from the rest of the site (Priority: P2)

The repository is public. A reader can find the deck's code, its content, and its slide slugs,
but not its URL. Search engines never index it; the sitemap, robots file, navigation, command
palette, and case-study pages never mention it. The three core pages and both `/work` studies
ship exactly as before.

**Why this priority**: This is the constitutional boundary (Principle V deck exception) that
makes the route permissible, verified as properties of the shipped build.

**Independent Test**: Inspect the production build and the repository: no committed file or CI
log contains the real secret; the deck serves noindex; sitemap and robots output are unchanged;
the build manifests for the core pages and `/work` routes are unchanged in module set.

**Acceptance Scenarios**:

1. **Given** the production build, **When** the sitemap, robots file, command palette, and every
   navigation surface are inspected, **Then** none references `/deck` in any form, and every
   deck page serves `noindex, nofollow` with no Open Graph or Twitter card.
2. **Given** the repository and CI logs, **When** searched for the production secret, **Then**
   no match exists; CI output shows only the placeholder segment.
3. **Given** an unknown secret, section, or slide, **When** requested, **Then** the site's
   standard not-found page renders.
4. **Given** pre- and post-feature builds, **When** the core pages and `/work` routes are
   compared, **Then** their module sets are unchanged and no shared layout behavior differs.
5. **Given** the deck secret is rotated and the site redeployed, **Then** previously shared deck
   links stop resolving.

---

### User Story 4 - Equal access: keyboard, screen reader, reduced motion, no script (Priority: P2)

A viewer who relies on a keyboard, a screen reader, or reduced motion opens a slide link and
gets a peer experience: each slide is a labeled region with one heading; slide changes are
announced; the navigator is a real navigation landmark with current-state semantics; nothing
fades under reduced motion; and with scripting unavailable every slide still renders as a
flowing, readable document with working links.

**Why this priority**: Accessibility is a non-negotiable constitution gate; it is P2 only because
it cannot be tested before the slides exist.

**Independent Test**: Complete the US1 run with keyboard only, then with VoiceOver, then with OS
reduced motion, then with JavaScript disabled. All slide content is reachable in all four passes.

**Acceptance Scenarios**:

1. **Given** a screen-reader user, **When** a slide changes, **Then** the new slide's title is
   announced and focus lands on the slide region; **When** Reset is used, **Then** "Slide reset"
   is announced.
2. **Given** reduced motion, **When** slides change, **Then** there is no cross-fade, and every
   embedded demo uses its own reduced-motion variant.
3. **Given** scripting disabled, **When** any slide URL is opened, **Then** the slide's headline,
   text, static description, and links render unscaled as a normal document, and demo slides
   carry a note that the interactive version needs JavaScript.
4. **Given** any interactive control on any slide, **When** focused, **Then** a visible focus
   indicator is shown at every stage scale, and WCAG AA contrast holds.

---

### User Story 5 - Phones do not break (Priority: P3)

A panelist opens a slide link on a phone. The stage scales down to fit the width, the navigator
is usable by tap, and nothing scrolls horizontally. Replicas are small but intact.

**Why this priority**: The deck is desktop-first by decision; phones must not embarrass, but no
phone-specific layout is designed.

**Independent Test**: Open five representative slides at 375×667 and 390×844. No horizontal
scroll; the stage fits; navigator and reset are tappable.

**Acceptance Scenarios**:

1. **Given** a 375px-wide viewport, **When** any slide loads, **Then** the entire stage is
   visible without horizontal page scroll.
2. **Given** the navigator on a touch device, **When** tapped, **Then** it expands and its
   links can be activated.

---

### Edge Cases

- **`DECK_SLUG` unset** (local dev, a fresh clone): the deck builds under the `dev` segment.
- **Unknown secret / section / slide**: standard not-found page; no partial shell.
- **Secret or section without a slide** (`/deck/<secret>`, `/deck/<secret>/<section>`): resolves
  to the first slide of the deck or of that section.
- **Viewport narrower than 16:9 or shorter than 16:9**: letterboxed on the constraining axis; the
  whole stage stays visible.
- **Focus inside a replica control**: arrow keys, Space, and R belong to the control; page keys
  still change slides.
- **Reset mid-toast**: the toast and its timer are discarded with the remount; no late toast
  appears on the reset slide.
- **Resize during presentation**: the stage rescales without reload.
- **Search engines and link previews**: noindex; no OG/Twitter card so a pasted link renders no
  preview that could be indexed elsewhere.
- **Scripting unavailable**: unscaled flowing document; navigator links still work.

## Requirements *(mandatory)*

### Functional Requirements

**Route & secret**

- **FR-001**: The deck MUST be served at `/deck/<secret>/<section>/<slide>`, fully static, with
  `<secret>` supplied at build time from the `DECK_SLUG` environment variable, validated as a
  lowercase alphanumeric slug (hyphens permitted), falling back to `dev` when unset.
- **FR-002**: Continuous integration MUST build with the placeholder segment `ci`; the production
  secret MUST NOT appear in any committed file, CI configuration, or CI log.
- **FR-003**: `/deck/<secret>` and `/deck/<secret>/<section>` MUST resolve to the first slide of
  the deck and of that section respectively. Unknown segments MUST resolve to the site's standard
  not-found page.
- **FR-004**: Every slide MUST have a distinct, stable URL composed of readable section and slide
  slugs; slide order changes MUST NOT change URLs.

**Content reuse & authoring**

- **FR-005**: The deck MUST be authored as one typed content module (sections → slides) that
  references existing study figure and demo components by identifier; slide headlines and body
  copy are authored in the deck module.
- **FR-006**: The two `/work` study content modules and their rendered pages MUST be unchanged
  in behavior; any edits to shared components MUST be additive exports or optional props with
  defaults that preserve current behavior.
- **FR-007**: Every slide MUST carry a static text description of its content for no-JS and
  assistive-technology use; the content module MUST fail the build if any slide lacks one, if
  slugs collide within a section, or if a section is empty.
- **FR-008**: The slide set MUST cover: cover; intro (career strip, how I work); the
  Internationalization case (frame, the bet before the bet, audit as change management, see it
  break, operating model, team, sequencing, the cascade demo, translation flow, outcomes with
  attribution); the App Shell case (frame, baseline, sequencing as risk strategy, the problem,
  explorations, enablement decision, risk management, outcome); close. Exact copy follows the
  outline as a recommendation and MAY be edited freely.

**Templates & layouts**

- **FR-009**: Two slide templates MUST exist: Transition (kicker, headline, optional subline,
  optional links; used for cover, section dividers, and close) and Content (kicker, headline, and
  one of the layouts `statement`, `text-figure`, `figure`, `demo`, `numbers`).
- **FR-010**: Layouts MUST render inside a 1920×1080 design frame; type sizes and spacing are
  defined in design pixels for that frame.

**Stage**

- **FR-011**: The stage MUST be a fixed 16:9 frame scaled uniformly to fit the viewport and
  centered with letterboxing, rescaling on resize without reload, and painting at the correct
  scale on first render (CLS 0).
- **FR-012**: Without scripting, the frame MUST render unscaled as a normal flowing document.
- **FR-013**: The deck route MUST render none of the site chrome (top bar, left rail, command
  palette, footer, background texture) and MUST NOT register the ⌘K shortcut.

**Navigator**

- **FR-014**: A subtle progress indicator MUST be visible on every slide, showing position within
  the deck without demanding attention.
- **FR-015**: On hover, keyboard focus, or an explicit toggle, the navigator MUST reveal the
  sections (with the current one marked) and, within the current section, its slides (with the
  current one marked); each entry MUST be a link that navigates there. Esc MUST collapse it.
- **FR-016**: The navigator MUST be a navigation landmark whose entries are real links that
  function without scripting.

**Keyboard**

- **FR-017**: → / ↓ / Space / PageDown MUST advance; ← / ↑ / Shift+Space / PageUp MUST go back;
  Home / End MUST jump to first / last; R MUST reset a resettable slide; Esc MUST collapse the
  navigator. No wrap-around at either end.
- **FR-018**: Arrow, Space, R, and Esc handling MUST yield while focus is inside a text input,
  select, textarea, editable region, listbox, slider, tablist, radiogroup, or an embed that owns
  its own arrow keys; PageUp / PageDown / Home / End MUST remain deck-wide. Space MUST also yield
  when focus is on a button or link so activation is not doubled.
- **FR-019**: Deck keys MUST NOT fire with a modifier (⌘, Ctrl, Alt) held or during text
  composition.

**Reset**

- **FR-020**: Slides that embed interactive components MUST expose a visible Reset control in the
  stage chrome with its shortcut in its accessible name; other slides MUST NOT show it.
- **FR-021**: Reset MUST restore every embedded component's initial state and clear any
  cross-component setting published by the organization settings panel, without reloading the
  page; a polite announcement MUST confirm the reset.
- **FR-022**: Arriving at a slide MUST always present it in its initial state, regardless of what
  was done on a previous visit.

**Discoverability & isolation**

- **FR-023**: Every deck page MUST serve `noindex, nofollow` robots metadata and no Open Graph or
  Twitter card; the deck MUST NOT appear in the sitemap, the robots file (in any form), the
  command palette, or any navigation surface.
- **FR-024**: The core pages and `/work` routes MUST gain no deck code; deck code is imported only
  from the deck route.

**Accessibility & no-JS**

- **FR-025**: Each slide MUST be a labeled region with exactly one top-level heading; slide
  changes MUST move focus to the slide region and announce its title.
- **FR-026**: Slide transitions MUST be opacity-only, ≤200ms, and disabled under reduced motion;
  embedded demos keep their own reduced-motion behavior.
- **FR-027**: Focus indicators MUST stay visible at every stage scale; WCAG 2.1 AA contrast MUST
  hold on every slide.

**Quality gates**

- **FR-028**: The deck is a shipped page for all Workflow & Quality Gates under constitution
  v1.3.0: clean TypeScript build, no Biome errors, zero accessibility-scan violations, CLS 0, the
  manual keyboard / screen-reader / reduced-motion / no-JS / visual passes, and Lighthouse on the
  desktop profile at Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO off.

### Key Entities

- **Deck**: the single presentation — a title and an ordered list of sections.
- **Section**: one of `intro`, `internationalization`, `app-shell`, `close`; a title and an
  ordered list of slides; the navigator's major level.
- **Slide**: a Transition or Content slide with a slug, title, static description, and template-
  specific fields; the navigator's minor level and the unit of URL.
- **Embed**: a named interactive or static figure component the deck can place on a slide,
  either reused from a study or deck-only (career strip, timeline, settings cascade, email flow).
- **Outline**: the serializable section/slide list (with a resettable flag per slide) the stage
  chrome uses for the navigator, keyboard, and reset control.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every slide is reachable from the cover with the keyboard alone, and the full deck
  can be traversed forward and back with no mouse; verified at three desktop viewport sizes.
- **SC-002**: On every resettable slide, one Reset action restores initial state for all embedded
  components and clears the organization-settings store, with no page reload; verified on the
  cascade, translation-flow, and stepper slides.
- **SC-003**: A repository-wide search for the production secret returns nothing, and CI logs
  show only the placeholder segment; the deck serves `noindex, nofollow`; sitemap and robots
  output are byte-identical to the pre-feature build.
- **SC-004**: The core pages' build manifest entries are identical and the `/work` routes' module
  sets are unchanged pre/post feature (chunk-repartition noise excepted).
- **SC-005**: Representative deck URLs score Performance ≥90, Accessibility ≥95, Best Practices
  ≥95 on the desktop Lighthouse profile with CLS 0.
- **SC-006**: Accessibility scans report zero violations on representative Transition, Content,
  demo, and stepper slides.
- **SC-007**: With scripting unavailable, every slide renders its headline, text, static
  description, and working links as an unscaled document.
- **SC-008**: At 375px width, no slide forces horizontal page scroll and the navigator is
  operable by tap.

## Assumptions

- **Secrecy model**: unguessability of the URL is the gate. There is no password or
  authentication wall; anyone with the link can view. Rotating `DECK_SLUG` and redeploying is the
  revocation mechanism. Vercel build logs and Vercel Analytics pathnames (both private to the
  project) are accepted exposure surfaces.
- **Content permission**: every figure, screenshot, and number on the deck is already permitted
  on the unlisted `/work` routes under constitution v1.2.5/v1.2.6; the deck adds no new
  proprietary material. Panel names and interview intel from the outline never appear on slides.
- **Presenting environment**: a laptop at 1280–1920px width sharing its screen; phones are a
  courtesy, not a design target.
- **Study components are stable**: the reused figures and demos behave under a uniformly scaled
  frame because they position with layout coordinates, not the viewport; replica CSS that keys
  on viewport width will switch to stacked layouts on phones, which is accepted.

## Non-Goals

- No presenter timer, speaker notes, presenter window, or appendix/backup slides.
- No video or screen recording asset.
- No mobile-profile Lighthouse gate for the deck (constitution v1.3.0 deck exception).
- No password, authentication, or Vercel deployment-protection wall.
- No changes to the `/work` study content, prose, or pages beyond additive component exports.
- No command palette, site chrome, or analytics-event changes on deck routes.
- No new runtime dependencies.
