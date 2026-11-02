# Tasks: Ask Jason chat widget

**Input**: Design documents from `/specs/009-ask-jason-chat/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md, sketches.md

**Tests**: None (constitution Principle III — no functional test suites). Verification tasks map
to the quickstart gates, the stand-in scenarios and the spec's success criteria instead.

**Organization**: Tasks grouped by user story. Setup carries the constitution amendment, the
flag and content modules, tokens and types. Foundational builds the gate, store, clients,
stand-in and the shells every story renders into. US1 (ask and read) is the MVP; US2 (options),
US3 (limits and errors) and US4 (flag modes) complete the P1 set; US5 (equal access) and US6
(page untouched) verify and harden.

**Jason-gated tasks** (require Jason personally): T003 (final copy), T046 (Vercel values and the
preview secret), T047 (API allowlist and Turnstile hostnames), T056 (VoiceOver pass), T064
(constitution sign-off and PR record).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: US1–US6 (Setup/Foundational/Polish carry no story label)

---

## Phase 1: Setup (constitution + config + content + types)

- [X] T001 Amend `.specify/memory/constitution.md` to v1.4.0: Sync Impact Report, Principle IV "Ask Jason widget" exception (fixed bar and docked panel/sheet as overlays; bounded placeholder rotation and nudge per FR-004a/b; user-initiated morph per FR-046), Stack & Delivery note approving Cloudflare Turnstile loaded only after first intent, Principle V note that the widget is not a page and always discloses itself; version line and Last Amended date (research D19); land it as its own first commit so the rule change stays explicit and separable
- [X] T002 [P] Create `src/lib/askJasonFlag.ts`: `AskJasonMode` and `ASK_JASON_MODE` from literal comparisons of `process.env.NEXT_PUBLIC_ASK_JASON` only; header comment explaining why the variable must be set explicitly in every environment (data-model.md §1, research D2)
- [X] T003 [P] Create `src/content/ask.ts` per data-model.md §2: `greeting`, `placeholder`, `followUpPlaceholder`, `closedLabel`, three `starters` (label ≤ 40 chars, prompt), `lines` (ended, resting, network, contact); `satisfies` typing plus an import-time assertion on count and label length. Placeholder copy from spec Assumptions until Jason supplies final wording — **Jason-gated for final copy**
- [X] T004 [P] Add `--danger` to `src/styles/tokens.css` (warm red ≥ 4.5:1 on `--bg-elev` and on the ink@6% tone block; hex with the oklch note, as the other tokens) and `html:has(.withAskBar) { scroll-padding-bottom: 96px; }` to `src/styles/globals.css` (contracts/surfaces.md, contracts/accessibility.md)
- [X] T005 [P] Extend `src/types/content.ts` `PaletteAction` with `{ kind: "open-ask-jason" }` and add `OPEN_ASK_JASON_EVENT` + `dispatchOpenAskJason()` to `src/lib/keyboard.ts` (contracts/surfaces.md)
- [X] T006 [P] Create `src/components/ask/wire.ts` per data-model.md §3: `Health`, `ApiError`, `SessionResponse`, `Source`, `OptionEntry`, `ReplyMeta`, `ChatEvent`, `ErrorCode`, `SUPPORTED_API_VERSION = 1`
- [X] T007 [P] Create `.env.development` with `NEXT_PUBLIC_ASK_JASON=on`, `NEXT_PUBLIC_ASK_JASON_API=standin`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA`, each with a one-line comment; confirm `.gitignore` keeps `.env*.local` ignored and this file tracked (contracts/flag-and-environments.md, research D17)

**Checkpoint**: `npx tsc --noEmit` and `npx biome check .` pass; the site renders unchanged (nothing mounts yet).

---

## Phase 2: Foundational (gate, store, clients, stand-in, shells — blocks every story)

