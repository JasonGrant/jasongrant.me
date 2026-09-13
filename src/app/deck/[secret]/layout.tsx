import { DeckShell } from "@/components/deck/DeckShell";
import { getOutline } from "@/content/deck";

// Mounts the client shell once per secret segment, so it persists across
// every slide navigation beneath it (research D5). Unknown secrets never
// reach this layout: dynamicParams=false on each page.tsx below 404s them
// first.
export default async function DeckSecretLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;
  return (
    <DeckShell secret={secret} outline={getOutline()}>
      {children}
    </DeckShell>
  );
}
