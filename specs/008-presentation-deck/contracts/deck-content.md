# Contract: Deck content authoring surface

Author slides in `src/content/deck/{intro,internationalization,app-shell,close}.ts`; the
registry in `src/content/deck/index.ts` assembles them and runs `assertDeck` at import.

## A Transition slide

```ts
{
  template: "transition",
  slug: "overview",
  title: "Internationalization at Klaviyo",
  kicker: "Case 1",
  headline: "Internationalization at Klaviyo",
  sub: "A company bet, with design at the ownership table.",
  staticDescription: "Section divider introducing the first case study, Internationalization at Klaviyo.",
}
```

Cover and close are Transition slides; the close carries `links`.

## Content slides by layout

```ts
// statement — headline + body (+ optional bullets)
{ template: "content", slug: "frame", title: "Frame", kicker: "Case 1 · Frame",
  headline: "Post-IPO, 31% of revenue was international and the product was English-only.",
  layout: "statement",
  body: [["One of three to five company-wide initiatives that year. ", { em: "Design had a seat at the ownership table." }]],
  bullets: ["EMEA growth constrained by an English-only product", "…"],
  staticDescription: "…" }

// text-figure — body beside a figure (embed or image); figureSide defaults to "right"
{ …, layout: "text-figure", body: [...], figure: { kind: "embed", embed: "risk-tiers" } }
{ …, layout: "text-figure", body: [...], figure: { kind: "image", image: { src: "/work/pre-ipo-audit.png", alt: "…", width: 4032, height: 2138, stageFraction: 0.55 } } }

// figure — the figure carries the slide
{ …, layout: "figure", figure: { kind: "embed", embed: "shell-before" }, caption: "…" }

// demo — an interactive embed carries the slide; the slide is resettable
{ …, layout: "demo", embed: "settings-cascade", body: [["One sentence of setup."]], caption: "…" }

// numbers — a strip of standout stats
{ …, layout: "numbers", stats: [
    { figure: "65%", text: "France new business, quarter over quarter, immediately after launch", source: { label: "…", href: "…" } },
    { figure: "45%", text: "EMEA revenue growth year over year" } ],
  body: [["Honest attribution: …"]] }
```

## Rules

- **Slugs**: `^[a-z0-9]+(-[a-z0-9]+)*$`, unique within a section. Do not renumber; URLs are slugs.
- **`staticDescription`**: required on every slide; the non-visual equivalent of what the slide
  shows (numbers in words, what the demo demonstrates). Rendered visually hidden and, on demo
  slides, inside `<noscript>`.
- **Rich text**: `DeckText` is paragraphs of runs — plain strings, `{ em }`, `{ href, text }`.
  No glossary chips on the deck.
- **Embeds**: only ids in `DeckEmbedId`. Adding one means adding the id to the union, the
  component to `EMBEDS`, and (if interactive) the id to `INTERACTIVE_EMBEDS`.
- **Images**: `stageFraction` is the share of the 1920 frame the image occupies; it drives
  `sizes`. Use existing assets under `public/work/`; no new proprietary material.
- **Copy**: deck-authored, leadership cut. Numbers and sources match the studies exactly. Panel
  names, interviewer intel, and anything from the outline's "Panel intel" section never appear.
- **Reuse boundary**: study content modules are never imported for prose; only their types (type-
  only) and, for the timeline, the i18n study's `milestones` array.
