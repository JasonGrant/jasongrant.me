# Feature Specification: Interactive Case Studies (framework + Internationalization study)

**Feature Branch**: `002-interactive-case-studies`
**Created**: 2026-08-29
**Status**: Draft
**Input**: User description: "Interactive case studies at /work/[slug] — a reusable case-study
framework plus the first study, 'Internationalization at Klaviyo.' Soft-unlisted, noindexed,
fully quality-gated pages combining prose, self-contained concept demos, and a scripted
product-walkthrough player over purpose-built replica components (fictional brand, fictional
data). Self-guided mode now; narrated listen mode designed-for now, shipped after the approved
voice clone exists."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explore the Internationalization study self-guided (Priority: P1)

A hiring executive, recruiter, or peer design leader receives the direct link from Jason and
opens the Internationalization case study. Instead of a static slide deck, they land on a
working recreation of a marketing-platform UI with a language switcher. Switching the UI to
German visibly breaks three things at once — a button truncates, a form control stranded
mid-sentence reads wrong, and a number formats incorrectly — each break annotated and linked
to a deeper section. They scroll through the story of the initiative, operating small
interactive demonstrations along the way (text expansion, word order, live locale formatting,
the flags rule), then step through a scripted walkthrough of the settings and email-translation
flows Jason designed. They leave understanding both the design problem and Jason's specific,
documented contribution.

**Why this priority**: This is the entire feature's reason to exist — the first study is the
proof artifact for the case-study program, and the framework has no value until one study uses
it end to end.

**Independent Test**: Open the study URL in a clean browser session; read the full narrative;
operate every concept demo with mouse and keyboard; complete the walkthrough start to finish
in self-guided mode. Delivers the complete intended value on its own.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the study via direct URL, **When** the page loads, **Then** the
   opening replica renders in English with no layout shift, and no demonstration motion plays
   until the visitor interacts.
2. **Given** the opening replica is showing, **When** the visitor switches the language to
   German, **Then** the three staged breakages (truncation, stranded mid-sentence control,
   wrong number format) become visible, each with an annotation linking to its deeper section.
3. **Given** the text-expansion demo, **When** the visitor moves the truncation control,
   **Then** the German string truncates progressively and the demo shows the point at which the
   visible meaning changes ("Create an abandoned cart flow" reading as "Create a canceled
   flow"), with the full string available via tooltip per the documented rule.
4. **Given** the live formatting demo, **When** the visitor selects a locale, **Then** the
   sample number, percentage, and currency values reformat correctly for that locale in the
   visitor's own browser (e.g., Turkish percent-before-number, Swiss apostrophe grouping,
   yen with no decimals).
5. **Given** the walkthrough player in self-guided mode, **When** the visitor presses the
   labeled start control and advances step by step, **Then** each step's replica state, caption,
   and highlight render in order — organization settings, personal settings, then the email
   translation flow — and the visitor can move backward as well as forward at any time.
6. **Given** a walkthrough sequence is animating, **When** the visitor presses pause or stop,
   **Then** motion halts immediately and the current state remains readable.
7. **Given** the email translation walkthrough segment, **When** the visitor reaches the
   language-selection step, **Then** the languages offered are exactly the localization
   languages selected earlier in the organization-settings segment.

---

### User Story 2 - Equal access with assistive tech and reduced motion (Priority: P2)

A visitor who relies on a keyboard, a screen reader, or the reduced-motion preference opens the
same study and gets a peer experience: every demo operable by keyboard, every state change
announced meaningfully, and — under reduced motion — walkthrough sequences that advance as
discrete, user-paced state changes with no transitional motion and no information loss.

**Why this priority**: Accessibility is a non-negotiable constitution gate (Principle I), and
the site's positioning collapses if the showcase piece itself fails assistive-tech users. It is
P2 only because it cannot be tested before US1 exists.

**Independent Test**: Complete the entire US1 journey using only a keyboard; repeat with
VoiceOver; repeat with reduced motion enabled at the OS level. All information reachable in all
three passes.

**Acceptance Scenarios**:

