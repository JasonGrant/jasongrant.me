import type { WritingEntry } from "@/types/content";

const SUBSTACK = "https://mrjasongrant.substack.com";

// All published posts. The 5 entries with `selected: true` appear on the
// homepage Selected Writing shelf and as the curated Selected list on /writing.
// All entries (selected and not) appear in the All-posts list on /writing,
// sorted descending by isoDate.
//
// When adding a new post: append to this array, set isoDate (YYYY-MM-DD) for
// correct sort, write a one-line blurb if you want it on the curated lists,
// and decide whether to mark it `selected: true` (which will demote a
// previously-selected post to keep the count at 5 — adjust the flags
// accordingly).
export const writing: WritingEntry[] = [
  {
    title: "I Shipped a Real Problem and Nobody Showed Up",
    date: "May 2026",
    isoDate: "2026-05-19",
    href: `${SUBSTACK}/p/i-shipped-a-real-problem-and-nobody`,
  },
  {
    title: "Your Org Chart Decides Your Speed",
    date: "May 2026",
    isoDate: "2026-05-01",
    href: `${SUBSTACK}/p/your-org-chart-decides-your-speed`,
    blurb:
      "Structure beats willpower. How team topology sets the ceiling on how fast design can ship.",
    selected: true,
  },
  {
    title: "Execution Collapsed. Direction Didn't.",
    date: "Apr 2026",
    isoDate: "2026-04-15",
    href: `${SUBSTACK}/p/execution-collapsed-direction-didnt`,
    blurb:
      "AI is absorbing the production layer of design work. What's left, and why it matters more than ever.",
    selected: true,
  },
  {
    title: "Experience Strategy",
    date: "Mar 2026",
    isoDate: "2026-03-15",
    href: `${SUBSTACK}/p/experience-strategy`,
  },
  {
    title: "We Don't Manage People — We Enable Them",
    date: "Feb 2026",
    isoDate: "2026-02-15",
    href: `${SUBSTACK}/p/we-dont-manage-people-we-enable-them`,
  },
  {
    title: "Taming Complexity in Your App",
    date: "Jan 2026",
    isoDate: "2026-01-15",
    href: `${SUBSTACK}/p/taming-complexity-in-your-app`,
  },
  {
    title: "Post-Figma Design: Real UI, Real Data",
    date: "Jul 2025",
    isoDate: "2025-07-15",
    href: `${SUBSTACK}/p/post-figma-design-real-ui-real-data`,
    blurb:
      "What it means when the design tool stops being a separate place from the product itself.",
    selected: true,
  },
  {
    title: "Design Isn't Dead. It Just Needs to Split.",
    date: "Jul 2025",
    isoDate: "2025-07-08",
    href: `${SUBSTACK}/p/design-isnt-dead-it-just-needs-to`,
    blurb:
      "The case for splitting product design into a craft track and a leadership track — and why both need to be senior.",
    selected: true,
  },
  {
    title: "Breaking Free from Micromanagement",
    date: "Jun 2025",
    isoDate: "2025-06-15",
    href: `${SUBSTACK}/p/breaking-free-from-micromanagement`,
  },
  {
    title: "Case Study: Contrast Checker",
    date: "May 2025",
    isoDate: "2025-05-15",
    href: `${SUBSTACK}/p/case-study-contrast-checker`,
  },
  {
    title: "Why Every Company Needs a UX Engineer",
    date: "Oct 2024",
    isoDate: "2024-10-15",
    href: `${SUBSTACK}/p/why-every-company-needs-a-ux-engineer`,
    blurb:
      "The hybrid role that fixes the handoff problem — what it is, what it isn't, and who to hire.",
    selected: true,
  },
  {
    title: "Innovating Beyond User Data and Feedback",
    date: "Sep 2024",
    isoDate: "2024-09-15",
    href: `${SUBSTACK}/p/innovating-beyond-user-data-and-feedback`,
  },
  {
    title: "Mastering the Art of Balancing Paradoxes",
    date: "Aug 2024",
    isoDate: "2024-08-15",
    href: `${SUBSTACK}/p/mastering-the-art-of-balancing-paradoxes`,
  },
  {
    title: "Clarity of Thought and Clarity of Communication",
    date: "Jul 2024",
    isoDate: "2024-07-15",
    href: `${SUBSTACK}/p/clarity-of-thought-and-clarity-of`,
  },
  {
    title: "Building Future-Proof Component Libraries",
    date: "Jun 2024",
    isoDate: "2024-06-15",
    href: `${SUBSTACK}/p/building-future-proof-component-libraries`,
  },
  {
    title: "Unlocking the Secret to Becoming",
    date: "May 2024",
    isoDate: "2024-05-15",
    href: `${SUBSTACK}/p/unlocking-the-secret-to-becoming`,
  },
  {
    title: "The Silent Saboteur: How Avoiding…",
    date: "Apr 2024",
    isoDate: "2024-04-15",
    href: `${SUBSTACK}/p/the-silent-saboteur-how-avoiding`,
  },
  {
    title: "Your Velocity Is Dropping — Here's Why",
    date: "Mar 2024",
    isoDate: "2024-03-15",
    href: `${SUBSTACK}/p/your-velocity-is-droppingheres-why`,
  },
];
