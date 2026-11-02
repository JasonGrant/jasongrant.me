# Research: Ask Jason chat widget (feature 009)

Decisions are numbered D1–D20 and cited from plan.md, data-model.md, the contracts and
quickstart.md. Design research done before the spec (chat entry points, streaming, chips,
citations, motion, screen-reader behaviour, feature flags, Turnstile) is folded in; its sources
are listed at the end.

## D1 — Mount in the two chrome layouts; keep state in a module store

**Decision**: `<AskJason />` is rendered by `src/app/(main)/layout.tsx` and
`src/app/work/[slug]/layout.tsx`, next to `<CommandPalette />`. The deck layout mounts nothing.
Conversation, session, health and widget state live in a module-level store
(`src/components/ask/store.ts`, subscribed through `useSyncExternalStore`), so a navigation
between the main pages and a case study, which remounts the layout, keeps the conversation
(spec FR-004, Story 1 scenario 7). Only the session token is persisted (`sessionStorage`,
research R8 in cortex); the transcript is memory only.

**Rejected**: mounting in the root layout (touches the `/deck` bundle and its isolation
guarantee from 008); a React context provider (dies with the layout remount); writing the
transcript to storage (outside the `widget.md` *Must not* list).

## D2 — Flag gating that strips code when off

**Decision**: `src/lib/askJasonFlag.ts` exports `ASK_JASON_MODE` as `"off" | "private" | "on"`,
derived only from literal comparisons of `process.env.NEXT_PUBLIC_ASK_JASON` (`=== "on"`,
`=== "private"`, else `off`). The layouts import one small **client** module,
`src/components/ask/AskJason.tsx`, whose body is:

```ts
export const AskJason =
  process.env.NEXT_PUBLIC_ASK_JASON === "on" || process.env.NEXT_PUBLIC_ASK_JASON === "private"
    ? AskJasonGate            // bar + lazy import("./AskJasonRoot") on first intent
    : () => null;
```

Webpack's DefinePlugin inlines the public variable and ConstPlugin drops the dead branch at
parse time, pruning the `import()` and the bar, so an `off` build carries a null component and
nothing else. Every environment sets the variable explicitly: an **unset** variable is not
inlined, the branch survives as runtime-dead code, and the chat chunk is emitted (verified with
webpack 5 in a standalone test; the build check in D16 is the arbiter on the real build).

**Caveat**: Next's React Server Components layer collects client references per imported client
module, not per used export; keeping the gate inside a single tiny client module keeps that
reference trivial. If the D16 check still finds a leaked chunk, the fallback is an `await
import()` behind the same literal condition inside the async layout, which removes the client
reference entirely.

**Rejected**: Vercel Flags SDK (server-side evaluation needs dynamic rendering or precomputed
variants and cannot ship zero code); Edge Config (middleware on a fully static site); the repo's
existing `featureFlags.ts` constants (a code change to flip, which the spec forbids).

## D3 — Private mode: a build-time hash, a fragment-carried key, local storage

**Decision**: `next.config.mjs` reads `ASK_JASON_PREVIEW_SECRET` when the mode is `private`,
computes its SHA-256 with `node:crypto`, and exposes only the hex digest to the client as
`NEXT_PUBLIC_ASK_JASON_KEY_HASH` through the config's `env` map. A `private` build with no secret
fails at config load with a one-line message. In the browser, `src/components/ask/keyGate.ts`
runs after hydration: it reads `location.hash` for `#ask=<key>`, hashes the key with
`crypto.subtle.digest("SHA-256")`, compares to the inlined digest, stores the key in
`localStorage["ask-jason.preview-key"]` with a 30-day expiry, and removes the fragment with
`history.replaceState`. On every load it re-hashes the stored key, so rotating the secret and
redeploying disarms every browser. `crypto.subtle` needs a secure context, which production,
previews and `localhost` all are.

**Why a fragment**: browsers never send the fragment to the server, so the key cannot land in
Vercel request logs or analytics; a query string could.

**Rejected**: a cookie (sent on every request; appears in logs); a secret query parameter; a
middleware check (an edge function on every request and two built variants of each page).

## D4 — One chat-client interface, two implementations

**Decision**: `src/components/ask/chatClient.ts` declares `ChatClient` (`health()`,
`createSession()`, `chat()` returning an async iterable of events plus an abort handle).
`httpChatClient.ts` talks to `NEXT_PUBLIC_ASK_JASON_API`; `scriptedChatClient.ts` replays
scenarios for every state in spec FR-030. Selection is a literal comparison,
`process.env.NEXT_PUBLIC_ASK_JASON_API === "standin"`, so Vercel builds (set to the real URL)
strip the scripted client and its fixtures, while development and CI (set to `standin`) carry
them. A dev-only state picker reads `?ask=<scenario>` (and `&open=1` to open the panel on load)
behind the same literal, which is what lets axe and the visual pass reach every open state on a
production build in CI (quickstart.md).

