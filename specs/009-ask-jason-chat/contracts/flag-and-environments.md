# Contract: Feature flag, private mode, environments, and the build check

Spec FR-047 to FR-052, SC-001, SC-012, SC-014. Research D2, D3, D16, D17.

## Modes

| `NEXT_PUBLIC_ASK_JASON` | Public visitor gets | Armed browser gets | Build output |
|---|---|---|---|
| `off` (or unset or anything else) | nothing | nothing | no entry point in HTML; no chat module, key check or Turnstile reference anywhere under `.next/static` |
| `private` | nothing visible; a key check runs after hydration; no request, no storage | bar + chat, exactly as `on` | HTML carries no entry point; first-load scripts carry no chat module or Turnstile reference; the chat chunk exists unreferenced |
| `on` | bar + chat | same | entry point in every chrome page; chat chunk loaded only after first intent |

Unset must still build as `off`; the bundle check catches the webpack case where an uninlined
variable leaves the code in place.

## Environment matrix

| Environment | `NEXT_PUBLIC_ASK_JASON` | `NEXT_PUBLIC_ASK_JASON_API` | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `ASK_JASON_PREVIEW_SECRET` |
|---|---|---|---|---|
| Development (`.env.development`, committed) | `on` | `standin` | `1x00000000000000000000AA` (Cloudflare test key) | — |
| Developer override (`.env.local`, ignored) | any | `https://api.jasongrant.me` | real key | optional, to test arming |
| CI gate jobs (`quality.yml`) | `on` | `standin` | test key | — |
| CI bundle-check job | `off`, then `private` | `https://api.jasongrant.me` | test key | `ci-placeholder-secret-for-private-builds` for the `private` build |
| Vercel Preview (chosen branches) | `on` (or `private`) | `https://api.jasongrant.me` | real key | set if `private` |
| Vercel Production, before launch | `private` | `https://api.jasongrant.me` | real key | long random value |
| Vercel Production, launch | `on` | same | same | may stay set |

Changing any value is an environment change plus a redeploy. No code change is ever needed
to move between modes (FR-047).

## Private mode key flow

1. Build: `next.config.mjs` reads `ASK_JASON_PREVIEW_SECRET`; if the mode is `private` and the
   secret is missing or shorter than 32 characters, the build fails with
   `ASK_JASON_PREVIEW_SECRET is required in private mode`. Otherwise it sets
   `env.NEXT_PUBLIC_ASK_JASON_KEY_HASH` to the SHA-256 hex digest. The secret never enters the
   bundle, the HTML or a log line.
2. Arm: Jason opens `https://jasongrant.me/#ask=<secret>` once. The key gate hashes the
   fragment, compares, stores `{ key, expiresAt: now + 30 d }` in
   `localStorage["ask-jason.preview-key"]`, and removes the fragment with `replaceState`.
3. Every load in `private`: the gate re-hashes the stored key; on a match before expiry it sets
   `armed = true` and mounts the bar (after hydration; the bar is fixed, so nothing reflows); on
   a mismatch or expiry it removes the stored key and does nothing visible.
4. Rotate: change the secret in Vercel and redeploy; every stored key stops matching.
5. In `on` the gate is not present, so a fragment is inert (nothing reads it). In `off`
   nothing reads it.

Exposure accepted: the digest and the gate code are public (the repo is public anyway); they
reveal that a private mode exists, not the key. The key itself travels only in a URL fragment.

## Build check — `scripts/check-ask-jason-bundle.mjs <off|private|on>`

Markers searched (as plain strings in built files):

| Marker | Meaning |
|---|---|
| `challenges.cloudflare.com` | Turnstile reference |
| `data-ask-jason` | entry point markup |
| `api.jasongrant.me/api/` | chat client |

Inputs: every `.next/server/app/**/*.html` (prerendered pages), each page's `<script src>` set
(first-load scripts, resolved under `.next/static`), and for `off` every file under
`.next/static`.

| Mode | Fails when |
|---|---|
| `off` | any marker in any HTML, first-load script, or any file under `.next/static` |
| `private` | any marker in any HTML or first-load script (an unreferenced chunk with markers is reported, not failed) |
| `on` | `data-ask-jason` missing from any chrome page's HTML, or `challenges.cloudflare.com` present in any first-load script |

Deck pages are excluded from the `on` requirement and included in every "must not contain"
rule.

## CI changes (`.github/workflows/quality.yml`)

- Lighthouse (both) and axe jobs: build env adds `NEXT_PUBLIC_ASK_JASON: on`,
  `NEXT_PUBLIC_ASK_JASON_API: standin`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY: 1x00000000000000000000AA`.
- New `bundle-check` job: `npm ci`; build with `off` and run the check; remove `.next`; build
  with `private` (placeholder secret) and run the check. Runs on `ubuntu-latest` (no browser
  needed).
- `scripts/axe-check.mjs` gains one open-state URL on the home page per stand-in scenario in
  data-model.md §9, each as `/?ask=<id>&open=1`, except the two timing-only scenarios
  (`slow-health`, `no-meta`): `empty`, `answer-1`, `answer-3`, `options`, `deflect`, `none`,
  `correction-text`, `correction-options`, `long`, `error-event`, `drop`, `too-long`,
  `not-text`, `address-limit`, `countdown`, `turn-limit`, `session-closed`, `session-expired`,
  `capped-health`, `down-health`, `capped-session`, `unavailable-chat`, `old-version`,
  `voice-on`, `bot-pass`, `bot-fail`, `bot-interactive`; plus two sheet variants,
  `/?ask=answer-3&open=1&container=sheet` and `/?ask=options&open=1&container=sheet`. That is
  every state of spec FR-030, which is what FR-053 requires. The scripts add `&fast=1` (no
  waiting) to every scenario but `slow-health`, whose two-second health is the loading state,
  so the list is 31 URLs: 28 scenarios, two sheet variants and the slow-health URL.
- Lighthouse URL lists are unchanged (the bar is on every measured page already).

## Secret hygiene (SC-014)

- `git grep -n ASK_JASON_PREVIEW_SECRET` returns only `next.config.mjs`, the workflow (the
  placeholder), and the specs.
- The real value is never pasted into the repo, a PR, an issue, or a chat; Jason sets it in the
  Vercel dashboard.
- A repository search for the real value (run locally by Jason) returns nothing.
