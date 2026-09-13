import { ContentSlide } from "@/components/deck/ContentSlide";
import { TransitionSlide } from "@/components/deck/TransitionSlide";
import { deck, getSlide } from "@/content/deck";
import { getDeckSlug } from "@/lib/deckSlug";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  const secret = getDeckSlug();
  return deck.sections.flatMap((s) =>
    s.slides.map((sl) => ({ secret, section: s.slug, slide: sl.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ secret: string; section: string; slide: string }>;
}): Promise<Metadata> {
  const { section, slide } = await params;
  const resolved = getSlide(section, slide);
  if (!resolved) return {};
  return {
    title: { absolute: `${resolved.index + 1} of ${resolved.total} · ${resolved.slide.title}` },
  };
}

export default async function DeckSlidePage({
  params,
}: {
  params: Promise<{ secret: string; section: string; slide: string }>;
}) {
  const { secret, section, slide } = await params;
  const resolved = getSlide(section, slide);
  if (!resolved) notFound();

  const position = { index: resolved.index, total: resolved.total };
  if (resolved.slide.template === "transition") {
    return <TransitionSlide slide={resolved.slide} position={position} secret={secret} />;
  }
  return <ContentSlide slide={resolved.slide} position={position} />;
}
