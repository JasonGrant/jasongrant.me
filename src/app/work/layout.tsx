import "@/components/work/replica/replica-tokens.css";
import Link from "next/link";
import styles from "./layout.module.css";

// Deliberately no imports from src/app/(main) — TopBar, LeftRail,
// CommandPalette, Footer, and BackgroundFX never load on /work routes
// (research D1). Robots metadata is per-study, not set here — see
// src/app/work/[slug]/page.tsx generateMetadata (research D3).
export default function WorkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.wrap}>
      <a href="#work-main" className={styles.skipLink}>
        Skip to content
      </a>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark}>
          Jason Grant
        </Link>
      </header>
      <main id="work-main" className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <Link href="/">← jasongrant.me</Link>
      </footer>
    </div>
  );
}
