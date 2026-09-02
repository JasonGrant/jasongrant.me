import type { TranslateModalState } from "@/components/work/replica/TranslateModal";
import type {
  EmailEditorAnchorId,
  OrgSettingsAnchorId,
  PersonalSettingsAnchorId,
  WalkthroughStep,
} from "@/content/studies/types";

// Pure functions: steps[0..index] -> replica screen props. Replicas hold no
// study knowledge; all narrative state lives here (data-model.md "Player
// state machine").

export const SETTINGS_DEFAULTS = {
  languageValue: "English",
  formatValue: "United States",
} as const;

export interface SettingsReplicaState {
  languageValue: string;
  formatValue: string;
  localizationLanguages: string[];
  highlighted: OrgSettingsAnchorId | PersonalSettingsAnchorId | null;
  toast: string | null;
}

export function reduceSettingsSteps(
  steps: WalkthroughStep<"org-settings">[] | WalkthroughStep<"personal-settings">[],
  upToIndex: number,
): SettingsReplicaState {
  let state: SettingsReplicaState = {
    languageValue: SETTINGS_DEFAULTS.languageValue,
    formatValue: SETTINGS_DEFAULTS.formatValue,
    localizationLanguages: [],
    highlighted: null,
    toast: null,
  };

  for (let i = 0; i <= upToIndex && i < steps.length; i++) {
    const step = steps[i];
    state = {
      ...state,
      highlighted: step.highlight ? step.target : null,
      toast: step.action === "toast" ? (step.value ?? step.caption) : null,
    };

    if (step.value === undefined) continue;

    if (
      (step.target === "business-language-select" || step.target === "personal-language-select") &&
      (step.action === "select" || step.action === "input")
    ) {
      state.languageValue = step.value;
    }
    if (
      (step.target === "business-format-select" || step.target === "personal-format-select") &&
      (step.action === "select" || step.action === "input")
    ) {
      state.formatValue = step.value;
    }
    if (step.target === "localization-languages" && step.action === "select") {
      state.localizationLanguages = step.value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  return state;
}

export interface EmailReplicaState {
  subjectValue: string;
  modal: TranslateModalState;
  highlighted: EmailEditorAnchorId | null;
  toast: string | null;
}

const DEFAULT_SUBJECT = "Knock your socks off ☕";

export function reduceEmailSteps(
  steps: WalkthroughStep<"email-editor">[],
  upToIndex: number,
  orgSelectedLanguages: string[],
): EmailReplicaState {
  let state: EmailReplicaState = {
    subjectValue: DEFAULT_SUBJECT,
    modal: {
      open: false,
      audienceBreakdown: orgSelectedLanguages.map((language, i) => ({
        language,
        percent: [22, 17, 11, 11][i] ?? 10,
      })),
      checkedLanguages: [],
      translationRows: [],
      stale: false,
    },
    highlighted: null,
    toast: null,
  };

  for (let i = 0; i <= upToIndex && i < steps.length; i++) {
    const step = steps[i];
    state = {
      ...state,
      modal: { ...state.modal },
      highlighted: step.highlight ? step.target : null,
      toast: step.action === "toast" ? (step.value ?? step.caption) : null,
    };

    if (step.target === "translate-button" && step.action === "transition") {
      state.modal.open = true;
    }
    if (step.target === "modal-close" && step.action === "transition") {
      state.modal.open = false;
    }
    if (
      step.target === "retranslate-button" &&
      (step.action === "click" || step.action === "transition")
    ) {
      state.modal.stale = false;
    }

    if (step.value === undefined) continue;

    if (step.target === "subject-field" && step.action === "input") {
      const hadTranslations = state.modal.translationRows.length > 0;
      state.subjectValue = step.value;
      if (hadTranslations) state.modal.stale = true;
    }
    if (step.target === "language-checklist" && step.action === "select") {
      state.modal.checkedLanguages = step.value
        .split(",")
        .map((s) => s.trim())
        .filter((lang) => orgSelectedLanguages.includes(lang));
    }
    if (step.target === "translation-row" && step.action === "input") {
      const [source, translated] = step.value.split("|");
      if (source && translated) {
        const existingIndex = state.modal.translationRows.findIndex((r) => r.source === source);
        const nextRows = [...state.modal.translationRows];
        if (existingIndex === -1) nextRows.push({ source, translated });
        else nextRows[existingIndex] = { source, translated };
        state.modal.translationRows = nextRows;
      }
    }
  }

  return state;
}
