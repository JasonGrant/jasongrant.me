"use client";

import { lazy } from "react";

// The chat panel, the send path and the Turnstile loader live in AskJasonRoot,
// which is fetched only on the visitor's first intent (focus, tap, or the palette
// action). Nothing in the first-load bundle imports it statically.
let promise: Promise<typeof import("./AskJasonRoot")> | null = null;

export function loadRoot(): Promise<typeof import("./AskJasonRoot")> {
  if (!promise) promise = import("./AskJasonRoot");
  return promise;
}

export function rootRequested(): boolean {
  return promise !== null;
}

export const LazyRoot = lazy(() => loadRoot());
