"use client";

import { EmailEditor } from "@/components/work/replica/EmailEditor";
import { SettingsPanel } from "@/components/work/replica/SettingsPanel";
import { usePrefersReducedMotion } from "@/components/work/usePrefersReducedMotion";
import type { WalkthroughSegment } from "@/content/studies/types";
import { FEATURES } from "@/lib/featureFlags";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./Player.module.css";
import { reduceEmailSteps, reduceSettingsSteps } from "./stepReducer";

type Status = "idle" | "running" | "paused" | "complete";

interface SettingsValues {
  languageValue: string;
  formatValue: string;
  localizationLanguages: string[];
}

export interface PlayerProps {
  segment: WalkthroughSegment<"org-settings" | "personal-settings" | "email-editor">;
  orgSelectedLanguages?: string[];
}

// Interaction model (Jason, 2026-08-30): the replica card is LIVE by default —
// the visitor operates it. Pressing "Play walkthrough" hands control to a
// scripted guided tour (card disabled, driven step by step); pausing/stopping
// returns control to the visitor. So `disabled` === the tour is actively
// running.
export function Player({ segment, orgSelectedLanguages = [] }: PlayerProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transcriptId = useId();

  const steps = segment.steps;
  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  const isFirst = stepIndex === 0;
  const running = status === "running";

  const isSettings = segment.screen === "org-settings" || segment.screen === "personal-settings";

  // Live settings state (only for settings segments). Seeded from the tour's
  // opening state so the card starts on the "before" values the visitor can
  // then change (or watch the tour change).
  const seed = () =>
    isSettings
      ? pickValues(reduceSettingsSteps(segment.steps as never, 0))
      : { languageValue: "", formatValue: "", localizationLanguages: [] };
  const [sv, setSv] = useState<SettingsValues>(seed);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Advance the guided tour a step and drive the settings values from the script.
  const applyStep = (i: number) => {
    setStepIndex(i);
    if (isSettings) setSv(pickValues(reduceSettingsSteps(segment.steps as never, i)));
  };

  // While the tour runs, drive the settings values from the scripted step.
  useEffect(() => {
    if (!running || !isSettings) return;
    setSv(pickValues(reduceSettingsSteps(segment.steps as never, stepIndex)));
  }, [running, isSettings, stepIndex, segment.steps]);

  // Auto-advance timer while playing.
  useEffect(() => {
    if (!running || reducedMotion) return;
    if (stepIndex === steps.length - 1) {
      setStatus("complete");
      return;
    }
    const duration = steps[stepIndex].durationMs;
    timerRef.current = setTimeout(() => setStepIndex((i) => i + 1), duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [running, stepIndex, reducedMotion, steps]);

  // Mobile framing (FR-012a): keep the active step's region in view within the
  // player's own scrollable viewport while the tour plays. Never on mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!running) return;
    const vp = viewportRef.current;
    if (!vp || vp.scrollHeight <= vp.clientHeight) return;
    const region = step.focusRegion ?? step.target;
    const el = vp.querySelector<HTMLElement>(`[data-anchor="${region}"]`);
    if (!el) return;
    const off = el.getBoundingClientRect().top - vp.getBoundingClientRect().top + vp.scrollTop;
    vp.scrollTo({
      top: Math.max(0, off - vp.clientHeight / 2 + el.clientHeight / 2),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [step, reducedMotion, running]);

  function tourGoTo(index: number) {
    applyStep(Math.max(0, Math.min(steps.length - 1, index)));
    setStatus((s) => (s === "running" || s === "complete" ? "paused" : s));
  }
  function handlePlay() {
    if (status === "complete") applyStep(0);
    setStatus("running");
  }
  function handlePause() {
    setStatus("paused");
  }
  function handleStop() {
    setStatus("idle");
    applyStep(0);
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      tourGoTo(stepIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      tourGoTo(stepIndex - 1);
    }
  }

  const liveText = `${statusLabel(status, reducedMotion)} (step ${stepIndex + 1} of ${steps.length}): ${step.caption}`;

  return (
    <section
      className={styles.player}
      aria-label={segment.title}
      onKeyDown={FEATURES.walkthroughControls ? handleKeyDown : undefined}
    >
      <div ref={viewportRef} className={styles.viewport}>
        {isSettings ? (
          <SettingsPanel
            screen={segment.screen as "org-settings" | "personal-settings"}
            languageValue={sv.languageValue}
            formatValue={sv.formatValue}
            localizationLanguages={sv.localizationLanguages}
            highlighted={running && step.highlight ? (step.target as never) : null}
            toast={running && step.action === "toast" ? (step.value ?? step.caption) : null}
            disabled={running}
            onLanguageChange={(v) => setSv((s) => ({ ...s, languageValue: v }))}
            onFormatChange={(v) => setSv((s) => ({ ...s, formatValue: v }))}
            onToggleLanguage={(lang) =>
              setSv((s) => ({
                ...s,
                localizationLanguages: s.localizationLanguages.includes(lang)
                  ? s.localizationLanguages.filter((x) => x !== lang)
                  : [...s.localizationLanguages, lang],
              }))
            }
          />
        ) : (
          renderEmail(
            segment as WalkthroughSegment<"email-editor">,
            stepIndex,
            orgSelectedLanguages,
          )
        )}
      </div>

      {FEATURES.walkthroughControls ? (
        <>
          <div className={styles.controlsRow}>
            <span className={styles.caption} aria-live="polite">
              {liveText}
            </span>
            <button
              type="button"
              className={styles.button}
              onClick={() => tourGoTo(stepIndex - 1)}
              disabled={isFirst}
            >
              ◁ Prev
            </button>
            {reducedMotion ? null : running ? (
              <button type="button" className={styles.button} onClick={handlePause}>
                ❚❚ Pause
              </button>
            ) : (
              <button
                type="button"
                className={`${styles.button} ${styles.primary}`}
                onClick={handlePlay}
              >
                {status === "complete" ? "↻ Restart" : "▷ Play walkthrough"}
              </button>
            )}
            {reducedMotion ? null : (
              <button
                type="button"
                className={styles.button}
                onClick={handleStop}
                disabled={status === "idle"}
              >
                ◻ Stop
              </button>
            )}
            <button
              type="button"
              className={styles.button}
              onClick={() => tourGoTo(stepIndex + 1)}
              disabled={isLast}
            >
              Next ▷
            </button>
          </div>

          <div className={styles.transcriptRow}>
            <button
              type="button"
              className={styles.transcriptToggle}
              aria-expanded={transcriptOpen}
              aria-controls={transcriptId}
              onClick={() => setTranscriptOpen((v) => !v)}
            >
              {transcriptOpen ? "▾" : "▸"} Transcript
            </button>
            {transcriptOpen ? (
              <p id={transcriptId} className={styles.transcriptBody}>
                {step.narrationText}
              </p>
            ) : null}
          </div>
        </>
      ) : null}
    </section>
  );
}

function pickValues(s: {
  languageValue: string;
  formatValue: string;
  localizationLanguages: string[];
}): SettingsValues {
  return {
    languageValue: s.languageValue,
    formatValue: s.formatValue,
    localizationLanguages: s.localizationLanguages,
  };
}

function statusLabel(status: Status, reducedMotion: boolean): string {
  if (reducedMotion) return "Step through";
  if (status === "running") return "Playing";
  if (status === "paused") return "Paused";
  if (status === "complete") return "Complete";
  return "Interactive";
}

function renderEmail(
  segment: WalkthroughSegment<"email-editor">,
  stepIndex: number,
  orgSelectedLanguages: string[],
) {
  const state = reduceEmailSteps(segment.steps, stepIndex, orgSelectedLanguages);
  return (
    <EmailEditor
      subjectValue={state.subjectValue}
      modal={state.modal}
      highlighted={state.highlighted}
      toast={state.toast}
    />
  );
}
