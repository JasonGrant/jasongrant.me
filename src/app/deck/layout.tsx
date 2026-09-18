import "@/components/work/replica/replica-tokens.css";
import "@/components/deck/deck-global.css";
import type { Metadata } from "next";
import styles from "./layout.module.css";

// The presentation deck's own root (feature 008). None of the site chrome
// (BackgroundFX, TopBar, LeftRail, Footer, CommandPalette, ClickTracker)
// mounts here — those all live in (main)'s and /work's own layouts, never
// the shared root. Metadata is overridden so no deck page is indexed,
// archived, snippeted, or carries a social card; the root layout's default
// (index: true) would otherwise win (constitution v1.3.0 unlisted-deck
// exception; contracts/routes.md).
export const metadata: Metadata = {
  title: { absolute: "Deck" },
  robots: { index: false, follow: false, noarchive: true, nosnippet: true, noimageindex: true },
  openGraph: null,
  twitter: null,
};

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return <main className={styles.main}>{children}</main>;
}