**Rejected**: a mock-service-worker package (new dependency); a Next route handler stub (ships
in every build unless excluded, and hides the cross-origin behaviour the real client has).

## D5 — Server-sent events over `fetch`

**Decision**: `POST /api/chat` with `Authorization: Bearer <session>` and
`Accept: text/event-stream`; read `response.body` through `getReader()` and a streaming
`TextDecoder`; parse per the WHATWG EventSource grammar (`event:` and `data:` fields, blank-line
dispatch, multi-line `data` joined with `\n`, comments and unknown fields ignored). A non-2xx
response is a JSON error body, mapped before any stream handling. One `AbortController` per turn
serves Stop and the 20 s no-`meta` timeout (spec FR-037). No automatic retry, ever.

**Rejected**: `EventSource` (GET only, no request headers); a streaming library (new dependency).

## D6 — Word-paced rendering

**Decision**: `pacer.ts` buffers deltas, splits them into words with `Intl.Segmenter`
(`granularity: "word"`) where present and whitespace otherwise (Firefox below 125 lacks the
segmenter), and releases one word every 16 ms. Catch-up: when the backlog exceeds about 60
words the release size grows so the visible text never trails by more than one second; on `done`
the remainder flushes at once (FR-024). Each released word is a `<span>` with a 150 ms CSS
opacity fade; after `done` the spans collapse to plain text in one pass so a long transcript does
not keep thousands of nodes. Under reduced motion words append as plain text with no spans.

**Rejected**: character-level reveal (twitchy, more nodes); rendering raw deltas (bursty).

## D7 — Stick-to-bottom without a dependency

**Decision**: the transcript is the scroll container (`overscroll-behavior: contain`, which is
absent on Safari 15 and degrades to normal chaining). `following` flips off when the visitor
scrolls more than 24 px above the bottom and back on when they return; a `ResizeObserver` on the
list scrolls to the bottom while following; "Jump to latest" shows when not following and new
content has arrived (FR-023).

**Rejected**: `use-stick-to-bottom` (new dependency; its button ships without a label).

## D8 — Turnstile on first intent, in an overlay

**Decision**: `turnstile.ts` injects
`https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=<cb>` with
`async defer` the first time the bar gains focus (or is tapped on a phone, or the palette item
runs), renders once into the panel's bot-check surface with `sitekey`, `theme: "dark"`,
`size: "flexible"`, `appearance: "interaction-only"`, `execution: "execute"`,
`language: document.documentElement.lang`, and the `callback`, `error-callback`,
`expired-callback`, `before-interactive-callback` and `after-interactive-callback` hooks, and
calls `turnstile.execute()` on the first keystroke or starter tap (FR-007). The surface is
absolutely positioned above the composer inside the panel, so a visible challenge shifts nothing
(FR-013). Tokens are single-use and live 300 s; a token older than 270 s at send time is
re-executed first. In development the Cloudflare test site keys exercise the three bot-check
states: `1x00000000000000000000AA` passes, `2x00000000000000000000AB` fails,
`3x00000000000000000000FF` forces the interactive challenge.

**Rejected**: a React wrapper package (new dependency); rendering on open (spends a check on
every open); a permanent 65 px slot (empty space for most visitors).

## D9 — Session lifecycle

**Decision**: the session token lives in `sessionStorage["ask-jason.session"]` with an in-memory
fallback when storage throws. `401 session_required` and `410 session_expired` clear it and run
the bot check again with the pending message queued; `409 session_closed` and `409 turn_limit`
enter the ended state; `turns_left` from each `meta` is kept in the store and ends the
conversation locally at 0 (FR-022, FR-033). Health is fetched on every first intent of a page
view and on reopen after the panel has been closed for more than 60 s, so a cap that trips
mid-visit is noticed without polling.

## D10 — Container semantics: non-modal panel, native modal sheet

