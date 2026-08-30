import type { OrgSettingsAnchorId, PersonalSettingsAnchorId } from "@/content/studies/types";
import { FieldRow } from "./FieldRow";
import { PreviewCard } from "./PreviewCard";
import styles from "./SettingsPanel.module.css";
import { Toast } from "./Toast";

type Anchor = OrgSettingsAnchorId | PersonalSettingsAnchorId;

const LOCALE_BY_FORMAT: Record<string, string> = {
  "United States": "en-US",
  France: "fr-FR",
  Germany: "de-DE",
  Spain: "es-ES",
};

const SAMPLE_DATE = new Date(2026, 8, 15);
const SAMPLE_NUMBER = 5123456.59;
const SAMPLE_CURRENCY = 145.79;

export interface SettingsPanelProps {
  screen: "org-settings" | "personal-settings";
  languageValue: string;
  formatValue: string;
  localizationLanguages?: string[];
  highlighted: Anchor | null;
  toast: string | null;
}

// org-settings and personal-settings share this component, parameterized by
// `screen` — org-settings additionally exposes the localization-languages
// selector (FR-020). Structurally identical to Jason's real Klaviyo settings
// pattern; all copy here is generic/fictional (FR-007).
export function SettingsPanel({
  screen,
  languageValue,
  formatValue,
  localizationLanguages = [],
  highlighted,
  toast,
}: SettingsPanelProps) {
  const isOrg = screen === "org-settings";
  const languageAnchor: Anchor = isOrg ? "business-language-select" : "personal-language-select";
  const formatAnchor: Anchor = isOrg ? "business-format-select" : "personal-format-select";
  const locale = LOCALE_BY_FORMAT[formatValue] ?? "en-US";

  const previewRows = [
    {
      label: "Date",
      value: new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(SAMPLE_DATE),
    },
    { label: "Number", value: new Intl.NumberFormat(locale).format(SAMPLE_NUMBER) },
    {
      label: "Currency",
      value: new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }).format(
        SAMPLE_CURRENCY,
      ),
    },
  ];

  return (
    <div className="replicaFrame">
      <div className={styles.panel}>
        <FieldRow
          label={isOrg ? "Business language" : "Personal language"}
          anchor={languageAnchor}
          highlighted={highlighted === languageAnchor}
          help={isOrg ? "Default for every new teammate." : "Only your account uses this language."}
        >
          <select className={styles.select} disabled value={languageValue} onChange={() => {}}>
            <option>{languageValue}</option>
          </select>
        </FieldRow>

        <FieldRow
          label={isOrg ? "Business format" : "Personal format"}
          anchor={formatAnchor}
          highlighted={highlighted === formatAnchor}
          help="Sets number, date, and currency formatting."
        >
          <select className={styles.select} disabled value={formatValue} onChange={() => {}}>
            <option>{formatValue}</option>
          </select>
        </FieldRow>

        {isOrg ? (
          <FieldRow
            label="Localization languages"
            anchor="localization-languages"
            highlighted={highlighted === "localization-languages"}
            help="Content can be translated into these languages."
          >
            <div className={styles.checkGroup}>
              {["French", "German", "Spanish"].map((lang) => (
                <label key={lang} className={styles.checkItem}>
                  <input type="checkbox" readOnly checked={localizationLanguages.includes(lang)} />
                  {lang}
                </label>
              ))}
            </div>
          </FieldRow>
        ) : null}

        <PreviewCard highlighted={highlighted === "preview-card"} rows={previewRows} />

        <div className={styles.saveRow}>
          <button
            type="button"
            className={styles.saveButton}
            data-anchor="save-button"
            data-highlighted={highlighted === "save-button"}
          >
            Save
          </button>
        </div>
      </div>
      <Toast message={toast} />
    </div>
  );
}
