import type { OrgSettingsAnchorId, PersonalSettingsAnchorId } from "@/content/studies/types";
import classNames from "classnames";
import styles from "./PreviewCard.module.css";

const ANCHOR: OrgSettingsAnchorId & PersonalSettingsAnchorId = "preview-card";

export interface PreviewCardProps {
  highlighted?: boolean;
  rows: { label: string; value: string }[];
}

// Fixed row heights + tabular-nums so a locale/format swap can never shift
// layout (research D10 CLS rule).
export function PreviewCard({ highlighted, rows }: PreviewCardProps) {
  return (
    <div
      data-anchor={ANCHOR}
      className={classNames(styles.card, highlighted && styles.highlighted)}
    >
      <p className={styles.label}>Preview</p>
      {rows.map((row) => (
        <div key={row.label} className={styles.row}>
          <span className={styles.label}>{row.label}</span>
          <span className={styles.value}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}
