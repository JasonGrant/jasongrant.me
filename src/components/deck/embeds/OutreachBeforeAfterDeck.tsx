import { BeforeAfterPair } from "./BeforeAfterPair";

export function OutreachBeforeAfterDeck() {
  return (
    <BeforeAfterPair
      context="outreach"
      before={{
        src: "/work/app-shell/reveal/outreach-origin.png",
        alt: "Before: a flat Notifications table listing individual outbound messages.",
        width: 3600,
        height: 2088,
      }}
      after={{
        src: "/work/app-shell/reveal/outreach-intermediate.png",
        alt: "After: a Bulk messaging table tracking 18 campaigns with categorized status.",
        width: 3600,
        height: 2088,
      }}
    />
  );
}
