"use client";

import type { OrgSettingsAnchorId, PersonalSettingsAnchorId } from "@/content/studies/types";
import { FiCheck, FiGlobe } from "react-icons/fi";
import { Dropdown } from "./Dropdown";
import { PreviewCard } from "./PreviewCard";
import styles from "./SettingsPanel.module.css";
import { Toast } from "./Toast";

type Anchor = OrgSettingsAnchorId | PersonalSettingsAnchorId;

const LOCALE_BY_FORMAT: Record<string, string> = {
  "United States": "en-US",
  France: "fr-FR",
  Germany: "de-DE",
};
const LANGUAGE_OPTIONS = ["English", "French", "German"];
const FORMAT_OPTIONS = ["United States", "France", "Germany"];
const LOCALIZATION_OPTIONS = ["French", "German", "Spanish", "Italian"];
const SAMPLE_DATE = new Date(2026, 8, 15);

export interface SettingsPanelProps {
  screen: "org-settings" | "personal-settings";
  languageValue: string;
  formatValue: string;
  localizationLanguages: string[];
  highlighted: Anchor | null;
  toast: string | null;
  /** When the guided tour is playing the card is display-only; otherwise the
   *  visitor operates it directly. */
  disabled: boolean;
  onLanguageChange: (v: string) => void;
  onFormatChange: (v: string) => void;
  onToggleLanguage: (lang: string) => void;
}

export function SettingsPanel({
  screen,
  languageValue,
  formatValue,
  localizationLanguages,
  highlighted,
  toast,
  disabled,
  onLanguageChange,
  onFormatChange,
  onToggleLanguage,
}: SettingsPanelProps) {
  const isOrg = screen === "org-settings";
  const languageAnchor: Anchor = isOrg ? "business-language-select" : "personal-language-select";
  const formatAnchor: Anchor = isOrg ? "business-format-select" : "personal-format-select";
  const locale = LOCALE_BY_FORMAT[formatValue] ?? "en-US";
  const currency = formatValue === "United States" ? "USD" : "EUR";

  const previewRows = [
    {
      label: "Date",
      value: new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(SAMPLE_DATE),
    },
    { label: "Number", value: new Intl.NumberFormat(locale).format(5123456.59) },
    {
      label: "Currency",
      value: new Intl.NumberFormat(locale, { style: "currency", currency }).format(145.79),
    },
  ];

  return (
    <div className="replicaFrame">
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <FiGlobe />
        </span>
        <div className={styles.headerText}>
          <h3>{isOrg ? "Localization" : "Language & region"}</h3>
          <p>
            {isOrg
              ? "Set the default language and formats for your organization."
              : "Your personal language and formats. Only your account is affected."}
          </p>
        </div>
      </div>

      <div className={styles.body}>
        <div
          data-anchor={languageAnchor}
          className={highlighted === languageAnchor ? `${styles.field} ${styles.hl}` : styles.field}
        >
          <div className={styles.fieldTop}>
            <span className={styles.label}>{isOrg ? "Business language" : "Language"}</span>
            <span className={styles.hint}>
              {isOrg ? "Default for new teammates" : "Only your account"}
            </span>
          </div>
          <Dropdown
            label={isOrg ? "Business language" : "Language"}
            value={languageValue}
            options={LANGUAGE_OPTIONS}
            onChange={onLanguageChange}
            disabled={disabled}
          />
        </div>

        <div
          data-anchor={formatAnchor}
          className={highlighted === formatAnchor ? `${styles.field} ${styles.hl}` : styles.field}
        >
          <div className={styles.fieldTop}>
            <span className={styles.label}>{isOrg ? "Business format" : "Regional format"}</span>
            <span className={styles.hint}>Numbers, dates, currency</span>
          </div>
          <Dropdown
            label={isOrg ? "Business format" : "Regional format"}
            value={formatValue}
            options={FORMAT_OPTIONS}
            onChange={onFormatChange}
            disabled={disabled}
          />
        </div>

        {isOrg ? (
          <div
            data-anchor="localization-languages"
            className={
              highlighted === "localization-languages"
                ? `${styles.field} ${styles.hl}`
                : styles.field
            }
          >
            <div className={styles.fieldTop}>
              <span className={styles.label}>Localization languages</span>
              <span className={styles.hint}>{localizationLanguages.length} selected</span>
            </div>
            <div className={styles.chips}>
              {LOCALIZATION_OPTIONS.map((lang) => {
                const on = localizationLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    className={styles.chip}
                    data-on={on}
                    aria-pressed={on}
                    disabled={disabled}
                    onClick={() => onToggleLanguage(lang)}
                  >
                    <span className={styles.chipDot}>{on ? <FiCheck /> : null}</span>
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className={styles.field}>
          <PreviewCard
            highlighted={highlighted === "preview-card"}
            region={formatValue}
            rows={previewRows}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.dirty}>Unsaved changes</span>
        <button
          type="button"
          className={styles.saveButton}
          data-anchor="save-button"
          data-highlighted={highlighted === "save-button"}
          disabled={disabled}
        >
          Save changes
        </button>
      </div>
      <Toast message={toast} />
    </div>
  );
}
