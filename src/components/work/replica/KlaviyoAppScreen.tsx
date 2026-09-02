import type { SidebarBreakAnchorId } from "@/content/studies/types";
import classNames from "classnames";
import Image from "next/image";
import {
  FiBarChart2,
  FiBell,
  FiChevronDown,
  FiFileText,
  FiHome,
  FiMessageSquare,
  FiSearch,
  FiSend,
  FiShare2,
  FiUsers,
} from "react-icons/fi";
import { TEXT_EXPANSION_FACTS } from "../demos/facts";
import styles from "./KlaviyoAppScreen.module.css";

const CTA_ANCHOR: SidebarBreakAnchorId = "cta-button";
const SENTENCE_ANCHOR: SidebarBreakAnchorId = "inline-sentence";
const STAT_ANCHOR: SidebarBreakAnchorId = "stat-value";

const NAV = [
  { icon: FiHome, en: "Home", de: "Start" },
  { icon: FiSend, en: "Campaigns", de: "Kampagnen" },
  { icon: FiShare2, en: "Flows", de: "Flows" },
  { icon: FiUsers, en: "Audience", de: "Zielgruppe" },
  { icon: FiFileText, en: "Content", de: "Inhalte" },
  { icon: FiBarChart2, en: "Analytics", de: "Analysen" },
  { icon: FiMessageSquare, en: "Conversations", de: "Unterhaltungen" },
];
const ACTIVE = "Flows";

// A sanitized recreation of the Klaviyo app used only by the LanguageBreakDemo
// on the unlisted /work case study (constitution v1.2.4: real branding is
// permitted on unlisted, noindexed routes; all data here is fictional). The
// three data-anchor elements are the ones that break in German.
export function KlaviyoAppScreen({ broken }: { broken: boolean }) {
  const t = (en: string, de: string) => (broken ? de : en);
  return (
    <div className={classNames("replicaFrame", styles.app)} lang={broken ? "de" : "en"}>
      <header className={styles.topbar}>
        <Image
          src="/trademarks/klaviyo-mark.png"
          alt="Klaviyo"
          width={95}
          height={29}
          className={styles.logo}
        />
        <span className={styles.search}>
          <FiSearch aria-hidden="true" />
          {t("Search for someone…", "Nach jemandem suchen…")}
        </span>
        <span className={styles.topRight}>
          <FiBell className={styles.bell} aria-hidden="true" />
          <span className={styles.upgrade}>{t("Upgrade", "Upgrade")}</span>
          <span className={styles.topLink}>{t("Support", "Support")}</span>
          <span className={styles.topLink}>{t("Blog", "Blog")}</span>
        </span>
      </header>

      <div className={styles.body}>
        <nav className={styles.sidebar} aria-label={t("Primary", "Primär")}>
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <span
                key={item.en}
                className={classNames(styles.navItem, item.en === ACTIVE && styles.navActive)}
              >
                <Icon aria-hidden="true" />
                <span className={styles.navLabel}>{t(item.en, item.de)}</span>
              </span>
            );
          })}
          <span className={styles.account}>
            <span className={styles.avatar} aria-hidden="true" />
            <span className={styles.accountText}>
              <span>{t("Company…", "Firma…")}</span>
              <span className={styles.accountEmail}>name@email.com</span>
            </span>
            <FiChevronDown aria-hidden="true" />
          </span>
        </nav>

        <main className={styles.content}>
          <h4 className={styles.pageTitle}>{t("Flows", "Flows")}</h4>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.cardTitle}>
                {t("Abandoned cart", "Abgebrochener Warenkorb")}
              </span>
              <span className={styles.markCta}>
                {broken ? <span className={styles.badge}>1</span> : null}
                <span data-anchor={CTA_ANCHOR} className={styles.cta}>
                  {broken
                    ? "Erstellen Sie einen Ablauf für abgebrochene Warenkörbe"
                    : TEXT_EXPANSION_FACTS.source.text}
                </span>
              </span>
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>{t("Timing", "Zeitpunkt")}</span>
              <span className={classNames(styles.mark, broken && styles.markPad)}>
                {broken ? <span className={styles.badge}>2</span> : null}
                <p data-anchor={SENTENCE_ANCHOR} className={styles.sentence}>
                  {t("Send", "Senden")}{" "}
                  <select
                    disabled
                    aria-label={t("send timing", "Sendezeitpunkt")}
                    defaultValue="now"
                  >
                    <option value="now">{t("immediately", "sofort")}</option>
                  </select>{" "}
                  {t("after signup", "nach der Registrierung")}
                </p>
              </span>
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>
                {t("Monthly sends", "Monatliche Sendungen")}
              </span>
              <span className={classNames(styles.mark, broken && styles.markPad)}>
                {broken ? <span className={styles.badge}>3</span> : null}
                <span data-anchor={STAT_ANCHOR} className={styles.stat}>
                  5,123,456.59
                </span>
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
