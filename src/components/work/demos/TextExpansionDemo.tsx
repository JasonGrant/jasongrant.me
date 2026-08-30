"use client";

import classNames from "classnames";
import { useId, useMemo, useState } from "react";
import styles from "./TextExpansionDemo.module.css";
import { TEXT_EXPANSION_FACTS as F } from "./facts";

function tierFor(chars: number): { reserve: string; percent: number } {
  const idx = F.tiers.findIndex((t) => chars <= t.maxChars);
  const tier = F.tiers[idx === -1 ? F.tiers.length - 1 : idx];
  // Visual fill relative to the widest tier (300%) purely for the bar's scale.
  const percent = (Number.parseInt(tier.reserve, 10) / 300) * 100;
  return { reserve: tier.reserve, percent };
}

export function TextExpansionDemo() {
  const [truncateAt, setTruncateAt] = useState<number>(F.pair.deChars);
  const [sampleString, setSampleString] = useState<string>(F.pair.en);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipId = useId();

  const truncated = F.pair.de.slice(0, truncateAt);
  const misread = truncateAt <= F.truncatedMeaningChange.truncated.length;

  const tier = useMemo(() => tierFor(sampleString.length), [sampleString]);

  const resultText = misread
    ? `At this width, the label misreads as "${F.truncatedMeaningChange.misreadsAs}" — the meaning silently changed.`
    : "Full meaning intact at this width.";

  return (
    <div className={styles.demo}>
      <div className={styles.pairRow}>
        <p>
          <span className={styles.lang}>EN</span>
          {F.pair.en} <span>· {F.pair.enChars} chars</span>
        </p>
        <p>
          <span className={styles.lang}>DE</span>
          {F.pair.de}{" "}
          <span>
            · {F.pair.deChars} chars (+{Math.round((F.pair.deChars / F.pair.enChars - 1) * 100)}%)
          </span>
        </p>
      </div>

      <hr className={styles.divider} />

      <div>
        <label htmlFor="truncate-slider" className={styles.sliderRow}>
          Button width
          <input
            id="truncate-slider"
            type="range"
            min={10}
            max={F.pair.deChars}
            value={truncateAt}
            onChange={(e) => setTruncateAt(Number(e.target.value))}
          />
          <span>{truncateAt} chars</span>
        </label>
        <div className={styles.buttonPreviewRow}>
          <span
            className={styles.buttonPreview}
            // min(..., 100%) so the simulated fixed-width button never exceeds
            // its container on narrow viewports (no horizontal page scroll).
            style={{ maxWidth: `min(${Math.max(120, truncateAt * 7)}px, 100%)` }}
          >
            {truncated}
          </span>
          <span className={styles.tooltip}>
            <button
              type="button"
              className={styles.tooltipTrigger}
              aria-describedby={tooltipId}
              onFocus={() => setTooltipOpen(true)}
              onBlur={() => setTooltipOpen(false)}
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
              onClick={() => setTooltipOpen((v) => !v)}
            >
              ⓘ
            </button>
            {tooltipOpen ? (
              <span id={tooltipId} role="tooltip" className={styles.tooltipBody}>
                {F.pair.de}
              </span>
            ) : (
              <span id={tooltipId} className={styles.srOnly}>
                {F.pair.de}
              </span>
            )}
          </span>
        </div>
      </div>

      <p className={classNames(styles.resultLine, misread && styles.broken)} aria-live="polite">
        {resultText}
      </p>

      <hr className={styles.divider} />

      <div className={styles.calcRow}>
        <label htmlFor="expansion-calc">Plan for expansion — type any UI string</label>
        <input
          id="expansion-calc"
          className={styles.calcInput}
          type="text"
          value={sampleString}
          onChange={(e) => setSampleString(e.target.value)}
        />
        <p className={styles.resultLine} aria-live="polite">
          {sampleString.length} chars → reserve {tier.reserve} width. {F.spareSpaceRule}
        </p>
        <div className={styles.tierBar}>
          <div className={styles.tierFill} style={{ width: `${tier.percent}%` }} />
        </div>
      </div>

      <p style={{ fontSize: "var(--fs-meta)", color: "var(--ink-mute)" }}>{F.frenchLaunchStat}</p>
    </div>
  );
}
