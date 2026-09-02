// Languages that customer CONTENT (emails, SMS, push, etc.) can be localized
// into — a far wider set than the handful the app interface itself ships in.
// Grouped for the picker. Names are kept in English (the canonical selection
// values); Welsh is listed once (Major European), and Chinese is split into its
// two written forms as content localization treats them separately.
export interface ContentLanguageGroup {
  group: string;
  languages: string[];
}

export const CONTENT_LANGUAGE_GROUPS: readonly ContentLanguageGroup[] = [
  {
    group: "Major European",
    languages: [
      "English",
      "French",
      "German",
      "Italian",
      "Spanish",
      "Portuguese",
      "Dutch",
      "Swedish",
      "Polish",
      "Russian",
      "Ukrainian",
      "Turkish",
      "Greek",
      "Hungarian",
      "Czech",
      "Slovak",
      "Slovenian",
      "Croatian",
      "Serbian",
      "Bulgarian",
      "Romanian",
      "Lithuanian",
      "Latvian",
      "Estonian",
      "Finnish",
      "Danish",
      "Norwegian",
      "Icelandic",
      "Welsh",
      "Albanian",
      "Bosnian",
      "Macedonian",
      "Maltese",
      "Catalan",
    ],
  },
  {
    group: "Asian",
    languages: [
      "Chinese (Simplified)",
      "Chinese (Traditional)",
      "Japanese",
      "Korean",
      "Vietnamese",
      "Thai",
      "Hindi",
      "Bengali",
      "Tamil",
      "Telugu",
      "Marathi",
      "Gujarati",
      "Kannada",
      "Malayalam",
      "Punjabi",
      "Urdu",
      "Sinhala",
      "Pashto",
      "Dari",
      "Uzbek",
      "Kazakh",
      "Armenian",
      "Georgian",
    ],
  },
  {
    group: "Middle Eastern & African",
    languages: ["Arabic", "Hebrew", "Persian (Farsi)", "Somali", "Swahili", "Hausa", "Amharic"],
  },
  {
    group: "Other",
    languages: ["Afrikaans", "Indonesian", "Filipino (Tagalog)", "Irish"],
  },
];

// Flat list of every content language, in group order — for "Select all".
export const ALL_CONTENT_LANGUAGES: string[] = CONTENT_LANGUAGE_GROUPS.flatMap((g) => g.languages);
