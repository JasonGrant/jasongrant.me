"use client";

import { EmailEditor } from "@/components/work/replica/EmailEditor";
import { SettingsPanel } from "@/components/work/replica/SettingsPanel";
import { usePrefersReducedMotion } from "@/components/work/usePrefersReducedMotion";
import type { WalkthroughSegment } from "@/content/studies/types";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./Player.module.css";
import { reduceEmailSteps, reduceSettingsSteps } from "./stepReducer";

type Status = "idle" | "running" | "paused" | "complete";

export interface PlayerProps {
  segment: WalkthroughSegment<"org-settings" | "personal-settings" | "email-editor">;
  /** Only meaningful when segment.screen === "email-editor" (FR-021 continuity). */
  orgSelectedLanguages?: string[];
}

// Idle -> running (Play) -> paused (Pause) -> running (Play) | idle (Stop,
// resets to step 0) -> ... -> complete (last step's timer elapses), Play at
// complete restarts. Prev/Next work at any status and pause a running
// sequence. Reduced motion drops autoplay entirely: no Play/Pause/Stop,
// Prev/Next only, identical captions (constitution v1.2.1 condition c).
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

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (status !== "running" || reducedMotion) return;
    const atLastStep = stepIndex === steps.length - 1;
    if (atLastStep) {
      setStatus("complete");
      return;
    }
    const duration = steps[stepIndex].durationMs;
    timerRef.current = setTimeout(() => {
      setStepIndex((i) => i + 1);
    }, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [status, stepIndex, reducedMotion, steps]);

  // Mobile framing (FR-012a/D9): keep the active step's focus region visible
  // WITHIN the player's own scrollable viewport on narrow screens. Two guards
  // matter: (1) never on the initial mount — otherwise every player on the
  // page scrolls itself into view at load and the last one wins, yanking the
  // page down to the email segment; (2) only when the viewport is actually
  // scrollable (mobile), and then scroll the container itself, never the page.
  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    const viewport = viewportRef.current;
    if (!viewport || viewport.scrollHeight <= viewport.clientHeight) return;
    const region = step.focusRegion ?? step.target;
    const el = viewport.querySelector<HTMLElement>(`[data-anchor="${region}"]`);
    if (!el) return;
    // Element offset within the viewport's scroll content, robust to any
    // positioning context (offsetTop would depend on the offsetParent).
    const offsetWithin =
      el.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop;
    const target = offsetWithin - viewport.clientHeight / 2 + el.clientHeight / 2;
    viewport.scrollTo({ top: Math.max(0, target), behavior: reducedMotion ? "auto" : "smooth" });
  }, [step, reducedMotion]);

  function goTo(index: number) {
    setStepIndex(Math.max(0, Math.min(steps.length - 1, index)));
    setStatus((s) => (s === "running" ? "paused" : s === "complete" ? "paused" : s));
  }

  function handlePlay() {
    if (status === "complete") setStepIndex(0);
    setStatus("running");
  }
  function handlePause() {
    setStatus("paused");
  }
  function handleStop() {
    setStatus("idle");
    setStepIndex(0);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(stepIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(stepIndex - 1);
    }
    // Deliberately no Tab handling — Tab must never be captured (contracts/accessibility.md).
  }

  const liveText = `${statusLabel(status, reducedMotion)} — Step ${stepIndex + 1} of ${steps.length}: ${step.caption}`;

  return (
    <section className={styles.player} aria-label={segment.title} onKeyDown={handleKeyDown}>
      <div ref={viewportRef} className={styles.viewport}>
        {renderScreen(segment, stepIndex, orgSelectedLanguages)}
      </div>

      <div className={styles.controlsRow}>
        <span className={styles.caption} aria-live="polite">
          {liveText}
        </span>
        <button
          type="button"
          className={styles.button}
          onClick={() => goTo(stepIndex - 1)}
          disabled={isFirst}
        >
          ◁ Prev
        </button>
        {reducedMotion ? null : status === "running" ? (
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
          onClick={() => goTo(stepIndex + 1)}
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
    </section>
  );
}

function statusLabel(status: Status, reducedMotion: boolean): string {
  if (reducedMotion) return "Step through";
  if (status === "running") return "Playing";
  if (status === "paused") return "Paused";
  if (status === "complete") return "Complete";
  return "Ready";
}

function renderScreen(
  segment: PlayerProps["segment"],
  stepIndex: number,
  orgSelectedLanguages: string[],
) {
  if (segment.screen === "org-settings" || segment.screen === "personal-settings") {
    const state = reduceSettingsSteps(segment.steps, stepIndex);
    return (
      <SettingsPanel
        screen={segment.screen}
        languageValue={state.languageValue}
        formatValue={state.formatValue}
        localizationLanguages={state.localizationLanguages}
        highlighted={state.highlighted}
        toast={state.toast}
      />
    );
  }
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