1. **Given** reduced motion is enabled, **When** the visitor runs the walkthrough, **Then**
   steps advance as instant state changes at the visitor's pace, with captions carrying the
   same information as the animated variant.
2. **Given** a keyboard-only visitor, **When** they traverse the page, **Then** every demo
   control, glossary chip, and player control is reachable in a logical order with a visible
   focus indicator, and no interaction requires a pointer.
3. **Given** a screen-reader user operating a concept demo, **When** the demo state changes,
   **Then** the outcome is announced in text (not only visually), including the truncation
   meaning-change moment and locale reformatting results.

---

### User Story 3 - Soft-unlisted sharing without touching the core site (Priority: P3)

Jason shares the study URL selectively. The page is absent from the sitemap, carries noindex
directives, and is linked from no navigation surface — yet loads fast and passes every quality
gate. The three core pages (Home, Experience, Writing) ship exactly as before, with no added
script weight.

**Why this priority**: This is the constitutional boundary that makes the feature permissible
at all, but it is verified as properties of the shipped pages rather than a user journey of
its own.

**Independent Test**: Inspect the production build: sitemap contents, robots directives on the
study route, navigation surfaces, and the script payload of the three core pages compared
against the pre-feature build.

**Acceptance Scenarios**:

1. **Given** the production build, **When** the sitemap and navigation surfaces are inspected,
   **Then** no case-study route appears in the sitemap, the command palette, or any navigation,
   and the study page carries noindex robots metadata.
2. **Given** the pre-feature and post-feature production builds, **When** the three core pages'
   script payloads are compared, **Then** the case-study feature has added nothing to them.
3. **Given** a visitor opens an unknown work slug, **When** the route resolves, **Then** the
   site's standard not-found experience renders.

---

### User Story 4 - Author a second study without rebuilding the machinery (Priority: P4)

Jason (as author) starts case study #2 by writing content only: prose sections, walkthrough
step data, and demo configuration — reusing the replica kit, the player, and the page scaffold
unchanged.

**Why this priority**: Framework reuse is the compounding value of this feature, but it can
only be proven when a second study begins; within this feature it is enforced as a separation
property.

**Independent Test**: Review the delivered artifacts: the player, replica kit, and page
scaffold contain no Internationalization-specific logic; the i18n study exists entirely as
content data consumed by the framework.

**Acceptance Scenarios**:

1. **Given** the delivered framework, **When** its player and replica components are reviewed,
   **Then** none contain study-specific copy, data, or branching; all study-specific material
   lives in the study's own content definitions.
2. **Given** the walkthrough step schema, **When** a step is authored, **Then** it can carry
   target, action, highlight, caption, narration text, and duration without modifying the
   player.

---

### Edge Cases

- **Scripting disabled or failed**: the study's prose, headings, and impact content remain
  readable as a static document; each demo region shows a static representative state with a
  note that the interactive version requires scripting. No blank holes.
- **Small screens**: resolved 2026-08-29 — mobile-fit variants (FR-012a). Concept demos get
  phone-first layouts; the walkthrough player frames the step-relevant region of the replica
  rather than shrinking the whole desktop screen. Lighthouse mobile ≥95 applies as everywhere.
- **Locale formatting support varies by browser**: if the visitor's browser cannot format a
  given locale, the demo shows a stated fallback rather than wrong output presented as truth.
- **Walkthrough abandoned mid-sequence**: no state persists; revisiting the page restarts the
  study cleanly.
- **Unknown or retired study slug**: standard not-found experience; no empty shell page.
- **Search engines and link previews**: noindex directives on every study route; sharing a
  link may still render a preview card from page metadata — title/description are written to
  be safe for that exposure.
- **Listen mode not yet available**: the player's design accommodates narration (steps carry
  narration text; transcripts render in place), but no audio ships and no dead "listen" control
  appears until real narration assets exist.

## Requirements *(mandatory)*

### Functional Requirements

**Routes & discoverability**

- **FR-001**: The system MUST serve each case study at a stable, shareable URL under
  `/work/[slug]` — the sole path the constitution v1.2.0 unlisted-case-studies exception
  permits — fully functional when opened directly with no referring page.
