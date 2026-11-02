// Scenarios for the scripted stand-in (development and CI builds only).
//
// Every state in the spec's FR-030 list is reproducible from here, including the
// ones production cannot produce on demand: capped, address limit, correction,
// expired session. The stand-in is NOT a source of truth. The disclosure, notice
// and fixed lines below were copied from the live API's /api/health on 2026-11-01
// to look right; reply text and sources are invented. Pick a scenario with
// ?ask=<id>; add &open=1 to open the panel and play it, &fast=1 to skip the
// waiting, &container=sheet to force the phone container.
import type { BotCheckMode } from "./chatClient";
import type { ApiErrorBody, Health, OptionEntry, ReplyMode, Source } from "./wire";

export const STANDIN_HEALTH: Health = {
  chat: "ok",
  voice: "off",
  disclosure:
    "You're talking with an AI trained on Jason Grant's writing. It speaks as Jason, but it isn't him.",
  notice: "Your questions are kept for 30 days to improve the answers.",
  limits: { input_chars: 500, turns: 10, voice_plays: 5 },
  build: { corpus_commit: "standin", built_at: "2026-11-01T00:00:00.000Z", api_version: 1 },
};

const TEST_KEY = {
  pass: "1x00000000000000000000AA",
  fail: "2x00000000000000000000AB",
  interactive: "3x00000000000000000000FF",
};

const VERTEX: Source = {
  entry_id: "vertex",
  title: "Vertex Pharmaceuticals",
  url: "https://jasongrant.me/experience#vertex",
};
const POST_FIGMA: Source = {
  entry_id: "post-figma-design",
  title: "Post-Figma design",
  url: "https://mrjasongrant.substack.com/p/post-figma-design",
};
const DESIGN_SYSTEMS: Source = {
  entry_id: "design-systems-note",
  title: "Design systems as products",
  url: "https://mrjasongrant.substack.com/p/design-systems-as-products",
};
const I18N: Source = {
  entry_id: "internationalization",
  title: "Internationalization at Klaviyo",
  url: "https://jasongrant.me/work/internationalization",
};

const OPTIONS: OptionEntry[] = [
  {
    entry_id: "app-shell",
    title: "App Shell Evolution at Hi Marley",
    summary: "How one shell replaced three navigation systems without a big-bang release.",
    prompt: "Tell me about the app shell work at Hi Marley.",
  },
  {
    entry_id: "ai-claims",
    title: "Designing AI-native claims",
    summary: "What changes when the person on the other end of the screen is a model.",
    prompt: "What did you learn designing AI-native claims?",
  },
  {
    entry_id: "hi-marley",
    title: "Leading design at Hi Marley",
    summary: "The first ninety days, and what I would do differently.",
    prompt: "How did you start leading design at Hi Marley?",
  },
];

const TEXT = {
  vertex:
    "I started at Vertex with two designers and a backlog nobody owned. The first year was mostly about making the work visible: a shared critique rhythm, a short list of principles, and a hiring bar I could explain in one sentence. By the time the team reached twelve, every item in the backlog had an owner, and the owners had opinions, which is how I knew it was working.",
  systems:
    "I think of a design system as a product with an audience, not a library. The teams that treat it as a library end up with a very tidy graveyard. The ones that treat it as a product ask who is using it this quarter, what they tried to do, and where they gave up, and then they fix that.",
  long: "I run design as a small number of habits that I keep doing even when it is inconvenient. The first is a weekly critique where the work is on the screen and nobody is allowed to present it. The second is a written decision log, because the most expensive meetings are the ones that decide the same thing twice. The third is shipping code alongside engineering, not to prove anything, but because it is the fastest way to learn which of my opinions survive contact with a build.\n\nAt Klaviyo that meant sitting in the room for the internationalization work and reading the pull requests, which changed how I wrote the design guidance. At Hi Marley it meant consolidating the front end onto one system, one component at a time, and being honest about the components we retired. I keep a list of what I got wrong, and I read it before each planning cycle. It is humbling and it is useful.\n\nIf you want the longer version, the case studies on this site go through the decisions in the order I made them, including the ones I would reverse. I would rather you see the reasoning than take my word for the outcome.",
  correctionBefore:
    "We shipped the first twenty languages in a single quarter, and the audit was the forcing function that made it possible.",
  correctionAfter:
    "We shipped the first twelve languages in two quarters. The audit was the forcing function: it turned a vague worry into a list with owners.",
  deflect:
    "I keep compensation out of this chat. If we get to that conversation, it will be a direct one.",
  none: "I don't have anything written on that, and I would rather say so than guess.",
  optionsIntro: "I don't have anything written on that. These are the closest things I do have:",
  grounded:
    "That one is worth the long version. We replaced three navigation systems with one shell by shipping it behind a flag, moving the lowest-risk surfaces first, and keeping the old routes alive until the numbers said we could stop. The surprising part was how much of the work was deleting things.",
};

