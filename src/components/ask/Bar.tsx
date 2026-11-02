"use client";

import { ask } from "@/content/ask";
import { OPEN_ASK_JASON_EVENT } from "@/lib/keyboard";
import { useReducedMotion } from "@/lib/motion";
import classNames from "classnames";
import {
  type ComponentType,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Bar.module.css";
import { NUDGE_MS, startNudges } from "./nudge";
import { loadRoot, loadedRoot } from "./rootLoader";
import { startRotation } from "./rotation";
import { barModeOf, countChars, getAsk, setAsk, useAsk } from "./store";

const COUNT_FROM = 0.8;

/**
 * The entry bar: a fixed input at the bottom centre of every chrome page, a
 * "Ask Jason →" button at its end. Sending from it morphs it into the panel. It is
 * server-rendered at its final size and out of flow. Everything that takes time (the
 * panel, the chat client, Turnstile) is fetched on the first focus or tap
 * (rootLoader.ts), never at page load.
 */
export default function Bar() {
  const draft = useAsk((s) => s.draft);
  const limit = useAsk((s) => s.inputLimit);
  const phase = useAsk((s) => s.phase);
  const mode = useAsk(barModeOf);
  const interacted = useAsk((s) => s.interacted);
  const reduced = useReducedMotion();
  const [ghost, setGhost] = useState("");
  const [phone, setPhone] = useState(false);
  const [nudging, setNudging] = useState(false);
  // The panel module, held in state once loaded (see rootLoader.ts for why not React.lazy).
  const [Root, setRoot] = useState<ComponentType | null>(() => loadedRoot()?.default ?? null);
  const bar = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const closedButton = useRef<HTMLButtonElement>(null);
  const previousPhase = useRef(phase);
  // The field is UNCONTROLLED on purpose. A controlled field makes React put the old value back
  // after every keystroke whose render has not committed yet, and in production builds commits
  // can be held up for a few milliseconds after the first focus (while the panel chunk loads), so
  // the first characters typed were lost. An uncontrolled field is never touched by React, so
  // nothing can eat a keystroke. The store gets every change; the effect below copies changes
  // made elsewhere (cleared after a send, text restored after a failure, typed in the panel) in.
  const [initialDraft] = useState(() => getAsk().draft);

  const open = phase !== "closed";
  const rotating = mode === "rotating" && !reduced;

  const ensureRoot = useCallback(() => {
    return loadRoot().then((m) => {
      // A transition so mounting the panel never competes with the visitor's keystrokes for
      // priority. (The lost-keystroke bug is fixed by the field being uncontrolled, see above;
      // this just keeps the mount out of the urgent lane.)
      startTransition(() => setRoot(() => m.default));
      return m;
    });
  }, []);

  const markInteracted = useCallback(() => {
    setAsk((s) => (s.interacted ? {} : { interacted: true }));
  }, []);

  const firstIntent = useCallback(() => {
    markInteracted();
    void ensureRoot().then((m) => m.actions.firstIntent());
  }, [ensureRoot, markInteracted]);

  const requestOpen = useCallback(
    (by: "bar" | "palette" | "button") => {
      const rect = bar.current ? bar.current.getBoundingClientRect() : null;
      setAsk({
        request: {
          kind: "open",
          by,
          rect:
            by === "palette" || !rect
              ? null
              : { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        },
      });
      void ensureRoot();
    },
    [ensureRoot],
  );

  // Copy a draft changed elsewhere into the field. It compares against the live store, not the
  // render's value, so it never overwrites characters typed since that render.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `draft` is the trigger
  useEffect(() => {
    const el = field.current;
    const live = getAsk().draft;
    if (el && el.value !== live) el.value = live;
  }, [draft, mode]);

  // Phones: one tap target that opens the sheet.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setPhone(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // The command palette's "Ask Jason" item.
  useEffect(() => {
    const onOpen = () => requestOpen("palette");
    window.addEventListener(OPEN_ASK_JASON_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ASK_JASON_EVENT, onOpen);
  }, [requestOpen]);

  // Stand-in builds: ?ask=<scenario>&open=1 opens the panel on load.
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ASK_JASON_API === "standin") {
      void import("./statePicker").then((m) => {
        if (m.readPicker().open) requestOpen("button");
      });
    }
  }, [requestOpen]);

  // The retyping placeholder, until the visitor first interacts (spec FR-004a).
  useEffect(() => {
    if (!rotating || open) return;
    return startRotation(setGhost);
  }, [rotating, open]);

  // The occasional colour nudge (spec FR-004b).
  useEffect(() => {
    if (reduced || interacted || open || mode === "closed") return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const stop = startNudges(
      () => {
        setNudging(true);
        timer = setTimeout(() => setNudging(false), NUDGE_MS);
      },
      () => !document.hidden,
    );
    return () => {
      stop();
      clearTimeout(timer);
      setNudging(false);
    };
  }, [reduced, interacted, open, mode]);

  // Focus returns to the bar when the panel finishes closing (spec FR-039).
  useEffect(() => {
    if (previousPhase.current === "closing" && phase === "closed") {
      (mode === "closed" ? closedButton.current : field.current)?.focus({ preventScroll: true });
    }
    previousPhase.current = phase;
  }, [phase, mode]);

  const used = countChars(draft);
  const over = used > limit;
  const showCount = used >= limit * COUNT_FROM;
  const label = showCount ? (over ? `${used - limit} over` : `${limit - used} left`) : null;
  const ghosting = rotating && ghost !== "" && draft === "";
  const placeholder = mode === "follow-up" ? ask.followUpPlaceholder : ask.placeholder;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Read the field itself: the render's `draft` can be a keystroke or two behind.
    const typed = field.current ? field.current.value : getAsk().draft;
    if (countChars(typed) > getAsk().inputLimit) return;
    const text = typed.trim();
    const rect = bar.current ? bar.current.getBoundingClientRect() : null;
    const box = rect
      ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
      : null;
    setAsk({
      request: text ? { kind: "send", text, rect: box } : { kind: "open", by: "bar", rect: box },
    });
    void ensureRoot();
  };

  return (
    <>
      <div
        ref={bar}
        className={styles.bar}
        data-ask-jason="bar"
        data-open={open ? "true" : "false"}
        data-nudge={nudging ? "true" : "false"}
      >
        {mode === "closed" ? (
          <button
            ref={closedButton}
            type="button"
            className={styles.closedBtn}
            onClick={() => requestOpen("bar")}
            onFocus={firstIntent}
          >
            {ask.closedLabel}
          </button>
        ) : (
          <form className={styles.form} aria-label="Ask Jason" onSubmit={submit}>
            <div className={styles.fieldWrap} data-ghost={ghosting ? "true" : "false"}>
              <input
                ref={field}
                className={styles.field}
                type="text"
                name="ask-jason-bar"
                aria-label="Ask Jason"
                placeholder={placeholder}
                defaultValue={initialDraft}
                autoComplete="off"
                enterKeyHint="send"
                readOnly={phone}
                tabIndex={phone ? -1 : undefined}
                aria-hidden={phone ? true : undefined}
                onFocus={firstIntent}
                onPointerEnter={markInteracted}
                onPointerDown={markInteracted}
                onInput={(e) => {
                  markInteracted();
                  if (getAsk().draft === "")
                    void ensureRoot().then((m) => m.actions.firstKeystroke());
                  setAsk({ draft: e.currentTarget.value, inlineError: null });
                }}
              />
              {ghosting ? (
                <span className={styles.ghost} aria-hidden="true">
                  <span className={styles.ghostText}>{ghost}</span>
                  <span className={styles.caret}>▍</span>
                </span>
              ) : null}
            </div>
            <button
              type="submit"
              className={classNames(styles.button, label !== null && styles.counter)}
              data-over={over ? "true" : "false"}
              disabled={over}
              tabIndex={phone ? -1 : undefined}
              onPointerEnter={markInteracted}
            >
              {label ?? (
                <>
                  Ask Jason <span aria-hidden="true">→</span>
                </>
              )}
            </button>
            {phone ? (
              <button
                type="button"
                className={styles.tapLayer}
                aria-label="Ask Jason"
                onClick={() => {
                  firstIntent();
                  requestOpen("bar");
                }}
              />
            ) : null}
          </form>
        )}
      </div>
      {Root ? <Root /> : null}
    </>
  );
}
