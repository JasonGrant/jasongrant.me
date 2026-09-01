import { FORMATTING_FACTS as F } from "@/components/work/demos/facts";

// A fixed sample instant shown in a pinned timezone, so the date/time output is
// deterministic across server and client renders (no hydration mismatch) and
// stable regardless of the visitor's own clock or zone — the locale is the only
// variable, which is the whole point. Matches the real audit example
// (Sep 30, 2023, 07:11:12 PM EDT).
const SAMPLE_INSTANT = new Date("2023-09-30T23:11:12Z");
const SAMPLE_TIME_ZONE = "America/New_York";

const LONG_DATE_OPTS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
  timeZone: SAMPLE_TIME_ZONE,
};

export interface LocaleSample {
  longDate: string;
  shortDate: string;
  number: string;
  percent: string;
  currency: string;
  compact: string;
}

export interface LocaleSampleOptions {
  /** Region locale driving number/date structure, grouping, and order. */
  formatLocale: string;
  /** Language locale for the localized month name (defaults to formatLocale). */
  languageLocale?: string;
  currency: string;
  /** Locale for currency/compact formatting (defaults to formatLocale). */
  currencyLocale?: string;
}

// The long date carries both a format (order, 12/24h, separators — from the
// region) and a translated month name (from the language). Intl cannot split
// these within one locale (fr-US still orders the date the French way), so we
// take the region-formatted parts and swap in the month name rendered in the
// chosen language.
function longDate(formatLocale: string, languageLocale: string): string {
  const parts = new Intl.DateTimeFormat(formatLocale, LONG_DATE_OPTS).formatToParts(SAMPLE_INSTANT);
  if (languageLocale === formatLocale) return parts.map((p) => p.value).join("");
  const month = new Intl.DateTimeFormat(languageLocale, {
    month: "short",
    timeZone: SAMPLE_TIME_ZONE,
  }).format(SAMPLE_INSTANT);
  return parts.map((p) => (p.type === "month" ? month : p.value)).join("");
}

// The six formatting elements every locale-formatting surface shows (the
// Formatting concept demo and the settings Preview panel), computed live from
// the visitor's own Intl implementation so both surfaces stay identical.
// Passing only formatLocale + currency reproduces single-locale behaviour;
// the settings panel additionally splits language (month name) from region
// (everything else) and can pin currency to a different locale.
export function formatLocaleSamples(opts: LocaleSampleOptions): LocaleSample {
  const {
    formatLocale,
    languageLocale = formatLocale,
    currency,
    currencyLocale = formatLocale,
  } = opts;
  return {
    longDate: longDate(formatLocale, languageLocale),
    shortDate: new Intl.DateTimeFormat(formatLocale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: SAMPLE_TIME_ZONE,
    }).format(SAMPLE_INSTANT),
    number: new Intl.NumberFormat(formatLocale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(F.sampleNumber),
    percent: new Intl.NumberFormat(formatLocale, {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(F.samplePercent),
    currency: new Intl.NumberFormat(currencyLocale, { style: "currency", currency }).format(
      F.sampleCurrency,
    ),
    compact: new Intl.NumberFormat(currencyLocale, {
      style: "currency",
      currency,
      notation: "compact",
    }).format(F.sampleCompactCurrency),
  };
}
