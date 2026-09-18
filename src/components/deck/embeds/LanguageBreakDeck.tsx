"use client";

import { KlaviyoAppScreen } from "@/components/work/replica/KlaviyoAppScreen";
import { useState } from "react";
import styles from "./LanguageBreakDeck.module.css";

// Deck-specific layout (copy-for-isolation from LanguageBreakDemo): the
// study page stacks the toggle, screen, and numbered list in one column,
// but the deck's wider stage has room to scale the screen up and move the
// numbered callouts beside it instead of below it. Reuses KlaviyoAppScreen
// (the actual mockup) and the same toggle behavior; the surrounding layout
// and the callout markup are the deck's own.
const ANNOTATIONS = [
  { key: "truncation", label: "Truncated button label" },
  { key: "word-order", label: "Control in wrong position with translation" },
  { key: "formatting", label: "Wrong number format" },
] as const;

// KlaviyoAppScreen's natural size at its own default (unscaled) width —
// measured, not intrinsic to the component — so the transform-scale below
// enlarges it uniformly instead of just stretching it wider.
const NATURAL_WIDTH = 980;
const NATURAL_HEIGHT = 395;
const SCALE = 1.3;

export function LanguageBreakDeck() {
  const [lang, setLang] = useState<"en" | "de">("en");
  const broken = lang === "de";

  return (
    <div className={styles.wrap}>
      <div className={styles.stageCol}>
        <div className={styles.controlRow}>
          <label htmlFor="deck-break-lang">Language</label>
          <select
            id="deck-break-lang"
            className={styles.select}
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "de")}
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
        <div
          className={styles.scaleOuter}
          style={{ width: NATURAL_WIDTH * SCALE, height: NATURAL_HEIGHT * SCALE }}
        >
          <div
            className={styles.scaleInner}
            style={{ width: NATURAL_WIDTH, transform: `scale(${SCALE})` }}
          >
            <KlaviyoAppScreen broken={broken} />
          </div>
        </div>
      </div>
      <div className={styles.calloutCol}>
        {broken ? (
          <ol className={styles.callouts}>
            {ANNOTATIONS.map((a, i) => (
              <li key={a.key} className={styles.callout}>
                <span className={styles.calloutNumber}>{i + 1}</span>
                <span className={styles.calloutLine} aria-hidden="true" />
                <span className={styles.calloutLabel}>{a.label}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className={styles.hint}>
            Switch the language above to see what a straight machine translation actually did to
            this product.
          </p>
        )}
      </div>
    </div>
  );
}
