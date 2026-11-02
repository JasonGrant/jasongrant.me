// The development state picker (stand-in builds only; nothing imports this
// except behind a literal NEXT_PUBLIC_ASK_JASON_API === "standin" comparison).
//
//   ?ask=<scenario>        which scripted scenario to run (see scenarios.ts)
//   &open=1                open the panel on load and play the scenario's messages
//   &fast=1                no waiting: replies arrive at once (used by the axe pass)
//   &container=sheet       force the phone sheet at any width
import { DEFAULT_SCENARIO, SCENARIOS, type Scenario } from "./scenarios";

export interface Picker {
  scenario: Scenario;
  open: boolean;
  fast: boolean;
  container: "panel" | "sheet" | null;
}

let cached: Picker | undefined;

export function readPicker(): Picker {
  if (cached) return cached;
  const params = new URLSearchParams(typeof location === "undefined" ? "" : location.search);
  const id = params.get("ask");
  cached = {
    scenario: (id && SCENARIOS[id]) || DEFAULT_SCENARIO,
    open: params.get("open") === "1",
    fast: params.get("fast") === "1",
    container: params.get("container") === "sheet" ? "sheet" : null,
  };
  return cached;
}

/** Whether the URL asks for a scenario at all (the picker is otherwise idle). */
export function hasPicker(): boolean {
  return typeof location !== "undefined" && new URLSearchParams(location.search).has("ask");
}
