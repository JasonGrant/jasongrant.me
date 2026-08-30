import type { Metadata } from "next";
import { BespokeOrgSettings } from "./_components/BespokeOrgSettings";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Replica craft spike",
  robots: { index: false, follow: false },
};

// Bespoke replica craft iteration surface (noindex, throwaway). The
// bespoke-vs-shadcn comparison is resolved (bespoke chosen); shadcn source
// stays under _ui/ _components/ShadcnOrgSettings until the final rip-out.
export default function SpikePage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>Craft spike</p>
        <h1>Replica craft — bespoke direction</h1>
        <p>
          Warm-tinted light UI that pops on the dark site: Nord/Graphite calm at Linear density,
          Porsche-grade state detail, a Nord-style custom dropdown, and a blue-leaning teal derived
          from the site accent. Source under <code>src/app/work/spike/_components/</code>.
        </p>
      </div>
      <div className={styles.solo}>
        <div className={styles.stage}>
          <BespokeOrgSettings />
        </div>
      </div>
    </div>
  );
}
