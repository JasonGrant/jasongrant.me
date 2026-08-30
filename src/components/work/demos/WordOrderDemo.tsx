"use client";

import classNames from "classnames";
import { useState } from "react";
import styles from "./WordOrderDemo.module.css";
import { WORD_ORDER_FACTS as F } from "./facts";

export function WordOrderDemo() {
  const [lang, setLang] = useState<"en" | "de">("en");
  const broken = lang === "de";

  return (
    <div className={styles.demo}>
      <div className={styles.toggleRow} role="group" aria-label="Language">
        <button
          type="button"
          className={styles.toggle}
          aria-pressed={lang === "en"}
          onClick={() => setLang("en")}
        >
          EN
        </button>
        <button
          type="button"
          className={styles.toggle}
          aria-pressed={lang === "de"}
          onClick={() => setLang("de")}
        >
          DE
        </button>
      </div>

      <p className={classNames(styles.sentence, broken && styles.broken)}>
        {broken ? (
          <>
            {F.broken.prefix}{" "}
            <select disabled aria-label="timing value" defaultValue={F.broken.control}>
              <option>{F.broken.control}</option>
            </select>{" "}
            {F.broken.suffix}
          </>
        ) : (
          <>
            Send an email{" "}
            <select disabled aria-label="timing value" defaultValue="5 minutes">
              <option>5 minutes</option>
            </select>{" "}
            after signup
          </>
        )}
      </p>

      <p className={styles.resultLine} aria-live="polite">
        {broken
          ? "The control strands mid-sentence as the verb moves — this pattern breaks across languages with different word order."
          : "In English the embedded control reads fine, but that's not guaranteed once translated."}
      </p>

      <hr className={styles.divider} />

      <p className={styles.correctedLabel}>✓ Corrected pattern — {F.rule}</p>
      <div className={styles.correctedBlock}>
        <span>{F.corrected.label}</span>
        <select disabled aria-label="corrected timing value" defaultValue={F.corrected.control}>
          <option>{F.corrected.control}</option>
        </select>
      </div>
    </div>
  );
}
