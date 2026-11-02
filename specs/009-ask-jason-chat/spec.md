# Feature Specification: Ask Jason chat widget

**Feature Branch**: `009-ask-jason-chat`
**Created**: 2026-11-01
**Status**: Draft
**Input**: User description: "Ask Jason chat widget on jasongrant.me (feature 009). The site-side
feature that embeds the live chat API at https://api.jasongrant.me, built in cortex 007-site-chat;
its contracts widget.md and chat-api.md are the source of truth. The chat answers in first person
as Jason, is always disclosed as an AI in the widget header, and answers only from his public
writing and work history. An entry point on every page that never shifts layout or blocks first
paint; Turnstile and all chat code load only when a visitor opens the chat. Streamed replies (meta,
then text deltas, then done), a correction event that replaces a reply already shown, source links
under answers, option chips that ask about an entry, fixed deflection replies, and a turn counter.
Every state: empty, loading, bot check, streaming, answer, options, deflection, correction, network
error, turn_limit, address_limit, input_too_long, and chat_capped or unavailable (the last two show
the contact call to action instead of the input). WCAG 2.1 AA throughout: focus on open and close,
keyboard, screen-reader announcement of streamed text without flooding, reduced motion, contrast.
Behind a feature flag that is off in production by default (no entry point, no chat code, no
Turnstile in the page), on in local development and on a preview deployment when set, and turned
on for production by an environment change and a redeploy, never a code change. Preview
deployments can call the API only once Jason adds the preview alias to the API's allowed origins
and the Turnstile hostname list. Out of scope: voice playback until Jason approves the cloned
voice, an avatar, reviewing a visitor's own work, and analytics beyond what the site already has."

## Context

The chat API is live at `https://api.jasongrant.me`. It speaks as Jason, is always disclosed as
an AI, answers only from his public writing and work history, offers the three closest entries
when nothing is written on a topic, and deflects personal, pay, off-topic and work-request
messages with fixed replies. Each session allows 500 characters a message, 10 turns and 5 voice
plays. Voice is off until Jason approves the cloned voice.

This feature is the site side: the "Ask Jason" widget on jasongrant.me. Three documents in the
private cortex repo are the source of truth and are cited here, not restated:

- `~/Repos/cortex/specs/007-site-chat/contracts/widget.md`: what the widget must do.
- `~/Repos/cortex/specs/007-site-chat/contracts/chat-api.md`: endpoints, events, error codes,
  limits.
- `~/Repos/cortex/specs/007-site-chat/spec.md`: user stories and requirements for the whole chat.

Where this spec says more than the contracts, it is the site's own design. Where the widget
cannot meet a contract line as written, the gap is listed under *Contract notes*.

The site repo is public. It holds no corpus content, prompts or secrets. The widget sends
nothing beyond the session token, the message text, the referrer's host and the bot-check token.

Design research on chat entry points, streaming, suggestion chips, citations, motion,
screen-reader behaviour and flag mechanisms was done before this draft. Its findings are folded
into the requirements below and into the notes in `sketches.md`; the planning phase records the
sources in its own `research.md`.

## Clarifications

### Session 2026-11-01

- Q: Where does the chat open from? → A: **Top-bar text control** at first; superseded the same
  day by Jason's proposal below.
