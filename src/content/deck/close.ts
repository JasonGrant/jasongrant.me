import type { DeckSection } from "./types";

export const closeSection: DeckSection = {
  slug: "close",
  title: "Close",
  slides: [
    {
      template: "transition",
      slug: "thanks",
      title: "Thank you",
      kicker: "Thank you",
      headline: "What questions can I answer?",
      sub: "Read full case studies",
      links: [
        { label: "Internationalization at Klaviyo", href: "/work/internationalization" },
        { label: "App Shell Evolution at Hi Marley", href: "/work/app-shell" },
      ],
      staticDescription:
        "Closing slide: what questions can I answer? Read full case studies. Links to the full internationalization and app shell case studies follow.",
    },
  ],
};
