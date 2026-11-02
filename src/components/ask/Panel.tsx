"use client";

import { ask } from "@/content/ask";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock";
import classNames from "classnames";
import { type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BotCheckSurface } from "./BotCheck";
import { Composer } from "./Composer";
import { ContactBlock } from "./ContactBlock";
import { EmptyState } from "./EmptyState";
import { Header } from "./Header";
import panel from "./Panel.module.css";
import { Transcript } from "./Transcript";
import { markClosed, markOpen, requestClose, retryHealth } from "./actions";
import styles from "./ask.module.css";
import { closeMorph, openMorph, rectOf } from "./morph";
import { getAsk, useAsk, viewOf } from "./store";

function useDelayed(active: boolean, ms: number): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!active) return setReady(false);
    const timer = setTimeout(() => setReady(true), ms);
    return () => clearTimeout(timer);
  }, [active, ms]);
  return ready;
}

function Body() {
  const view = useAsk(viewOf);
  const hasMessages = useAsk((s) => s.messages.length > 0);
  const message = useAsk((s) => s.terminal?.message ?? null);
  const slow = useDelayed(view === "loading", 300);

  if (view === "loading")
    return (
      <div className={styles.body}>{slow ? <p className={styles.quiet}>Connecting…</p> : null}</div>
    );
  if (view === "empty")
    return (
      <div className={styles.body}>
        <EmptyState />
      </div>
    );
  if (view === "network-error") {
    return (
      <div className={styles.body}>
        <p className={styles.centerNote}>{ask.lines.network}</p>
        <div className={styles.centerNote}>
          <button type="button" className={styles.kbdBtn} onClick={() => retryHealth()}>
            Try again
          </button>
        </div>
      </div>
    );
  }
  if (view === "cta" && !hasMessages) {
    return (
      <div className={styles.body}>
        <p className={styles.centerNote}>{message ?? ask.lines.resting}</p>
      </div>
    );
  }
  return (
    <div className={styles.body}>
      <Transcript />
    </div>
  );
}

function Footer() {
  const view = useAsk(viewOf);
  const message = useAsk((s) => s.terminal?.message ?? null);
  const hasMessages = useAsk((s) => s.messages.length > 0);
  let content: React.ReactNode;
  if (view === "ended") content = <ContactBlock lead={message ?? ask.lines.ended} />;
  else if (view === "address-limit") content = <ContactBlock />;
  else if (view === "cta")
    content = <ContactBlock lead={hasMessages ? (message ?? ask.lines.resting) : null} />;
  else if (view === "network-error") content = null;
  else content = <Composer />;
  return (
    <div className={styles.footer}>
      <BotCheckSurface />
      {content}
    </div>
  );
}

function Inner({ onClose, grabber }: { onClose: () => void; grabber?: React.ReactNode }) {
  return (
    <>
      {grabber}
      <Header onClose={onClose} />
      <Body />
      <Footer />
    </>
  );
}

/** Open and close the frame, and put focus where the spec says (FR-039). */
function useLifecycle(
  frame: RefObject<HTMLElement | null>,
  content: RefObject<HTMLElement | null>,
) {
  const phase = useAsk((s) => s.phase);

  // On mount while opening: morph in, then settle.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs once on mount
  useLayoutEffect(() => {
    const f = frame.current;
    const c = content.current;
    if (!f || !c || getAsk().phase !== "opening") return;
    const focusId = getAsk().openFocus === "composer" ? "ask-q" : "ask-title";
    document.getElementById(focusId)?.focus({ preventScroll: true });
    void openMorph({ frame: f, content: c }, getAsk().morphFrom).then(() => {
      if (getAsk().phase === "opening") markOpen();
    });
  }, []);

  useEffect(() => {
    if (phase !== "closing") return;
    const f = frame.current;
    const c = content.current;
    if (!f || !c) return markClosed();
    const bar = document.querySelector('[data-ask-jason="bar"]');
    void closeMorph({ frame: f, content: c }, bar ? rectOf(bar) : null).then(() => {
      if (getAsk().phase === "closing") markClosed();
    });
  }, [phase, frame, content]);
}

