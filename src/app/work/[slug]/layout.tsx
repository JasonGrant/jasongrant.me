import { BackgroundFX } from "@/components/chrome/BackgroundFX";
import { ClickTracker } from "@/components/chrome/ClickTracker";
import { CommandPalette } from "@/components/chrome/CommandPalette";
import { Footer } from "@/components/chrome/Footer";
import { LeftRail } from "@/components/chrome/LeftRail";
import { TopBar } from "@/components/chrome/TopBar";
import { getStudy } from "@/content/studies";
import styles from "./layout.module.css";

// Case-study routes reuse the primary site chrome (TopBar wordmark + ⌘K +
// portrait, LeftRail jump-nav, CommandPalette, Footer, BackgroundFX) so a
// study reads as part of jasongrant.me, not a detached page. The section
// rail is derived from the study's prose spine — the walkthrough/demo
// blocks live under those beats. This layout owns the slug (unlike the
// shared (main) layout), which is what lets the rail be content-driven.
export default async function WorkStudyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getStudy(slug);
  const sections =
    study?.blocks
      .filter((b) => b.kind === "prose")
      .map((b) => ({ id: b.id, label: b.heading.split(":")[0].trim() })) ?? [];

  return (
    <>
      <BackgroundFX />
      <LeftRail sections={sections} />
      <div className={styles.page}>
        <TopBar />
        <main>{children}</main>
        <Footer />
      </div>
      <CommandPalette />
      <ClickTracker />
    </>
  );
}
