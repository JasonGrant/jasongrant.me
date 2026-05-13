import { WritingJsonLd } from "@/components/chrome/WritingJsonLd";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { ArchiveList } from "@/components/writing/ArchiveList";
import { SelectedList } from "@/components/writing/SelectedList";
import { site } from "@/content/site";
import type { Metadata } from "next";
import styles from "./page.module.css";

const RSS_URL = `${site.socials.substack}/feed`;

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on design leadership, AI-native product work, and the post-Figma craft. Selected and archived posts from Designing Forward on Substack.",
  alternates: {
    canonical: "/writing",
    types: {
      "application/rss+xml": [{ url: RSS_URL, title: site.newsletter.name }],
    },
  },
  openGraph: {
    title: "Writing — jasongrant.me",
    description: "Selected and archived posts from Designing Forward on Substack.",
    url: "/writing",
    images: [{ url: "/api/og?page=writing", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — jasongrant.me",
    description: "Selected and archived posts from Designing Forward on Substack.",
    images: ["/api/og?page=writing"],
  },
};

export default function Writing() {
  return (
    <>
      <WritingJsonLd />
      <header className={styles.intro}>
        <h1 className={styles.h1}>Writing</h1>
        <p className={styles.lede}>
          Notes on design leadership, AI-native product work, and the post-Figma craft. Published on{" "}
          <a href={site.socials.substack} target="_blank" rel="noreferrer">
            {site.newsletter.name}
          </a>
          .
        </p>
      </header>
      <section className={styles.section} id="selected" aria-labelledby="selected-heading">
        <SectionLabel>
          <span id="selected-heading">Selected</span>
        </SectionLabel>
        <SelectedList />
      </section>
      <section className={styles.section} id="all-posts" aria-labelledby="all-posts-heading">
        <SectionLabel>
          <span id="all-posts-heading">All posts</span>
        </SectionLabel>
        <ArchiveList />
      </section>
      <div className={styles.rssBlock} id="subscribe">
        <span className={styles.rssLabel}>Subscribe via</span>
        <a href={RSS_URL} target="_blank" rel="noreferrer" className={styles.rssLink}>
          RSS →
        </a>
      </div>
    </>
  );
}
