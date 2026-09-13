import { RevealSlider } from "./RevealSlider";

export function OutreachRevealDeck() {
  return (
    <RevealSlider
      label="Outreach before and after"
      beforeSrc="/work/app-shell/reveal/outreach-origin.png"
      beforeAlt="Before: a flat Notifications table listing individual outbound messages."
      afterSrc="/work/app-shell/reveal/outreach-intermediate.png"
      afterAlt="After: a Bulk messaging table tracking 18 campaigns with categorized status."
      width={3600}
      height={2088}
    />
  );
}