- [X] T008 Create `src/components/ask/store.ts` per data-model.md §5: module singleton with `getSnapshot`, `subscribe`, typed setters, `useAskStore()` via `useSyncExternalStore`; initial state from `ASK_JASON_MODE`, `inputLimit` 500, `bar` derived (data-model.md §6 bar-mode table) (research D1)
- [X] T009 [P] Create `src/components/ask/chatClient.ts` (`ChatClient` interface, `ChatHttpError`, `ChatNetworkError`, `createChatClient()` factory switching on the literal `process.env.NEXT_PUBLIC_ASK_JASON_API === "standin"`) (data-model.md §4, research D4)
- [X] T010 [P] Create `src/components/ask/sse.ts`: async-iterable SSE reader over a `ReadableStream` (field parsing per WHATWG, multi-line data, comments ignored, dispatch on blank line, JSON-parse `data`, `ChatNetworkError` on early close or parse failure) (contracts/chat-client.md, research D5)
- [X] T011 Create `src/components/ask/httpChatClient.ts`: `health()` (`cache: "no-store"`, 20 s timeout), `createSession()` (referrer host only), `chat()` (bearer header, `Accept: text/event-stream`, `credentials: "omit"`, caller's `AbortSignal`, 20 s first-`meta` timer, non-2xx → `ChatHttpError`); no retry anywhere (depends on T009, T010)
- [X] T012 [P] Create `src/components/ask/scenarios.ts` with every scenario in data-model.md §9 (health, session, turns with realistic timing; fixed strings copied from the live API with the copy date; `bot-*` scenarios naming the Cloudflare test site keys) and `src/components/ask/scriptedChatClient.ts` implementing `ChatClient` from a scenario (contracts/chat-client.md, stand-in rules)
- [X] T013 [P] Create `src/components/ask/statePicker.ts`: reads `?ask=<id>`, `&open=1`, `&container=sheet` from `location.search`, exposes the selection to the store; whole module behind the `standin` literal so Vercel builds drop it (research D4)
- [X] T014 [P] Create `src/lib/scrollLock.ts`: `lockBodyScroll()` / `unlockBodyScroll()` using the palette's `position: fixed` pattern with scroll restore; `CommandPalette.tsx` untouched (research D10)
- [X] T015 [P] Create `src/components/ask/turnstile.ts`: `loadTurnstile()` (inject `…/turnstile/v0/api.js?render=explicit&onload=…` once, `async defer`), `renderTurnstile(container, { sitekey, theme: "dark", size: "flexible", appearance: "interaction-only", execution: "execute", language, callbacks })`, `executeTurnstile()`, token with timestamp and the 270 s age rule, `reset()`; site key from `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, missing key → `cta` (research D8, spec FR-050)
- [X] T016 Create `src/components/ask/announce.ts` + `StatusRegion.tsx`: one visually hidden `role="status" aria-live="polite" aria-atomic="true"`, queue with clear → 350 ms → insert, 600-character cap (data-model.md §7, contracts/accessibility.md) (depends on T008)
- [X] T017 Create `src/components/ask/actions.ts`: the send path of contracts/widget-states.md (append visitor + reply, health gate, bot-check gate, session gate incl. 401/410 renewal with queued message, `chat()` event loop mapping `meta`/`text`/`correction`/`done`/`error`, abort for Stop, 20 s no-meta and dropped-stream handling, HTTP error mapping table; thinking mark within 100 ms and kept ≥ 300 ms, spec FR-024) over the store (depends on T008, T011, T015, T016)
- [X] T018 Mount and load: `src/components/ask/AskJasonMount.tsx` (async server component with literal env branches, each `import()` inside its branch so the off build carries nothing; research D2), `AskJasonPrivate.tsx` (private mode: key check, then a `React.lazy` bar), `rootLoader.ts` (lazy `import("./AskJasonRoot")` on first intent) and `AskJasonRoot.tsx` (mounts Panel and StatusRegion, consumes the open request the bar leaves in the store, container switch, stand-in autoplay, re-exports `actions`) (depends on T008, T017)
- [X] T019 [P] Create `src/components/ask/Bar.tsx` + `Bar.module.css`: fixed bar geometry per contracts/surfaces.md (desktop and phone), `<form aria-label="Ask Jason">`, field (`aria-label`, `enterkeyhint="send"`), overlay placeholder span (static for now), "Ask Jason →" submit button with 44 px hit area, `data-ask-jason="bar"`, phone variant as a single button, `closed` bar mode as a button; submit → `actions.sendFromBar()` / open empty (contracts/surfaces.md, sketches §1)
- [X] T020 [P] Create `src/components/ask/Panel.tsx` + `Panel.module.css` + `ask.module.css`: `<section role="dialog" aria-labelledby aria-describedby>` panel (400 px, right, non-modal) and `<dialog>` sheet (`showModal()`, `calc(100dvh - 24px)` with `vh` fallback, grabber, scrim close, `visualViewport` height while the keyboard is up, `scrollLock`); frame element for the morph; header slot, body slot, footer slot; Escape handling only with focus inside (contracts/surfaces.md, contracts/accessibility.md, research D10)
- [X] T021 [P] Create `src/components/ask/Header.tsx`: `<h2 id="ask-title" tabindex="-1">`, disclosure `<p id="ask-disclosure">` reserved at 2 lines (panel) / 3 lines (sheet) until health, Close button styled as the palette's `esc` key (spec FR-008)
- [X] T022 [P] Create `src/components/ask/Composer.tsx`: `<textarea aria-label="Your question" aria-describedby="ask-hint ask-count">` growing 1 → 5 rows, 17 px (≥ 16 px on touch), shared `draft` with the bar, Enter/Shift+Enter on pointer devices and Enter = newline on touch, Send (disabled rules, no tooltip when disabled, spec FR-019) / Stop swap, notice line from health, slots for counter, turn hint and inline error (contracts/surfaces.md, spec FR-017 to FR-021)
- [X] T023 [P] Create `src/components/ask/Transcript.tsx` + `Message.tsx`: `role="log" aria-live="off" aria-label="Conversation" tabindex="0"`, `<article aria-labelledby>` per message with `<h3>` eyebrows ("You", "Jason · AI", tags "Updated"/"Stopped"/"Didn't send"), visitor tone block, thinking mark (static dots + slow pulse), plain-text rendering with paragraph breaks (spec FR-010, FR-025)
- [X] T024 [P] Create `src/components/ask/ContactBlock.tsx` (site line + `mailto:` from `site.email`) and `src/components/ask/EmptyState.tsx` (greeting + starter cards placeholder slot) (spec FR-035)
- [X] T025 Mount `<AskJason />` after `<CommandPalette />` in `src/app/(main)/layout.tsx` and `src/app/work/[slug]/layout.tsx`; add `.withAskBar` (+ 72 px bottom padding) to both `layout.module.css` files, applied when `ASK_JASON_MODE === "on"`; verify `src/app/deck/layout.tsx` and `src/app/layout.tsx` untouched (contracts/surfaces.md, research D15) (depends on T018, T019)
- [X] T026 Palette integration: add the Meta "Ask Jason" item to `src/content/palette.ts`; in `src/components/chrome/CommandPalette.tsx` run `open-ask-jason` via `dispatchOpenAskJason()` and filter the item when the store says unavailable (`off`, or `private` and not armed) (contracts/surfaces.md, research D14) (depends on T005, T008)

**Checkpoint**: `npm run dev` shows the bar on every chrome page; the bar opens an empty panel/sheet (no morph yet) whose header carries the stand-in's disclosure; typing and Send produce a visitor message and a plain (unpaced) reply from `?ask=answer-1`; `/deck/dev/intro/cover` shows nothing.

---

## Phase 3: User Story 1 — Ask a question and read a grounded answer (P1) 🎯 MVP

**Goal**: Send from the bar, watch the morph, read a word-paced answer with its "From" row, follow up, survive navigation, close back into the bar.

**Independent Test**: Story 1 scenarios 1–8 against `?ask=answer-3` and `?ask=correction-text`, then against the live API on a preview once allowlisted.

- [X] T027 [P] [US1] Create `src/components/ask/pacer.ts`: word segmentation (`Intl.Segmenter` with whitespace fallback), 16 ms release, catch-up above ~60 words backlog, flush on `done`, span-per-word with 150 ms fade then collapse to text after `done`; reduced motion appends plain text (research D6, spec FR-024)
- [X] T028 [P] [US1] Create `src/components/ask/stickToBottom.ts` and wire it into `Transcript.tsx`: `following` flag (24 px threshold), `ResizeObserver`, "Jump to latest" button (36 px, 12 px above the composer rule, 120 ms fade), `overscroll-behavior: contain` (research D7, spec FR-023)
- [X] T029 [P] [US1] Create `src/components/ask/SourcesRow.tsx`: `<nav aria-label="Sources for this answer">`, mono "FROM" label, title-only pills (32 px, hairline, radius 5), internal same-tab vs external new-tab with `ArrowOut` and hidden "(opens in new tab)", `url: null` → plain text; rendered at `meta` above the text (spec FR-026, contracts/surfaces.md)
- [X] T030 [US1] Create `src/components/ask/morph.ts` and wire it into `Panel.tsx`/`Bar.tsx`/`AskJasonRoot.tsx`: measure bar rect and hidden-panel rect, FLIP the frame's top/left/width/height with `element.animate()` (320 ms open `cubic-bezier(0.2,0,0,1)`, 240 ms close), bar contents fade 0–100 ms, panel contents fade 160–320 ms, radius interpolation, `reverse()` on interrupt, palette open = 200 ms fade, reduced motion = 100 ms crossfade; sheet variant grows upward and supports drag-to-dismiss (30 % or 0.5 px/ms) (research D11, contracts/motion.md) (depends on T019, T020)
- [X] T031 [US1] Correction handling in `actions.ts` + `Message.tsx`: replace text and pending with a 200 ms opacity crossfade (instant under reduced motion), set `updated`, re-render sources or options from the event's meta, announce "Answer updated" (+ text rule); ignore a correction after Stop (spec FR-029, contracts/widget-states.md) (depends on T017, T029)
- [X] T032 [US1] Focus and reopen rules in `AskJasonRoot.tsx`: focus → composer after a sent question, → heading after an empty or palette open, → bar field (or bar button in `closed` mode) on close with scroll-into-view; keep transcript and `draft` across close/reopen; bar placeholder "Ask a follow-up" after a conversation; health refetch after 60 s closed (spec FR-039, FR-004, data-model.md §6) (depends on T030)
- [X] T033 [P] [US1] Create `src/components/ask/rotation.ts` and wire the overlay placeholder in `Bar.tsx`: start 2 s, ~30 ms/char, hold 3 s, clear, rest 8 s, ≤ 3 cycles, static caret glyph, stop on focus/hover/pointerdown/input/open, pause on `visibilitychange`, never under reduced motion or with a conversation; native placeholder set only while the overlay is inactive; questions from `ask.starters` (spec FR-004a, contracts/motion.md)
- [X] T034 [P] [US1] Create `src/components/ask/nudge.ts` and the `.nudge` class in `Bar.module.css`: 600 ms border-color + button color to `--accent` and back; earliest 20 s, ≥ 45 s apart, ≤ 3 per page view, only while the rotation rests, never after interaction, while open, hidden, or under reduced motion (spec FR-004b, contracts/motion.md)
- [X] T035 [US1] Navigation persistence check: with the panel open, navigate home → `/experience` → `/work/app-shell` → home; the store survives the layout remount and the panel stays open with its transcript; reload keeps only the session token (spec Story 1 scenario 7; research D1) (depends on T025, T032)

**Checkpoint**: Story 1 scenarios pass on `?ask=answer-3` and `?ask=correction-text` in the panel and the sheet; the morph shows no layout shift in the Performance panel.

---

## Phase 4: User Story 2 — Nothing written: the three closest entries as cards (P1)

**Goal**: Options replies render as three full-width cards whose tap becomes the next visible message; starters reuse the same component.

**Independent Test**: `?ask=options&open=1`: options text, exactly three cards with title + one-line summary, tap sends the prompt as a visitor message, cards disable after the next send; `?ask=empty&open=1`: three starters, gone after the first send.

- [X] T036 [P] [US2] Create `src/components/ask/OptionCards.tsx` + styles in `ask.module.css`: full-width stacked `<button aria-label="Ask about {title}">` cards (title ≤ 2 lines, summary 1 line ellipsis, trailing arrow `aria-hidden`), min-height 48 px touch / 40 px pointer, 8 px gap, 30 ms stagger fade (none under reduced motion), disabled state (`aria-disabled`, `tabindex=-1`, `--ink-mute`, no arrow); starter variant without summary (spec FR-027, contracts/surfaces.md)
- [X] T037 [US2] Wire options into `Message.tsx` and `actions.ts`: render cards under the options text from `meta.options` (exactly three; otherwise text only + dev warning), activation → `sendMessage(prompt)` through the normal send path, set `optionsUsed` on every earlier options reply when any later message is sent (contracts/widget-states.md) (depends on T036, T017)
- [X] T038 [US2] Wire starters into `EmptyState.tsx` from `ask.starters` using the starter variant; activation sends `prompt`; starters disappear after the first send (spec Story 1 scenario 2, FR-004a copy source) (depends on T036, T024)

**Checkpoint**: US1 and US2 scenarios pass together on `?ask=options` (tap a card → grounded answer with sources).

---

## Phase 5: User Story 3 — Boundaries and limits, never raw errors (P1)

**Goal**: Deflections read as replies; the counter and Send stop over-limit sends; every API error and limit lands in its spec state with the contact call to action where required.

**Independent Test**: Each stand-in scenario in data-model.md §9 under "too-long", "not-text", "address-limit", "countdown", "turn-limit", "session-closed", "session-expired", "capped-*", "down-health", "unavailable-chat", "old-version", "error-event", "no-meta", "drop", "bot-fail", "bot-interactive", "deflect", "none" shows exactly the state in contracts/widget-states.md.

- [X] T039 [P] [US3] Implement the counter and turn hint inside `src/components/ask/Composer.tsx` (no separate files; the bar shows the same count in place of its button label): code-point count after trim (`Array.from`), limit from `health.limits.input_chars`, hidden below 80 %, "N left" then "N over" in `--danger` with Send disabled and the notice replaced by "Keep it under {limit} characters."; turn hint at ≤ 3 from `turnsLeft`; both via `aria-describedby`, announced only at 1 and 0 turns; counter also shown in the bar in place of the button label while active (spec FR-018, FR-022, research D18)
- [X] T040 [US3] Reconfirm the API's character rule: read the input validation in `~/Repos/cortex/src/lib/chat/` (007 tasks, phase 9: characters not UTF-16 units; fenced code, data URLs and control characters rejected) and align `Counter.tsx` and a pre-send check for the two `input_not_text` triggers so the server's 400 is the exception, not the norm; record the rule in a code comment (research D18) (depends on T039)
- [X] T041 [US3] Error and limit states in `actions.ts`, `Composer.tsx`, `Message.tsx`, `Panel.tsx`: inline `input_too_long` / `input_not_text` under the composer with hidden "Error:" prefix and text kept; `address-limit` (message in reply slot, composer → ContactBlock); `ended` on `turn_limit` / `session_closed` / `turnsLeft` 0 (site ended line or API message + ContactBlock, transcript kept, bar → `closed`); `cta` on health capped/down, unknown `api_version`, 503s and missing site key (API message or site resting line + ContactBlock, no starters/composer); network line + "Try again" (text restored, resend only on activation) for fetch failure, dropped stream and 20 s no-meta; `error` event replaces partial text; deflect/none as plain replies (spec FR-028, FR-030 to FR-037; contracts/widget-states.md) (depends on T017, T022, T024)
- [X] T042 [US3] Create `src/components/ask/BotCheck.tsx` and wire `turnstile.ts` into the send path: overlay surface anchored above the composer (absolute, no flow shift), sub-states idle/loading/checking ("Checking…" in the hint slot)/interactive (surface + "Quick check before we start", announce "Verification needed")/verified (fade out)/failed (API message + Try again + mail link); execute on first keystroke or starter tap; re-execute when the token is older than 270 s; `bot-pass`/`bot-fail`/`bot-interactive` scenarios select the test site key (spec FR-007, FR-013, FR-014; research D8) (depends on T015, T017, T020)
- [X] T043 [US3] Session renewal and Stop: on 401/410 clear `sessionStorage["ask-jason.session"]`, re-run the bot check, resend the queued message once, keep the transcript; Stop aborts the turn, tags "Stopped", announces, moves focus to the composer; `turnsLeft` still decremented (spec FR-015, FR-021; contracts/widget-states.md) (depends on T017, T042)

**Checkpoint**: every US3 scenario renders its state with the disclosure header present; no raw error text anywhere; `?ask=voice-on` shows no voice control.

---

## Phase 6: User Story 4 — Nothing ships until the flag is on (P1)

**Goal**: `off` ships nothing; `private` ships only the key check and arms Jason's browser; `on` ships the bar; CI proves it on every push.

**Independent Test**: Story 4 scenarios 1–6: the three builds with `scripts/check-ask-jason-bundle.mjs`, a local private-mode arm and rotation, and a preview flip with no code change.

- [X] T044 [P] [US4] Create `src/components/ask/keyGate.ts` and wire it into `AskJason.tsx` for `private`: read `#ask=<key>` → `crypto.subtle.digest("SHA-256")` hex → compare to `process.env.NEXT_PUBLIC_ASK_JASON_KEY_HASH` → store `{ key, expiresAt }` in `localStorage["ask-jason.preview-key"]` (30 days) → `history.replaceState` to drop the fragment; on every load re-hash the stored key, disarm on mismatch or expiry; `armed` into the store; nothing visible, no request, no storage for an unarmed browser; in `on` ignore and remove the fragment (contracts/flag-and-environments.md, research D3)
- [X] T045 [P] [US4] Edit `next.config.mjs`: when `NEXT_PUBLIC_ASK_JASON === "private"`, require `ASK_JASON_PREVIEW_SECRET` (≥ 32 chars, else throw `ASK_JASON_PREVIEW_SECRET is required in private mode`) and set `env.NEXT_PUBLIC_ASK_JASON_KEY_HASH` to its `node:crypto` SHA-256 hex; never log the secret (research D3)
- [ ] T046 [US4] **Jason-gated**: set Vercel values for `jasongrant-me` — Production `NEXT_PUBLIC_ASK_JASON=private`, `NEXT_PUBLIC_ASK_JASON_API=https://api.jasongrant.me`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY=<real>`, `ASK_JASON_PREVIEW_SECRET=<long random>`; Preview the same with `on` on the 009 branch; record names only in quickstart.md §PR record (contracts/flag-and-environments.md env matrix)
- [ ] T047 [US4] **Jason-gated**: add the stable preview alias (and optionally `http://localhost:3000`) to the API's `CHAT_ALLOWED_ORIGINS`, and the alias to the Turnstile widget hostnames if it is not under `jasongrant.me`; verify with the preflight `curl` in quickstart.md (spec FR-051, Dependencies 4)
- [X] T048 [P] [US4] Create `scripts/check-ask-jason-bundle.mjs <off|private|on>`: collect `.next/server/app/**/*.html`, each page's `<script src>` set under `.next/static`, and (for `off`) every file under `.next/static`; search for `challenges.cloudflare.com`, `data-ask-jason`, `api.jasongrant.me/api/`; pass/fail rules per contracts/flag-and-environments.md (deck pages excluded from the `on` requirement); print one line per rule and exit non-zero on failure (research D16)
- [X] T049 [US4] Run the three builds locally per quickstart.md §Build & gates and fix any leak the check finds (fallback: move the gate's `import()` behind the literal condition in the async layouts, research D2 caveat) (depends on T044, T045, T048)
- [X] T050 [US4] Edit `.github/workflows/quality.yml`: add `NEXT_PUBLIC_ASK_JASON: on`, `NEXT_PUBLIC_ASK_JASON_API: standin`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY: 1x00000000000000000000AA` to the Lighthouse and axe build steps; add a `bundle-check` job (Node 24, `npm ci`, build `off` → check, `rm -rf .next`, build `private` with `ASK_JASON_PREVIEW_SECRET: ci-placeholder-secret-for-private-builds` → check) (contracts/flag-and-environments.md) (depends on T048)
- [ ] T051 [US4] Private-mode local test per quickstart.md: build `private`, confirm no bar, arm with `#ask=<secret>`, confirm the bar and the fragment removal across reloads, change the secret and rebuild → disarmed; then preview flip `on` → `private` → `on` with no code change (spec SC-012, SC-014) (depends on T049)

**Checkpoint**: CI green with the new job; `git grep ASK_JASON_PREVIEW_SECRET` returns only `next.config.mjs`, the workflow placeholder and specs.

---

## Phase 7: User Story 5 — Equal access (P2)

**Goal**: Keyboard, screen reader, reduced motion and small screens get a peer experience, verified on the real states.

**Independent Test**: contracts/accessibility.md's keyboard, focus and announcement tables on desktop and at 375 px; axe 0 violations on every page and open state; VoiceOver pass; reduced-motion pass; 320 px at 200 % zoom.

- [X] T052 [P] [US5] Announcement wiring audit in `actions.ts`, `BotCheck.tsx`, `Counter.tsx`, `TurnHint.tsx`: exactly the data-model.md §7 table ("Jason is answering", done rule, "Answer updated", "Verification needed", errors, "1 question left", "No questions left", "Stopped"); nothing else live; counter/hint announced via `aria-describedby` only after a 1 s typing pause at the 80 % crossing and at/over the limit (GOV.UK pattern)
- [X] T053 [P] [US5] Keyboard and focus audit against contracts/accessibility.md: tab order Close → log → cards/pills → Jump → composer → Send/Stop → mail link → page; Escape only with focus inside; `<dialog>` `cancel` → close; no focus trap on the panel; focus targets per the table; Stop disappearance → composer; Try again → composer with text
- [X] T054 [P] [US5] Reduced-motion audit: `useReducedMotion` gates morph (crossfade 100 ms), rotation (never), nudge (never), word fade (none), thinking pulse (static), card stagger (none), correction (instant), sheet slide (fade); CSS counterparts under `@media (prefers-reduced-motion: reduce)` in `Bar.module.css`, `Panel.module.css`, `ask.module.css` (contracts/accessibility.md table)
- [X] T055 [P] [US5] Targets, contrast and zoom: 24 px minimum everywhere, 44 px on touch for bar, button, cards, Send, Stop, Close, mail link; `--danger` and all text verified ≥ 4.5:1 with axe on `--bg-elev` and the tone block; 320 px at 200 % zoom with no horizontal scroll inside the panel; the bar's button never wraps (spec FR-042, FR-043, FR-045)
- [ ] T056 [US5] **Jason-gated**: VoiceOver (Safari) pass per quickstart.md §Manual passes, recorded in the PR (depends on T052, T053)
- [X] T057 [US5] Extend `scripts/axe-check.mjs` with the 31 open-state URLs from contracts/flag-and-environments.md (one `/?ask=<id>&open=1&fast=1` per stand-in scenario except `slow-health`, which runs at real speed for the loading state, plus two `&container=sheet` variants), covering every FR-030 state as FR-053 requires; run locally on the `on`/`standin` build to 0 violations (depends on T013)
- [ ] T058 [US5] Phone hardware pass (iOS Safari and Android Chrome): tap the bar → sheet with composer focus and the keyboard up, header and composer still visible (the `visualViewport` handling in `Panel.tsx`), swipe-down closes, no page scroll behind the sheet, 320 px at 200 % zoom with no horizontal scroll; fix what fails (spec Story 6 scenario 3, FR-045; quickstart.md §Manual passes) (depends on T020, T030)

**Checkpoint**: axe 0 violations on the chrome URLs + 31 open states; keyboard, reduced-motion and phone passes recorded.

---

## Phase 8: User Story 6 — The page underneath is untouched (P2)

**Goal**: Lighthouse within one point of the pre-feature run with CLS 0; no layout shift during open, bot check, streaming or correction; the deck and root untouched.

**Independent Test**: quickstart.md gates 5–6 on the `on` build, the Layout Shifts track, and the isolation checks.

- [X] T059 [P] [US6] Layout-shift pass: the counted shift is 0 and only the panel frame (and its contents) is ever reported, through open, bot check (`?ask=bot-interactive`), streaming (`?ask=long`) and correction (`?ask=correction-text`), desktop panel and 375 px sheet (spec SC-003); measured with a layout-shift observer in Playwright, all four scenarios 0.0000 counted
- [X] T060 [P] [US6] Performance pass: no dropped frames during open/close morphs at 6× CPU throttling; layout count flat during a rotation cycle; the bar's first-load cost measured (bytes, requests) and recorded (contracts/motion.md performance gate)
- [X] T061 [US6] Lighthouse mobile + desktop on the six gated URLs on the `on` build; compare with the pre-feature run (within one point, CLS 0, 95+/90+ bands); record in the PR (spec SC-002) (depends on T049)
- [X] T062 [P] [US6] Isolation and reserve checks: `/deck/ci/intro/cover` has no bar/marker/chat request; `robots.ts`, `sitemap.ts`, root layout unchanged (`git diff main -- src/app/layout.tsx src/app/deck src/app/robots.ts src/app/sitemap.ts` empty); the footer's last row and the `/writing` subscribe form scroll clear of the bar at 320, 768, 1280, 1440 px; `scroll-padding-bottom` keeps a focused bottom link visible (spec FR-003, Story 6 scenario 4)

**Checkpoint**: Lighthouse and CLS recorded; isolation confirmed.

---

## Phase 9: Polish & Cross-Cutting Concerns

- [ ] T063 [P] Visual pass against sketches.md §1–§4 at 360 px (sheet) and the 400 px panel, every state, plus the bar on every chrome page at four widths; adjust spacing/tone to the measurements table in sketches.md §3
- [ ] T064 **Jason-gated**: constitution v1.4.0 sign-off (or revert T001 to a PR note if declined), final copy for `src/content/ask.ts`, and the PR record per quickstart.md (scores, axe, bundle-check lines, latency from the preview, env names); update the spec's Clarifications if anything changed
- [ ] T065 [P] Live end-to-end on the preview once T047 lands: starter, typed follow-up, options question, salary deflection, turn hint countdown; first-words latency from the Network panel recorded (spec SC-004; quickstart.md §Verification against the live API)
- [ ] T066 Code read for view-source quality: comments explain the gate, the key flow, the pacer and the morph in plain words; no leftover scenario or picker references outside the `standin` literal; Biome and `tsc` clean; `git grep -n "TODO" src/components/ask` empty

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies; T002–T007 in parallel after T001 starts (T001 is documentation and can land any time before merge)
- **Foundational (Phase 2)**: T008 first; T009/T010/T012–T016 in parallel; T011 after T009+T010; T017 after T008/T011/T015/T016; T018 after T017; T019–T024 in parallel; T025 after T018+T019; T026 after T005+T008. Blocks every story.
- **US1 (Phase 3)**: after Phase 2; T027–T029 and T033–T034 in parallel; T030 → T032 → T035 sequential
- **US2 (Phase 4)**: after Phase 2 (T036 is independent of US1; T037 needs T017)
- **US3 (Phase 5)**: after Phase 2; T039 → T040; T041/T042 after T017; T043 after T042
- **US4 (Phase 6)**: T044/T045/T048 in parallel after Phase 2; T049 after those; T050 after T048; T051 after T049; T046/T047 are Jason's and gate only the live preview check
- **US5 (Phase 7)**: after US1–US3 (it audits their surfaces); T052–T055 in parallel; T056 after T052/T053; T057 after T013; T058 after T020 and T030
- **US6 (Phase 8)**: after US1–US4; T059/T060/T062 in parallel; T061 after T049
- **Polish (Phase 9)**: after all desired stories

### User Story Dependencies

- **US1**: Foundational only. Delivers the MVP: bar → panel → answer → close.
- **US2**: Foundational only; integrates with US1's transcript but is testable on `?ask=options` alone.
- **US3**: Foundational only; each state is testable from its own scenario.
- **US4**: Foundational (the gate module) only; testable by builds without any UI story.
- **US5, US6**: verify the others; no new product behaviour.

### Parallel Opportunities

- Phase 1: T002–T007 together.
- Phase 2: {T009, T010, T012, T013, T014, T015} together; then {T019, T020, T021, T022, T023, T024} together.
- Phase 3: {T027, T028, T029, T033, T034} together while T030 is built.
- Phase 6: {T044, T045, T048} together.
- Phase 7: {T052, T053, T054, T055} together.
- Phase 8: {T059, T060, T062} together.

---

## Parallel Example: Phase 2 shells

```bash
Task: "Create src/components/ask/Bar.tsx + Bar.module.css per contracts/surfaces.md"
Task: "Create src/components/ask/Panel.tsx + Panel.module.css (+ ask.module.css)"
Task: "Create src/components/ask/Header.tsx"
Task: "Create src/components/ask/Composer.tsx"
Task: "Create src/components/ask/Transcript.tsx + Message.tsx"
Task: "Create src/components/ask/ContactBlock.tsx + EmptyState.tsx"
```

---

## Implementation Strategy

### MVP First (US1)

1. Phase 1 and Phase 2 (the stand-in makes everything demonstrable without the live API).
2. Phase 3: bar → morph → paced answer with sources → follow-up → close.
3. **Stop and validate** on `?ask=answer-3` and `?ask=correction-text`, panel and sheet.

### Incremental Delivery

1. + US2 (options and starters) → the empty state is complete.
2. + US3 (limits and errors) → every API outcome has a home.
3. + US4 (flag modes, bundle check, CI) → safe to merge dark; Jason sets Vercel to `private` and arms his browser.
4. + US5 and US6 → gates recorded; v1.4.0 signed off; PR ready for review.
5. Launch = `NEXT_PUBLIC_ASK_JASON=on` in Production and a redeploy.

### Notes

- Every UI task is demonstrable through the stand-in; the live API is touched only in T047/T065.
- Commit after each task or logical group; keep `.DS_Store` out of every commit.
- Avoid same-file edits in parallel: `actions.ts`, `Message.tsx` and `Composer.tsx` are touched by several tasks and are sequenced accordingly.

---

## Traceability (spec → tasks)

Every functional requirement and success criterion of spec.md with the tasks that implement or
verify it (IDs after the T058 insertion).

| Key | Tasks | Key | Tasks |
|---|---|---|---|
| FR-001 | T019, T025 | FR-030 | T012, T041 |
| FR-002 | T026 | FR-031 | T041 |
| FR-003 | T004, T019, T025, T062 | FR-032 | T041 |
| FR-004 | T018, T019, T032 | FR-033 | T041 |
| FR-004a | T033 | FR-034 | T041 |
| FR-004b | T034 | FR-035 | T024 |
| FR-005 | T018, T019, T049 | FR-036 | T041 |
| FR-006 | T017, T018, T021 | FR-037 | T011, T041 |
| FR-007 | T015, T042 | FR-038 | T020 |
| FR-008 | T021 | FR-039 | T032 |
| FR-009 | T022 | FR-040 | T023 |
| FR-010 | T023 | FR-041 | T016, T052 |
| FR-011 | T023, T041 (checkpoint `voice-on`) | FR-042 | T055 |
| FR-012 | T011, T043 | FR-043 | T004, T055 |
| FR-013 | T042 | FR-044 | T054 |
| FR-014 | T017 | FR-045 | T055, T058 |
| FR-015 | T043 | FR-046 | T030 |
| FR-016 | T011 | FR-047 | T002, T007, T046 |
| FR-017 | T019, T022 | FR-047a | T044, T045 |
| FR-018 | T039, T040 | FR-047b | T018, T044 |
| FR-019 | T022 | FR-048 | T048, T049, T050 |
| FR-020 | T022 | FR-049 | T012, T013 |
| FR-021 | T043 | FR-050 | T015 |
| FR-022 | T039 | FR-051 | T047 |
| FR-023 | T028 | FR-052 | T041 |
| FR-024 | T017, T027 | FR-053 | T057, T060, T061, T064 |
| FR-025 | T023 | SC-001 | T048, T049 |
| FR-026 | T029 | SC-002 | T061 |
| FR-027 | T036, T037 | SC-003 | T017, T059 |
| FR-028 | T041 | SC-004 | T065 |
| FR-029 | T031 | SC-005 | T055 |
| SC-006 | T012, T057, T063 | SC-012 | T051 |
| SC-007 | T053 | SC-013 | T039 |
| SC-008 | T056 | SC-014 | T045, T051 |
| SC-009 | T054 | SC-015 | T033, T034 |
| SC-010 | T055 | SC-016 | T030, T059 |
| SC-011 | T011, T044, T066 | | |
