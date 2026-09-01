"use client";

import { useState } from "react";
import styles from "./FlagsRuleDemo.module.css";
import { FLAGS_FACTS as F } from "./facts";

export function FlagsRuleDemo() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={`workDemoCard ${styles.demo}`}>
      <section className={styles.section}>
        <h3 className={styles.partTitle}>Phone numbers with flags</h3>
        <p className={styles.label}>✓ Flags work for countries</p>
        <div className={styles.pillRow}>
          <span className={styles.pill}>🇺🇸 +1 (555) 019-2834</span>
        </div>
        <p className={styles.caption}>{F.doRule}</p>
        <p className={styles.caption}>
          And even for countries, flags are political: regions and the flags meant to represent them
          are often disputed, so a flag can still misrepresent the people you are trying to serve.
        </p>
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h3 className={styles.partTitle}>Language with flags</h3>

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
            ? `${F.spanishAmbiguity.length} countries share the language "Spanish". No single flag is correct.`
            : "One flag can't represent a language spoken across many countries."}
        </p>

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

        <p className={styles.label}>✓ Correct: language names in their own script, no flags</p>
        <div className={styles.pillRow}>
          <span className={styles.pill}>Español</span>
          <span className={styles.pill}>Français</span>
          <span className={styles.pill}>日本語</span>
        </div>
        <p className={styles.caption}>{F.dontRule}</p>
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h3 className={styles.partTitle}>Imagery and icons</h3>
        <p className={styles.label}>✗ Icons are not universal</p>
        <div className={styles.pillRow}>
          <span className={styles.pill}>👍 Thumbs-up</span>
          <span className={styles.pill}>👌 OK sign</span>
          <span className={styles.pill}>✓ Check mark</span>
        </div>
        <p className={styles.caption}>
          A gesture or symbol that reads as positive in one culture can be confusing or offensive in
          another. Prefer neutral, widely-tested icons, and keep translatable text out of images so
          it can be localized.
        </p>
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h3 className={styles.partTitle}>Colors</h3>
        <p className={styles.label}>✗ Color meaning is not universal</p>
        <div className={styles.pillRow}>
          <span className={styles.pill}>⚪ White</span>
          <span className={styles.pill}>🔴 Red</span>
          <span className={styles.pill}>🟢 Green</span>
        </div>
        <p className={styles.caption}>
          The same color signals different things by culture: white can mean celebration or
          mourning, red can mean luck or danger. Do not lean on color alone to carry meaning; pair
          it with text and test it per market.
        </p>
      </section>
    </div>
  );
}
