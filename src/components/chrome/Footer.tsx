import { ArrowOut } from "@/components/primitives/ArrowOut";
import { site } from "@/content/site";
import { CmdKTrigger } from "./CmdKTrigger";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.links} aria-label="Elsewhere">
        <a href={site.socials.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={site.socials.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={site.socials.substack} target="_blank" rel="noreferrer">
          Substack
        </a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </nav>
      <div className={styles.buildCredit}>
        <span>{site.buildCredit.footer}</span>
        <a href={site.github} target="_blank" rel="noreferrer">
          source on GitHub
          <ArrowOut />
        </a>
        <span className={styles.sep}> · </span>
        <CmdKTrigger className={styles.cmdkTrigger} />
      </div>
      <div className={styles.right}>
        <div className={styles.sig}>© 2026</div>
      </div>
    </footer>
  );
}