- **FR-002**: Case-study routes MUST be excluded from the sitemap, MUST carry noindex robots
  directives, and MUST NOT be linked from primary navigation, the command palette, or any
  other navigation surface — per the constitution v1.2.0 unlisted-case-studies exception.
- **FR-003**: A study's unlisted/publicized status MUST be an attribute of that study's own
  content definition: flipping one study to listed/indexed changes nothing shared across
  studies (verifiable under the same separation review as SC-006), and any such flip is a
  deliberate per-study change recorded in the PR that makes it.
- **FR-004**: Requests for unknown study slugs MUST resolve to the site's standard not-found
  experience.

**Framework (reusable across studies)**

- **FR-005**: A case study MUST be composable from three block types: prose sections,
  self-contained concept demos, and scripted walkthrough segments, in any order.
- **FR-006**: Walkthrough content MUST be authored as structured step data — each step
  declaring at minimum its target, action, highlight, caption, narration text, and duration —
  kept separate from the player that executes it, so a new study means new data, not player
  changes.
- **FR-007**: All product UI shown in demos and walkthroughs MUST be purpose-built recreation
  under a fictional brand with fictional data. No proprietary screenshots, pixels, or customer
  data may appear (constitution Principle V, reaffirmed by the v1.2.0 exception).
- **FR-008**: The walkthrough player MUST offer a self-guided mode in which the visitor
  explicitly advances and can move backward through every step.
- **FR-009**: No demonstration motion may begin before an explicit visitor action on a clearly
  labeled control; while a sequence runs, visible pause and stop controls MUST be present
  (constitution v1.2.0 scripted-demonstrations exception).
- **FR-010**: Under the reduced-motion preference, walkthrough sequences MUST advance as
  discrete state changes with no transitional motion, at visitor-controlled pace, with no
  loss of information relative to the animated variant — and concept demos (the opening
  break demo included) MUST likewise present their outcomes as instant state changes with
  no transitional motion and no information loss.
- **FR-010a**: Walkthrough motion MUST be limited to demonstrating the product behavior
  being explained — state changes, highlights, focus movement, screen transitions.
  Decorative motion, parallax, and scroll-driven effects remain banned inside the player
  (constitution v1.2.0 scripted-demonstrations exception, condition e).
- **FR-010b**: Animated scripted sequences are confined to the walkthrough player, which
  carries all of the exception's conditions. Concept demos change state only through direct
  visitor manipulation, rendering outcomes as instant state changes; any demonstration that
  needs a scripted animated sequence MUST be authored as a walkthrough segment. Everywhere
  outside the player, every sitewide motion ban stays in force (condition f).
- **FR-011**: The framework MUST be narration-ready: step data carries narration text and the
  player renders it as an in-place transcript. Audio narration itself is OUT OF SCOPE for
  this feature; the constitution's scripted-demonstrations exception (condition d) already
  governs the future listen mode — gesture-gated playback, never autoplay — so no dead
  listen control ships now.
- **FR-012**: Interactive demo machinery MUST load only on case-study routes. The three core
  pages MUST ship with zero added script weight from this feature.
- **FR-012a**: On small screens, concept demos MUST present phone-fit layouts designed for
  that width (not shrunken desktop layouts), and the walkthrough player MUST frame the
  region of the replica relevant to the current step so captions and highlights stay
  legible. No demo may require horizontal scrolling of the page itself, and no
  "best on desktop" fallback notice may substitute for a working mobile experience.
- **FR-013**: Every study page MUST remain readable as a static document when scripting is
  unavailable, with each demo region showing a representative static state.

- **FR-013a**: Replica-kit components MUST comply with Principle IV's visual constraints —
  hairline borders and elevated background tones for elevation; no drop shadows, gradients,
  or patterned backgrounds — treating each replica as a framed device. The v1.2.0 exceptions
  relax motion and page count only, never the visual bans. If product-authentic styling
  (e.g., real shadows) ever proves essential to a demonstration, that requires a further
  constitution amendment before it ships.

**Internationalization study content**

