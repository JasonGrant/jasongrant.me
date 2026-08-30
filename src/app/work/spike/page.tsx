import type { Metadata } from "next";
import { BespokeOrgSettings } from "./_components/BespokeOrgSettings";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Replica craft spike",
  robots: { index: false, follow: false },
};

// Bespoke replica-kit reference (noindex): the crafted card + the accessible
// Nord/Graphite-style Dropdown, standalone and fully interactive. The real
// study at /work/internationalization uses the same system, player-driven.
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
