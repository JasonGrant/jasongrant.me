# Quickstart: jasongrant.me Rebuild

**Feature**: 001-personal-site-rebuild
**Date**: 2026-05-11

How to work on this feature locally and how to verify a change before
merging. Constitution v1.1.0 gates are pass/fail — if any of them fail,
do not ship.

---

## 1. First-time setup

```bash
git checkout 001-personal-site-rebuild
npm ci
cp .env.example .env.local                # if .env.example exists; otherwise create
echo 'NEXT_PUBLIC_SUBSTACK_SUBDOMAIN=designingforward' >> .env.local
```

Optional environment variables:

| Var                                 | Default            | Purpose                          |
|-------------------------------------|--------------------|----------------------------------|
| `NEXT_PUBLIC_SUBSTACK_SUBDOMAIN`    | `designingforward` | Substack newsletter target       |

---

## 2. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000.

| Route          | What you should see                                     |
|----------------|---------------------------------------------------------|
| `/`            | Warm-dark home with Hero, NowBlock, Work shelf (4 entries with Hypoth nesting Wren+Olllo), Writing shelf (5 entries), inline Newsletter |
| `/experience`  | Long-form chronological roles, Hypoth as a top-level entry, downloadable resume link |
| `/writing`     | Selected (5) above Archive (full chronological); Substack RSS link |
| `/colophon`    | Short page naming Petrona / Funnel Sans / DM Mono, Next.js, Vercel, design tokens |

Press `Cmd+K` (or `Ctrl+K`) on any page — the palette should open with
items grouped Navigate / Work / External / Meta. Press `Esc` to close.

---

## 3. Editing content

All copy lives in `src/content/`. No CMS. No MDX in v1.

| Edit               | File                          |
|--------------------|-------------------------------|
| The "Now" block    | `src/content/now.ts`          |
| Work entries       | `src/content/work.ts`         |
| Writing list       | `src/content/writing.ts`      |
| Cmd+K palette      | `src/content/palette.ts`      |
| Site-wide chrome   | `src/content/site.ts`         |

Hot reload picks up content changes immediately.

### Monthly content checklist (operational, per SC-008)

On the first work day of each month:

- [ ] Update `src/content/now.ts::updated` to current `{ month, year }`.
- [ ] Review `nowLines` — replace any line that is no longer current.
- [ ] Add the previous month's published Substack post to
      `src/content/writing.ts` (top of array, with `selected` reconsidered
      against the curated five).
- [ ] If a new role/title at Hi Marley or elsewhere has changed, update
      `src/content/work.ts`.
- [ ] Commit and ship.

---

## 4. Verifying a change before shipping

Constitution v1.1.0 Workflow & Quality Gates — every gate must pass for
any change that ships visible code.

### 4.1 Local build & lint

```bash
npx tsc --noEmit          # Gate 1: TypeScript clean
npx biome check .         # Gate 2: Biome clean
npm run build             # Verify a clean production build
```

### 4.2 Lighthouse (Gate 4 + Gate 5)

```bash
# Local (against dev server, less reliable than preview)
npx lighthouse http://localhost:3000 --view --preset=desktop
npx lighthouse http://localhost:3000 --view  # mobile profile is the default

# Preferred: against the Vercel preview build for the PR
npx lighthouse https://<your-vercel-preview>.vercel.app --view --preset=desktop
npx lighthouse https://<your-vercel-preview>.vercel.app --view
```

Required for every changed page (`/`, `/experience`, `/writing`, `/colophon`):

- Performance ≥ 95 (mobile + desktop)
- Accessibility ≥ 95 (mobile + desktop)
- Best Practices ≥ 95 (mobile + desktop)
- SEO ≥ 95 (mobile + desktop)
- CLS = 0 (check the Lighthouse "Cumulative Layout Shift" diagnostic)

If any score drops below 95, **do not ship.** Either fix the regression or
revert. Negotiating the gate downward is not permitted.

### 4.3 Accessibility scan (Gate 3)

