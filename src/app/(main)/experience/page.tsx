"use client";

import { Text } from "@once-ui-system/core";
import { PageLayout } from "@/components/PageLayout";
import { Timeline } from "@/components/Timeline";

const experienceItems = [
  {
    date: "01/2025 - Present",
    title: "Head of Product Design",
    description: "Hi Marley",
    content: (
      <Text variant="body-default-m" onBackground="neutral-weak">
        Reoriented the design team around scalable systems, 
        frontend-first workflows, and AI-enabled tooling. Envisioned 
        and prototyped future product directions in Nextjs to 
        validate with customers, align stakeholders, and accelerate 
        decision-making. Launched a company-wide design system and 
        led redesigns from concept through internal and 
        external validation.
      </Text>
    )
  },
  {
    date: "08/2023 - 01/2025",
    title: "Director of Product Design (Fractional Interim VP)",
    description: "Klaviyo",
    content: (
      <Text variant="body-default-m" onBackground="neutral-weak">
        Stepped in as a fractional interim VP of Design to lead quality, 
        clarity, and maturity across an 80-person team. Focused on 
        driving design feedback, IC/manager growth frameworks, 
        and cross-functional alignment. Enabled global scalability 
        through strategic internationalization (5 languages) and 
        guided product growth efforts across SMS/email parity, pricing 
        experiments, and feature announcement patterns.
      </Text>
    )
  },
  {
    date: "08/2023 - 07/2024",
    title: "Adjunct Professor",
    description: "Endicott College",
    content: (
      <Text variant="body-default-m" onBackground="neutral-weak">
        Taught UX courses in the Graphic Design Program, preparing students 
        for careers in experience design through real-world, design and 
        systems-focused projects.
      </Text>
    )
  },
  {
    date: "07/2021 - 08/2023",
    title: "Senior Manager, Design Systems and Content Design",
    description: "Klaviyo",
    content: (
      <Text variant="body-default-m" onBackground="neutral-weak">
        Built and scaled Ascent Design System, Content Design, and 
        Internationalization from scratch—growing three teams to 16 
        ICs and 2 managers during a phase of rapid org expansion. 
        Led end-to-end systems work across tokens, components, 
        accessibility, and i18n, while implementing scalable practices 
        like 6-week planning, async reviews, and readiness checklists. 
        Drove product modernization, rebrand execution, and consistent 
        adoption through playbooks, specs, and contribution processes.
      </Text>
    )
  },
  {
    date: "03/2017 - 07/2021",
    title: "Head of UX Design",
    description: "Vertex Pharmaceuticals",
    content: (
      <Text variant="body-default-m" onBackground="neutral-weak">
        Founded and scaled Vertex’s internal design practice across R&D, 
        Clinical, Commercial, and Enterprise teams—delivering 100+ projects 
        and leading design ops. Launched an internal design system, created 
        shared libraries and playbooks, and drove the Lab of the Future 
        vision to unify hundreds of scientific apps into platformed 
        experiences that enabled better data and AI readiness. Built 
        organizational design maturity through a monthly Human-Centered 
        Design education series.
      </Text>
    )
  },
  {
    date: "05/2014 - 03/2017",
    title: "Head of UX Design",
    description: "Collaborative Consulting (now part of CGI)",
    content: (
      <Text variant="body-default-m" onBackground="neutral-weak">
        Led design strategy and team growth across diverse client verticals 
        including retail, biotech, finance, and government. Productized 
        front-end accelerator assets used in over $4M in consulting sales, 
        while delivering high-impact UX engagements and scaling team 
        capability through reusable templates, process improvements, and 
        hands-on mentorship.
      </Text>
    )
  },
  {
    date: "11/2011 - 05/2014",
    title: "Product Strategy Lead, AEC Solutions",
    description: "Dassault Systèmes",
    content: (
      <Text variant="body-default-m" onBackground="neutral-weak">
        Led product strategy and multi-year roadmapping for Dassault’s AEC 
        portfolio, aligning cross-functional teams across cloud and desktop 
        products. Identified and prioritized opportunities through customer 
        research and market analysis, driving POC and MVP development. 
        Delivered go-to-market content and represented the division at 
        executive briefings and industry forums to accelerate adoption 
        and strategic alignment.
      </Text>
    )
  }
];

export default function Experience() {
  return (
    <PageLayout
      title="Professional journey"
      description="A collection of experiences that shaped my approach to product design, design systems, leadership, and design engineering."
    >
      <Timeline 
        items={experienceItems}
        dateFormat="month-year"
        dateWidth="140px"
        clickable={true}
      />
    </PageLayout>
  );
} 