"use client";

import { ask } from "@/content/ask";
import classNames from "classnames";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { firstKeystroke, sendMessage, setDraft, stop } from "./actions";
import styles from "./ask.module.css";
import { countChars, useAsk } from "./store";

const COUNT_FROM = 0.8;

function turnsHint(left: number | null): string | null {
  if (left === null || left <= 0 || left > 3) return null;
  return left === 1 ? "1 question left" : `${left} questions left`;
}

/**
 * The panel composer: a text field that grows from one to five lines, the counter,
 * the turn hint, Send (which becomes Stop while a reply is in flight) and the
 * privacy notice. The field shares one value with the entry bar, so a question
 * typed there is the question sent from here, and unsent text survives a close.
 */
export function Composer() {
  const draft = useAsk((s) => s.draft);
  const inFlight = useAsk((s) => s.inFlight);
  const limit = useAsk((s) => s.inputLimit);
  const turnsLeft = useAsk((s) => s.turnsLeft);
  const notice = useAsk((s) => s.health?.notice ?? "");
  const healthReady = useAsk((s) => s.healthState === "ok");
  const botCheck = useAsk((s) => s.botCheck);
  const inlineError = useAsk((s) => s.inlineError);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Grow to fit, up to five lines, then scroll. Reads the element, not `draft`; it reruns when the text changes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `draft` is the trigger, not an input
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [draft]);

  const used = countChars(draft);
  const over = used > limit;
  const showCount = used >= limit * COUNT_FROM;
  const counter = showCount ? (over ? `${used - limit} over` : `${limit - used} left`) : "";
  const hint = turnsHint(turnsLeft);
  const canSend = draft.trim() !== "" && !over && !inFlight && healthReady;

  const submit = () => {
    if (canSend) void sendMessage(draft);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <p className={classNames(styles.hintRow, styles.eyebrow)} id="ask-hint-row">
        {botCheck === "checking" ? "Checking…" : (hint ?? "")}
      </p>
      <div className={styles.composerRow}>
        <textarea
          ref={ref}
          id="ask-q"
          className={styles.textarea}
          rows={1}
          value={draft}
          placeholder={ask.placeholder}
          aria-label="Your question"
          aria-describedby="ask-keys ask-count"
          aria-invalid={over || inlineError ? true : undefined}
          enterKeyHint="send"
          autoComplete="off"
          onChange={(e) => {
            if (draft === "") firstKeystroke();
            setDraft(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter" || e.shiftKey || e.nativeEvent.isComposing) return;
            if (coarse) return; // on touch, Enter is a new line and Send is the only submit
            e.preventDefault();
            submit();
          }}
        />
        <div className={styles.sendCol}>
          <span
            id="ask-count"
            className={styles.counter}
            data-over={over ? "true" : "false"}
            aria-live="off"
          >
            {counter}
          </span>
          {inFlight ? (
            <button
              type="button"
              className={styles.kbdBtn}
              onClick={() => {
                stop();
                ref.current?.focus();
              }}
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className={classNames(styles.kbdBtn, styles.primary)}
              disabled={!canSend}
            >
              Send
            </button>
          )}
        </div>
      </div>
      <span id="ask-keys" className={styles.srOnly}>
        {coarse ? "" : "Enter sends, Shift and Enter add a line. "}
        {hint ?? ""}
      </span>
      {inlineError ? (
        <p className={styles.inlineError}>
          <span className={styles.srOnly}>Error: </span>
          {inlineError}
        </p>
      ) : null}
      {notice ? <p className={styles.notice}>{notice}</p> : null}
    </form>
  );
}
