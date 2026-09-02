"use client";

import { KlaviyoAppScreen } from "@/components/work/replica/KlaviyoAppScreen";
import { useState } from "react";
import styles from "./LanguageBreakDemo.module.css";

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

      <KlaviyoAppScreen broken={broken} />

      {broken ? (
        <>
          <p className={styles.resultLine} aria-live="polite">
            Switching to Deutsch broke three things at once: a truncated button label, a form
            control stranded mid-sentence, and a number kept in US formatting.
          </p>
          <ol className={styles.pinList}>
            {ANNOTATIONS.map((a, i) => {
              const target = annotationLinks[a.key];
              const inner = (
                <>
                  <span className={styles.pinNumber}>{i + 1}</span>
                  <span className={styles.pinDesc}>{a.label}</span>
                </>
              );
              return (
                <li key={a.key}>
                  {target ? (
                    <a href={`#${target}`} className={styles.pinLink}>
                      {inner}
                    </a>
                  ) : (
                    <span className={styles.pinLink}>{inner}</span>
                  )}
                </li>
              );
            })}
          </ol>
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
