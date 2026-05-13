import { ExperienceEntry } from "@/components/experience/ExperienceEntry";
import { workEntries } from "@/content/work";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Jason Grant's chronological work history: Hi Marley, Hypoth, Klaviyo, Vertex Pharmaceuticals. Quantified outcomes and design-engineering practice across operator and founder roles.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience — jasongrant.me",
    description: "Chronological work history with quantified outcomes.",
    url: "/experience",
    images: [{ url: "/api/og?page=experience", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience — jasongrant.me",
    description: "Chronological work history with quantified outcomes.",
    images: ["/api/og?page=experience"],
  },
};

export default function Experience() {
  return (
    <>
      <header className={styles.intro}>
        <h1 className={styles.h1}>Experience</h1>
        <p className={styles.lede}>
          Design engineering leadership across an operator-and-founder career. Outcomes are
          quantified where they can be.
        </p>
      </header>
      <div className={styles.entries}>
        {workEntries.map((entry, i) => (
          <ExperienceEntry key={entry.id} entry={entry} first={i === 0} />
        ))}
      </div>
      <div className={styles.resumeBlock} id="resume">
        <span className={styles.resumeLabel}>For recruiters</span>
        <a href="/resume.pdf" className={styles.resumeLink}>
          ↓ Resume (PDF)
        </a>
      </div>
    </>
  );
}
