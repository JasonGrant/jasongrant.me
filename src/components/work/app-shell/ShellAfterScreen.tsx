import Image from "next/image";
import styles from "./ShellAfterScreen.module.css";

// ShellAfterScreen — a real screenshot of the shipped shell (Jason's own demo
// account, seeded with this study's fictional cast — no third-party data;
// cleared by Jason for this unlisted route under the constitution's
// owner-cleared-real-artifact exception, consistent with research D8a).
// Replaces an earlier from-scratch recreation for the same reason the
// "before" figure moved to real screenshots: an authentic capture carries
// the shell's real density in a way a static illustration couldn't.
export function ShellAfterScreen() {
  return (
    <figure className={styles.frame}>
      <Image
        src="/work/app-shell/shell-after-inbox.png"
        alt="The redesigned Hi Marley shell: a collapsed icon rail on the far left, the inbox and case thread in the center, and on the right a vertical icon strip beside a full-height Details panel showing Customer Information, Case Details, and Incident Details for one case."
        width={3600}
        height={2084}
        className={styles.img}
        sizes="(min-width: 900px) 1080px, 100vw"
      />
    </figure>
  );
}
