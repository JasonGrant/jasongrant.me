import classNames from "classnames";
import Image from "next/image";
import type { ReactNode } from "react";
import { FiArrowLeft, FiSettings } from "react-icons/fi";
import styles from "./CampaignTopBar.module.css";

export type CampaignStep = { id: string; state: "done" | "active" | "todo" };

export interface CampaignTopBarProps {
  campaign: string;
  stepLabel: string;
  steps: CampaignStep[];
  /** Right-side default is "Last saved: … · settings · Exit · Next". */
  savedText?: string;
  showBack?: boolean;
  /** Replaces the default right-side actions entirely (e.g. the editor's
   *  Manage template / Translate / Next). */
  actions?: ReactNode;
}

// Shared dark chrome for the recreated Klaviyo campaign builder (fictional
// data). Each screen passes its own step state, label, and right-side actions.
export function CampaignTopBar({
  campaign,
  stepLabel,
  steps,
  savedText,
  showBack,
  actions,
}: CampaignTopBarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>
        {showBack ? <FiArrowLeft className={styles.back} aria-hidden="true" /> : null}
        <Image
          src="/trademarks/klaviyo-mark.png"
          alt="Klaviyo"
          width={95}
          height={29}
          className={styles.logo}
        />
        <span className={styles.campaign}>{campaign}</span>
      </div>

      <div className={styles.stepWrap}>
        <span className={styles.stepLabel}>{stepLabel}</span>
        <span className={styles.stepper} aria-hidden="true">
          {steps.map((s) => (
            <span
              key={s.id}
              className={classNames(
                styles.step,
                s.state === "done" && styles.stepDone,
                s.state === "active" && styles.stepActive,
              )}
            />
          ))}
        </span>
      </div>

      <div className={styles.actions}>
        {actions ?? (
          <>
            {savedText ? <span className={styles.saved}>Last saved: {savedText}</span> : null}
            <span className={styles.iconBtn} aria-hidden="true">
              <FiSettings />
            </span>
            <span className={styles.exitBtn}>Exit</span>
            <span className={styles.nextBtn}>Next</span>
          </>
        )}
      </div>
    </header>
  );
}
