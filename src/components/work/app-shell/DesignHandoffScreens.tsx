import { ImageStepper, type StepperSlide } from "./ImageStepper";

// DesignHandoffScreens — real exports from the design-system spec Jason wrote
// for this shell (component structure, token-driven redlines, and state/ARIA
// notes for engineering to build against). This was a full design handoff —
// separate engineering teams implemented most of the shell from this spec,
// not a walkthrough (Jason is helping build part of the right panel himself,
// but that's the exception, not how the project was scoped). Real artifacts,
// cleared by Jason: internal design-system documentation with no third-party
// data (Jason's own name appears once; "Geoffersen Gol…" is a placeholder/
// demo profile in the component fixtures, not a real colleague). See the
// constitution's owner-cleared-real-artifact exception, consistent with
// research D8a.
const SLIDES: StepperSlide[] = [
  {
    src: "/work/app-shell/design-handoff-details-pane-structure.jpg",
    alt: "The details pane's landmark structure annotated with ARIA: a labeled aside region, a header with a live-region title, and a vertical tablist wired to hidden/visible panels.",
    title: "Details pane structure",
    caption:
      "The pane's landmark structure, annotated with aria-labelledby ties the region to its visible heading, aria-live announces tab switches without interrupting, and the hidden attribute, removes inactive panels from both the visual and accessibility tree.",
    width: 2800,
    height: 1575,
  },
  {
    src: "/work/app-shell/design-handoff-details-pane-elements.jpg",
    alt: "Redlines for every element in the details pane header and tab list, each measurement tied to a design token, plus base, hover, and active states for a tab list item.",
    title: "Details pane elements",
    caption:
      "Every annotation traces back to a token (spacing, sizing, borders) so engineering builds against the same system the design lives in, not a one-off set of pixel values.",
    width: 2800,
    height: 1575,
  },
  {
    src: "/work/app-shell/design-handoff-navigation-before-after.jpg",
    alt: "The old left navigation column next to the new collapsible sidebar, both annotated with numbered callouts down to the profile menu and Resource Center overlay.",
    title: "Navigation before and after",
    caption:
      "The old nav and the new one, side by side with matching numbered callouts: every element in the old design has a named counterpart in the new, so nothing in the redesign is unaccounted for.",
    width: 2800,
    height: 1575,
  },
  {
    src: "/work/app-shell/design-handoff-navigation-containers.jpg",
    alt: "The sidebar's collapsed and expanded widths in rem, its three vertical zones (top, center, bottom) and the container class names each zone maps to.",
    title: "Navigation containers",
    caption:
      "Documentation of containers: collapsed and expanded widths, the three vertical zones, and the class name each one maps to in code.",
    width: 2800,
    height: 1575,
  },
  {
    src: "/work/app-shell/design-handoff-top-zone.jpg",
    alt: "The top zone's logo, create button, navigation item, and navigation group, each in collapsed, expanded, hover, and active states, with accompanying markup and ARIA notes.",
    title: "Top zone",
    caption:
      "The top zone's pieces (logo, create button, nav item, and nav group) each specified across every state, with the markup and ARIA that state depends on.",
    width: 2800,
    height: 1575,
  },
  {
    src: "/work/app-shell/design-handoff-center-zone.jpg",
    alt: "The six states of the sidebar's collapse/expand trigger: collapsed and expanded, each base, hovered, and mid-interaction, with the button markup and ARIA behind it.",
    title: "Center zone",
    caption:
      "The collapse trigger's full state machine (six states in total), plus the button markup underneath: a real button, not a styled div, with aria-expanded.",
    width: 2800,
    height: 1575,
  },
  {
    src: "/work/app-shell/design-handoff-bottom-zone.jpg",
    alt: "The bottom zone's sound toggle, help trigger, and user-profile trigger, each in collapsed and expanded states with hover, plus the secondary-navigation markup.",
    title: "Bottom zone",
    caption:
      "The bottom zone's secondary actions (sound, help, and profile) get the same state-by-state treatment as the primary navigation.",
    width: 2800,
    height: 1575,
  },
];

export function DesignHandoffScreens() {
  return <ImageStepper slides={SLIDES} />;
}
