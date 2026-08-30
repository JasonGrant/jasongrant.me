"use client";

import { useState } from "react";
import styles from "./FlagsRuleDemo.module.css";
import { FLAGS_FACTS as F } from "./facts";

export function FlagsRuleDemo() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={styles.demo}>
      <div className={styles.section}>
        <p className={styles.label}>✓ Countries — flags work</p>
        <div className={styles.pillRow}>
          <span className={styles.pill}>🇺🇸 +1 (555) 019-2834</span>
        </div>
        <p style={{ fontSize: "var(--fs-meta)", color: "var(--ink-soft)" }}>{F.doRule}</p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <p className={styles.label}>✗ Which flag is Spanish?</p>
        <button type="button" className={styles.button} onClick={() => setRevealed((v) => !v)}>
          {revealed ? "Hide" : "Reveal"} candidate flags
        </button>
        {revealed ? (
          <div className={styles.pillRow}>
            {F.spanishAmbiguity.map((country) => (
              <span key={country} className={`${styles.pill} ${styles.ambiguous}`}>
                {country}
              </span>
            ))}
          </div>
        ) : null}
        <p className={styles.resultLine} aria-live="polite">
          {revealed
            ? `${F.spanishAmbiguity.length} countries share the language "Spanish" — no single flag is correct.`
            : "One flag can't represent a language spoken across many countries."}
        </p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <p className={styles.label}>
          One country, many languages: {F.multilingualCountryExample.country}
        </p>
        <div className={styles.pillRow}>
          {F.multilingualCountryExample.languages.map((lang) => (
            <span key={lang} className={styles.pill}>
              {lang}
            </span>
          ))}
        </div>
        <p style={{ fontSize: "var(--fs-meta)", color: "var(--ink-soft)" }}>{F.dontRule}</p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <p className={styles.label}>✓ Correct: language names in their own script, no flags</p>
        <div className={styles.pillRow}>
          <span className={styles.pill}>Español</span>
          <span className={styles.pill}>Français</span>
          <span className={styles.pill}>日本語</span>
        </div>
      </div>
    </div>
  );
}
