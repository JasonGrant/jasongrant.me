// Private mode's key check (spec FR-047a/b). In "private" the public sees no
// widget; a browser that holds Jason's preview key sees it exactly as in "on".
//
//   Arm:    open any page once with #ask=<key> in the address. Browsers never send
//           the fragment to a server, so the key reaches no log. The check hashes it,
//           compares to the digest baked in at build time, stores the key in this
//           browser for 30 days and removes the fragment from the address bar.
//   Check:  on every load the stored key is hashed again. Rotating the secret and
//           redeploying changes the digest, so every armed browser stops matching.
// The key itself is never in the repository or the page; only its SHA-256 digest is.
const STORAGE_KEY = "ask-jason.preview-key";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const DIGEST = process.env.NEXT_PUBLIC_ASK_JASON_KEY_HASH ?? "";

async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function takeFragmentKey(): string | null {
  const match = /(?:^#|&)ask=([^&]+)/.exec(location.hash);
  if (!match) return null;
  history.replaceState(null, "", location.pathname + location.search);
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

/** Whether this browser holds a valid preview key. Never throws. */
export async function checkKey(): Promise<boolean> {
  try {
    if (!DIGEST || !globalThis.crypto?.subtle) return false;
    const offered = takeFragmentKey();
    if (offered && (await sha256Hex(offered)) === DIGEST) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ key: offered, expiresAt: Date.now() + THIRTY_DAYS_MS }),
      );
      return true;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const stored = JSON.parse(raw) as { key?: string; expiresAt?: number };
    if (
      stored.key &&
      (stored.expiresAt ?? 0) > Date.now() &&
      (await sha256Hex(stored.key)) === DIGEST
    ) {
      return true;
    }
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage or crypto unavailable: not armed.
  }
  return false;
}
