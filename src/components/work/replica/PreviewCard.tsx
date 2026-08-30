import type { OrgSettingsAnchorId, PersonalSettingsAnchorId } from "@/content/studies/types";
import classNames from "classnames";
import styles from "./PreviewCard.module.css";

const ANCHOR: OrgSettingsAnchorId & PersonalSettingsAnchorId = "preview-card";

export interface PreviewCardProps {
  highlighted?: boolean;
  region?: string;
  rows: { label: string; value: string }[];
}

export function PreviewCard({ highlighted, region, rows }: PreviewCardProps) {
  return (
    <div
      data-anchor={ANCHOR}
      className={classNames(styles.card, highlighted && styles.highlighted)}
    >
      <p className={styles.head}>Preview{region ? ` · ${region}` : ""}</p>
      {rows.map((row) => (
        <div key={row.label} className={styles.row}>
          <span className={styles.label}>{row.label}</span>
          <span className={styles.value}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}
