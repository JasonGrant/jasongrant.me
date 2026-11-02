"use client";

// Cloudflare Turnstile, loaded and run only on the visitor's first intent. The
// chat API issues a session only against a Turnstile token (chat-api.md), so this
// is the widget's one third-party script. It is injected asynchronously, never in
// the page's first-load HTML, which keeps it out of Lighthouse's navigation trace.
//
// The widget runs in "managed" mode, hidden until a human check is actually needed
// (appearance: "interaction-only"), and only when asked (execution: "execute"):
//   prewarmToken()  on the first keystroke or starter tap: run it quietly, off screen
//   getToken()      at send time: reuse the warm token, or run it in the panel's surface
// Tokens live five minutes and work once, so a token older than TOKEN_MAX_AGE_MS is
// discarded. A quiet run that turns out to need interaction is thrown away; the
// send then runs it again inside the visible surface.
import type { BotCheck } from "./store";

interface TurnstileApi {
  render(container: HTMLElement, options: Record<string, unknown>): string | undefined;
  execute(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    __askJasonTurnstileReady?: () => void;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const TOKEN_MAX_AGE_MS = 270_000;

export class TurnstileError extends Error {}
class InteractionNeeded extends Error {}

export interface TokenHooks {
  setState(state: BotCheck): void;
}

let apiPromise: Promise<TurnstileApi> | null = null;
let widgetId: string | null = null;
let surface: HTMLElement | null = null;
let surfaceWaiters: Array<(el: HTMLElement) => void> = [];
let offscreen: HTMLElement | null = null;
let warm: { promise: Promise<string>; startedAt: number } | null = null;

export function loadTurnstile(): Promise<TurnstileApi> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<TurnstileApi>((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    window.__askJasonTurnstileReady = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new TurnstileError("Turnstile did not initialise"));
    };
    const script = document.createElement("script");
    script.src = `${SCRIPT_SRC}?render=explicit&onload=__askJasonTurnstileReady`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      apiPromise = null;
      script.remove();
      reject(new TurnstileError("Turnstile could not be loaded"));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}

/** The panel's bot-check surface registers itself here when it mounts. */
export function setBotCheckSurface(el: HTMLElement | null): void {
  surface = el;
  if (el) {
    for (const wake of surfaceWaiters) wake(el);
    surfaceWaiters = [];
  } else {
    removeWidget();
  }
}

function waitForSurface(): Promise<HTMLElement> {
  if (surface) return Promise.resolve(surface);
  return new Promise((resolve) => surfaceWaiters.push(resolve));
}

function offscreenHost(): HTMLElement {
  if (offscreen?.isConnected) return offscreen;
  offscreen = document.createElement("div");
  offscreen.setAttribute("aria-hidden", "true");
  offscreen.style.cssText =
    "position:fixed;left:-10000px;top:0;width:300px;height:65px;overflow:hidden;pointer-events:none";
  document.body.appendChild(offscreen);
  return offscreen;
}

function removeWidget(): void {
  if (widgetId && window.turnstile) {
    try {
      window.turnstile.remove(widgetId);
    } catch {
      // The widget may already be gone with its container.
    }
  }
  widgetId = null;
}

function siteKey(override?: string): string | undefined {
  return override ?? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
}

async function run(key: string, quiet: boolean, hooks?: TokenHooks): Promise<string> {
  const api = await loadTurnstile();
  const host = quiet ? offscreenHost() : await waitForSurface();
  removeWidget();
  return new Promise<string>((resolve, reject) => {
    const id = api.render(host, {
      sitekey: key,
      theme: "dark",
      size: "flexible",
      appearance: "interaction-only",
      execution: "execute",
      language: document.documentElement.lang || "en",
      tabindex: 0,
      callback: (token: string) => {
        hooks?.setState("verified");
        resolve(token);
      },
      "before-interactive-callback": () => {
        if (quiet) {
          removeWidget();
          reject(new InteractionNeeded());
        } else {
          hooks?.setState("interactive");
        }
      },
      "after-interactive-callback": () => hooks?.setState("checking"),
      "error-callback": () => {
        reject(new TurnstileError("The bot check failed to run"));
        return true;
      },
      "timeout-callback": () => reject(new TurnstileError("The bot check timed out")),
    });
    if (!id) return reject(new TurnstileError("Turnstile did not render"));
    widgetId = id;
    api.execute(id);
  });
}

/** Run the check quietly, ahead of the send. Never throws: a failure just means getToken() runs it later. */
export function prewarmToken(override?: string): void {
  const key = siteKey(override);
  if (!key || (warm && Date.now() - warm.startedAt < TOKEN_MAX_AGE_MS)) return;
  const promise = run(key, true);
  warm = { promise, startedAt: Date.now() };
  promise.catch(() => {
    if (warm?.promise === promise) warm = null;
  });
}

/** A fresh token for POST /api/session, from the warm run if there is one. */
export async function getToken(hooks: TokenHooks, override?: string): Promise<string> {
  const key = siteKey(override);
  if (!key) throw new TurnstileError("No Turnstile site key is configured");
  hooks.setState("checking");
  if (warm && Date.now() - warm.startedAt < TOKEN_MAX_AGE_MS) {
    const current = warm;
    try {
      const token = await current.promise;
      if (warm === current) warm = null;
      hooks.setState("verified");
      return token;
    } catch {
      if (warm === current) warm = null;
    }
  }
  return run(key, false, hooks);
}

/** Forget a warm token (a retry after failure starts clean). */
export function resetToken(): void {
  warm = null;
  removeWidget();
}
