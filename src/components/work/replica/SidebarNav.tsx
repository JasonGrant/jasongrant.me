import type { SidebarBreakAnchorId } from "@/content/studies/types";
import classNames from "classnames";
import styles from "./SidebarNav.module.css";

const CTA_ANCHOR: SidebarBreakAnchorId = "cta-button";
const SENTENCE_ANCHOR: SidebarBreakAnchorId = "inline-sentence";
const STAT_ANCHOR: SidebarBreakAnchorId = "stat-value";

export interface SidebarNavProps {
  brand: string;
  navItems: string[];
  ctaText: string;
  ctaBroken?: boolean;
  sentencePrefix: string;
  controlValue: string;
  sentenceSuffix: string;
  sentenceBroken?: boolean;
  statLabel: string;
  statValue: string;
  statBroken?: boolean;
}

// The "sidebar-break" replica screen — used directly by LanguageBreakDemo
// (a direct-manipulation concept demo, not a WalkthroughSegment), so its
// anchors are never compile-checked against a WalkthroughStep target.
export function SidebarNav({
  brand,
  navItems,
  ctaText,
  ctaBroken,
  sentencePrefix,
  controlValue,
  sentenceSuffix,
  sentenceBroken,
  statLabel,
  statValue,
  statBroken,
}: SidebarNavProps) {
  return (
    <div className={classNames("replicaFrame", styles.frame)}>
      <nav className={styles.nav} aria-label="Meridian navigation (recreation)">
        <div className={styles.brand}>▦ {brand}</div>
        {navItems.map((item) => (
          <span key={item} className={styles.navItem}>
            {item}
          </span>
        ))}
        <div className={styles.ctaSlot}>
          <span
            data-anchor={CTA_ANCHOR}
            className={classNames(styles.cta, ctaBroken && styles.broken)}
          >
            {ctaText}
          </span>
        </div>
      </nav>
      <div className={styles.main}>
        <p
          data-anchor={SENTENCE_ANCHOR}
          className={classNames(styles.sentence, sentenceBroken && styles.broken)}
        >
          {sentencePrefix}{" "}
          <select disabled aria-label="send timing" defaultValue={controlValue}>
            <option>{controlValue}</option>
          </select>{" "}
          {sentenceSuffix}
        </p>
        <p
          data-anchor={STAT_ANCHOR}
          className={classNames(styles.stat, statBroken && styles.broken)}
        >
          {statLabel}: {statValue}
        </p>
      </div>
    </div>
  );
}
