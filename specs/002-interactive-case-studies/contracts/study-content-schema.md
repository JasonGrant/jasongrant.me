# Contract: Study Content Authoring Schema

**Feature**: 002-interactive-case-studies
**Consumers**: study authors (Jason / future studies); the player and page scaffold.

This is the authoring contract US4 depends on: a new study adds content under
`src/content/work/<slug>/`, a registry entry, and its URL in the three CI files
(both Lighthouse configs + the axe script — unlisted routes are shipped pages
for every gate). It MAY add new replica screens (component + anchor union); it
NEVER modifies the player, existing replica components, or the page scaffold.

## Authoring surface

```ts
// src/content/work/<slug>/index.ts
export const study: CaseStudy = {
  slug: 'internationalization',
  title: '…', description: '…', listed: false,
  company: 'Klaviyo', role: '…', timeline: 'Q4 2023 – Q2 2024',
  blocks: [
    { kind: 'prose', id: 'overview', heading: '…', body: [ '…', { term: 'i18n' }, '…' ] },
    { kind: 'demo', id: 'break', demo: 'language-break', intro: […], staticCaption: '…' },
    { kind: 'walkthrough', id: 'org-settings', title: '…', screen: 'org-settings',
      steps: [ { target: 'business-language-select', action: 'select',
                 value: 'French', highlight: true,
                 caption: '…', narrationText: '…', durationMs: 4000 } ] },
  ],
};
```

## Guarantees to authors

1. `target` values are compile-checked against the named screen's anchor union —
   a typo is a `tsc` error naming the valid anchors.
2. `narrationText` is required on every step; the player renders it as the
   transcript today and it becomes the MP3 narration script later, unchanged.
3. Step order is presentation order; `durationMs` paces autoplay mode only —
   self-guided and reduced-motion visitors pace themselves.
4. Demo factual constants (published strings, tiers, locales) are NOT authorable —
   they live in the demo components, pinned to published sources (SC-007).
5. Build-time assertions reject: duplicate slugs, empty blocks/steps, missing
   narration text (data-model.md Validation).

## Guarantees to the framework (SC-006 separation review)

- Player, replica kit, and scaffold contain zero study-specific copy, data, or
  branching. Grep-level check: study strings appear only under
  `src/content/work/` (demo factual constants under `src/components/work/demos/`
  are guideline facts, not study copy).
- Study #2 (candidate: the free-to-paid experiments — see private cortex corpus)
  must be addable per this contract alone. Anticipated needs are already
  representable: variant toggles = a demo component; experiment walkthrough =
  segments over new replica screens (new screen = new component + anchor union,
  no player change). Per-study CI touchpoint: its URL joins both Lighthouse
  configs and the axe script (research D14).
