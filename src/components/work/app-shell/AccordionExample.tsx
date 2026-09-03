"use client";

import classNames from "classnames";
import { useState } from "react";
import styles from "./AccordionExample.module.css";

// Interactive illustration for "The problem" section: Details and Manage are
// the shell's two tabs (side by side, matching the real product); every
// other category is an accordion row stacked beneath them. The segmented
// control lets a visitor grow that list — 5 → 7 → 8 → 9 — to see how little
// space survives. Direct manipulation, instant state change, no autoplay
// (constitution concept-demo rules; research D6a) — server-renders the
// 5-category default, so no-JS readers still see the real, sourced 62%
// figure the study cites; the control simply does nothing without JS.

type CategoryCount = 5 | 7 | 8 | 9;

const COUNTS: readonly CategoryCount[] = [5, 7, 8, 9];

// Rows beyond Details/Manage (which live in the fixed tab row, not here).
// The base three exist at every count; each larger count adds the rows
// named for it, per Jason's own sequencing.
const BASE_ROWS = ["FNOL", "Media", "Notes"];
const EXTRA_ROWS: Record<CategoryCount, string[]> = {
  5: [],
  7: ["Case Progress", "Partner Data"],
  8: ["Case Progress", "Partner Data", "Workflows"],
  9: ["Case Progress", "Partner Data", "Workflows", "Assistants"],
};

// 62% at 5 categories is Jason's own sourced figure (PPTX, "Proposed Right
// Bar Change — Before"). 7 and 9 categories' header cost is separately
// sourced from his release-preview deck (5/7/9 sections consume 54%/75%/97%
// of a fixed panel — a consistent ~10.75-point cost per added category).
// Applying that same per-category cost to the 62% anchor gives 7→40%,
// 8→30%, 9→19%; 8 has no separate source and sits on the same line between
// 7 and 9. See research D8b.
const AVAILABLE_PCT: Record<CategoryCount, number> = {
  5: 62,
  7: 40,
  8: 30,
  9: 19,
};

export function AccordionExample() {
  const [count, setCount] = useState<CategoryCount>(5);
  const rows = [...BASE_ROWS, ...EXTRA_ROWS[count]];
  const available = AVAILABLE_PCT[count];
  const headersShare = 100 - available;

  return (
    <figure className={styles.root}>
      <div className={styles.controlRow}>
        <p className={styles.eyebrow}>Right panel, before</p>
        <div className={styles.segmented} role="radiogroup" aria-label="Data categories">
          {COUNTS.map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={count === n}
              className={classNames(styles.segment, count === n && styles.segmentOn)}
              onClick={() => setCount(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.frame} aria-hidden="true">
        <div className={styles.tabRow}>
          <span className={styles.tab}>Details</span>
          <span className={styles.tab}>Manage</span>
        </div>
        <div className={styles.accordionStack} style={{ flexGrow: headersShare }}>
          {rows.map((label) => (
            <div className={styles.headerBar} key={label}>
              {label}
            </div>
          ))}
        </div>
        <div className={styles.contentSliver} style={{ flexGrow: available }}>
          <span className={styles.frameTag}>selected category</span>
        </div>
      </div>

      <div aria-live="polite">
        <p className={styles.figure}>{available}%</p>
        <p className={styles.label}>available for details</p>
        <p className={styles.note}>{count} data categories, one panel</p>
      </div>
    </figure>
  );
}
