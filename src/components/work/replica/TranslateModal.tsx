"use client";

import type { EmailEditorAnchorId } from "@/content/studies/types";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import styles from "./TranslateModal.module.css";

export interface TranslateModalState {
  open: boolean;
  audienceBreakdown: { language: string; percent: number }[];
  /** Must be a subset of org-settings' selected localization languages
   *  (FR-021 continuity — enforced by the step reducer, not this component). */
  checkedLanguages: string[];
  translationRows: { source: string; translated: string }[];
  stale: boolean;
}

export interface TranslateModalProps {
  state: TranslateModalState;
  highlighted: EmailEditorAnchorId | null;
}

export function TranslateModal({ state, highlighted }: TranslateModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <div className={styles.overlay}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Translate email"
        tabIndex={-1}
      >
        <div className={styles.closeRow}>
          <button type="button" data-anchor="modal-close" className={styles.closeButton}>
            Close
          </button>
        </div>

        <div
          data-anchor="audience-breakdown"
          className={classNames(
            styles.section,
            highlighted === "audience-breakdown" && styles.highlighted,
          )}
        >
          <p className={styles.sectionLabel}>Audience preferred language</p>
          {state.audienceBreakdown.map((row) => (
            <div key={row.language} className={styles.breakdownRow}>
              <span>{row.language}</span>
              <span>{row.percent}%</span>
            </div>
          ))}
        </div>

        <div
          data-anchor="language-checklist"
          className={classNames(
            styles.section,
            highlighted === "language-checklist" && styles.highlighted,
          )}
        >
          <p className={styles.sectionLabel}>Translate to</p>
          {state.audienceBreakdown.map((row) => (
            <label key={row.language} className={styles.breakdownRow}>
              <input
                type="checkbox"
                readOnly
                checked={state.checkedLanguages.includes(row.language)}
              />
              {row.language}
            </label>
          ))}
          <p className={styles.hint}>
            Only languages selected in Organization settings are offered.
          </p>
        </div>

        <div
          data-anchor="translation-row"
          className={classNames(
            styles.section,
            highlighted === "translation-row" && styles.highlighted,
          )}
        >
          <p className={styles.sectionLabel}>Review, side by side</p>
          <table className={styles.table}>
            <tbody>
              {state.translationRows.map((row) => (
                <tr key={row.source}>
                  <td>{row.source}</td>
                  <td>
                    {row.translated}
                    {state.stale ? <span className={styles.staleBadge}>STALE</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.retranslateRow}>
          <button
            type="button"
            data-anchor="retranslate-button"
            className={styles.retranslateButton}
          >
            Retranslate
          </button>
        </div>
      </div>
    </div>
  );
}
