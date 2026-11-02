// Whether this browser may see the Ask Jason widget at all.
//
// "on"      always true.
// "private" false until components/ask/keyGate.ts has checked Jason's preview key.
// "off"     always false.
//
// A tiny external store of its own, kept outside components/ask/, so the command
// palette (loaded on every page) can ask the question without pulling widget code in.
import { useSyncExternalStore } from "react";
import { ASK_JASON_MODE } from "./askJasonFlag";

let armed = ASK_JASON_MODE === "on";
const listeners = new Set<() => void>();

export function setAskArmed(value: boolean): void {
  if (armed === value) return;
  armed = value;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAskArmed(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => armed,
    () => ASK_JASON_MODE === "on",
  );
}
