import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.headline}>This page doesn&rsquo;t exist.</h1>
      <p className={styles.intro}>
        Probably a moved link. The site has three pages — home, experience, and writing — plus a
        colophon.
      </p>
      <Link href="/" className={styles.back}>
        ← Back home
      </Link>
    </main>
  );
}
