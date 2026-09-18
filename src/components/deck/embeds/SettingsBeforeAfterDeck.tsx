import { BeforeAfterPair } from "./BeforeAfterPair";

export function SettingsBeforeAfterDeck() {
  return (
    <BeforeAfterPair
      context="settings"
      before={{
        src: "/work/app-shell/reveal/settings-origin.png",
        alt: "Before: a long, single-page Organization Settings form with sections like Inactivity Auto Reply and Message Prefixes.",
        width: 3600,
        height: 2085,
      }}
      after={{
        src: "/work/app-shell/reveal/settings-current-ia.png",
        alt: "After: the same settings reorganized into a grid of specific cards, including Case types, Active hours, Quiet Hours, Message prefixes, and Out of Office Messages.",
        width: 3600,
        height: 2085,
      }}
    />
  );
}
