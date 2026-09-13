import { RevealSlider } from "./RevealSlider";

export function InboxRevealDeck() {
  return (
    <RevealSlider
      label="Inbox before and after"
      beforeSrc="/work/app-shell/reveal/inbox-before-himarley.jpg"
      beforeAlt="Before: the original Hi Marley inbox, with a case's Details panel limited to a simple set of fields."
      afterSrc="/work/app-shell/reveal/inbox-progress.jpg"
      afterAlt="After: a richer case thread with an AI summary, internal partner alerts, Case Progress, Partner Data, and Workflows sections."
      width={3600}
      height={2088}
    />
  );
}
