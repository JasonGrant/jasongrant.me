"use client";

import { Column, Text } from "@once-ui-system/core";
import { PageLayout } from "@/components/PageLayout";
import { Timeline } from "@/components/Timeline";

const writingItems = [
  {
    date: "Jul 02, 2025",
    title: "Design isn’t dead. It just needs to split.",
    description: "We keep trying to fit design into a role that no longer exists. Maybe the problem isn’t design. Maybe it’s our org chart.",
    url: "https://mrjasongrant.substack.com/p/design-isnt-dead-it-just-needs-to",
    type: "external" as const,
    // image: {
    //   src: "/images/writing/2025-07-02-DesignIsNotDead.webp",
    //   alt: "Image of a design engineer",
    //   width: 120,
    //   height: 120
    // }
  },
  {
    date: "Nov 19, 2024",
    title: "Breaking Free from Micromanagement",
    description: "How effective upward communication builds confidence in leaders and can free you from the burden of micromanagement.",
    url: "https://mrjasongrant.substack.com/p/breaking-free-from-micromanagement",
    type: "external" as const,
    // image: {
    //   src: "/images/writing/2024-11-19-BreakingFreeMicromanagement.webp",
    //   alt: "Image of a micromanagement",
    //   width: 120,
    //   height: 120
    // }
  },
  {
    date: "Oct 31, 2024",
    title: "Case Study: Contrast Checker",
    description: "Building an integrated, clutter-free tool for accessible contrast.",
    url: "https://mrjasongrant.substack.com/p/case-study-contrast-checker",
    type: "external" as const,
    // image: {
    //   src: "/images/writing/2024-10-31-Contrast.webp",
    //   alt: "Image of a contrast checker",
    //   width: 120,
    //   height: 120
    // }
  },
  {
    date: "Oct 29, 2024",
    title: "Why Every Company Needs a UX Engineer",
    description: "Blending design and engineering to drive innovation, efficiency, and growth.",
    url: "https://mrjasongrant.substack.com/p/why-every-company-needs-a-ux-engineer",
    type: "external" as const,
    // image: {
    //   src: "/images/writing/2024-10-29-Unicorn.webp",
    //   alt: "Image of a unicorn",
    //   width: 120,
    //   height: 120
    // }
  },
  {
    date: "Oct 22, 2024",
    title: "Innovating Beyond User Data and Feedback",
    description: "How Figma\'s multiplayer feature exemplifies the importance of making bold, intuitive decisions even when customers don\'t see the need.",
    url: "https://mrjasongrant.substack.com/p/innovating-beyond-user-data-and-feedback",
    type: "external" as const,
    // image: {
    //   src: "/images/writing/2024-10-22-Figma-Multiuser.webp",
    //   alt: "Image of Figma's multiplayer feature",
    //   width: 120,
    //   height: 120
    // }
  },
  {
    date: "Oct 18, 2024",
    title: "Mastering the Art of Balancing Paradoxes",
    description: "How Success Lies in Thriving Amid Change, Raising the Bar, and Leading with Both Principles and Adaptability.",
    url: "https://mrjasongrant.substack.com/p/mastering-the-art-of-balancing-paradoxes",
    type: "external" as const,
    // image: {
    //   src: "/images/writing/2024-10-18-Paradoxes.webp",
    //   alt: "Image of a balancing act",
    //   width: 120,
    //   height: 120
    // },
  },
  {
    date: "Oct 08, 2024",
    title: "Clarity of Thought and Clarity of Execution",
    description: "The Path to Successful Outcomes is Think Before you Do",
    url: "https://mrjasongrant.substack.com/p/clarity-of-thought-and-clarity-of",
    type: "external" as const,
    // image: {
    //   src: "/images/writing/2024-10-08-ClarityThoughtExecution.webp",
    //   alt: "Image of a clarity of thought and clarity of execution",
    //   width: 120,
    //   height: 120
    // },
  },
  {
    date: "Oct 02, 2024",
    title: "Building Future Proof Component Libraries",
    description: "Why investing in flexibility today can lead to scalable success tomorrow.",
    url: "https://mrjasongrant.substack.com/p/building-future-proof-component-libraries",
    type: "external" as const,
  },
  {
    date: "Apr 09, 2018",
    title: "Which app is apt: native app vs. hybrid app?",
    description: "Learn what distinguishes a native app vs. hybrid app to determine which kind of build will best fit your enterprise needs.",
    url: "https://www.techtarget.com/searchsoftwarequality/tip/Which-app-is-apt-native-app-vs-hybrid-app",
    type: "external" as const,
  },
  {
    date: "Feb 28, 2018",
    title: "A DevOps beginner's guide for user experience professionals",
    description: "If you're a UX pro brand-new to DevOps, you might wonder where to begin. UX columnist Jason Grant offers a step-by-step approach for designers who are DevOps newbies.",
    url: "https://www.techtarget.com/searchsoftwarequality/tip/A-DevOps-beginners-guide-for-user-experience-professionals",
    type: "external" as const,
  },
  {
    date: "Jan 31, 2018",
    title: "How to develop a UX workflow",
    description: "How the UX workflow comes into play alongside organizational needs and development requirements.",
    url: "https://www.techtarget.com/searchsoftwarequality/tip/How-to-develop-a-UX-workflow",
    type: "external" as const,
  },
  {
    date: "Oct 26, 2017",
    title: "Who is responsible for software development and design?",
    description: "Software development and design have to be a team effort, or they're doomed to fail.",
    url: "https://www.techtarget.com/searchsoftwarequality/opinion/Who-is-responsible-for-software-development-and-design",
    type: "external" as const,
  },
  {
    date: "Sep 22, 2017",
    title: "UX vs. UI design: It's complicated but important to understand",
    description: "When it comes to UX vs. UI design and software, you'll need to use both sides of your brain.",
    url: "https://www.techtarget.com/searchsoftwarequality/opinion/UX-vs-UI-design-Its-complicated-but-important-to-understand",
    type: "external" as const,
  }
];

export default function Writing() {
  return (
    <PageLayout
      title="Thoughts and insights"
      description="Articles, tutorials, and insights about design systems, product design, leadership, and design engineering."
    >
      <Timeline 
        items={writingItems}
        dateFormat="full-date"
        dateWidth="120px"
        clickable={true}
      />
    </PageLayout>
  );
} 