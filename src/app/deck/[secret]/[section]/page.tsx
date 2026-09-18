import { deck, firstSlideOf } from "@/content/deck";
import { getDeckSlug } from "@/lib/deckSlug";
import { notFound, redirect } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  const secret = getDeckSlug();
  return deck.sections.map((s) => ({ secret, section: s.slug }));
}

// /deck/<secret>/<section> → that section's first slide (contracts/routes.md).
export default async function DeckSectionIndexPage({
  params,
}: {
  params: Promise<{ secret: string; section: string }>;
}) {
  const { secret, section } = await params;
  const first = firstSlideOf(section);
  if (!first) notFound();
  redirect(`/deck/${secret}/${first.section}/${first.slide}`);
}
