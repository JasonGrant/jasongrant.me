"use client";

import { formatLocaleSamples } from "@/components/work/localeFormat";
import type { OrgSettingsAnchorId, PersonalSettingsAnchorId } from "@/content/studies/types";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ContentLanguagePicker } from "./ContentLanguagePicker";
import { Dropdown } from "./Dropdown";
import { PreviewCard } from "./PreviewCard";
import styles from "./SettingsPanel.module.css";
import { Toast } from "./Toast";
import { getOrgSettings, setOrgSettings, subscribeOrgSettings } from "./orgSettingsStore";

type Anchor = OrgSettingsAnchorId | PersonalSettingsAnchorId;

const LANGUAGE_OPTIONS = ["English", "French", "German"];
const FORMAT_OPTIONS = ["United States", "France", "Germany"];

// Business language -> UI language subtag. Drives the localized month name in
// the preview live, and — once saved — the panel's own chrome.
const LANG_SUBTAG: Record<string, string> = { English: "en", French: "fr", German: "de" };
// Regional format -> region locale. Intl does not cleanly separate language
// from region (fr-US still yields French grouping/order), so all number/date/
// currency formatting is driven by this region locale, never by the language.
const REGION_LOCALE: Record<string, string> = {
  "United States": "en-US",
  France: "fr-FR",
  Germany: "de-DE",
};
const CURRENCY_BY_FORMAT: Record<string, string> = {
  "United States": "USD",
  France: "EUR",
  Germany: "EUR",
};

interface Chrome {
  title: string;
  subtitleOrg: string;
  subtitlePersonal: string;
  langLabelOrg: string;
  langLabelPersonal: string;
  langHintOrg: string;
  langHintPersonal: string;
  formatLabelOrg: string;
  formatLabelPersonal: string;
  formatHint: string;
  locLabel: string;
  locDesc: string;
  searchPlaceholder: string;
  noMatches: string;
  allLanguages: string;
  selectLanguages: string;
  selected: string;
  preview: string;
  save: string;
  saved: string;
  savedDetailOrg: string;
  savedDetailPersonal: string;
  cancel: string;
  rowDateTime: string;
  rowShortDate: string;
  rowNumber: string;
  rowPercent: string;
  rowCurrency: string;
  rowCompact: string;
}

