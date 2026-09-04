import { ImageStepper, type StepperSlide } from "./ImageStepper";

// ShellBeforeScreens — the "before" figure, walking real screenshots of the
// old Hi Marley shell (Jason's own account; the visible contacts — Lily
// Davenport, Julia Voicemail Test, Jennifer Jones — are pre-existing
// test/demo entries, not real customers, cleared by Jason for this unlisted
// route per the constitution's owner-cleared-real-artifact exception).
// Replaces an earlier from-scratch recreation of this same shell: a single
// static illustration couldn't carry the accordion's real density across
// Details, Manage, Media, and Create Case the way an authentic capture does.
// See research D8a.
const SLIDES: StepperSlide[] = [
  {
    src: "/work/app-shell/shell-before-inbox.png",
    alt: "The old Hi Marley shell: a labeled left navigation column, an inbox of cases, a claimant conversation, and a right panel showing the Details tab.",
    title: "Inbox and Details",
    caption:
      "The baseline shell: a fully labeled left nav, the inbox list, the conversation, and a right panel split into just two tabs: Details and Manage.",
    width: 3600,
    height: 2254,
  },
  {
    src: "/work/app-shell/shell-before-details-edit.png",
    alt: "The Details tab in edit mode, with editable fields for name, phone number, and Marley number, and a note that changing the phone number sends a new welcome message.",
    title: "Editing details",
    caption: "Editing a contact's details in place.",
    width: 3600,
    height: 2254,
  },
  {
    src: "/work/app-shell/shell-before-manage.png",
    alt: "The Manage tab, showing Manage Users with the primary operator and customer as participants, and a Case Visibility control set to Public.",
    title: "Manage",
    caption:
      "Assign primary and secondary people to the case and determine if only the assigned people can view or if it is open to the entire team.",
    width: 3600,
    height: 2254,
  },
  {
    src: "/work/app-shell/shell-before-media.png",
    alt: "The Details panel's Media section showing a single voicemail recording with an AI-generated transcription.",
    title: "Media",
    caption: "All files (images, videos, voicemails, and PDFs) are available to view and download.",
    width: 3600,
    height: 2254,
  },
  {
    src: "/work/app-shell/shell-before-create-case.png",
    alt: "The Create Case modal, a dialog overlay with contact details, case-details tabs for Claim, Policy, and General, and required fields for insurance brand, assignee, and case visibility.",
    title: "Create Case",
    caption: "Only available for customers not integrated with a claims system of record.",
    width: 3600,
    height: 2254,
  },
];

export function ShellBeforeScreens() {
  return <ImageStepper slides={SLIDES} />;
}
