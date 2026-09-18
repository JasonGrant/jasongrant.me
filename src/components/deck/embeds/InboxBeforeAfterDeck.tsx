import { BeforeAfterPair } from "./BeforeAfterPair";

export function InboxBeforeAfterDeck() {
  return (
    <BeforeAfterPair
      context="inbox"
      before={{
        src: "/work/app-shell/reveal/inbox-before-himarley.jpg",
        alt: "Before: the original Hi Marley inbox, with a case's Details panel limited to a simple set of fields.",
        width: 3600,
        height: 2088,
      }}
      after={{
        src: "/work/app-shell/reveal/inbox-progress.jpg",
        alt: "After: a richer case thread with an AI summary, internal partner alerts, Case Progress, Partner Data, and Workflows sections.",
        width: 3600,
        height: 2088,
      }}
    />
  );
}
