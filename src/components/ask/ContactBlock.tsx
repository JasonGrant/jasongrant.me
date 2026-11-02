import { ask } from "@/content/ask";
import { site } from "@/content/site";
import styles from "./ask.module.css";

/** The site's contact call to action. One block, wherever it appears; it never reads as an error. */
export function ContactBlock({ lead }: { lead?: string | null }) {
  return (
    <p className={styles.contact}>
      {lead ? <span className={styles.contactLead}>{lead}</span> : null}
      {ask.lines.contact} <a href={`mailto:${site.email}`}>{site.email}</a>
    </p>
  );
}