const SESSION_ENDED =
  "That's the end of this conversation. If you'd like to keep talking, reach out through the contact info on my site.";
const RESTING =
  "The chat is resting for now. You can reach me through the contact info on my site.";

export interface StreamTurn {
  kind: "stream";
  mode: ReplyMode;
  text: string;
  sources?: Source[];
  options?: OptionEntry[];
  voiceAvailable?: boolean;
  /** After the text, replace the reply (spec FR-029). */
  correction?: { text: string; mode?: ReplyMode; sources?: Source[]; options?: OptionEntry[] };
  /** After a few words, send an `error` event instead of `done`. */
  errorEvent?: ApiErrorBody;
  /** Close the stream after this many words, without `done`. */
  dropAfterWords?: number;
  /** Send nothing at all (the 20 s no-meta path). */
  noMeta?: boolean;
}

export interface HttpErrorTurn {
  kind: "http";
  status: number;
  error: ApiErrorBody;
}

export type Turn = StreamTurn | HttpErrorTurn;

export interface Scenario {
  id: string;
  health?: Partial<Health>;
  healthDelayMs?: number;
  /** createSession fails with this. */
  sessionError?: { status: number; error: ApiErrorBody };
  botCheck?: BotCheckMode;
  /** Messages sent automatically when the scenario is opened with &open=1. */
  prompts?: string[];
  /** Responses per chat call, in order; the last one repeats. Absent: the default responder. */
  turns?: Turn[];
  /** Turns the visitor starts with (default 10); meta.session.turns_left counts down from it. */
  startTurns?: number;
}

const ASK = "How did you build the design team at Vertex?";

const answer = (sources: Source[], text = TEXT.vertex): StreamTurn => ({
  kind: "stream",
  mode: "answer",
  text,
  sources,
});

const turnLimit: HttpErrorTurn = {
  kind: "http",
  status: 409,
  error: { code: "turn_limit", message: SESSION_ENDED },
};

