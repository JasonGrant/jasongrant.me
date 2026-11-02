"use client";

// The chat panel, the send path and the Turnstile loader live in AskJasonRoot,
// which is fetched only on the visitor's first intent (focus, tap, or the palette
// action). Nothing in the first-load bundle imports it statically.
//
// The bar renders the module once it has loaded, from plain state. It deliberately
// does NOT use React.lazy under a Suspense boundary: while a lazy chunk is pending
// React cannot commit the renders for the visitor's keystrokes, and a controlled
// input snaps back to its old value, so the first characters typed right after
// focusing the field would be lost.
type RootModule = typeof import("./AskJasonRoot");

let promise: Promise<RootModule> | null = null;
let loaded: RootModule | null = null;

export function loadRoot(): Promise<RootModule> {
  if (!promise) {
    promise = import("./AskJasonRoot").then((m) => {
      loaded = m;
      return m;
    });
  }
  return promise;
}

/** The module if it has already loaded, else null. */
export function loadedRoot(): RootModule | null {
  return loaded;
}