**Decision**: at 768 px and above the panel is a `<section role="dialog" aria-label="Ask Jason">`
fixed to the right edge, 400 px wide, with no `aria-modal`, no backdrop and no focus trap;
Escape closes it while focus is inside. Below 768 px the sheet is a native `<dialog>` opened with
`showModal()`: top layer, the rest of the document inert, Escape fires `cancel`, which we treat
as close. A `matchMedia("(max-width: 767px)")` listener switches containers on resize without
losing state. The sheet's height is `calc(100dvh - 24px)` with a `100vh` fallback; a
`visualViewport` `resize` listener sets an inline height while the on-screen keyboard is up so the
composer stays visible, with a `blur` reset for the iOS case where `offsetTop` does not return
to zero. Body scroll under the sheet is locked with the palette's `position: fixed` pattern,
lifted into `src/lib/scrollLock.ts`; the palette keeps its own copy until a later tidy.

**Rejected**: a custom modal with `inert` on siblings (the attribute lands in Safari 15.5, above
the 15.4 floor; `showModal()` is 15.4); a modal desktop dialog (blocks reading the page the
answer cites).

## D11 — The morph: FLIP on the frame with the Web Animations API

**Decision**: a dedicated frame element (the panel's background box) animates from the bar's
rectangle to the panel's or sheet's rectangle. The panel renders invisibly first so its final
rectangle can be measured, then `frame.animate()` interpolates `top`, `left`, `width` and
`height` over 320 ms with `cubic-bezier(0.2, 0, 0, 1)` while the bar's contents fade out
(0–100 ms) and the panel's contents fade in (160–320 ms). Close is the reverse over 240 ms. The
frame is `position: fixed` with `contain: strict` and `will-change`, so the per-frame layout cost
is one isolated box; the gate is no dropped frames on a mid-tier phone in DevTools. A transform
with counter-scaled children was rejected because it distorts the hairline border and text
mid-flight; `document.startViewTransition` was rejected because same-document view transitions
need Safari 18 and Firefox 144, above the repo's browserslist floor. Under reduced motion the
frame does not animate: the bar fades out and the panel fades in over 100 ms (FR-044, FR-046).
Opening from the command palette fades the panel in over 200 ms with no frame animation.

## D12 — Placeholder rotation and nudge

**Decision**: the rotating text is an `aria-hidden` overlay `<span>` inside the bar, not the
native `placeholder` attribute, because some screen readers expose placeholder changes and
because the overlay can carry a static caret glyph. The field's `aria-label` is "Ask Jason" and
its native placeholder is set only while the overlay is inactive. A small scheduler
(`rotation.ts`) implements FR-004a: start at 2 s, about 30 ms a character, hold 3 s, rest 8 s,
at most three cycles, cancelled by focus, hover, pointerdown or input, paused on
`visibilitychange`, never started under reduced motion or when a conversation exists. The nudge
(`nudge.ts`) toggles a class for 600 ms that transitions `border-color` and the button's
`color` to `--accent`, within FR-004b's bounds (earliest 20 s, at least 45 s apart, at most three
per page view, never after interaction, never while open or hidden, never under reduced motion).
The three questions are the empty-state starters from `src/content/ask.ts`, each at most 40
characters, checked by a build-time assertion.

## D13 — Screen-reader model: silent log, one status region

**Decision**: the transcript is `role="log"` with `aria-live="off"`, `aria-label="Conversation"`
and `tabindex="0"`; each message is an `<article>` labelled by its `<h3>` eyebrow ("You",
"Jason · AI"). One visually hidden `role="status"` (`aria-live="polite"`, `aria-atomic="true"`)
mounts with the panel and carries every announcement in FR-041 through a queue that clears,
waits 350 ms and inserts. Nothing else in the widget is live. This follows what 2026 audits of
ChatGPT, Claude.ai, Gemini and Perplexity found: token-level live regions either flood or drop,
and no shipping product announces per token.

## D14 — Command palette item

**Decision**: `PaletteAction` gains `{ kind: "open-ask-jason" }`; `palette.ts` gains an "Ask
Jason" item in the Meta group with hint "chat"; `runAction` dispatches a window event
(`open-ask-jason`, mirroring `CMDK_OPEN_EVENT`) that the widget root listens for. The item is
shown only when the widget is available in this browser: never in `off`, always in `on`, and in
`private` only once the key gate has armed the store, read at render time.

## D15 — Reserved bottom space and focus clearance

**Decision**: in `on` mode the two chrome layouts add a class to `.page` that extends its bottom
padding by 72 px and set `scroll-padding-bottom: 96px` on `html`, so the footer's last row and a
focused control near the bottom scroll clear of the bar (FR-003, WCAG 2.2 2.4.11). In `private`
and `off` the public page is byte-identical to today; an armed browser in `private` overlays the
footer, which the spec accepts.

## D16 — Build-output check

