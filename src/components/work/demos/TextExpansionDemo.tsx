"use client";

import classNames from "classnames";
import { type CSSProperties, useState } from "react";
import { TextExpansionButtons } from "./TextExpansionButtons";
import styles from "./TextExpansionDemo.module.css";
import { TextExpansionMenu } from "./TextExpansionMenu";
import { TEXT_EXPANSION_FACTS as F } from "./facts";

const SLIDER_MIN = 10;

export function TextExpansionDemo() {
  const [targetCode, setTargetCode] = useState<string>(F.targets[0].code);
  const [truncateAt, setTruncateAt] = useState<number>(F.targets[0].chars);
  const target = F.targets.find((t) => t.code === targetCode) ?? F.targets[0];

  function pickLanguage(code: string) {
    const next = F.targets.find((t) => t.code === code) ?? F.targets[0];
    setTargetCode(code);
    setTruncateAt(next.chars); // reset to the full label when switching
  }

  const atFull = truncateAt >= target.chars;
  // Slice to the slider's character budget and append an ellipsis to signal
  // the cut. At full width the whole label shows, so it never truncates there.
  const truncated = atFull ? target.string : `${target.string.slice(0, truncateAt)}…`;
  // The reading is the widest tier whose minChars fits the visible characters.
  const reading =
    target.readings.find((r) => truncateAt >= r.minChars) ??
    target.readings[target.readings.length - 1];
  const misread = !reading.intact;

  const resultText = reading.intact
    ? `Full meaning intact: the label reads “${reading.reads}.”`
    : `At ${truncateAt} chars it reads as “${reading.reads}” because ${reading.note}.`;

  const expansion = Math.round((target.chars / F.source.chars - 1) * 100);
  const sliderPct = ((truncateAt - SLIDER_MIN) / (target.chars - SLIDER_MIN)) * 100;

  return (
    <div className={styles.stack}>
      <div className={`workDemoCard ${styles.demo}`}>
        <section className={styles.block}>
          <h3 className={styles.blockTitle}>See it truncate</h3>

          <div className={styles.langRow}>
            <span className={styles.langMeta}>Language</span>
            <div className={styles.segmented} role="group" aria-label="Target language">
              {F.targets.map((t) => (
                <button
                  key={t.code}
                  type="button"
                  className={styles.seg}
                  aria-pressed={targetCode === t.code}
                  onClick={() => pickLanguage(t.code)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.pairRow}>
            <span className={styles.pairText}>
              <span className={styles.lang}>EN</span>
              {F.source.text}
            </span>
            <span className={styles.pairCount}>{F.source.chars} chars</span>
            <span className={styles.pairText}>
              <span className={styles.lang}>{target.code.toUpperCase()}</span>
              {target.string}
            </span>
            <span className={styles.pairCount}>
              {target.chars} chars (+{expansion}%)
            </span>
          </div>

          <div className={styles.field}>
            <div className={styles.fieldTop}>
              <label htmlFor="truncate-slider" className={styles.label}>
                Button width
              </label>
              <span className={styles.hint}>{truncateAt} chars</span>
            </div>
            <input
              id="truncate-slider"
              className={styles.slider}
              type="range"
              min={SLIDER_MIN}
              max={target.chars}
              value={truncateAt}
              onChange={(e) => setTruncateAt(Number(e.target.value))}
              style={{ "--fill": `${sliderPct}%` } as CSSProperties}
            />
          </div>

          <div className={styles.buttonRow}>
            <button type="button" className={styles.previewButton}>
              {truncated}
            </button>
            <button type="button" className={styles.cancelButton}>
              {target.cancel}
            </button>
          </div>

          <p className={classNames(styles.resultLine, misread && styles.broken)} aria-live="polite">
            {resultText}
          </p>
        </section>

        <hr className={styles.divider} />

        <section className={styles.block}>
          <h3 className={styles.blockTitle}>Plan for expansion</h3>

          <table className={styles.tierTable}>
            <thead>
              <tr>
                <th scope="col">Characters</th>
                <th scope="col">Max expansion</th>
                <th scope="col">Typical components</th>
              </tr>
            </thead>
            <tbody>
              {F.tiers.map((t) => (
                <tr key={t.label}>
                  <th scope="row">{t.label}</th>
                  <td>{t.reserve}</td>
                  <td>{t.components}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <TextExpansionButtons />
      <TextExpansionMenu />
    </div>
  );
}
