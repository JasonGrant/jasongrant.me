// Mounted by the two chrome layouts, beside the command palette. A server component
// whose conditions are literal, so a production build drops whichever branches the
// flag excludes: with the flag "off", neither import below is reachable and nothing
// of the widget is in the build. See src/lib/askJasonFlag.ts and
// specs/009-ask-jason-chat/contracts/flag-and-environments.md.
export async function AskJasonMount() {
  if (process.env.NEXT_PUBLIC_ASK_JASON === "on") {
    const { default: Bar } = await import("./Bar");
    return <Bar />;
  }
  if (process.env.NEXT_PUBLIC_ASK_JASON === "private") {
    const { default: AskJasonPrivate } = await import("./AskJasonPrivate");
    return <AskJasonPrivate />;
  }
  return null;
}