- Q (Jason's proposal after the first draft): a floating "Ask Jason" input at the bottom centre
  of every page, whose placeholder retypes common questions and which nudges for attention now
  and then; sending from it morphs it into the right panel, and closing the panel shrinks it
  back into the input. → A: **Adopted.** The top-bar control and footer link are dropped; the
  command-palette item stays. The rotation and the nudge are bounded (FR-004a, FR-004b) so they
  satisfy WCAG 2.2.2 and reduced motion; the morph is user-initiated motion with no overshoot
  (FR-046). This is the site's first motion that runs without a visitor's action; Jason records
  it as a deliberate device in the PR, or as a constitution note if he prefers the rule to say
  so.
- Q: How does the flag work, and does Jason get a private way to see the widget on production
  before launch? → A: **Build-time variable with a private production mode.**
  `NEXT_PUBLIC_ASK_JASON` has three values: `off` (nothing ships), `private` (public visitors
  get the `off` experience; a browser holding Jason's preview key gets the widget) and `on`
  (everyone). Production runs `private` before launch and `on` after; each change is an
  environment change plus a redeploy. The preview key is a build-time secret
  (`ASK_JASON_PREVIEW_SECRET`); only its one-way hash reaches the page. Jason arms a browser
  once by opening the site with the key in the URL fragment, which never reaches a server.
  Trade-off accepted over the recommended preview-alias check: in `private` mode the page
  carries a small key check and the chat module exists in the build output as an unreferenced
  chunk; public visitors still download no chat code, see no entry point and load no bot check.
- Q: What is the open chat on tablets and desktops? → A: **Right-docked non-modal panel**, 400 px
  wide, full height, no dimming; the page stays readable. Phones get a modal bottom sheet.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ask a question and read a grounded answer (Priority: P1)

A recruiter on the Experience page notices a quiet input floating at the bottom centre of the
page, with an "Ask Jason" button at its end. Its placeholder is typing out a question, then
another: "How do you lead and still ship code?" They click in; the typing stops. They type their
own question and press Enter. The input travels and grows into a panel on the right, their
question already sitting at the top as their first message; the panel's header shows "Ask
Jason" and, under it, the disclosure sentence from the API: this is an AI trained on Jason's
writing, not Jason. Nothing on the page moves or dims. A thinking mark appears at once; within a
few seconds words begin to arrive at a steady pace under a "Jason · AI" label and a "From" row
naming the entries the answer draws on. They ask a follow-up in the panel's composer. The reply
streams; the transcript keeps the newest words in view until they scroll up to re-read, when a
"Jump to latest" pill appears. They click a source pill and land on the Experience section it
cites; the panel stays open with the conversation intact. When they press Escape, the panel
shrinks back into the floating input, which now reads "Ask a follow-up". Had they opened the
panel with nothing typed, it would have greeted them in one line and offered the three starter
questions as cards above the composer.

**Why this priority**: This is the product. Every other story guards or qualifies it.

**Independent Test**: With the flag on against the live API, send a question from the floating
input on each page, then a typed follow-up in the panel, and read both answers. Confirm the
input morphs into the panel with nothing on the page moving, the disclosure is in the header
before the first word arrives, the first words arrive within three seconds, the source row shows
the cited entries, the conversation survives a click on an internal source link, and closing
returns the panel to the input.

**Acceptance Scenarios**:

1. **Given** any page with the site chrome, **When** the visitor sends a question from the
   floating input, **Then** the input morphs into the panel within 320 ms with the question
   shown as their first message, the page neither dims (desktop) nor shifts, focus lands in the
   panel's composer, and the header shows the title, the disclosure sentence and a Close
   control. **When** they open the panel with no text (the input's button or the command
   palette), **Then** it shows the empty state and focus lands on the panel heading.
2. **Given** the empty state, **When** it renders, **Then** it shows one greeting line, three
   starter cards, the composer with its placeholder, and the one-line privacy notice under the
   composer; no bot check is visible.
3. **Given** a starter card, **When** tapped, **Then** its question appears as the visitor's
   message, the starters disappear, a thinking mark appears within 100 ms, and the reply
   streams word by word with no blinking caret.
4. **Given** an `answer` reply, **When** its `meta` arrives, **Then** the "From" row with one to
   three title pills renders before the first word and never moves as text arrives; internal
   pills open in the same tab, external ones in a new tab with an outward mark.
5. **Given** a reply streaming, **When** the visitor scrolls up, **Then** auto-follow stops and a
   "Jump to latest" control appears; **When** they return to the bottom or activate it, **Then**
   following resumes and the control hides.
6. **Given** a reply, **When** a `correction` event arrives, **Then** the shown text crossfades to
   the corrected text in place, the label gains "Updated", the sources or cards are re-rendered
   from the event's meta, and "Answer updated" is announced once.
7. **Given** the panel open, **When** the visitor navigates to another site page, **Then** the
   conversation is still there; **When** they reload, **Then** the transcript is gone but the
   session's remaining turns continue.
8. **Given** the panel open, **When** it is closed, **Then** it shrinks back into the floating
   input within 240 ms, focus returns to the input, the conversation is kept, and the input's
   placeholder reads "Ask a follow-up" with no rotation and no nudge.

---

### User Story 2 - Nothing written: the three closest entries as cards (Priority: P1)

A visitor asks about an outcome the public corpus does not cover. The reply says plainly that
nothing is written on it and shows three cards, each a real entry with its title and a one-line
summary. Tapping one sends that entry's ready-made question as the visitor's next message and a
grounded answer follows.

**Why this priority**: It is the honest fallback the API relies on, and the one place the widget
turns a dead end into navigation.

**Independent Test**: Send a question chosen to miss the corpus. Confirm the options text, exactly
three cards with title and summary, that a tap becomes a visible visitor message, and that the
used card set becomes inert once the next message is sent.

**Acceptance Scenarios**:

1. **Given** an `options` reply, **When** rendered, **Then** the reply text appears, followed by
   three full-width cards stacked vertically at every width, each with a title, a one-line
   summary and a trailing arrow, each at least 44 px tall on touch.
2. **Given** a card, **When** tapped or activated with Enter or Space, **Then** its `prompt` is
   sent as the next message and appears in the transcript as the visitor's words.
3. **Given** the next message has been sent, **When** the transcript is read back, **Then** the
   earlier cards remain visible but disabled.

---

### User Story 3 - Boundaries and limits are shown, never as raw errors (Priority: P1)

A visitor asks about salary; the fixed deflection appears as an ordinary reply. Another pastes
600 characters; the counter has already turned the send control off and says how far over they
are. A third reaches ten turns; the composer is replaced by the limit message and Jason's email,
and the whole transcript stays readable. On a day the budget is spent, opening the chat shows the
contact call to action instead of an input at all.

**Why this priority**: These are the API's abuse and budget controls made visible. Each one
must read as Jason's voice, not a failure.

**Independent Test**: Against the development stand-in, trigger each of: deflect, none,
`input_too_long`, `input_not_text`, `address_limit`, `turn_limit`, `session_closed`,
`chat_capped`, `unavailable`, health `capped`, health `down`, an unknown `api_version`, a failed
bot check, a dropped stream and an unreachable network. Confirm each shows the state described
in FR-030 to FR-037 and nothing else.

**Acceptance Scenarios**:

1. **Given** a `deflect` or `none` reply, **When** rendered, **Then** it appears as a plain reply
   with the "Jason · AI" label and no sources or cards.
2. **Given** text over the character limit, **When** typed or pasted, **Then** the counter shows
   the overage in the error tone, Send is disabled, and nothing is truncated.
3. **Given** `turns_left` is 0 after a reply, or the API answers `turn_limit` or
   `session_closed`, **Then** the composer is replaced by the limit message and the contact call
   to action, and the transcript remains scrollable and readable.
4. **Given** health reports `capped` or `down`, or the session or chat call answers
   `chat_capped` or `unavailable`, **Then** the body shows the message and the contact call to
   action and no input; **Given** health reports an `api_version` the widget does not know,
   **Then** the same call-to-action state appears.
5. **Given** the API answers `address_limit`, **Then** the message appears where the reply would
   be, the composer closes with the contact call to action, and the transcript stays.
6. **Given** the network fails or no `meta` arrives within 20 seconds, **Then** one site-authored
   line appears where the reply would be, the visitor's text returns to the composer, and a
   "Try again" control resends only when activated.

---

### User Story 4 - Nothing ships until the flag is on (Priority: P1)

Production deploys in `private` mode: for every visitor there is no entry point, no chat code,
no bot-check script, no request to the chat API, and every Lighthouse score is unchanged. Jason
runs the site locally with the flag on and sees the widget. He turns it on for a preview branch
and shows a colleague the preview alias. He arms his own browser with the preview key and uses
the widget on the live production site, where nobody else can see it. When he is ready, he sets
one environment variable in production to `on` and redeploys; no commit is needed.

**Why this priority**: The widget touches every page. Shipping it dark is what lets it merge
before it launches.

**Independent Test**: Build with the flag `off` and search the output for the chat module, the
bot-check host, the key check and the entry-point label: zero hits. Build with `private`: no
page's HTML or first-load script references any of them, and an unarmed browser makes no chat
or bot-check request; arm a browser with the key and the widget appears. Build with `on`: the
entry point is present and the quality gates pass. Flip the variable in a preview environment
and redeploy: the widget appears with no code change.

**Acceptance Scenarios**:

1. **Given** the flag is `off`, **When** the site is built and served, **Then** no page contains
   the entry point, no bundle contains the chat module or the bot-check script reference, and
   no request leaves for the chat API or the bot-check host.
2. **Given** the flag is on, **When** any page loads, **Then** the entry point is present in the
   server-rendered HTML with its final size, and still no chat module or bot-check script loads
   until the chat is opened.
3. **Given** local development, **When** the site runs with no extra setup, **Then** the flag is
   on and the widget is available against the development stand-in.
4. **Given** a preview deployment with the flag on and its alias allowed by the API, **When**
   the chat is opened, **Then** it works against the live API.
5. **Given** production in `private` mode, **When** the variable is changed to `on` and the
   site redeployed, **Then** the widget is live for everyone with no code change.
6. **Given** production in `private` mode, **When** an unarmed browser loads any page, **Then**
   it gets the `off` experience apart from the small key check: no entry point, no chat code
   downloaded, no bot-check script, no request to the chat API; **When** Jason opens the site
   with his key in the URL fragment, **Then** the entry point appears in that browser only, the
   fragment is removed from the address bar, and the chat works against the live API; **When**
   the secret is rotated and the site redeployed, **Then** that browser shows no entry point.

---

### User Story 5 - Equal access: keyboard, screen reader, reduced motion, small screens (Priority: P2)

A keyboard user tabs to the floating input, types a question and presses Enter, lands in the
panel's composer, reads the reply, follows a source, and closes with Escape; focus returns to
the floating input. The retyping placeholder never reaches their screen reader: the field is
always named "Ask Jason". A VoiceOver user hears "Jason is answering" once when they send,
hears the finished answer once when it completes, and nothing in between. A visitor with reduced
motion sees the panel appear without sliding and words appear without fading. On a 320 px phone
at 200% zoom the header, disclosure and composer are all present with no horizontal scroll.

**Why this priority**: Constitution Principle I is non-negotiable. It is P2 only because it is
tested on the surfaces the P1 stories build.

**Independent Test**: Complete the Story 1 flow keyboard-only, then with VoiceOver, then with
OS reduced motion, then at 320 px and 200% zoom. Run the accessibility scan with the panel
closed and open in every state.

**Acceptance Scenarios**:

1. **Given** the panel opens from a sent question, **Then** focus is in its composer; **Given**
   it opens with no text, **Then** focus is on the panel heading; **Given** it closes by Escape,
   Close, or (phone) swipe, **Then** focus returns to the floating input.
2. **Given** a phone, **Then** the sheet is modal and the page behind it is inert; **Given** a
   desktop or tablet, **Then** the panel is non-modal, the page stays operable, and Escape closes
   the panel only while focus is inside it.
3. **Given** a reply streams, **Then** the screen reader receives one "Jason is answering"
   announcement on send and one announcement on completion; zero announcements per word.
4. **Given** reduced motion, **Then** nothing translates, scales or staggers; opacity changes
   last at most 100 ms; the thinking mark is static; the floating input's placeholder is static
   and it never nudges; open and close are plain crossfades.
5. **Given** any interactive control in the widget, **Then** it is at least 24 × 24 px, has a
   visible focus ring at 3:1 against its surroundings, and an accessible name; cards and Send
   are at least 44 px tall on touch.

---

### User Story 6 - The page underneath is untouched (Priority: P2)

Nothing about the widget costs the page anything beyond the floating input itself, which sits
out of the page's flow: first paint, layout and scores are as before. When it morphs into the
panel, the page does not move. When the bot check needs a tap, the challenge appears over the
transcript, not in the flow.

**Why this priority**: Constitution Principle II is non-negotiable and the widget is on every
page.

**Independent Test**: Lighthouse on every gated page with the flag on and the panel closed,
mobile and desktop; then open the panel, trigger the interactive bot check, stream a reply, and
confirm the layout-shift tooling records no shift.

**Acceptance Scenarios**:

1. **Given** the flag on, **When** every gated page is measured, **Then** scores meet the
   constitution bands and differ from the pre-feature run by no more than one point, with CLS 0.
2. **Given** the input morphing into the panel and back, the bot check appearing, text streaming
   and a correction arriving, **Then** no element of the page shifts and the browser counts no
   layout shift (CLS 0); the panel's own frame moving during the morph is the one thing that
   moves, and the browser marks that movement as caused by the visitor's click or keypress. New
   content appears in reserved or overlaid space, or below existing content.
4. **Given** the floating input over the bottom of a page, **When** the visitor tabs to a link
   or field near the bottom, **Then** it scrolls into view clear of the input and is never
   hidden behind it, and the page's last content can always be scrolled clear of the input.
3. **Given** a phone with the sheet open and the keyboard raised, **Then** the header stays
   visible, the composer stays above the keyboard, and the transcript shrinks.

### Edge Cases

- **Health slow**: the panel shell shows at once; after 300 ms the body shows a quiet
  "Connecting…" line until health answers; the composer accepts typing throughout, and Send
  waits for health.
- **Health unreachable**: the network state, with Try again; no composer.
- **Stored session expired or unknown** (`session_expired`, `session_required`): the widget runs
  the bot check again and gets a new session without clearing the visible transcript; the
  message the visitor was sending goes out once the new session exists.
- **Stored session closed** (`session_closed`): the ended state.
- **Bot-check token older than five minutes at send time**: re-run the check silently before the
  session call; the visitor sees "Checking…" at most.
- **Bot check needs interaction while the visitor is typing**: the challenge appears above the
  composer over the transcript; typing is not interrupted; Send waits.
- **Bot check fails** (`bot_check_failed`): the message and Try again; the email is one line
  away.
- **Send while a reply streams**: Send is Stop; a new message cannot be sent until the stream
  ends or is stopped.
- **Stop pressed**: the text received so far stays with a "Stopped" tag; the turn is spent and
  the counter reflects it.
- **Storage unavailable**: the session token lives in memory; a reload starts a new session.
- **Two tabs**: two sessions; each tab counts its own turns.
- **Visitor message contains a fenced code block or a data URL** (`input_not_text`): the
  message under the composer; text kept.
- **Counter and the limit**: the widget counts characters the way the API does (characters, not
  UTF-16 units) and takes the limit from health, so a changed limit needs no site change.
- **Correction arrives after Stop**: ignored; the stopped text stands.
- **`error` event mid-stream**: the message replaces the partial reply; the transcript and the
  composer remain usable.
- **Correction changes the reply's height**: the transcript scrolls so the updated reply's start
  stays in view; nothing above it moves.
- **Opened from the command palette**: the palette closes first; the panel fades in without
  the morph; Close returns focus to the floating input.
- **Floating input over bottom content** (footer links, the newsletter form on `/writing`): the
  page reserves space below its last content when the flag is `on`, and focused elements scroll
  clear of the input; in `private` mode the public page reserves nothing, so the input overlays
  the footer in Jason's armed browser only.
- **Placeholder mid-word when the visitor focuses**: the rotation stops at once and the static
  placeholder replaces it; the rotation never writes into the field's value.
- **Enter in an empty floating input**: opens the panel to the empty state; it never sends the
  placeholder's question.
- **Tab hidden**: rotation and nudge pause; they resume where they were.
- **Phone**: tapping the floating input opens the sheet at once with focus in the sheet's
  composer, so the keyboard never rises under a fixed input.
- **Panel closed after an ended or call-to-action state**: the floating input returns as a
  button reading "Chat closed · email me" that reopens the panel; it never offers a field that
  cannot send.
- **Panel open, viewport resized across the phone breakpoint**: the container changes form; the
  conversation and composer text are kept.
- **Deck routes** (`/deck/…`): no entry point, no chat code.
- **Preview key expired (30 days) or secret rotated**: the entry point simply does not appear;
  opening the site with the current key arms the browser again.
- **Key in the URL fragment while the mode is `on`**: inert, since `on` ships no key check and
  nothing reads the fragment; while `off` it is inert for the same reason.
- **Print**: the panel is not printed.
- **Voice turned on at the API** while this feature is live: no change; the widget shows no voice
  control until a later feature adds it.

## Requirements *(mandatory)*

### Functional Requirements

**Entry point and placement**

- **FR-001**: Every page that carries the site chrome (home, experience, writing, colophon, and
  the `/work` studies) MUST show a floating "Ask Jason" input fixed at the bottom centre of the
  viewport: a flat, hairline-bordered bar on the elevated tone, 48 px tall, 440 px wide on
  tablets and desktops and full width minus the 16 px gutters on phones, 24 px above the bottom
  edge (16 px plus the safe-area inset on phones). It holds a single-line field with a
  placeholder and a trailing "Ask Jason →" button in mono 13 px, which is the bar's visible
  label. The deck route MUST NOT show it.
- **FR-002**: The same action MUST be available as an "Ask Jason" item in the command palette.
  There is no top-bar control and no footer link.
- **FR-003**: The floating input MUST be present in the server-rendered HTML at its final size,
  out of the page's flow, so it never appears late and never moves anything; it MUST NOT open
  the panel on its own, on scroll or on a timer, MUST NOT take focus on page load, and MUST NOT
  hide or move on scroll. When the flag is `on`, pages MUST reserve space below their last
  content so nothing is permanently hidden behind the input, and focused elements MUST scroll
  clear of it.
- **FR-004**: On tablets and desktops the visitor types in the floating input; Enter or the
  button sends the text, which opens the panel with that text as the first message. With no
  text, Enter or the button opens the panel to the empty state. On phones, tapping the input
  opens the sheet at once with focus in the sheet's composer; the floating input itself never
  takes the keyboard. While the panel is open the floating input is hidden (it has become the
  panel). When the panel closes it returns: with a live conversation its placeholder reads "Ask
  a follow-up" and sending from it continues that conversation; after an ended or
  call-to-action state it returns as a button reading "Chat closed · email me" that reopens the
  panel.
- **FR-004a**: Before the first conversation, the placeholder MUST retype itself with the
  starter questions (the same copy as the empty-state starters, each at most 40 characters):
  after 2 s on the page it types a question at about 30 ms a character, holds it 3 s, clears
  it, and types the next; it cycles the set at most three times per page view with an 8 s rest
  between cycles, then stays on the static placeholder. It MUST stop at once and show the static
  placeholder on focus, hover, pointer down or any typing; MUST pause while the tab is hidden;
  MUST be static under reduced motion; MUST never be exposed to assistive technology (the
  field's accessible name is always "Ask Jason" and the rotating text is decorative); and MUST
  never enter the field's value.
- **FR-004b**: A nudge MAY draw the eye to the input while the rotation rests: a 600 ms change
  of the bar's border and the button's text to the accent colour and back, flat, with no
  gradient, scale or movement. It MUST NOT run in the first 20 s on a page, more often than
  every 45 s, or more than three times per page view; it MUST stop for the rest of the page
  view once the visitor has focused the input or opened the panel; it MUST NOT run while the
  panel is open, while the tab is hidden, or under reduced motion. Each nudge lasts under five
  seconds and the first interaction ends it, which is how it satisfies WCAG 2.2.2.

**Loading and first paint**

- **FR-005**: Before the visitor's first intent, the page MUST carry only the floating input,
  its placeholder rotation and nudge, the minimal code that reacts to it and, in `private` mode
  only, the key check of FR-047b. No chat module,
  no bot-check script, no stylesheet for the panel body, no request to the chat API and no
  preconnect MAY be present on first load.
- **FR-006**: On the visitor's first intent (focus in the floating input, its tap on a phone,
  or the palette action) the widget MUST start loading its module, request `/api/health` and
  load the bot-check script at the same moment. When the visitor then sends or opens, the panel
  shell (header with title, a reserved disclosure line and Close) MUST be visible within
  100 ms, overlapping the morph; a sent question MUST appear as the first message at once and
  go out as soon as the session exists. The body (empty state, transcript, or call to action)
  renders when health answers; after 300 ms without an answer the body shows a quiet
  "Connecting…" line (the *loading* state).
- **FR-007**: The bot-check script MUST load only after the first intent, asynchronously, and
  its challenge MUST first execute on the first keystroke in either field or a starter tap,
  never on focus alone, so a stray Tab never spends a check or a session.

**Header, disclosure and notice**

- **FR-008**: The header MUST stay visible at the top of the panel while the chat is open, at
  every width and zoom level, and MUST contain: the title "Ask Jason", the disclosure sentence
  exactly as `/api/health` returns it, and a Close control. The disclosure MUST be at least 13 px
  and MUST meet 4.5:1 contrast. Before health answers, the disclosure line is reserved at its
  final height.
- **FR-009**: The privacy notice MUST be shown exactly as `/api/health` returns it, directly
  under the composer, whenever the composer is shown. It MAY wrap to two lines at 320 px.
- **FR-010**: Every reply MUST carry a visible "Jason · AI" label; every visitor message a "You"
  label. These labels are the transcript's per-message headings for assistive technology.
- **FR-011**: The widget MUST NOT render any voice control in this feature, whatever `voice` or
  `voice_available` says.

**Session and bot check**

- **FR-012**: Session handling MUST follow `widget.md` (*Before the first message*): bot-check
  token to `POST /api/session`, session token kept in session storage with an in-memory fallback,
  sent as a bearer header, and reused on reopen, across site pages, and across reloads until the
  API rejects it.
- **FR-013**: The bot check MUST render in managed mode inside the panel, full width, in the
  site's own theme (never the operating-system theme), with the page's language. While it runs
  silently the composer area shows a quiet "Checking…" line; when it needs interaction the
  challenge MUST appear in a surface anchored directly above the composer that overlays the
  transcript, so nothing in the flow moves; when it fails the body shows the API message with a
  "Try again" control.
- **FR-014**: A message sent before the session exists MUST wait for it; the Send control shows a
  waiting state; the widget MUST NOT create a second session for the same tab.
- **FR-015**: On `session_expired` or `session_required` the widget MUST run the bot check again
  and obtain a new session without discarding the visible transcript or the pending message. On
  `session_closed` it MUST enter the ended state (FR-033).
- **FR-016**: The widget MUST send only what `widget.md` (*Must not*) allows: the session token,
  the message text, the referrer's host (never the full URL) and the bot-check token. It MUST
  NOT retry `POST /api/chat` on its own.

**Composer and limits**

- **FR-017**: The panel composer MUST be a text field labelled "Your question" that grows from
  one to five lines and then scrolls, with a site-authored placeholder ("Ask about my work, how
  I lead, or what I've written") and a font size of at least 16 px on touch devices. The
  floating input is a single-line field named "Ask Jason" with the same static placeholder; the
  two share one value, so text typed in one is the text sent from the other, and unsent text
  survives a close. FR-018 applies to both; in the floating input the counter, while shown,
  takes the place of the button's label.
- **FR-018**: The character limit MUST be `limits.input_chars` from health (500 today), counted
  the way the API counts. The counter MUST stay hidden below 80 % of the limit, then read "N
  left"; at or over the limit it MUST switch to the error tone, read "N over", and Send MUST be
  disabled. Paste MUST never be blocked and text MUST never be truncated.
- **FR-019**: Send MUST be disabled only while the message is empty or whitespace, over the
  limit, waiting for health or the session, or while a reply is in flight (when it is Stop).
  Disabled Send MUST NOT carry a tooltip.
- **FR-020**: On keyboards, Enter MUST send and Shift+Enter MUST insert a line break; on touch,
  Enter MUST insert a line break and the Send button is the only submit. The shortcut MUST be
  stated in the field's accessible description, not the placeholder.
- **FR-021**: While a reply streams, Send MUST become Stop. Stop ends the display of the reply;
  text already shown stays with a "Stopped" tag; the turn counts as spent.
- **FR-022**: The remaining turns MUST be shown as a one-line hint above the composer when three
  or fewer remain ("3 questions left", down to "1 question left"), taken from `meta.session.turns_left`
  after each reply, and otherwise hidden. When it reaches 0 the composer MUST be replaced by the
  ended state (FR-033).

**Conversation**

- **FR-023**: The transcript MUST be a scrollable region with the newest message at the bottom.
  While a reply streams it MUST follow the newest text until the visitor scrolls up, then stop
  following and show a "Jump to latest" control; it resumes when the visitor reaches the bottom
  or activates the control. Transcript scrolling MUST never chain to the page.
- **FR-024**: Streaming text MUST be released word by word at a steady pace (at most 20 ms a
  word) with each word fading in over at most 150 ms; the visible text MUST never trail the
  received text by more than one second; on `done` any remaining text MUST appear at once.
  There MUST be no blinking caret. A thinking mark MUST appear within 100 ms of send and stay
  at least 300 ms before text replaces it.
- **FR-025**: Reply text MUST be rendered as plain text with paragraph breaks preserved and no
  markup interpreted (the API sends plain prose; `chat-api.md`, prompt rules).
- **FR-026**: For an `answer`, the sources from `meta.sources` MUST render as a "From" row of one
  to three title-only pills directly under the reply label and before the text, as soon as
  `meta` arrives, so the row never moves while text arrives. A pill whose URL is on this site
  MUST open in the same tab and keep the chat open; any other URL MUST open in a new tab, carry
  the site's outward mark, and tell assistive technology it opens in a new tab.
- **FR-027**: For `options`, the reply text MUST be followed by exactly three cards stacked
  full-width at every width, each showing the entry title (up to two lines), its one-line
  summary (truncated to one line) and a trailing arrow, each at least 44 px tall on touch and
  40 px on pointer devices, with an accessible name of "Ask about <title>". Activating a card
  MUST send its `prompt` as the next message, shown as the visitor's words. Cards MUST remain in
  the transcript and become disabled once any next message is sent.
- **FR-028**: For `deflect` and `none`, the text MUST render as a plain reply with no sources and
  no cards. The widget MUST NOT alter, soften or add to the fixed wording.
- **FR-029**: On `correction`, the reply's text MUST be replaced in place with an opacity-only
  crossfade of at most 200 ms, the label MUST gain "Updated", the sources row or cards MUST be
  re-rendered from the event's `meta`, and "Answer updated" MUST be announced once. The
  replacement MUST NOT be re-streamed.

**States and errors**

- **FR-030**: The widget MUST implement these states, each reproducible on demand (FR-049):
  *closed*, *loading*, *empty*, *bot check* (checking, needs interaction, failed), *sending*,
  *streaming*, *answer*, *options*, *deflection* (also `none`), *correction*, *stopped*,
  *network error*, *input rejected* (`input_too_long`, `input_not_text`), *address limit*,
  *ended* (`turn_limit`, `session_closed`, or `turns_left` 0), and *call to action*
  (`chat_capped`, `unavailable`, health `capped` or `down`, unknown `api_version`). The header
  with the disclosure MUST be present in every open state.
- **FR-031**: On an `error` event the API message MUST replace the partial reply, the transcript
  MUST stay, and the composer MUST remain usable (`widget.md`, *Receiving*).
- **FR-032**: On `input_too_long` or `input_not_text` the API message MUST appear under the
  composer in the error tone; the visitor's text MUST be kept.
- **FR-033**: The *ended* state MUST replace the composer with the limit message and the contact
  call to action (FR-035); the transcript MUST stay readable. When the widget ends the session
  itself at `turns_left` 0 it MUST use one site-authored line ("That's the end of this
  conversation") because the API's wording is only returned on a rejected eleventh message.
- **FR-034**: On `address_limit` the API message MUST appear where the reply would be, the
  composer MUST close with the contact call to action, and the transcript MUST stay.
- **FR-035**: The contact call to action MUST be one short line of context and the site's
  contact email as a mail link, referenced from the site's content so it stays correct if the
  address changes. It MUST be the same block wherever it appears and MUST NOT look like an
  error.
- **FR-036**: In the *call to action* state the body MUST show the API message when the API
  provides one and the contact call to action; no composer, no starters. When health reports
  `capped` or `down` (which carry no message) or an unknown `api_version`, the body MUST show
  one site-authored line ("The chat is resting for now") with the contact call to action.
- **FR-037**: On a network failure, a dropped stream before `done`, or 20 seconds without `meta`,
  the widget MUST show one site-authored line ("The chat didn't respond. Check your connection
  and try again") where the reply would be, return the visitor's text to the composer, and offer
  "Try again" that resends only when activated. No other site-authored error text MAY exist;
  every API error shows `error.message` unchanged.

**Accessibility**

- **FR-038**: On phones (below the phone breakpoint) the chat MUST be a modal dialog: the page
  behind it inert and not scrollable, Escape and swipe-down close it. On tablets and desktops it
  MUST be a non-modal dialog named "Ask Jason" with no backdrop and no focus trap; the page
  stays operable; Escape closes it while focus is inside.
- **FR-039**: When the panel opens from a sent question, focus MUST move to the panel composer
  and the status region announces "Jason is answering"; when it opens with no text, focus MUST
  move to the panel heading. On close, focus MUST return to the floating input, which is also
  the target after a command-palette open.
- **FR-040**: The transcript MUST be a named, keyboard-scrollable log region whose contents are
  not announced live; each message MUST carry a heading ("You", "Jason · AI") so a screen-reader
  user can move between messages.
- **FR-041**: One visually hidden polite status region, present from open, MUST carry every
  announcement: "Jason is answering" on send; the full reply text on `done` when it is 600
  characters or fewer, else "Answer ready, N paragraphs"; "Answer updated" with the same rule on
  `correction`; the verification prompt when the bot check needs interaction; every error
  message; "1 question left" and "No questions left". Repeated messages MUST clear and wait at
  least 350 ms before re-insertion. No other live region MAY exist in the widget.
- **FR-042**: Every control MUST be at least 24 × 24 CSS px, have an accessible name, and show
  the site's 2 px focus ring. Starter and option cards, Send, Close, and the floating input and
  its button MUST be at least 44 px tall on touch devices. Cards, pills and controls MUST sit
  in natural tab order.
- **FR-043**: All text in the widget, including placeholder, counter, hints and pills, MUST meet
  WCAG 2.1 AA contrast on the panel's surfaces in every shipped colour mode; focus indicators
  and card borders that act as the only boundary MUST meet 3:1.
- **FR-044**: Under reduced motion nothing MAY translate, scale or stagger; opacity changes MUST
  take at most 100 ms; streamed words MUST appear without a per-word fade; the thinking mark
  MUST be static; the floating input's placeholder MUST be static with no nudge; open and close
  MUST be plain crossfades.
- **FR-045**: At 320 px width and at 200 % zoom the header, disclosure, transcript and composer
  MUST all be reachable with no horizontal scrolling.

**Motion**

- **FR-046**: Open MUST be a morph: the floating input's frame travels and grows into the
  panel's frame (on phones, upward into the sheet) over at most 320 ms with a standard ease-out
  and no overshoot; the bar's contents fade out in the first third, the header, transcript and
  composer fade in during the second half, and a sent question is already the first message
  when the transcript appears. Close is the reverse over at most 240 ms, with the sheet also
  closable by drag. The morph animates the frame's position and size only; text and controls
  crossfade and are never stretched. Opening from the command palette MUST skip the morph and
  fade the panel in over at most 200 ms. Message arrival MUST be an opacity fade of at most
  150 ms. Apart from the bounded placeholder rotation and nudge (FR-004a, FR-004b), nothing in
  the widget MAY animate on page load or on scroll, and no bounce or overshoot MAY be used
  (constitution Principle IV).

**Feature flag**

- **FR-047**: The widget MUST be gated by a build-time public environment variable,
  `NEXT_PUBLIC_ASK_JASON`, with three modes: `off` (nothing ships), `private` (public visitors
  get exactly the `off` experience; only a browser holding the preview key of FR-047a gets the
  entry point and the chat) and `on` (everyone). Any other value, or unset, builds as `off`.
  Every environment MUST set it explicitly: Development `on` with no setup (a committed
  development env file), Preview per branch, Production `private` until launch and `on` after.
  Every change of mode MUST be an environment change plus a redeploy, never a code change.
- **FR-047a**: The preview key MUST be a random secret of at least 32 characters held in a
  build-time environment variable, `ASK_JASON_PREVIEW_SECRET`, never committed and never logged; the page MUST carry
  only a one-way hash of it. A browser is armed by opening any site page with the key in the
  URL fragment (`#ask=<key>`); the key check verifies it against the hash, stores it in that
  browser only, for 30 days, and removes it from the address bar. The fragment never reaches a
  server or a log. Rotating the secret and redeploying MUST disarm every browser. An armed
  browser in `private` mode MUST behave exactly as `on`, including against the live API, which
  already allows the production origin.
- **FR-047b**: In `private` mode the key check MUST run after hydration, MUST NOT block
  rendering, and MUST add no visible element, no request and no storage for an unarmed browser.
  In an armed browser the floating input mounts after load; it is fixed and out of flow, so it
  shifts nothing, and the reserved bottom space of FR-003 is absent in `private` mode, so it
  overlays the footer in Jason's browser only, never in the public page the quality gates
  measure.
- **FR-048**: Build checks per mode. With `off`, the built site MUST contain no entry point in
  any page's HTML, no chat module, no key check and no reference to the bot-check host. With
  `private`, every page's HTML and its first-load scripts MUST contain no entry point and no
  reference to the chat module or the bot-check host; the chat module MAY exist in the build
  output as a chunk nothing references. With `on`, the entry point MUST be present and FR-005
  still holds. A build check MUST search the output for these and fail on any hit. The
  continuous-integration quality gates MUST run with `on` so the measured pages include the
  entry point; an unarmed `private` build MUST score the same as `off`.
- **FR-049**: Local development MUST include a stand-in for the API that replays every state in
  FR-030 on demand (including correction, address limit and capped, which cannot be triggered
  against production at will). The visual, keyboard and screen-reader passes run against it;
  the live API is used for the end-to-end check on a preview.
- **FR-050**: The bot-check site key MUST come from a public environment variable,
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, supplied per environment. With the flag on and the key
  missing, the widget MUST show the *call to action* state rather than a broken check.

**Environments and the API**

- **FR-051**: Live use from a preview deployment depends on two changes outside this repo, both
  Jason's: the preview's stable alias added to the API's allowed origins, and (only if the alias
  is not under `jasongrant.me`) the alias added to the bot-check widget's hostname list. Until
  then a preview shows the network-error state when a session is attempted. The widget MUST NOT
  work around the origin check in any way.
- **FR-052**: The widget MUST read `build.api_version` from health and MUST show the *call to
  action* state for any version other than 1 (`chat-api.md`, *Versioning*).

**Quality gates**

- **FR-053**: Every page that carries the entry point is a shipped page for the constitution's
  Workflow & Quality Gates: clean types, no lint errors, zero accessibility-scan violations with
  the panel closed and open in each state, Lighthouse 95+ on the core pages and 90+ Performance
  on `/work`, both profiles, CLS 0, and the manual keyboard, screen-reader, reduced-motion and
  visual passes, measured with the flag on.

### Key Entities

- **Health snapshot**: what `/api/health` said when the chat was opened: chat and voice
  availability, the disclosure sentence, the privacy notice, the limits, and the API version.
  Refreshed on each open.
- **Conversation**: one tab's view of a session: the session token, the turns left, and the
  ordered messages. Lives for the page's lifetime; the token outlives it.
- **Message**: a visitor message or a reply. A reply has a mode (`answer`, `options`, `deflect`,
  `none`), its text, its sources or options, and flags: streaming, stopped, updated, failed.
- **Source**: a cited entry (title, URL) shown as a pill.
- **Option card**: one of three entries (title, summary, prompt) shown under an options reply.
- **Starter**: a site-authored card for the empty state: a question in the visitor's voice and
  the prompt it sends. Three ship at launch.
- **Floating input**: the fixed bottom-centre bar on every page: its value (shared with the
  panel composer), its placeholder state (rotating, static, follow-up, closed) and its rotation
  and nudge budget for the page view.
- **Widget state**: the state machine in FR-030.
- **Feature flag**: the build-time mode in FR-047 (`off`, `private`, `on`) per environment, and
  the preview key that arms a browser in `private` mode.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: With the flag `off`, a search of the production build output and every page's HTML
  for the chat module, the key check, the bot-check host and the entry-point label returns 0
  hits. With `private`, the same search of every page's HTML and first-load scripts returns 0
  hits, and an unarmed browser makes 0 requests to the chat API or the bot-check host.
- **SC-002**: With the flag on and the chat closed, every gated page scores within the
  constitution bands on both Lighthouse profiles, within one point of the pre-feature run,
  with CLS 0 and zero third-party scripts on first load.
- **SC-003**: The panel shell is visible within 100 ms of activation, and the empty state within
  500 ms on a mid-tier connection; the counted layout shift (the browser's CLS, which ignores
  movement caused by the visitor's own input) is 0 during open, bot check, streaming and
  correction, and the only elements the layout-shift API ever reports are the panel's frame and
  what sits inside it.
- **SC-004**: For 90 % of questions the first words appear within 3 seconds of send (the API's
  own target), with the widget adding at most 200 ms.
- **SC-005**: The disclosure sentence is visible in the header in 100 % of open states at 320 px
  width and at 200 % zoom.
- **SC-006**: Every state in FR-030 is reproducible on demand in development and passes the
  accessibility scan with 0 violations and the visual pass.
- **SC-007**: The full Story 1 flow completes keyboard-only; focus lands in the composer after a
  sent question or on the heading after an empty open, and returns to the floating input on
  close, in 100 % of open and close paths.
- **SC-008**: With a screen reader, a streamed reply produces exactly two announcements (start
  and completion) and a correction exactly one more; 0 announcements per word.
- **SC-009**: Under reduced motion, 0 transforms animate and every opacity change is 100 ms or
  less.
- **SC-010**: 100 % of controls are at least 24 × 24 px; 100 % of cards, Send and Close are at
  least 44 px tall on phones.
- **SC-011**: Only the session token is written to storage (plus, in `private` mode, the preview
  key in the armed browser), and only two hosts are contacted (the chat API and the bot-check
  host), both only after the visitor's first intent.
- **SC-012**: Each change of mode, in a preview environment and in production, is one variable
  change plus a redeploy, with 0 code changes, demonstrated on the preview before launch.
- **SC-013**: The counter and Send prevent an over-limit send in 100 % of attempts, and a
  rejected message is never lost from the composer.
- **SC-014**: The preview secret appears 0 times in the repository, the build output, the page
  and the deploy logs; only its one-way hash is present, and only in `private` mode.
- **SC-015**: Per page view the placeholder rotation runs at most three cycles and the nudge at
  most three times; both stop within 100 ms of the first focus, hover, pointer down or
  keystroke; neither runs under reduced motion; the field's accessible name never changes.
- **SC-016**: The morph completes within 320 ms on open and 240 ms on close with 0 layout shift
  of the page, on desktop and on a phone; under reduced motion both are crossfades of at most
  100 ms.

## Contract notes

What the widget meets, where it goes beyond the contract, and what it cannot meet as written.

1. **Lazy load** (`widget.md`, *Performance*): the contract allows loading after first
   interaction or idle; this spec is stricter and loads only on open (FR-005). Met.
2. **Health has no message for `capped` or `down`** (`chat-api.md`, *GET /api/health*), yet
   `widget.md` says to render the call to action "with the health message". The widget shows a
   site-authored line in that case (FR-036). Jason may prefer to add a `message` field to
   health; the widget would then prefer it.
3. **"Show any error text other than `error.message`" is forbidden** (`widget.md`, *Must not*),
   but a network failure, a dropped stream, an unknown API version and the widget's own end of
   session at `turns_left` 0 have no API message. The widget needs exactly four site-authored
   lines (FR-033, FR-036, FR-037). Jason to confirm the wording.
4. **Allowed origins** (`chat-api.md`, *Chat API*) say production and preview origins; the live
   allowlist holds only `https://jasongrant.me`, and a `vercel.app` origin is refused (checked
   2026-11-01). Previews depend on Jason (FR-051).
5. **"Hear this"** (`widget.md`, *Receiving*; cortex spec FR-017): deferred. The widget renders no
   voice control in this feature even if `voice_available` turns true (FR-011), so approving the
   voice does not surface an untested control. Voice is its own follow-up feature.
6. **Bot check "before the first message"** (`widget.md`, *Before the first message*): met, with
   execution deferred to first intent rather than open (FR-007), and the token's five-minute
   life handled (edge cases).
7. **Referrer** (`chat-api.md`, *POST /api/session*): the body field is `referrer`; the widget
   sends the host only, matching the *Must not* list. The API derives the domain either way.
8. **Character counting**: the API counts characters, not UTF-16 code units (cortex tasks,
   phase 9). The widget's counter must match (FR-018).
9. **`turn_limit` versus `session_closed`**: the eleventh message gets `turn_limit`; later ones
   get `session_closed`. Both end the conversation (FR-033).
10. **Sources before text**: the contract says show sources "as they are known"; this spec puts
    the row above the text so it is known at `meta` and never moves (FR-026). The sketches note
    this as a design choice.
11. **The cookie edge case** in the cortex spec ("cookies refused: a single question") does not
    apply; the widget uses no cookies (research R8). Storage unavailable gives the same single
    session per page.
12. **Light and dark**: the site ships one colour mode today (warm dark). Contrast is required in
    every shipped mode (FR-043); the bot-check iframe is pinned to the site's theme, not the
    visitor's system theme (FR-013), so it never renders light on the dark panel.

## Dependencies on Jason

1. The bot-check site key, set as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in the site's Vercel project
   for Preview and Production (Development may use the stand-in).
2. `NEXT_PUBLIC_ASK_JASON`: `private` in Production before launch and `on` after; `on` on the
   preview branches he chooses.
3. `ASK_JASON_PREVIEW_SECRET`: a long random value set in Production (and in Preview if he wants
   the key check tested there), pasted only into Vercel. He keeps the arming link to himself.
4. A stable preview alias (for example `preview.jasongrant.me` assigned to the feature branch)
   added to the API's `CHAT_ALLOWED_ORIGINS`, and to the bot-check hostnames if it is not under
   `jasongrant.me`. Needed only to show the widget to others on a preview or to run the live
   check from one; his own live check runs on production in `private` mode and needs no
   allowlist change. Optionally `http://localhost:3000` on both for live local use.
5. Final copy, in his voice: the greeting line, the three starters and their prompts (the
   starters double as the retyping placeholder, so each is at most 40 characters), the
   composer placeholder, and the four site-authored lines in contract note 3.
6. A decision on contract note 2 (a `message` in health) if he wants the API's own wording in
   the capped state.

## Assumptions

- **Audience and devices**: anonymous visitors, mostly on phones and laptops; no sign-in, no
  account, no email capture (cortex spec, Assumptions).
- **Colour mode**: the site ships a single warm-dark theme; the widget uses the site's tokens
  and inherits any future light mode without a design change.
- **Reply shape**: replies are one short paragraph of plain prose by API design; the widget does
  not render Markdown, lists or links inside reply text.
- **Starters**: three, site-authored, each answerable from the public corpus; placeholders until
  Jason supplies copy: "How do you lead design and still ship code?", "What happened with
  internationalization at Klaviyo?", "What do you look for when hiring designers?".
- **Persistence**: the conversation is held in memory for the page's lifetime and across in-site
  navigation; only the session token is stored. Nothing else is written to storage.
- **Analytics**: no new provider and no new custom events in this feature; the API's own turn log
  is the record. A single "chat opened" event can be a later decision.
- **Preview deployments**: the site's previews are public by default; Jason may put the preview
  alias behind Vercel's deployment protection when he shows the widget to others. In `private`
  mode no unarmed production visitor can reach the widget before launch.
- **Flag trade-off**: a build-time variable means changing the widget's mode in production is a
  redeploy of a few minutes, not an instant toggle, and the only per-visitor override is Jason's
  own preview key. The API already has an instant kill switch (health reports `capped`, the
  widget shows the call to action), so an instant site-side switch is not needed.
- **Private production mode**: chosen by Jason over the recommended preview-alias check. The
  accepted cost: in `private` mode the page carries a small key check and the chat module sits
  in the build output as an unreferenced chunk, both visible to anyone who reads the public repo
  or the build manifest; that reveals that a private mode exists, not the key. The key is as
  private as the deck's secret URL segment (feature 008) and is revoked the same way, by
  rotating the variable and redeploying. It travels only in a URL fragment, which browsers never
  send to a server, and is stored only in the armed browser. The floating input's late
  appearance in an armed browser shifts nothing; it only overlays the footer there.
- **Existing constants**: the repo's `featureFlags.ts` holds build-time constants that need a
  code change to flip; this flag is an environment variable by requirement. Planning may fold
  the two.
- **Unprompted motion**: the placeholder rotation and the nudge are the site's first motion
  that runs without a visitor's action. Both are bounded in FR-004a and FR-004b (start delay,
  cadence, three cycles, stop on first interaction, paused when hidden, static under reduced
  motion), which keeps them inside WCAG 2.2.2 and the spirit of Principle IV's restraint. Jason
  accepts them as a deliberate device, recorded in the PR, or amends the constitution with a
  named exception if he prefers the rule to say so.
- **Breakpoints**: phone below 768 px (sheet); tablet and desktop at 768 px and above (panel).
  The panel is 400 px wide, overlays the page, and does not push content. On viewports under
  1280 px it covers part of the content column, which is acceptable because it is non-modal
  and closes with Escape.

## Non-Goals

- No voice playback, "hear this" control, or audio of any kind until Jason approves the voice.
- No avatar, portrait animation or video in the widget.
- No review of a visitor's own work, no file or image input, no attachments.
- No analytics beyond what the site already has.
- No change to the API, its contracts, or its wording; gaps are listed for Jason, not patched.
- No transcript storage, export, email of the conversation, or sharing link.
- No new runtime dependencies beyond the bot-check script, loaded only after the visitor's first
  intent.
- No instant site-side kill switch (a mode change is a redeploy; the API's kill switch is
  instant), and no per-visitor targeting beyond Jason's own preview key.
- No changes to the deck route.
- No hide-on-scroll, no auto-opening, and no unsolicited message from the floating input;
  its only unprompted behaviour is the bounded rotation and nudge.
