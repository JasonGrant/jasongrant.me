"use client";

import classNames from "classnames";
import { type ReactNode, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CampaignEditor } from "./CampaignEditor";
import { CampaignMessage } from "./CampaignMessage";
import { CampaignRecipients } from "./CampaignRecipients";
import styles from "./EmailTranslationFlow.module.css";
import { TranslateOverlay } from "./TranslateOverlay";
import { TranslationEditor } from "./TranslationEditor";

// The scripted product walkthrough for Phase 2: a marketer localizing one
// campaign for a multilingual audience, end to end, using the recreated
// Klaviyo screens. A self-guided click-through — one screen at a time, the
// visitor advances every step (constitution: discrete step-through, no
// transitional motion). Only the current screen renders, keeping the page
// light. Languages offered (French + German) match Organization settings.
const STEPS: { title: string; caption: string; render: () => ReactNode }[] = [
  {
    title: "Recipients",
    caption:
      "The campaign goes to a multilingual list. Klaviyo estimates the audience before anything is sent.",
    render: () => <CampaignRecipients />,
  },
  {
    title: "Message",
    caption:
      "The marketer starts from a saved template and sets the subject, preview text, and sender.",
    render: () => <CampaignMessage />,
  },
  {
    title: "Editor",
    caption: "The email is built once, in English, in the drag-and-drop editor.",
    render: () => <CampaignEditor />,
  },
  {
    title: "Translate",
    caption:
      "Translate opens an audience-aware picker: the share of recipients who prefer each language, offering only the languages the organization enabled earlier — French and German.",
    render: () => <CampaignEditor overlay={<TranslateOverlay />} />,
  },
  {
    title: "Review · French",
    caption:
      "Every field is reviewed side by side — subject, preview, and body — and any of them can be edited by hand before it ships.",
    render: () => (
      <CampaignEditor translateLabel="2 translations" overlay={<TranslationEditor lang="fr" />} />
    ),
  },
  {
    title: "Review · German",
    caption:
      "The same pass for German. The languages offered here are exactly the ones chosen back in Organization settings.",
    render: () => (
      <CampaignEditor translateLabel="2 translations" overlay={<TranslationEditor lang="de" />} />
    ),
  },
  {
    title: "Content changed",
    caption:
      "Later, the English source changes — free shipping drops from $50 to $40 — and Klaviyo warns that the edit may have left the translations behind.",
    render: () => <CampaignEditor stale translateLabel="2 translations" />,
  },
  {
    title: "Needs update",
    caption:
      "Reopening the translations, the changed row is flagged: the source now reads $40 while the French still says $50. One action retranslates just that field.",
    render: () => (
      <CampaignEditor
        translateLabel="2 translations"
        overlay={<TranslationEditor lang="fr" stale />}
      />
    ),
  },
];

export function EmailTranslationFlow() {
  const [step, setStep] = useState(0);
  const go = (i: number) => setStep(Math.max(0, Math.min(STEPS.length - 1, i)));
  const current = STEPS[step];

  return (
    <div className={styles.player}>
      <div className={styles.screen}>{current.render()}</div>

      <div className={styles.bar}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => go(step - 1)}
          disabled={step === 0}
        >
          <FiChevronLeft aria-hidden="true" />
          Back
        </button>

        <div className={styles.dots} role="group" aria-label="Go to step">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className={classNames(styles.dot, i === step && styles.dotOn)}
              onClick={() => go(i)}
              aria-label={`Step ${i + 1} of ${STEPS.length}: ${s.title}`}
              aria-current={i === step ? "step" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={() => go(step + 1)}
          disabled={step === STEPS.length - 1}
        >
          Next
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>

      <p className={styles.caption} aria-live="polite">
        <span className={styles.num} aria-hidden="true">
          {step + 1}
        </span>
        <span className={styles.captionText}>
          <span className={styles.stepTitle}>{current.title}.</span> {current.caption}
        </span>
      </p>
    </div>
  );
}