- **FR-014**: The study MUST open with the "break" demonstration: a replica UI with a language
  switcher where switching to German visibly produces (a) a truncated control label, (b) a
  form control stranded mid-sentence whose surrounding sentence no longer reads correctly, and
  (c) an incorrectly formatted number — each annotated and linked to its deeper section,
  retelling the initiative's real audit.
- **FR-015**: Definitions (internationalization, localization, globalization, translation,
  locale) MUST be available as inline glossary affordances at first use rather than a
  standalone definitions section.
- **FR-016**: The text-expansion demo MUST include: the real published string pair ("Create an
  abandoned cart flow", 29 characters → "Erstellen Sie einen Ablauf für abgebrochene
  Warenkörbe", 54 characters); the truncation-changes-meaning interaction with tooltip showing
  the full string; an expansion-planning aid reflecting the published tier guidance (up to 10
  characters → 300% … more than 70 → 130%) and the 30–35% spare-space rule; and the published
  statistic that roughly 10% of new internationalization bugs in the French launch were
  text-expansion bugs.
- **FR-017**: The word-order demo MUST show a sentence with an embedded form control that
  reassembles incorrectly in German, demonstrating the documented rule "do not insert form
  inputs in the middle of text strings," and MUST show the corrected pattern.
- **FR-018**: The formatting demo MUST perform real locale formatting in the visitor's browser
  (not canned images) across number, percentage, and currency examples, including at minimum:
  Turkish percentage placement, Swiss apostrophe grouping, a zero-decimal currency, a
  three-decimal currency, and a compact-notation currency that grows when localized.
- **FR-019**: The cultural-elements demo MUST present the published flags rule — flags
  represent countries, never languages — with at least the which-flag-is-Spanish ambiguity and
  one multilingual-country example.
- **FR-020**: The scripted walkthrough MUST present the language data-model hierarchy in
  order: organization settings (business language default for new users; business regional
  format governing reports; selectable localization languages; live preview before save; save
  confirmation), then personal settings (per-user language and regional-format overrides with
  live preview and save confirmation), then the email translation flow (translate action →
  audience preferred-language breakdown → language selection → side-by-side translated-content
  review).
- **FR-021**: The email walkthrough segment MUST offer exactly the localization languages
  selected in the organization-settings segment (continuity rule), and MUST include the idiom
  moment: an idiomatic subject line machine-translates literally and is corrected by the
  marketer in the walkthrough.
- **FR-022**: The email walkthrough MUST include the translation-lifecycle moment: after
  translations exist, a change to source content flags affected translations as stale and the
  walkthrough shows re-translation (interpretation confirmed by Jason, 2026-08-29).
- **FR-023**: The study's closing impact section MUST cite only figures Jason has already
  made public, and MUST include at least one published quantified outcome (Principle V
  requires operator work to be described with quantified outcomes). Approved set (Jason,
  2026-08-29): all figures already published in his articles — including the international
  revenue share (31% → 41.5%) — with each figure verified against its specific published
  article before it ships; any figure that fails verification is dropped, not approximated.
- **FR-024**: Every stated guideline, statistic, and example in the study MUST be traceable
  to Jason's published Ascent guideline pages, his own presentation materials (as delivered
  by Jason, retained in his private storage and referenced by location from this feature's
  research notes — proprietary source documents are NEVER committed to this public
  repository), or his published articles. No invented numbers, no invented anecdotes — and the study MUST NOT
  present unshipped design work as shipped product behavior; any segment depicting a design
  proposal is labeled as such.

**Quality gates (constitution v1.2.0)**

- **FR-025**: Every case-study route is a shipped page for all Workflow & Quality Gates:
  Lighthouse 95+ in all four categories on mobile and desktop profiles, zero accessibility-scan
  violations, zero cumulative layout shift, WCAG 2.1 AA, and the manual keyboard,
  screen-reader, and visual passes.

### Key Entities

- **Case Study**: one narrative work artifact with a slug, title, safe share metadata, ordered
  content blocks, and an unlisted/publicized status; the Internationalization study is the
  first instance.
