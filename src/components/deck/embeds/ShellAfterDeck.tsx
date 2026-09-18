import type { LightboxGroup } from "../LightboxContext";
import { LightboxTrigger } from "../LightboxTrigger";
import { DeckImage } from "./DeckImage";
import styles from "./ShellAfterDeck.module.css";

const AFTER_IMAGE = {
  src: "/work/app-shell/shell-after-inbox.png",
  alt: "The redesigned Hi Marley shell: a collapsed icon rail on the far left, the inbox and case thread in the center, and on the right a vertical icon strip beside a full-height Details panel showing Customer Information, Case Details, and Incident Details for one case.",
  width: 3600,
  height: 2084,
};

// Same asset InboxBeforeAfterDeck uses as its "before" (slide 25), pulled in
// again here so this outcome slide's lightbox can flip straight from the
// final shell back to where the inbox started, without sending the
// presenter back to slide 25 to make that comparison.
const BEFORE_IMAGE = {
  src: "/work/app-shell/reveal/inbox-before-himarley.jpg",
  alt: "Before: the original Hi Marley inbox, with a case's Details panel limited to a simple set of fields.",
  width: 3600,
  height: 2088,
};

// Same asset the "baseline" slide (slide 21, "The vision") uses, pulled in
// again so this outcome slide's lightbox can also compare against the
// original aspirational concept, not just the literal before/after.
const VISION_IMAGE = {
  src: "/work/app-shell/vision-customer-forum-demo.png",
  alt: "A customer forum demo: the inbox thread showing an interactive appointment-reminder card and RCS messaging, alongside a phone mockup of an AI assistant conducting a post-repair satisfaction survey.",
  width: 3600,
  height: 2088,
};

const GROUPS: LightboxGroup[] = [[AFTER_IMAGE], [BEFORE_IMAGE], [VISION_IMAGE]];

// The deck's own wrapper around the same asset ShellAfterScreen (/work)
// renders, using DeckImage's scale-to-fit treatment instead of
// ShellAfterScreen's fixed intrinsic-height layout — so the "outcome" slide
// doesn't need an internal scroll to see the whole screenshot. /work's
// ShellAfterScreen is untouched.
export function ShellAfterDeck() {
  return (
    <LightboxTrigger
      groups={GROUPS}
      index={0}
      label="View outcome larger, with the inbox before and the original vision alongside it"
      className={styles.trigger}
    >
      <DeckImage image={{ ...AFTER_IMAGE, stageFraction: 0.85 }} priority />
    </LightboxTrigger>
  );
}