**Decision**: `scripts/check-ask-jason-bundle.mjs <mode>` reads `.next/server/app/**/*.html`,
collects the `<script src>` set each page loads, and searches those scripts and the HTML for
three markers: the Turnstile host, the entry-point marker attribute `data-ask-jason`, and the
API host. For `off` it also searches every file under `.next/static` and fails on any hit; for
`private` it fails on a hit in HTML or first-load scripts and only reports (does not fail) a
chunk that exists unreferenced; for `on` it requires the entry-point marker in every chrome
page and no Turnstile host in first-load scripts. CI gains a `bundle-check` job that builds
`off` and then `private` (with a placeholder secret) and runs the script after each; the three
existing jobs build with `on` and `standin`.

## D17 — Environment files and values

**Decision**: commit `.env.development` with `NEXT_PUBLIC_ASK_JASON=on`,
`NEXT_PUBLIC_ASK_JASON_API=standin` and the Cloudflare always-pass test site key, so a fresh
clone shows the widget against the stand-in with no setup (FR-049, Story 4 scenario 3). The
ignore rule already excludes `.env*.local`, where a developer points at the live API. Vercel
holds the real values: Production `NEXT_PUBLIC_ASK_JASON=private` (then `on`),
`ASK_JASON_PREVIEW_SECRET`, the real site key and the API URL; Preview the same with `on` on
chosen branches. CI sets `on` and `standin` for the gate builds and `off` / `private` for the
bundle check. Names only are documented in quickstart.md; no value is committed except the
public test key.

## D18 — Counting characters the API's way

**Decision**: the composer counts `Array.from(text.trim()).length` (Unicode code points), which
is how the API counts (cortex 007 tasks, phase 9), with the limit taken from `health.limits
.input_chars`. An implementation task reconfirms the server's exact rule against
`src/lib/chat/input.ts` in cortex before the counter ships, because a grapheme-versus-code-point
mismatch would let a message through that the API rejects.

## D19 — Constitution amendment v1.4.0

**Decision**: add a named exception, "Ask Jason widget", in the same change set: (a) Principle
IV: the fixed bottom-centre bar and the docked panel or sheet are overlays, not page layout; the
bounded unprompted motion of FR-004a and FR-004b and the user-initiated morph of FR-046 are
permitted, with their bounds restated; (b) Stack & Delivery: Cloudflare Turnstile is the
approved third-party script, loaded only after the visitor's first intent, never on first load;
(c) Principle V: the widget is not a page and changes no IA; its header carries the AI
disclosure at all times. MINOR bump, as 008's exception was. The spec left this as Jason's
choice between a PR note and an amendment; the amendment is proposed because every prior
rule-bending feature in this repo amended the constitution, and a reviewer should find the
rule, not a PR comment. If Jason declines, the task is dropped and the PR records the note.

## D20 — Analytics and tracking surface

**Decision**: no new events (spec Non-Goals). The existing `ClickTracker` listens at document
level and will record clicks on source pills as `link_click` with the entry title as text, which
is public information and existing behaviour; option cards are buttons and are not tracked. The
widget sends nothing else anywhere.

## Sources consulted before the spec

Chat entry points and containers: Mintlify assistant docs; Inkeep's Mintlify integration;
Linear's command menu changelog; Apple HIG (sheets, buttons, motion); Vaul's drawer write-up and
API; Chrome's viewport-resize behaviour post; MDN `VisualViewport`; Vercel design guidelines;
Rauno Freiberg's interface guidelines. Streaming and transcripts: AI SDK `smoothStream`;
Streamdown animation docs; `use-stick-to-bottom`; AI Elements conversation and sources
components; WCAG 2.1 status messages (4.1.3). Chips and citations: AI UX Playground patterns
and Perplexity teardowns; Material 3 chip tokens; WCAG 2.2 target size (2.5.8) and focus not
obscured (2.4.11). Motion: Material 3 motion tokens; Emil Kowalski on animations and drawers;
web.dev on reduced motion. Disclosure: EU AI Act Article 50 (in force 2 August 2026);
California's B.O.T. Act and SB 243; Intercom and GitLab disclaimer placement. Accessibility of
streamed chat: Adrian Roselli's 2026 live-region support matrix; Sara Soueidan and Scott O'Hara
on live regions; 2026 screen-reader audits of ChatGPT, Claude.ai, Gemini and Perplexity; W3C
APG dialog pattern; Deque on initial focus; GOV.UK character count. Turnstile: Cloudflare
client-side rendering, widget configuration, appearance modes, hostname management, testing
keys and CSP docs. Flags and hosting: Next.js environment variables; webpack ConstPlugin and
DefinePlugin; Vercel Flags SDK and Flags Explorer docs; Vercel Edge Config limits; Vercel
preview URLs, branch domains and deployment protection.