- **Content Block**: a unit within a study — prose section, concept demo, or walkthrough
  segment — ordered to form the page.
- **Concept Demo**: a self-contained interactive demonstration with a static fallback state, a
  keyboard-operable control surface, and announced outcomes.
- **Walkthrough Script**: the ordered step data for a scripted demonstration; each step carries
  target, action, highlight, caption, narration text, and duration.
- **Replica Kit**: the shared set of fictional-brand product-UI recreations (settings panels,
  email editor, toasts, form controls) that walkthrough scripts direct; contains no
  study-specific content.
- **Glossary Term**: a definition surfaced inline at first use (i18n, l10n, globalization,
  translation, locale).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least one first-time tester (not the author) operates every concept demo
  and completes the full walkthrough in self-guided mode unaided — using no instructions
  beyond what the page provides — before the study URL is shared outside the project.
- **SC-002**: Every case-study route scores 95 or higher in all four Lighthouse categories on
  both mobile and desktop profiles against the production build, with cumulative layout shift
  of 0.
- **SC-003**: Accessibility scans report zero violations on every case-study route; the full
  study is completable with keyboard alone and with a screen reader; the reduced-motion
  experience conveys 100% of the information of the animated one, verified by a
  side-by-side review confirming every caption, state, and outcome of the animated
  sequence appears in the reduced-motion sequence.
- **SC-004**: The three core pages reference no case-study module in the production build —
  verified by diffing their file lists in the build manifest pre/post feature — and their
  script payloads are unchanged apart from bundler chunk-repartition noise (runtime-chunk
  hash exempt).
- **SC-005**: The production sitemap contains zero case-study URLs; every case-study route
  serves noindex directives; no navigation surface links to a case study.
- **SC-006**: The player, replica kit, and page scaffold contain zero
  Internationalization-specific logic or copy — study-specific material lives in the
  study's content definitions, verified by review. (Concept-demo components carry the
  pinned published-guideline constants they demonstrate — guideline facts, not study
  copy.)
- **SC-007**: Every factual claim in the study (strings, percentages, tier values, rules)
  matches its source exactly — verified line by line against the public Ascent pages, the
  published articles, and Jason's source materials in his private storage (referenced by
  location from the feature's research notes, never committed to this repository).
- **SC-008**: With scripting unavailable, the study page still presents the complete narrative
  text and a static representative state for every demo region.

## Assumptions

- **Fictional brand**: the replica platform and its example customer use invented names and
  data created for this feature (working assumption: a generic marketing-platform brand and a
  fictional coffee-retailer customer, echoing the flavor of the original demo content without
  reproducing it). Jason may rename them during design review.
- **Word-order sourcing**: the Ascent word-order page is currently password-protected, so its
  demo content is sourced from Jason's own presentation materials; if the page is made public
  later, the study can cite it directly. The other three guideline areas (text expansion,
  cultural elements, formatting) are publicly readable today and were captured on 2026-08-29.
- **Listen mode timing**: narrated listen mode ships only after Jason's separately produced
  voice clone is approved; this feature designs for it (narration text in step data,
  transcript rendering, gesture-gated playback rules) but ships no audio and no listen
  control.
- **Audit and walkthrough sourcing**: the opening break demo retells the initiative's real
  kickoff audit (the product was machine-translated into German to surface UI breakages),
  and the walkthrough flows — organization/personal language settings, the email translation
  flow, and the idiom moment — are sourced from Jason's own presentation materials and
  direct product knowledge, retained in Jason's private storage and referenced
  by location from this feature's research notes (never committed to this public
  repository). Any flow element that is a design proposal rather than shipped behavior is
  labeled as such in the study (FR-024).
- **Publicizing**: all studies ship unlisted; any later decision to publicize a specific study
  follows the constitution's per-study PR-recorded procedure.
- **One study in scope**: exactly one study (Internationalization) ships with this feature;
  the framework is validated for reuse by separation review (SC-006), not by shipping a second
  study.
- **Impact-figure sourcing**: the approved candidate set is exactly the figures already
  published in Jason's articles (FR-023); each is verified against its article during
  implementation, and nothing non-public enters the page.
