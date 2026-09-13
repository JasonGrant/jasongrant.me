import { SHELL_BEFORE_SLIDES } from "@/components/work/app-shell/ShellBeforeScreens";
import { DeckStepper } from "./DeckStepper";

export function ShellBeforeDeck() {
  return (
    <DeckStepper
      slides={SHELL_BEFORE_SLIDES}
      stageFraction={0.85}
      footnote="Real screens from an internal demo account."
    />
  );
}
