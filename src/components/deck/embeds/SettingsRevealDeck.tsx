import { RevealSlider } from "./RevealSlider";

export function SettingsRevealDeck() {
  return (
    <RevealSlider
      label="Settings before and after"
      beforeSrc="/work/app-shell/reveal/settings-origin.png"
      beforeAlt="Before: a long, single-page Organization Settings form with sections like Inactivity Auto Reply and Message Prefixes."
      afterSrc="/work/app-shell/reveal/settings-current-ia.png"
      afterAlt="After: the same settings reorganized into a grid of specific cards, including Case types, Active hours, Quiet Hours, Message prefixes, and Out of Office Messages."
      width={3600}
      height={2085}
    />
  );
}