// Panel chrome, keyed by the saved business-language subtag. Saving a language
// applies it to the whole panel (the point of the setting). Draft option labels
// stay in their canonical English so the value mapping stays stable.
const CHROME: Record<string, Chrome> = {
  en: {
    title: "Localization",
    subtitleOrg: "Set the default language and formats for your organization.",
    subtitlePersonal: "Your personal language and formats. Only your account is affected.",
    langLabelOrg: "Business language",
    langLabelPersonal: "Language",
    langHintOrg: "Default for new teammates",
    langHintPersonal: "Only your account",
    formatLabelOrg: "Business regional format",
    formatLabelPersonal: "Regional format",
    formatHint: "Numbers, dates, currency",
    locLabel: "Content languages",
    locDesc:
      "For emails, SMS, and other customer content, which supports far more languages than the app interface.",
    searchPlaceholder: "Search languages",
    noMatches: "No matches",
    allLanguages: "All languages",
    selectLanguages: "Select languages",
    selected: "selected",
    preview: "Preview",
    save: "Save",
    saved: "Settings saved",
    savedDetailOrg: "Business language, regional format, and content languages updated.",
    savedDetailPersonal: "Language and regional format updated.",
    cancel: "Cancel",
    rowDateTime: "Date & time",
    rowShortDate: "Short date",
    rowNumber: "Number",
    rowPercent: "Percentage",
    rowCurrency: "Currency",
    rowCompact: "Compact",
  },
  fr: {
    title: "Localisation",
    subtitleOrg: "Définissez la langue et les formats par défaut de votre organisation.",
    subtitlePersonal: "Votre langue et vos formats personnels. Seul votre compte est concerné.",
    langLabelOrg: "Langue de l'organisation",
    langLabelPersonal: "Langue",
    langHintOrg: "Par défaut pour les nouveaux membres",
    langHintPersonal: "Votre compte uniquement",
    formatLabelOrg: "Format régional de l'organisation",
    formatLabelPersonal: "Format régional",
    formatHint: "Nombres, dates, devise",
    locLabel: "Langues de contenu",
    locDesc:
      "Pour les e-mails, SMS et autres contenus client, qui prennent en charge bien plus de langues que l'interface.",
    searchPlaceholder: "Rechercher une langue",
    noMatches: "Aucun résultat",
    allLanguages: "Toutes les langues",
    selectLanguages: "Sélectionner des langues",
    selected: "sélectionnée(s)",
    preview: "Aperçu",
    save: "Enregistrer",
    saved: "Paramètres enregistrés",
    savedDetailOrg: "Langue de l'organisation, format régional et langues de contenu mis à jour.",
    savedDetailPersonal: "Langue et format régional mis à jour.",
    cancel: "Annuler",
    rowDateTime: "Date et heure",
    rowShortDate: "Date courte",
    rowNumber: "Nombre",
    rowPercent: "Pourcentage",
    rowCurrency: "Devise",
    rowCompact: "Compact",
  },
  de: {
    title: "Lokalisierung",
    subtitleOrg: "Legen Sie die Standardsprache und -formate für Ihre Organisation fest.",
    subtitlePersonal: "Ihre persönliche Sprache und Formate. Nur Ihr Konto ist betroffen.",
    langLabelOrg: "Unternehmenssprache",
    langLabelPersonal: "Sprache",
    langHintOrg: "Standard für neue Teammitglieder",
    langHintPersonal: "Nur Ihr Konto",
    formatLabelOrg: "Regionales Format des Unternehmens",
    formatLabelPersonal: "Regionales Format",
    formatHint: "Zahlen, Daten, Währung",
    locLabel: "Inhaltssprachen",
    locDesc:
      "Für E-Mails, SMS und andere Kundeninhalte, die weit mehr Sprachen unterstützen als die Oberfläche.",
    searchPlaceholder: "Sprache suchen",
    noMatches: "Keine Treffer",
    allLanguages: "Alle Sprachen",
    selectLanguages: "Sprachen auswählen",
    selected: "ausgewählt",
    preview: "Vorschau",
    save: "Speichern",
    saved: "Einstellungen gespeichert",
    savedDetailOrg: "Unternehmenssprache, regionales Format und Inhaltssprachen aktualisiert.",
    savedDetailPersonal: "Sprache und regionales Format aktualisiert.",
    cancel: "Abbrechen",
    rowDateTime: "Datum und Uhrzeit",
    rowShortDate: "Kurzes Datum",
    rowNumber: "Zahl",
    rowPercent: "Prozentsatz",
    rowCurrency: "Währung",
    rowCompact: "Kompakt",
  },
};

function sameSet(a: string[], b: string[]) {
  return a.length === b.length && a.every((x) => b.includes(x));
}

// Localized display name for a language or region code, capitalized (French
// renders language names lowercase). Used for the Preview's language · region
// header, rendered in the previewed language.
function displayName(inLocale: string, code: string, type: "language" | "region"): string {
  try {
    const name = new Intl.DisplayNames([inLocale], { type }).of(code);
    if (!name) return code;
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return code;
  }
}

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
  onLanguageChange?: (v: string) => void;
  onFormatChange?: (v: string) => void;
  onToggleLanguage?: (lang: string) => void;
}

