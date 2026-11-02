"use client";

import { useEffect } from "react";

export const CMDK_OPEN_EVENT = "open-cmdk";

export const OPEN_ASK_JASON_EVENT = "open-ask-jason";

export function dispatchOpenAskJason(): void {
  window.dispatchEvent(new CustomEvent(OPEN_ASK_JASON_EVENT));
}

export function dispatchOpenCmdK(): void {
  window.dispatchEvent(new CustomEvent(CMDK_OPEN_EVENT));
}

export function useGlobalCmdK(onToggle: () => void): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onToggle]);
}

export function useEscape(onEscape: () => void, enabled = true): void {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onEscape, enabled]);
}
