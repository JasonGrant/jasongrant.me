import { BackgroundFX } from "@/components/chrome/BackgroundFX";
import { ClickTracker } from "@/components/chrome/ClickTracker";
import { CommandPalette } from "@/components/chrome/CommandPalette";
import { Footer } from "@/components/chrome/Footer";
import { LeftRail } from "@/components/chrome/LeftRail";
import { TopBar } from "@/components/chrome/TopBar";
import styles from "./layout.module.css";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BackgroundFX />
      <LeftRail />
      <div className={styles.page}>
        <TopBar />
        <main>{children}</main>
        <Footer />
      </div>
      <CommandPalette />
      <ClickTracker />
    </>
  );
}
