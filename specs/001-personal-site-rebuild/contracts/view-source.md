# Contract: View-Source First Comment

**Feature**: 001-personal-site-rebuild
**Related**: FR-080, US4 acceptance scenario 3

The first child of `<head>` on every shipped HTML response MUST be an HTML
comment that carries the build credit, the repo URL, and a contact address.
This is the FR-080 view-source signal — the page rewards the design-engineer
audience that opens dev tools.

## Required content

```html
<!--
  Hi. You looked at the source — that's the design-engineering tell.
  This site is hand-rolled in Next.js 15 + React 19 with plain CSS.
  Repo: https://github.com/jasongrant/jasongrant.me
  If you're building at the intersection of design and code, reach out:
  hello@jasongrant.me
-->
```

The exact text is sourced from `src/content/site.ts::site.buildCredit.headComment`
to keep it editable in one place.

## Implementation contract

A small server component `<HeadComment />` renders the comment via
`dangerouslySetInnerHTML` so Next.js does not strip the comment in
production. It is rendered as the **first** child of `<head>` in
`src/app/layout.tsx`, before `<Schema>`, before any `<meta>`, before the
favicon link.

```tsx
// src/components/chrome/HeadComment.tsx
import { site } from "@/content/site";

export function HeadComment() {
  // Build-time assertion: the comment text MUST NOT contain "-->"
  if (site.buildCredit.headComment.includes("-->")) {
    throw new Error("buildCredit.headComment contains '-->' which would break the HTML comment");
  }
  return (
    <script
      type="text/html"
      dangerouslySetInnerHTML={{
        __html: `<!--\n  ${site.buildCredit.headComment.replace(/\n/g, "\n  ")}\n-->`,
      }}
    />
  );
}
```

> Note: `<script type="text/html">` is one of the few tag patterns Next.js
> reliably keeps verbatim in `<head>` without escaping the inner HTML
> characters. The browser ignores the script body; view-source displays
> the raw comment text. Implementation detail; the *contract* is just
> "first thing in `<head>` is the comment text above."

## Validation

- The first non-whitespace bytes of `<head>` content MUST begin with `<!--`.
- The comment MUST contain the literal substrings `Repo: https://`,
  `hello@jasongrant.me`, and `Next.js`.
- These three checks MAY be added to a launch smoke script (`curl https://jasongrant.me | head -50 | grep ...`)
  but are not enforced at build time beyond the `-->` assertion above.
