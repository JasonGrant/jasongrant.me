// Build-time switch for the "Ask Jason" chat widget (feature 009).
//
//   off      nothing ships: no entry bar, no widget code, no Turnstile reference.
//   private  the public sees exactly the "off" site; a browser holding Jason's
//            preview key (see components/ask/keyGate.ts) gets the widget.
//   on       everyone gets the widget.
//
// Read at BUILD time. Next.js inlines NEXT_PUBLIC_* values and webpack drops
// the dead branches that depend on them, which is what keeps the "off" build
// free of widget code. Two rules make that work:
//   1. Compare against string literals here, never a computed key.
//   2. Set the variable explicitly in every environment. An unset variable is
//      not inlined, so the branch would survive as runtime-dead code and the
//      widget chunk would still be emitted.
// scripts/check-ask-jason-bundle.mjs is the check that proves it.
//
// Changing the mode is an environment change plus a redeploy, never a code
// change. See specs/009-ask-jason-chat/contracts/flag-and-environments.md.
export type AskJasonMode = "off" | "private" | "on";

export const ASK_JASON_MODE: AskJasonMode =
  process.env.NEXT_PUBLIC_ASK_JASON === "on"
    ? "on"
    : process.env.NEXT_PUBLIC_ASK_JASON === "private"
      ? "private"
      : "off";
