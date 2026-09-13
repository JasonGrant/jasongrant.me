// The secret path segment for the presentation deck (feature 008).
//
// Read at BUILD time only — from generateStaticParams and server components
// under src/app/deck — so the deck is prerendered like every other route and
// the site stays fully static. Never import this from a client component.
//
// The value is never committed: production/preview set DECK_SLUG in Vercel,
// CI sets DECK_SLUG=ci so gate URLs in committed config never carry the real
// value, and a fresh clone falls back to "dev". Rotating the variable and
// redeploying revokes every previously shared link. See
// specs/008-presentation-deck/contracts/routes.md.
export const DECK_SLUG_FALLBACK = "dev";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getDeckSlug(): string {
  const value = process.env.DECK_SLUG?.trim();
  return value && SLUG_RE.test(value) ? value : DECK_SLUG_FALLBACK;
}
