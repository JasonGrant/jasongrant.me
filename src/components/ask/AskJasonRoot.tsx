"use client";

import { useEffect } from "react";
import { Panel } from "./Panel";
import { StatusRegion } from "./StatusRegion";
import * as actions from "./actions";
import { getAsk, setAsk, useAsk } from "./store";

// Everything that runs only after the visitor's first intent. Fetched by rootLoader
// on the first focus, tap or palette action; nothing in the first-load bundle
// imports this file. It consumes the open request the bar left in the store, keeps
// the container (panel or sheet) matched to the viewport, and, in stand-in builds,
// plays the scenario in the URL.
export { actions };

const PHONE = "(max-width: 767px)";

export default function AskJasonRoot() {
  const phase = useAsk((s) => s.phase);
  const request = useAsk((s) => s.request);

  // A session left by an earlier page of this tab.
  useEffect(() => {
    actions.hydrateSession();
  }, []);

  // The phone sheet below 768 px, the docked panel above.
  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    let forced: "panel" | "sheet" | null = null;
    const apply = () => setAsk({ container: forced ?? (mq.matches ? "sheet" : "panel") });
    apply();
    if (process.env.NEXT_PUBLIC_ASK_JASON_API === "standin") {
      void import("./statePicker").then((m) => {
        forced = m.readPicker().container;
        apply();
      });
    }
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Consume the open request the bar (or the palette) left for us.
  useEffect(() => {
    if (!request) return;
    setAsk({ request: null });
    const sheet = getAsk().container === "sheet";
    if (request.kind === "send") {
      actions.openChat("bar", request.rect, "composer");
      void actions.sendMessage(request.text);
    } else {
      const focus = sheet && request.by === "bar" ? "composer" : "heading";
      actions.openChat(request.by, request.rect, focus);
      if (process.env.NEXT_PUBLIC_ASK_JASON_API === "standin") {
        void import("./statePicker").then(async (m) => {
          const picker = m.readPicker();
          if (!picker.open) return;
          await actions.autoplay(picker.scenario.prompts ?? []);
          setAsk({ settled: true });
        });
      }
    }
  }, [request]);

  return (
    <>
      <StatusRegion />
      {phase !== "closed" ? <Panel /> : null}
    </>
  );
}
