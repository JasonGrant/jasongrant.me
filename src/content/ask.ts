// Site-authored copy for the Ask Jason widget (feature 009).
//
// Everything the API sends (the disclosure sentence, the privacy notice, every
// reply and every error message) comes from the API and is shown unchanged.
// The only words the site writes itself are in this file. Final wording is
// Jason's to edit; the assertion at the bottom keeps the starters short enough
// to fit the entry bar, because the same three questions retype themselves in
// its placeholder.

export interface Starter {
  /** Shown on the starter card and typed by the placeholder; at most 40 characters. */
  label: string;
  /** Sent as the visitor's message when the card is activated. */
  prompt: string;
}

export const STARTER_LABEL_MAX = 40;

export const ask = {
  greeting: "Ask me about my work, how I lead, or what I've written.",
  placeholder: "Ask about my work, how I lead, or what I've written",
  followUpPlaceholder: "Ask a follow-up",
  closedLabel: "Chat closed · email me",
  starters: [
    {
      label: "How do you lead and still ship code?",
      prompt: "How do you lead design and still ship code?",
    },
    {
      label: "What happened with i18n at Klaviyo?",
      prompt: "What happened with internationalization at Klaviyo?",
    },
    {
      label: "What do you look for when hiring?",
      prompt: "What do you look for when hiring designers?",
    },
  ],
  // The only other site-authored lines (spec contract note 3).
  lines: {
    ended: "That's the end of this conversation.",
    resting: "The chat is resting for now.",
    network: "The chat didn't respond. Check your connection and try again.",
    contact: "You can reach me directly:",
  },
} as const satisfies {
  greeting: string;
  placeholder: string;
  followUpPlaceholder: string;
  closedLabel: string;
  starters: readonly Starter[];
  lines: Record<string, string>;
};

if (ask.starters.length !== 3) {
  throw new Error(`ask.starters must hold exactly 3 entries, found ${ask.starters.length}`);
}
for (const starter of ask.starters) {
  if (starter.label.length > STARTER_LABEL_MAX || starter.prompt.trim() === "") {
    throw new Error(
      `Starter "${starter.label}" must be at most ${STARTER_LABEL_MAX} characters and have a prompt`,
    );
  }
}
