import type { Metadata } from "next";
import { BespokeOrgSettings } from "./_components/BespokeOrgSettings";
import { ShadcnOrgSettings } from "./_components/ShadcnOrgSettings";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Replica craft spike",
  robots: { index: false, follow: false },
};

// Throwaway comparison spike (not a registered study; noindex). Renders the
// org-settings replica two ways so the bespoke-vs-shadcn craft + source can
// be judged side by side. Delete once the paradigm is chosen.
export default function SpikePage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>Craft spike</p>
        <h1>Replica craft: bespoke vs shadcn</h1>
        <p>
          The same org-settings replica, built two ways, on the real site background. Judge the
          pixels here; the source lives under <code>src/app/work/spike/_components/</code>.
        </p>
      </div>
      <div className={styles.grid}>
        <div className={styles.col}>
          <span className={styles.colLabel}>
            <b>Bespoke</b> — CSS Modules
          </span>
          <div className={styles.stage}>
            <BespokeOrgSettings />
          </div>
        </div>
        <div className={styles.col}>
          <span className={styles.colLabel}>
            <b>shadcn</b> — Tailwind + Radix
          </span>
          <div className={styles.stage}>
            <ShadcnOrgSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