export const SCENARIOS: Record<string, Scenario> = {
  empty: { id: "empty" },
  "slow-health": { id: "slow-health", healthDelayMs: 2000 },

  "answer-1": { id: "answer-1", prompts: [ASK], turns: [answer([VERTEX])] },
  "answer-3": {
    id: "answer-3",
    prompts: ["What do you think about design systems?"],
    turns: [answer([VERTEX, POST_FIGMA, DESIGN_SYSTEMS], TEXT.systems)],
  },
  options: {
    id: "options",
    prompts: ["What was revenue at Hi Marley last year?"],
    turns: [
      { kind: "stream", mode: "options", text: TEXT.optionsIntro, options: OPTIONS },
      { kind: "stream", mode: "answer", text: TEXT.grounded, sources: [VERTEX] },
    ],
  },
  deflect: {
    id: "deflect",
    prompts: ["What's your salary?"],
    turns: [{ kind: "stream", mode: "deflect", text: TEXT.deflect }],
  },
  none: {
    id: "none",
    prompts: ["What is the capital of Australia?"],
    turns: [{ kind: "stream", mode: "none", text: TEXT.none }],
  },
  "correction-text": {
    id: "correction-text",
    prompts: ["How fast did the internationalization work ship?"],
    turns: [
      {
        kind: "stream",
        mode: "answer",
        text: TEXT.correctionBefore,
        sources: [VERTEX],
        correction: { text: TEXT.correctionAfter, sources: [I18N] },
      },
    ],
  },
  "correction-options": {
    id: "correction-options",
    prompts: ["How fast did the internationalization work ship?"],
    turns: [
      {
        kind: "stream",
        mode: "answer",
        text: TEXT.correctionBefore,
        sources: [VERTEX],
        correction: { text: TEXT.optionsIntro, mode: "options", sources: [], options: OPTIONS },
      },
    ],
  },
  long: {
    id: "long",
    prompts: ["How do you run a design team?"],
    turns: [answer([VERTEX, I18N], TEXT.long)],
  },
  "error-event": {
    id: "error-event",
    prompts: [ASK],
    turns: [
      {
        kind: "stream",
        mode: "answer",
        text: TEXT.vertex,
        sources: [VERTEX],
        errorEvent: {
          code: "unavailable",
          message:
            "Something went wrong on my side. You can reach me through the contact info on my site.",
        },
      },
    ],
  },
  "no-meta": {
    id: "no-meta",
    prompts: [ASK],
    turns: [{ kind: "stream", mode: "answer", text: "", noMeta: true }],
  },
  drop: {
    id: "drop",
    prompts: [ASK],
    turns: [{ ...answer([VERTEX]), dropAfterWords: 14 }],
  },

  "too-long": {
    id: "too-long",
    prompts: [ASK],
    turns: [
      {
        kind: "http",
        status: 400,
        error: {
          code: "input_too_long",
          message: "That's a bit long for me. Keep it under 500 characters and try again.",
        },
      },
    ],
  },
  "not-text": {
    id: "not-text",
    prompts: [ASK],
    turns: [
      {
        kind: "http",
        status: 400,
        error: {
          code: "input_not_text",
          message: "Plain text only, please: no code blocks or pasted files.",
        },
      },
    ],
  },
  "address-limit": {
    id: "address-limit",
    prompts: [ASK, "And what about Klaviyo?"],
    turns: [
      answer([VERTEX]),
      {
        kind: "http",
        status: 429,
        error: {
          code: "address_limit",
          message:
            "That's a lot of questions from one place today. Come back tomorrow, or reach me by email.",
        },
      },
    ],
  },
  countdown: {
    id: "countdown",
    startTurns: 4,
    prompts: [ASK, "What did the first year look like?", "And the second?", "Anything you'd redo?"],
    turns: [answer([VERTEX])],
  },
  "turn-limit": { id: "turn-limit", prompts: [ASK], turns: [turnLimit] },
  "session-closed": {
    id: "session-closed",
    prompts: [ASK],
    turns: [
      {
        kind: "http",
        status: 409,
        error: { code: "session_closed", message: SESSION_ENDED },
      },
    ],
  },
  "session-expired": {
    id: "session-expired",
    prompts: [ASK],
    turns: [
      {
        kind: "http",
        status: 410,
        error: { code: "session_expired", message: "This conversation timed out." },
      },
      answer([VERTEX]),
    ],
  },

  "capped-health": { id: "capped-health", health: { chat: "capped" } },
  "down-health": { id: "down-health", health: { chat: "down" } },
  "old-version": {
    id: "old-version",
    health: { build: { ...STANDIN_HEALTH.build, api_version: 2 } },
  },
  "capped-session": {
    id: "capped-session",
    prompts: [ASK],
    sessionError: { status: 503, error: { code: "chat_capped", message: RESTING } },
  },
  "unavailable-chat": {
    id: "unavailable-chat",
    prompts: [ASK],
    turns: [
      {
        kind: "http",
        status: 503,
        error: {
          code: "unavailable",
          message:
            "Something went wrong on my side. You can reach me through the contact info on my site.",
        },
      },
    ],
  },
  "voice-on": {
    id: "voice-on",
    health: { voice: "ok" },
    prompts: [ASK],
    turns: [{ ...answer([VERTEX]), voiceAvailable: true }],
  },

  // The fake challenge exercises our bot-check surface offline (axe, screenshots).
  "bot-pass": {
    id: "bot-pass",
    prompts: [ASK],
    botCheck: { kind: "fake", outcome: "pass" },
    turns: [answer([VERTEX])],
  },
  "bot-fail": {
    id: "bot-fail",
    prompts: [ASK],
    botCheck: { kind: "fake", outcome: "fail" },
    sessionError: {
      status: 403,
      error: { code: "bot_check_failed", message: "Couldn't verify this browser." },
    },
  },
  "bot-interactive": {
    id: "bot-interactive",
    prompts: [ASK],
    botCheck: { kind: "fake", outcome: "interactive" },
    turns: [answer([VERTEX])],
  },
  // The real Turnstile, with Cloudflare's published test site keys (needs network).
  "turnstile-test-pass": {
    id: "turnstile-test-pass",
    botCheck: { kind: "turnstile", siteKey: TEST_KEY.pass },
    turns: [answer([VERTEX])],
  },
  "turnstile-test-fail": {
    id: "turnstile-test-fail",
    botCheck: { kind: "turnstile", siteKey: TEST_KEY.fail },
  },
  "turnstile-test-interactive": {
    id: "turnstile-test-interactive",
    botCheck: { kind: "turnstile", siteKey: TEST_KEY.interactive },
    turns: [answer([VERTEX])],
  },
};

export const DEFAULT_SCENARIO = SCENARIOS.empty;

/** Replies for manual typing when a scenario scripts no turns. */
export function defaultTurn(message: string): StreamTurn {
  if (/salary|pay\b|compensation|how much do you (make|earn)/i.test(message)) {
    return { kind: "stream", mode: "deflect", text: TEXT.deflect };
  }
  if (/revenue|headcount|numbers|budget/i.test(message)) {
    return { kind: "stream", mode: "options", text: TEXT.optionsIntro, options: OPTIONS };
  }
  return answer([VERTEX, POST_FIGMA, DESIGN_SYSTEMS], TEXT.systems);
}
