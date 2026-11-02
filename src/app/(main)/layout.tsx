import { AskJasonMount } from "@/components/ask/AskJasonMount";
import { BackgroundFX } from "@/components/chrome/BackgroundFX";
import { ClickTracker } from "@/components/chrome/ClickTracker";
import { CommandPalette } from "@/components/chrome/CommandPalette";
import { Footer } from "@/components/chrome/Footer";
import { LeftRail } from "@/components/chrome/LeftRail";
import { TopBar } from "@/components/chrome/TopBar";
import { ASK_JASON_MODE } from "@/lib/askJasonFlag";
import classNames from "classnames";
import styles from "./layout.module.css";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BackgroundFX />
      <LeftRail />
      <div
        className={classNames(
          styles.page,
          ASK_JASON_MODE === "on" && [styles.withAskBar, "ask-reserve"],
        )}
      >
        <TopBar />
        <main>{children}</main>
        <Footer />
      </div>
      <CommandPalette />
      <AskJasonMount />
      <ClickTracker />
    </>
  );
}
