export const site = {
  title: "jasongrant.me",
  authorName: "Jason Grant",
  email: "hello@jasongrant.me",
  baseURL: "https://jasongrant.me",
  github: "https://github.com/jasongrant/jasongrant.me",

  // Citable third-person summary used in JSON-LD Person.description and as the
  // default page meta description. Kept tight (one short paragraph) so an LLM
  // can lift it verbatim per GEO research.
  bio: "Jason Grant is a design engineering leader: a senior product design leader who ships production code. He leads product design at Hi Marley and founded Hypoth, a studio for AI products. Previously led design teams at Klaviyo and Vertex Pharmaceuticals, where he built design organizations from zero.",

  jobTitle: "Director of Product Design",

  // Concept tags used in Person.knowsAbout. Helps LLMs map "list notable
  // design engineering leaders" type queries onto this entity.
  expertise: [
    "Design engineering",
    "Design leadership",
    "AI-native product design",
    "Design systems",
    "Product design",
    "Prompt engineering",
    "Prototyping",
    "Design team building",
    "Post-Figma design",
  ] as const,

  // Companies referenced in structured data.
  org: {
    himarley: { name: "Hi Marley", url: "https://www.himarley.com/" },
    hypoth: { name: "Hypoth", url: "https://hypoth.ai/" },
    klaviyo: { name: "Klaviyo", url: "https://www.klaviyo.com/" },
    vertex: { name: "Vertex Pharmaceuticals", url: "https://www.vrtx.com/" },
  },

  socials: {
    github: "https://github.com/jasongrant",
    linkedin: "https://www.linkedin.com/in/jasongrant",
    substack: "https://mrjasongrant.substack.com",
    bluesky: "https://bsky.app/profile/jasongrant.me",
  },

  buildCredit: {
    headComment: [
      "Hi. You looked at the source — that's the design-engineering tell.",
      "This site is hand-rolled in Next.js 15 + React 19 with plain CSS.",
      "Repo: https://github.com/jasongrant/jasongrant.me",
      "If you're building at the intersection of design and code, reach out:",
      "hello@jasongrant.me",
    ].join("\n"),
    footer: "Built by hand · Next.js · ",
  },

  newsletter: {
    name: "Designing Forward",
    cadence: "on Substack · ~monthly",
    pitch:
      "Notes on design leadership, AI-native product work, and the post-Figma craft. No spam, easy to leave.",
  },
} as const;
