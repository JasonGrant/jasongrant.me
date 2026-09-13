import { DeckImage } from "./DeckImage";

// The deck's own wrapper around the same asset ShellAfterScreen (/work)
// renders, using DeckImage's scale-to-fit treatment instead of
// ShellAfterScreen's fixed intrinsic-height layout — so the "outcome" slide
// doesn't need an internal scroll to see the whole screenshot. /work's
// ShellAfterScreen is untouched.
export function ShellAfterDeck() {
  return (
    <DeckImage
      image={{
        src: "/work/app-shell/shell-after-inbox.png",
        alt: "The redesigned Hi Marley shell: a collapsed icon rail on the far left, the inbox and case thread in the center, and on the right a vertical icon strip beside a full-height Details panel showing Customer Information, Case Details, and Incident Details for one case.",
        width: 3600,
        height: 2084,
        stageFraction: 0.85,
      }}
      priority
    />
  );
}
