import { DESIGN_HANDOFF_SLIDES } from "@/components/work/app-shell/DesignHandoffScreens";
import { DeckStepper } from "./DeckStepper";

export function DesignHandoffDeck() {
  return (
    <DeckStepper
      slides={DESIGN_HANDOFF_SLIDES}
      stageFraction={0.85}
      footnote="The full design-system spec engineering built against, stepped through."
    />
  );
}