export function SettingsPanel({
  screen,
  languageValue,
  formatValue,
  localizationLanguages,
  highlighted,
  toast,
  disabled,
}: SettingsPanelProps) {
  const isOrg = screen === "org-settings";
  const languageAnchor: Anchor = isOrg ? "business-language-select" : "personal-language-select";
  const formatAnchor: Anchor = isOrg ? "business-format-select" : "personal-format-select";

  // Personal settings inherit the Organization panel's saved language + regional
  // format as their default, bridged through orgSettingsStore. Server + first
  // client snapshot is null, so there is no hydration mismatch.
  const orgStore = useSyncExternalStore(subscribeOrgSettings, getOrgSettings, () => null);
  const inheritedLang = orgStore?.lang ?? languageValue;
  const inheritedFmt = orgStore?.fmt ?? formatValue;

  // Draft = what the visitor is editing (drives the live preview).
  const [draftLang, setDraftLang] = useState(languageValue);
  const [draftFmt, setDraftFmt] = useState(formatValue);
  const [draftLangs, setDraftLangs] = useState<string[]>(localizationLanguages);
  // The Organization panel keeps its own last-saved baseline; a Personal panel
  // uses its override if the visitor set one, otherwise the inherited org default.
  const [orgCommitted, setOrgCommitted] = useState({
    lang: languageValue,
    fmt: formatValue,
    langs: localizationLanguages,
  });
  const [personalOverride, setPersonalOverride] = useState<{ lang: string; fmt: string } | null>(
    null,
  );
  // Save confirmation toast: a nonce (0 = hidden) that re-keys the element on
  // every save so its slide-in animation replays; a timer clears it.
  const [savedNonce, setSavedNonce] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );
  const committed = isOrg
    ? orgCommitted
    : {
        lang: personalOverride?.lang ?? inheritedLang,
        fmt: personalOverride?.fmt ?? inheritedFmt,
        langs: localizationLanguages,
      };

  // A Personal panel with no override tracks the inherited org default live.
  useEffect(() => {
    if (isOrg || personalOverride) return;
    setDraftLang(inheritedLang);
    setDraftFmt(inheritedFmt);
  }, [isOrg, personalOverride, inheritedLang, inheritedFmt]);

  // When the (currently hidden) guided tour drives the panel it is display-only
  // and shows the incoming props; otherwise the visitor operates the draft.
  const showLang = disabled ? languageValue : draftLang;
  const showFmt = disabled ? formatValue : draftFmt;
  const showLangs = disabled ? localizationLanguages : draftLangs;

  const dirty =
    !disabled &&
    (draftLang !== committed.lang ||
      draftFmt !== committed.fmt ||
      !sameSet(draftLangs, committed.langs));

  // Currency follows the business (Organization) regional format; on a Personal
  // panel that is the inherited org format, so the visitor's own regional format
  // reorders numbers/dates but never restates the currency.
  const businessLocale = REGION_LOCALE[inheritedFmt] ?? "en-US";
  const businessCurrency = CURRENCY_BY_FORMAT[inheritedFmt] ?? "USD";

  // Panel chrome follows the committed (saved) language; the live Preview
  // follows the draft language, so it shows what saving would apply.
  const t = CHROME[LANG_SUBTAG[committed.lang] ?? "en"] ?? CHROME.en;
  const tp = CHROME[LANG_SUBTAG[showLang] ?? "en"] ?? CHROME.en;

  const formatLocale = REGION_LOCALE[showFmt] ?? "en-US";
  const languageLocale = LANG_SUBTAG[showLang] ?? "en";
  const regionCode = formatLocale.split("-")[1] ?? "US";
  const previewRegionLabel = `${displayName(languageLocale, languageLocale, "language")} · ${displayName(languageLocale, regionCode, "region")}`;
  const samples = formatLocaleSamples({
    formatLocale,
    languageLocale,
    currency: isOrg ? (CURRENCY_BY_FORMAT[showFmt] ?? "USD") : businessCurrency,
    // Personal inherits the business currency AND its formatting, so the
    // visitor's own regional format never restates the currency symbol.
    currencyLocale: isOrg ? formatLocale : businessLocale,
  });
  const previewRows = [
    { label: tp.rowDateTime, value: samples.longDate },
    { label: tp.rowShortDate, value: samples.shortDate },
    { label: tp.rowNumber, value: samples.number },
    { label: tp.rowPercent, value: samples.percent },
    { label: tp.rowCurrency, value: samples.currency },
    { label: tp.rowCompact, value: samples.compact },
  ];

  function handleLang(v: string) {
    if (!disabled) setDraftLang(v);
  }
  function handleFmt(v: string) {
    if (!disabled) setDraftFmt(v);
  }
  function handleToggle(lang: string) {
    if (disabled) return;
    setDraftLangs((cur) => (cur.includes(lang) ? cur.filter((x) => x !== lang) : [...cur, lang]));
  }
  function handleSetLangs(next: string[]) {
    if (!disabled) setDraftLangs(next);
  }
  function handleSave() {
    if (isOrg) {
      const next = { lang: draftLang, fmt: draftFmt, langs: draftLangs };
      setOrgCommitted(next);
      setOrgSettings(next);
    } else {
      setPersonalOverride({ lang: draftLang, fmt: draftFmt });
    }
    setSavedNonce((n) => n + 1);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setSavedNonce(0), 5000);
  }
  function handleCancel() {
    setDraftLang(committed.lang);
    setDraftFmt(committed.fmt);
    setDraftLangs(committed.langs);
  }

  return (
    <div className="replicaFrame">
      {savedNonce > 0 ? (
        <div key={savedNonce} className={styles.savedToast} role="status">
          <span className={styles.savedToastTitle}>{t.saved}</span>
          <span className={styles.savedToastDetail}>
            {isOrg ? t.savedDetailOrg : t.savedDetailPersonal}
          </span>
        </div>
      ) : null}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h3>{t.title}</h3>
          <p>{isOrg ? t.subtitleOrg : t.subtitlePersonal}</p>
        </div>
        <div className={styles.headerActions}>
          {dirty ? (
            <button type="button" className={styles.cancelButton} onClick={handleCancel}>
              {t.cancel}
            </button>
          ) : null}
          <button
            type="button"
            className={styles.saveButton}
            data-anchor="save-button"
            onClick={handleSave}
            disabled={!dirty}
          >
            {t.save}
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.fields}>
          <div
            data-anchor={languageAnchor}
            className={
              highlighted === languageAnchor ? `${styles.field} ${styles.hl}` : styles.field
            }
          >
            <div className={styles.fieldTop}>
              <span className={styles.label}>{isOrg ? t.langLabelOrg : t.langLabelPersonal}</span>
              <span className={styles.hint}>{isOrg ? t.langHintOrg : t.langHintPersonal}</span>
            </div>
            <Dropdown
              label={isOrg ? t.langLabelOrg : t.langLabelPersonal}
              value={showLang}
              options={LANGUAGE_OPTIONS}
              onChange={handleLang}
              disabled={disabled}
            />
          </div>

          <div
            data-anchor={formatAnchor}
            className={highlighted === formatAnchor ? `${styles.field} ${styles.hl}` : styles.field}
          >
            <div className={styles.fieldTop}>
              <span className={styles.label}>
                {isOrg ? t.formatLabelOrg : t.formatLabelPersonal}
              </span>
              <span className={styles.hint}>{t.formatHint}</span>
            </div>
            <Dropdown
              label={isOrg ? t.formatLabelOrg : t.formatLabelPersonal}
              value={showFmt}
              options={FORMAT_OPTIONS}
              onChange={handleFmt}
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
                <span className={styles.label}>{t.locLabel}</span>
                <span className={styles.hint}>
                  {showLangs.length} {t.selected}
                </span>
              </div>
              <p className={styles.fieldDesc}>{t.locDesc}</p>
              <ContentLanguagePicker
                selected={showLangs}
                onToggle={handleToggle}
                onSetLanguages={handleSetLangs}
                disabled={disabled}
                searchPlaceholder={t.searchPlaceholder}
                noMatchesLabel={t.noMatches}
                allLabel={t.allLanguages}
                selectLabel={t.selectLanguages}
              />
            </div>
          ) : null}
        </div>
        <div className={styles.previewCol}>
          <PreviewCard
            highlighted={highlighted === "preview-card"}
            region={previewRegionLabel}
            title={tp.preview}
            rows={previewRows}
          />
        </div>
      </div>
      <Toast message={toast} />
    </div>
  );
}