function escapeHandler(requestCloseFn: () => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      requestCloseFn();
    }
  };
}

function PanelShell() {
  const frame = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const settled = useAsk((s) => s.settled || s.botCheck === "interactive");
  const phase = useAsk((s) => s.phase);
  useLifecycle(frame, inner);
  return (
    <section
      ref={frame}
      role="dialog"
      aria-labelledby="ask-title"
      aria-describedby="ask-disclosure"
      className={classNames(panel.frame, panel.panelFrame)}
      data-ask-settled={settled && phase === "open" ? "true" : undefined}
      onKeyDown={escapeHandler(requestClose)}
    >
      <div ref={inner} className={panel.inner}>
        <Inner onClose={requestClose} />
      </div>
    </section>
  );
}

function SheetShell() {
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const drag = useRef<{ y0: number; dy: number; t0: number } | null>(null);
  const phase = useAsk((s) => s.phase);
  const settled = useAsk((s) => s.settled || s.botCheck === "interactive");

  // Modal: the top layer, the page behind inert, Escape fires `cancel`.
  useLayoutEffect(() => {
    const el = dialog.current;
    if (el && !el.open) el.showModal();
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, []);

  // Keep the sheet on the visible viewport while the on-screen keyboard is up.
  useEffect(() => {
    const vv = window.visualViewport;
    const el = frame.current;
    if (!vv || !el) return;
    const apply = () => {
      el.style.setProperty("--ask-vvh", `${vv.height}px`);
      el.style.setProperty("--ask-vvtop", `${vv.offsetTop}px`);
    };
    const reset = () => setTimeout(apply, 120); // iOS can leave offsetTop stale after the keyboard closes
    apply();
    vv.addEventListener("resize", apply);
    vv.addEventListener("scroll", apply);
    document.addEventListener("focusout", reset);
    return () => {
      vv.removeEventListener("resize", apply);
      vv.removeEventListener("scroll", apply);
      document.removeEventListener("focusout", reset);
    };
  }, []);

  useLifecycle(frame, inner);

  const grabber = (
    <div
      className={panel.grabber}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = { y0: e.clientY, dy: 0, t0: performance.now() };
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d || !frame.current) return;
        d.dy = Math.max(0, e.clientY - d.y0);
        frame.current.style.transform = `translateY(${d.dy}px)`;
      }}
      onPointerUp={() => {
        const d = drag.current;
        drag.current = null;
        const el = frame.current;
        if (!d || !el) return;
        const velocity = d.dy / Math.max(1, performance.now() - d.t0);
        if (d.dy > el.offsetHeight * 0.3 || velocity > 0.5) return requestClose();
        el.animate([{ transform: `translateY(${d.dy}px)` }, { transform: "translateY(0)" }], {
          duration: 200,
          easing: "ease-out",
        }).onfinish = () => {
          el.style.transform = "";
        };
      }}
    >
      <span />
    </div>
  );

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: the dialog's own Escape (cancel) handles the keyboard; a tap on the dimmed strip closes
    <dialog
      ref={dialog}
      className={panel.sheetDialog}
      aria-labelledby="ask-title"
      aria-describedby="ask-disclosure"
      data-phase={phase}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div
        ref={frame}
        className={classNames(panel.frame, panel.sheetFrame)}
        data-ask-settled={settled && phase === "open" ? "true" : undefined}
      >
        <div ref={inner} className={panel.inner}>
          <Inner onClose={requestClose} grabber={grabber} />
        </div>
      </div>
    </dialog>
  );
}

export function Panel() {
  const container = useAsk((s) => s.container);
  return container === "sheet" ? <SheetShell /> : <PanelShell />;
}
