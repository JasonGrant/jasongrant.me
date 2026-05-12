# Contract: Newsletter Subscribe

**Feature**: 001-personal-site-rebuild
**Related**: FR-016, R5

The inline newsletter form on the homepage Writing section subscribes
visitors to Jason's Substack. There is **no** server-side endpoint on
this site — the browser POSTs directly to Substack via opaque CORS.

## Request

```
POST https://${NEXT_PUBLIC_SUBSTACK_SUBDOMAIN}.substack.com/api/v1/free
Content-Type: multipart/form-data
Mode: no-cors

email=<user-supplied>&first_referrer=<window.location.href>
```

- `NEXT_PUBLIC_SUBSTACK_SUBDOMAIN` defaults to `designingforward` if unset.
- `email` is required, validated client-side by `<input type="email" required>`
  and a defensive RFC 5322-ish check in `lib/newsletter.ts`.
- `first_referrer` is captured from `window.location.href` for Substack's
  attribution; not user-controllable beyond the page they came from.

## Response

Opaque (`mode: 'no-cors'`). The response is unreadable by JavaScript by
design. We treat any non-throw as success.

## Client state machine

```
idle ──submit──> sending ──fetch resolves──> done
                          ──fetch throws───> error
```

| State     | UI                                                |
|-----------|---------------------------------------------------|
| idle      | input + Subscribe button enabled                  |
| sending   | input enabled but visually muted; button reads "Subscribing…", disabled |
| done      | replaces form with: "Check your inbox to confirm." |
| error     | restores form with inline message; user may retry |

Substack subsequently emails the visitor a confirmation link. We do not
track whether they confirmed.

## Failure modes

- **Network failure** (offline, DNS, etc.): `fetch` throws → state `error` →
  inline message "Something went wrong. Try again?" with the form re-enabled.
- **Substack rejects** (rate-limited, banned email, malformed): Opaque mode
  hides this; we cannot distinguish from success. Substack will silently not
  send the confirmation email; the visitor will not see a confirmation link.
  This is the established Substack pattern and is acceptable.
- **Bot submission**: No CAPTCHA in v1. Substack handles bot/spam filtering
  on their side. If volume becomes a problem post-launch, add a honeypot
  field (not in this spec).

## Privacy

- Email is sent only to Substack, never to this site's server (there is none
  for this purpose) and never to Vercel Analytics. The form submit handler
  does not call any analytics function.
- No cookies are set by this form.
