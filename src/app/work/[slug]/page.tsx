import { StudyPage } from "@/components/work/StudyPage";
import { site } from "@/content/site";
import { getStudy, studies } from "@/content/studies";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) return {};

  const ogImage = `/api/og?study=${study.slug}`;

  return {
    title: study.title,
    description: study.description,
    // Derived from `listed` — the single flip point FR-003 requires. Every
    // study ships with listed: false, so this is noindex/nofollow by
    // default (research D3/D16, contracts/routes.md).
    robots: study.listed ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: study.title,
      description: study.description,
      url: `${site.baseURL}/work/${study.slug}`,
      siteName: site.title,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();
  return <StudyPage study={study} />;
}
