"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./FlagsRuleDemo.module.css";
import { FLAGS_FACTS as F } from "./facts";

// General cultural-design cautions (drafted from widely-accepted i18n practice,
// not Jason's published Ascent guidelines). Each carries a concrete "why".
type ImageryExample = {
  kind: string;
  label: string;
  why: string;
  glyph?: string;
  image?: { src: string; width: number; height: number };
};

const IMAGERY: ImageryExample[] = [
  {
    kind: "Image",
    image: { src: "/work/dog.jpg", width: 2828, height: 2828 },
    label: "Dog",
    why: "A friendly dog is everyday, feel-good imagery in US marketing. In parts of the Muslim world dogs are considered ritually unclean, so the same mascot reads as off-putting rather than welcoming.",
  },
  {
    kind: "Icon",
    glyph: "✓",
    label: "Check mark",
    why: "A check means correct in the US. In Japan and Korea a circle (○) means correct and a check often marks what is wrong, so a green check on a field can signal the opposite of valid.",
  },
  {
    kind: "Emoji",
    glyph: "👍",
    label: "Thumbs-up",
    why: "In the US the thumbs-up means great. In parts of the Middle East, West Africa, and Greece it is a rude gesture, close to a raised middle finger, so the same reaction can insult the reader.",
  },
];

const COLOR_SWATCHES = [
  { glyph: "🔴", label: "Red = Danger" },
  { glyph: "🟢", label: "Green = Success" },
  { glyph: "🔵", label: "Blue = Info" },
];
const COLOR_WHY =
  "Those pairings are a Western UI convention, not a fact. In China red means luck and celebration, the color of weddings and New Year money. East Asian stock tickers flip the pair outright: red marks a price going up and green a price going down, the reverse of Wall Street, so a red up-arrow reassures one user and alarms another.";
const COLOR_RULE =
  "Never carry meaning with color alone. Pair it with a label or icon, and test semantic colors per market. Red and green pairs also fail the roughly 1 in 12 men with color-vision deficiency.";

export function FlagsRuleDemo() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={styles.stack}>
      {/* 1. Flags */}
      <div className={`workDemoCard ${styles.demo}`}>
        <h3 className={styles.partTitle}>Flags</h3>

        <section className={styles.section}>
          <div className={styles.verdictRow}>
            <p className={styles.verdict} data-kind="do">
              <span aria-hidden="true">✓</span> Do
            </p>
            <p className={styles.label}>When to use a flag: for a country</p>
          </div>
          <div className={styles.pillRow}>
            <span className={styles.pill}>🇺🇸 +1 (555) 019-2834</span>
          </div>
          <p className={styles.caption}>{F.doRule}</p>
          <p className={styles.caption}>{F.disputedNote}</p>
        </section>

        <hr className={styles.divider} />

        <section className={styles.section}>
          <div className={styles.verdictRow}>
            <p className={styles.verdict} data-kind="dont">
              <span aria-hidden="true">✗</span> Don&rsquo;t
            </p>
            <p className={styles.label}>When not to use a flag: for a language</p>
          </div>

          <p className={styles.kind}>Which flag is Spanish?</p>
          <button type="button" className={styles.button} onClick={() => setRevealed((v) => !v)}>
            {revealed ? "Hide" : "Reveal"} candidate flags
          </button>
          {revealed ? (
            <>
              <div className={styles.pillRow}>
                {F.spanishCountries.map((country) => (
                  <span key={country} className={`${styles.pill} ${styles.ambiguous}`}>
                    {country}
                  </span>
                ))}
              </div>
              <p className={`${styles.resultLine} ${styles.broken}`} aria-live="polite">
                {F.spanishWhy}
              </p>
            </>
          ) : null}

          <p className={styles.kind}>One country, four languages: Switzerland</p>
          <div className={styles.pillRow}>
            {F.switzerland.languages.map((lang) => (
              <span key={lang} className={styles.pill}>
                {lang}
              </span>
            ))}
          </div>
          <p className={styles.caption}>{F.switzerland.note}</p>
        </section>
      </div>

      {/* 2. Imagery, icons and emojis */}
      <div className={`workDemoCard ${styles.demo}`}>
        <h3 className={styles.partTitle}>Imagery, icons and emojis</h3>
        <p className={styles.caption}>
          What looks neutral in one market can confuse or offend in another. Three examples, and why
          each backfires:
        </p>
        {IMAGERY.map((ex) => (
          <section key={ex.label} className={styles.example}>
            <div className={styles.visual}>
              {ex.image ? (
                <Image
                  src={ex.image.src}
                  alt={ex.label}
                  width={ex.image.width}
                  height={ex.image.height}
                  className={styles.visualImg}
                  sizes="120px"
                />
              ) : (
                <span className={styles.visualGlyph} aria-hidden="true">
                  {ex.glyph}
                </span>
              )}
            </div>
            <div className={styles.exampleBody}>
              <p className={styles.kind}>{ex.kind}</p>
              <p className={styles.exampleLabel}>{ex.label}</p>
              <p className={styles.caption}>{ex.why}</p>
            </div>
          </section>
        ))}
      </div>

      {/* 3. Colors */}
      <div className={`workDemoCard ${styles.demo}`}>
        <h3 className={styles.partTitle}>Colors</h3>
        <p className={styles.label}>✗ Semantic colors are a convention, not a universal</p>
        <div className={styles.pillRow}>
          {COLOR_SWATCHES.map((swatch) => (
            <span key={swatch.label} className={styles.pill}>
              {swatch.glyph} {swatch.label}
            </span>
          ))}
        </div>
        <p className={styles.caption}>{COLOR_WHY}</p>
        <p className={styles.caption}>{COLOR_RULE}</p>
      </div>
    </div>
  );
}
