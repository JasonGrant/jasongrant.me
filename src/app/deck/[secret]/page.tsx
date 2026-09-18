import { FIRST_SLIDE } from "@/content/deck";
import { getDeckSlug } from "@/lib/deckSlug";
import { redirect } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ secret: getDeckSlug() }];
}

// /deck/<secret> → the deck's first slide (contracts/routes.md).
export default async function DeckSecretIndexPage({
  params,
}: {
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;
  redirect(`/deck/${secret}/${FIRST_SLIDE.section}/${FIRST_SLIDE.slide}`);
}
