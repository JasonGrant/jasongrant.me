export interface OrgSettings {
  lang: string;
  fmt: string;
  langs: string[];
}

// A tiny module-level store bridging the two independent SettingsPanel
// instances (Organization and Personal render in separate walkthrough
// segments, so they cannot share React state through a common parent). The
// Organization panel publishes its saved settings here; the Personal panel
// reads them as its inherited default.
//
// Only the Organization panel writes, and only from a Save click (a client
// interaction) — so on the server this stays null and the server/first-client
// snapshot always agree (no hydration mismatch, no cross-request leakage).
let current: OrgSettings | null = null;
const listeners = new Set<() => void>();

export function getOrgSettings(): OrgSettings | null {
  return current;
}

export function setOrgSettings(next: OrgSettings): void {
  current = next;
  for (const listener of listeners) listener();
}

export function subscribeOrgSettings(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}