For each changed page:

1. Open the page in Chrome.
2. Open DevTools → axe DevTools panel.
3. Click "Scan all of my page."
4. Required: zero `serious` or `critical` issues.
5. Spot-check color contrast in the Lighthouse Accessibility audit.

### 4.4 Manual keyboard pass (Gate 6)

1. Click into the URL bar and press `Tab` repeatedly.
2. Every interactive element MUST receive a visible focus ring (the design's
   default for `:focus-visible` is a teal accent outline; do not remove it).
3. Test the command palette: `Cmd+K` opens, `↑/↓` move selection, `Enter`
   activates, `Esc` closes.

### 4.5 Screen-reader smoke (Gate 6)

On macOS Safari with VoiceOver enabled (`Cmd+F5`):

1. Land on `/`; the page title should be announced.
2. Use `Ctrl+Option+→` to walk the page; verify headings are announced as
   headings, the work entries as articles, and links as links with
   meaningful labels.
3. Open the Cmd+K palette; verify it announces as a dialog and the listbox
   options are navigable.

### 4.6 Visual check (Gate 7)

The site ships single warm-dark only — there is no light mode to check.
Confirm:

- No flash of unstyled content (FOUC) on hard refresh.
- The cursor-tracked halo follows the cursor, but only when not under
  reduced motion.
- The grain is animated (subtle) when not under reduced motion.

Then enable `prefers-reduced-motion` in DevTools → Rendering → Emulate
CSS media feature → `prefers-reduced-motion: reduce`. Reload and confirm:

- The halo is fully removed (`display: none`).
- The grain is static (no animation).
- The reveal-on-enter for section labels is suppressed.

### 4.7 Banned-pattern check (Gate 8)

Visually scan changed surfaces for any banned-by-Principle-IV pattern that
sneaked in: scale-transform hover, drop shadow, parallax, decorative
illustration, etc. The only allowed gradients are the ambient halo (≤6%
opacity) and any gradient inside an SVG that is part of an icon.

---

## 5. Pre-launch (one-time, before first share with a recruiter)

These are tracked in spec FR-093 and rebuild plan §7. They are NOT in this
codebase but they are launch blockers:

- [ ] Hypoth domain switched to `https://hypoth.ai` (DNS configuration on
      the Hypoth Vercel project).
- [ ] Hypoth footer reads "Founded by Jason Grant" (or aligned phrasing) so
      it does not contradict this site's "founded" framing on a 30-second
      click-through.
- [ ] All outbound links from the rebuilt site verified live (Wren site,
      Wren case study, Hypoth, Olllo, Substack).
- [ ] Substack publication tagline updated to align with the new positioning
      (something tied to design leadership in the AI-native moment).
- [ ] `public/resume.pdf` is current (SC-009).
- [ ] `src/content/now.ts::updated` is current (within the last 6 weeks).
- [ ] Final Lighthouse run on production (`https://jasongrant.me`) all four
      categories ≥ 95 on mobile and desktop.
- [ ] Final axe scan on production with zero `serious`/`critical` issues.
- [ ] Final view-source check: first child of `<head>` is the build credit
      comment with repo URL and contact email (FR-080).

---

## 6. Common gotchas

- **CSS Modules class composition**: The design uses several utility-style
  classes (`.is-active`, `.is-in`). Compose with `classnames` (already a
  dep) rather than concatenating strings.
- **The Cmd+K trigger button must NOT submit any enclosing form**. The
  trigger is currently inside the Footer; ensure `type="button"`.
- **`mode: 'no-cors'` returns an opaque Response**. You cannot read its
  status — treat any non-throw as success and rely on Substack's
  confirmation email.
- **The `<HeadComment>` component is a server component**. Do not add
  `"use client"` or it will lose its rendered position at the top of `<head>`.
- **`prefers-reduced-motion` must gate BOTH the CSS rules AND the JS
  pointer-listener attachment** for the halo. The mockup gets this right —
  do not regress.
