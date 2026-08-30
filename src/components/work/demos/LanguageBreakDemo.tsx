"use client";

import { SidebarNav } from "@/components/work/replica/SidebarNav";
import { useState } from "react";
import styles from "./LanguageBreakDemo.module.css";
import { TEXT_EXPANSION_FACTS } from "./facts";

const ANNOTATIONS = [
  { key: "truncation", label: "Truncated button label" },
  { key: "word-order", label: "Stranded mid-sentence control" },
  { key: "formatting", label: "Wrong number format" },
] as const;

export interface LanguageBreakDemoProps {
  annotationLinks?: Record<string, string>;
}

// The direct-manipulation opening demo: retells the initiative's real
// kickoff audit (machine-translating the product into German surfaced
// these three breakages). Instant state changes only — no scripted
// animation (FR-010b); the LanguageBreakDemo's own break IS the "before"
// picture the rest of the study explains.
export function LanguageBreakDemo({ annotationLinks = {} }: LanguageBreakDemoProps) {
  const [lang, setLang] = useState<"en" | "de">("en");
  const broken = lang === "de";

  return (
    <div className={styles.demo}>
      <div className={styles.controlRow}>
        <label htmlFor="break-lang">Language</label>
        <select
          id="break-lang"
          className={styles.select}
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "de")}
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>
      </div>

      <SidebarNav
        brand="Meridian"
        navItems={
          broken
            ? ["Start", "Kampagnen", "Abläufe", "Zielgruppe"]
            : ["Home", "Campaigns", "Flows", "Audience"]
        }
        ctaText={broken ? "Erstellen Sie einen Ablauf für abgebro…" : TEXT_EXPANSION_FACTS.pair.en}
        ctaBroken={broken}
        sentencePrefix={broken ? "Senden" : "Send"}
        controlValue="immediately"
        sentenceSuffix={broken ? "nach der Registrierung" : "after signup"}
        sentenceBroken={broken}
        statLabel={broken ? "Monatliche Sendungen" : "Monthly sends"}
        statValue="5,123,456.59"
        statBroken={broken}
      />

      {broken ? (
        <>
          <div className={styles.pinRow}>
            {ANNOTATIONS.map((a, i) => {
              const target = annotationLinks[a.key];
              return target ? (
                <a key={a.key} href={`#${target}`} className={styles.pinLink}>
                  <span className={styles.pinNumber}>{i + 1}</span>
                  {a.label}
                </a>
              ) : (
                <span key={a.key} className={styles.pinLink}>
                  <span className={styles.pinNumber}>{i + 1}</span>
                  {a.label}
                </span>
              );
            })}
          </div>
          <p className={styles.resultLine} aria-live="polite">
            Switching to Deutsch broke three things at once: a truncated button label, a form
            control stranded mid-sentence, and a number kept in US formatting.
          </p>
        </>
      ) : (
        <p className={styles.resultLine} aria-live="polite">
          Switch the language above to see what a straight machine translation actually did to this
          product.
        </p>
      )}
    </div>
  );
}
