# Implementation Plan: Ask Jason chat widget

**Branch**: `009-ask-jason-chat` | **Date**: 2026-11-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-ask-jason-chat/spec.md`

## Summary

Embed the live "Ask Jason" chat (API at `api.jasongrant.me`, cortex feature 007) on every page
that carries the site chrome, behind a three-mode build-time flag. The entry point is a floating
bottom-centre bar whose placeholder retypes the three starter questions within hard bounds;
sending from it morphs the bar into a right-docked, non-modal panel (a native modal sheet on
phones) where replies stream word by word with a "From" row of sources, three-card options
replies, fixed deflections, in-place corrections, a turn hint and every limit and error state
from the API contract. The header always carries the API's disclosure sentence.

Technical approach (research.md D1–D20): a client gate module whose dead branches webpack strips,
so `off` ships nothing and `private` ships only a key check; a build-time SHA-256 of a secret
for Jason's private production check, armed through a URL fragment; a module-level store so the
conversation survives layout remounts; one `ChatClient` interface with an HTTP implementation
(fetch plus a hand-rolled SSE reader) and a scripted stand-in that replays every state for
development and CI; a word pacer, stick-to-bottom, and a FLIP morph on the Web Animations API;
Turnstile loaded on first intent and executed on first keystroke into an overlay surface; a
silent `role="log"` transcript with one polite status region; a bundle-check script and CI job;
and a constitution amendment (v1.4.0) naming the widget's bounded unprompted motion and its one
third-party script.

## Technical Context

**Language/Version**: TypeScript 5.8 (strict), React 19.0, Next.js 15.3 App Router (webpack
  production builds; `next dev --turbopack`)
**Primary Dependencies (added)**: none. Cloudflare Turnstile is a runtime script injected on the
  visitor's first intent, never on first load (justified under Stack & Delivery below)
**Primary Dependencies (kept)**: `next`, `react`, `react-dom`, `classnames`, `react-icons`,
  `@vercel/analytics`, `@vercel/speed-insights`
**Storage**: `sessionStorage["ask-jason.session"]` (token only, memory fallback);
  `localStorage["ask-jason.preview-key"]` in private mode only; conversation in a module store
  for the page's lifetime; no cookies; nothing else written
**Testing**: No functional test suites (Principle III). Gates: `tsc --noEmit`, Biome, three
  builds with `scripts/check-ask-jason-bundle.mjs` (off / private / on), axe with the stand-in's
  open-state URLs, Lighthouse mobile + desktop on the existing six URLs, and the manual keyboard /
  VoiceOver / reduced-motion / phone-hardware / layout-shift / visual passes in quickstart.md
**Target Platform**: evergreen browsers per repo browserslist (Chrome 105+, Safari 15.4+,
  Firefox 102+); Vercel static hosting; the chat API cross-origin at `api.jasongrant.me`
**Project Type**: Web (Next.js App Router, single project, fully SSG; one new cross-origin
  egress after first intent, one third-party script after first intent)
**Performance Goals**: every gated page within one point of its pre-feature Lighthouse score
  with CLS 0; panel shell ≤ 100 ms after activation; first words within the API's 3 s target plus
  ≤ 200 ms of widget overhead; morph ≤ 320 ms open / 240 ms close with no dropped frames at
  6× CPU throttling; 0 layout shifts during open, bot check, streaming and correction
**Constraints**: WCAG 2.1 AA (plus 2.2's 2.4.11 and 2.5.8); the cortex contracts as source of
  truth (no API change); the widget sends only session token, message, referrer host and
  Turnstile token; no automatic retry; flat styling (tone + hairline, no shadows); reduced
  motion collapses everything to ≤ 100 ms crossfades; Safari 15.4 floor (`showModal()` yes,
  `inert` no, `dvh` with `vh` fallback, `Intl.Segmenter` with a whitespace fallback for Firefox
  < 125); the deck route and the root layout untouched
**Scale/Scope**: 1 content module; ~28 new files under `src/components/ask/`; 2 layout edits,
  1 palette item, 1 action kind, 1 keyboard-event helper, 1 global CSS rule, 1 token; 1 config
  edit (`next.config.mjs` env digest); 1 committed env file; 1 check script; CI: +1 job, +3 env
  vars on the gate builds, +9 axe URLs; constitution v1.4.0; CLAUDE.md → 009

## Constitution Check

*GATE: evaluated against `.specify/memory/constitution.md` v1.3.0; v1.4.0 is amended in this
feature (research D19).*

| Principle | Status | Evidence |
|---|---|---|
| **I. WCAG 2.1 AA (NON-NEGOTIABLE)** | PASS | contracts/accessibility.md: non-modal `role="dialog"` panel and native `showModal()` sheet; focus to composer or heading on open and back to the bar on close; silent `role="log"` transcript with per-message headings; one polite status region carrying every announcement; rotating placeholder `aria-hidden` with a stable field name; counters via `aria-describedby`, never live; 24 px / 44 px targets; AA contrast on `--bg-elev` from the existing tokens; reduced-motion table; axe extended to the open states through the stand-in picker. |
| **II. Performance Budget (NON-NEGOTIABLE)** | PASS | The bar is server-rendered, fixed and out of flow (CLS 0); no chat module, Turnstile or API request before first intent (D2, D8); Turnstile is `async defer` and injected after load, so it is never render-blocking; `off` and `private` ship zero chat code to the public, enforced by `check-ask-jason-bundle.mjs` in CI (D16); Lighthouse URL lists unchanged and scores compared within one point (SC-002); the morph and streaming are measured for frame drops and layout shifts (contracts/motion.md). |
| **III. Verification Without Functional Tests** | PASS | No test framework. Starters validated at import (`satisfies` + assertion); wire types mirror the contract; the scripted stand-in makes every state reproducible for axe and the manual passes; the bundle check is a build gate; quickstart.md enumerates every pass. |
| **IV. Design-Engineer Craft** | PASS with v1.4.0 | Flat surfaces (tone + hairline), site tokens and type only, no shadows, no gradients (the nudge is a colour change, not a sheen), no scale/bounce, nothing on scroll. Two things sit outside the enumerated exceptions and are named by the amendment: the bar and panel as fixed overlays beside the single-column layout, and the bounded unprompted motion of FR-004a/b (rotation, nudge) plus the user-initiated morph. Without the amendment they are not banned by the letter of v1.3.0, but the reviewer should find the rule; see Complexity Tracking. |
| **V. Content Discipline & Network Coherence** | PASS | No new page or route; the three-page IA and `/work` unlisting unchanged; the deck untouched; the widget speaks only from Jason's public writing through the API and always discloses itself; contact call to action references `site.email`; no new analytics. |
| **Stack & Delivery Constraints** | PASS with justification | No framework change; no npm dependency added; CSS Modules + tokens. One new third-party script, Cloudflare Turnstile: required by the API contract (a session needs its token), free, host-agnostic, loaded only after first intent and never on first load, which is the justification Principles I and II ask for; v1.4.0 records it as the approved exception. |
| **Workflow & Quality Gates** | PASS | All eight gates per v1.3.0 on every chrome page with the flag on; CI builds with `on` so the bar is measured; bundle check added; scores, axe, latency and env names recorded in the PR per quickstart.md. |

**Initial Constitution Check: PASS**, with two items carried into Complexity Tracking and the
v1.4.0 amendment.

**Post-Design Constitution Check (after Phase 1): PASS.** The artifacts add nothing beyond the
checked surface:

- Contract surface: no new routes or endpoints; one window event and one palette action kind;
  the API contract consumed, not changed (contracts/chat-client.md).
- Data model: client-side types, a module store, two storage keys, no cookies.
- Shared-surface edits are additive: two layouts mount one component and gain a class; the
  palette gains one item and one action; `keyboard.ts` gains one event helper; `globals.css`
  gains one `:has()` rule; `tokens.css` gains `--danger`.
- The deck route, root layout, `robots.ts`, `sitemap.ts`, fonts and `LeftRail` are verified
  unchanged by the bundle check and the isolation pass.

## Project Structure

### Documentation (this feature)

```text
specs/009-ask-jason-chat/
├── spec.md              # Feature specification (three clarifications + the floating-input revision)
├── plan.md              # This file
├── research.md          # Phase 0 — D1–D20 + the sources behind the spec
├── data-model.md        # Phase 1 — config, content, wire types, client interface, store, state machine, scenarios
├── quickstart.md        # Phase 1 — dev + gate checklist
├── sketches.md          # Layout sketches (bar, morph, panel, sheet, every state)
├── contracts/
│   ├── surfaces.md                # mount points, geometry, stacking, bar/panel anatomy, palette, page reserve
│   ├── widget-states.md           # open/send/event/error/close transitions, bot-check sub-states
│   ├── chat-client.md             # requests, SSE reader, error mapping, version check, stand-in rules
│   ├── flag-and-environments.md   # modes, env matrix, key flow, bundle check, CI changes, hygiene
│   ├── accessibility.md           # semantics, focus, keyboard, announcements, contrast, reduced motion
│   └── motion.md                  # morph timings, streaming motion, rotation, nudge, performance gate
├── checklists/requirements.md     # Spec quality checklist
└── tasks.md             # Phase 2 — task list (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── lib/
│   ├── askJasonFlag.ts                    # NEW — ASK_JASON_MODE from literal env comparisons (D2)
│   ├── scrollLock.ts                      # NEW — body scroll lock lifted from the palette's pattern (D10)
│   └── keyboard.ts                        # EDIT (additive) — OPEN_ASK_JASON_EVENT, dispatchOpenAskJason()
├── content/
│   ├── ask.ts                             # NEW — greeting, placeholders, starters (≤40 chars), the four site lines
│   └── palette.ts                         # EDIT — + { Meta, "Ask Jason", "chat", open-ask-jason }
├── types/content.ts                       # EDIT — PaletteAction | { kind: "open-ask-jason" }
├── styles/
│   ├── tokens.css                         # EDIT — --danger (error tone, ≥4.5:1 on --bg-elev)
│   └── globals.css                        # EDIT — html:has(.withAskBar) { scroll-padding-bottom: 96px }
├── app/
│   ├── layout.tsx  deck/**  robots.ts  sitemap.ts   # UNTOUCHED
│   ├── (main)/layout.tsx (+ .module.css)  # EDIT — <AskJason />; .withAskBar reserve when mode = on
│   └── work/[slug]/layout.tsx (+ .css)    # EDIT — same
└── components/
    ├── chrome/CommandPalette.tsx          # EDIT — run open-ask-jason; hide the item when unavailable
    └── ask/                               # NEW — everything below
        ├── AskJason.tsx                   #   client gate: null | bar (+ key gate) ; lazy import of the root
        ├── AskJasonRoot.tsx               #   panel/sheet host, event listeners, breakpoint switch, focus return
        ├── Bar.tsx (+ .module.css)        #   fixed bar: form, field, overlay placeholder, button; rotation + nudge hooks
        ├── Panel.tsx (+ .module.css)      #   <section role=dialog> and <dialog> variants; frame element for the morph
        ├── Header.tsx                     #   h2, disclosure (reserved), Close
        ├── EmptyState.tsx                 #   greeting + starter cards
        ├── Transcript.tsx                 #   role=log, stick-to-bottom, Jump to latest
        ├── Message.tsx                    #   visitor / reply articles, eyebrows, tags
        ├── SourcesRow.tsx                 #   "From" pills (internal / external)
        ├── OptionCards.tsx                #   three cards, disabled after use; also renders starters
        ├── Composer.tsx                   #   textarea, counter, turn hint, Send/Stop, notice, inline error
        ├── ContactBlock.tsx               #   site line + mailto from site.email
        ├── BotCheck.tsx + turnstile.ts    #   overlay surface; script load, render, execute, token age
        ├── StatusRegion.tsx + announce.ts #   one polite region + queue (clear → 350 ms → insert)
        ├── store.ts + actions.ts          #   module store (useSyncExternalStore) + the send path
        ├── wire.ts                        #   types mirroring chat-api.md; SUPPORTED_API_VERSION = 1
        ├── chatClient.ts                  #   interface + factory (literal env switch)
        ├── httpChatClient.ts + sse.ts     #   fetch calls, SSE reader, error classes, timeouts
        ├── scriptedChatClient.ts + scenarios.ts + statePicker.ts   # stand-in (standin builds only)
        ├── pacer.ts                       #   word release + catch-up + flush; span collapse after done
        ├── stickToBottom.ts               #   following flag, ResizeObserver, jump control state
        ├── morph.ts                       #   FLIP via element.animate(); reverse on interrupt; reduced-motion path
        ├── rotation.ts  nudge.ts          #   bounded schedulers (FR-004a/b)
        ├── keyGate.ts                     #   private mode: fragment → SHA-256 → localStorage; re-check per load
        └── ask.module.css                 #   shared tone/hairline/eyebrow styles

next.config.mjs                        # EDIT — env.NEXT_PUBLIC_ASK_JASON_KEY_HASH from ASK_JASON_PREVIEW_SECRET (private only)
.env.development                       # NEW — on / standin / test site key
scripts/check-ask-jason-bundle.mjs     # NEW — marker search per mode (D16)
scripts/axe-check.mjs                  # EDIT — + 9 open-state URLs via the picker
.github/workflows/quality.yml          # EDIT — env on gate builds; + bundle-check job
.specify/memory/constitution.md        # v1.4.0 — "Ask Jason widget" named exception (D19)
CLAUDE.md                              # SPECKIT block → 009
```

**Structure Decision**: One feature directory, `src/components/ask/`, mounted from the two
existing chrome layouts rather than a route or a root-layout change. The widget is chrome, not
content: it shares the palette's conventions (window events, kbd-style controls, body scroll
lock) and stays out of the deck. The chat client is split from the UI behind one interface so
the scripted stand-in can stand in for the API everywhere the UI is verified, and so the
production bundle can drop it by a literal env comparison. The flag lives in `src/lib`, next to
`deckSlug.ts`, as the second build-time switch of the same shape.

## Complexity Tracking

| Item | Why needed | Simpler alternative rejected because |
|---|---|---|
| Unprompted motion (placeholder rotation, nudge) and a user-initiated morph, outside the enumerated Principle IV exceptions; resolved by amending to v1.4.0 | Jason's explicit design for the entry point; bounded so each run is under 5 s, stops on first interaction, pauses when hidden and never runs under reduced motion (WCAG 2.2.2) | A static placeholder and a plain fade would keep the letter of v1.3.0 but drop the one attention device Jason asked for; a PR note instead of an amendment leaves the rule unstated for the next reviewer |
| One third-party script (Turnstile), outside the current approved list | The API issues a session only against a Turnstile token (cortex R9); no first-party substitute exists | Vercel BotID ties the check to one Vercel project and bills per check; an email gate was rejected by Jason as non-anonymous |
| A scripted stand-in client and a dev-only state picker | Several spec states (capped, address limit, correction, expired session) cannot be produced against production on demand, and Principle III verifies by inspection, so every state must be reachable | A live-only workflow would leave those states unverified; a mock-service-worker dependency is heavier and adds a package |
| A module-level store instead of React state | The two chrome layouts are different layout trees, so a navigation between a main page and a study remounts the widget; the spec requires the conversation to survive | Context dies with the remount; mounting in the root layout would touch the deck's bundle and its isolation guarantee |
| Animating the frame's geometry (top/left/width/height) rather than transforms | Transforms distort the hairline border and text mid-morph unless every child is counter-scaled; the view-transition API is above the browserslist floor | One isolated fixed box with `contain: strict` lays out cheaply; the performance gate (no dropped frames at 6× throttle) guards it |
