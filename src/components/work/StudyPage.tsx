import { GlossaryChip } from "@/components/work/GlossaryChip";
import { FlagsRuleDemo } from "@/components/work/demos/FlagsRuleDemo";
import { FormattingDemo } from "@/components/work/demos/FormattingDemo";
import { LanguageBreakDemo } from "@/components/work/demos/LanguageBreakDemo";
import { TextExpansionDemo } from "@/components/work/demos/TextExpansionDemo";
import { WordOrderDemo } from "@/components/work/demos/WordOrderDemo";
import { Player } from "@/components/work/player/Player";
import { reduceSettingsSteps } from "@/components/work/player/stepReducer";
import type {
  CaseStudy,
  ConceptDemoBlock,
  DemoId,
  ProseSection,
  RichText,
  StudyWalkthroughSegment,
  TextRun,
  WalkthroughSegment,
} from "@/content/studies/types";
import type { ComponentType } from "react";
import styles from "./StudyPage.module.css";

const DEMO_COMPONENTS: Record<
  DemoId,
  ComponentType<{ annotationLinks?: Record<string, string> }>
> = {
  "language-break": LanguageBreakDemo,
  "text-expansion": TextExpansionDemo,
  "word-order": WordOrderDemo,
  formatting: FormattingDemo,
  "flags-rule": FlagsRuleDemo,
};

function renderRun(run: TextRun, key: number) {
  if (typeof run === "string") return <span key={key}>{run}</span>;
  return <GlossaryChip key={key} term={run.term} />;
}

function renderRichText(body: RichText) {
  return body.map((node) => {
    const runs = Array.isArray(node) ? node : [node];
    const firstRun = runs[0];
    const key = typeof firstRun === "string" ? firstRun.slice(0, 32) : firstRun.term;
    return <p key={key}>{runs.map(renderRun)}</p>;
  });
}

function ProseBlock({ block }: { block: ProseSection }) {
  return (
    <section id={block.id} className={styles.section} aria-labelledby={`${block.id}-heading`}>
      <h2 id={`${block.id}-heading`} className={styles.sectionHeading}>
        {block.heading}
      </h2>
      <div className={styles.body}>{renderRichText(block.body)}</div>
    </section>
  );
}

function DemoBlock({ block }: { block: ConceptDemoBlock }) {
  const DemoComponent = DEMO_COMPONENTS[block.demo];
  return (
    <section id={block.id} className={styles.section} aria-labelledby={`${block.id}-heading`}>
      <h2 id={`${block.id}-heading`} className={styles.sectionHeading}>
        {block.demo === "language-break" ? "See it break" : demoTitle(block.demo)}
      </h2>
      <div className={styles.demoIntro}>{renderRichText(block.intro)}</div>
      <DemoComponent annotationLinks={block.annotationLinks} />
      <noscript>
        <p className={styles.noscriptNote}>
          {block.staticCaption} (interactive version requires JavaScript.)
        </p>
      </noscript>
    </section>
  );
}

function demoTitle(demo: DemoId): string {
  switch (demo) {
    case "text-expansion":
      return "Text expansion";
    case "word-order":
      return "Word order";
    case "formatting":
      return "Formatting";
    case "flags-rule":
      return "Cultural elements";
    default:
      return "";
  }
}

function WalkthroughBlock({
  block,
  orgSelectedLanguages,
}: {
  block: StudyWalkthroughSegment;
  orgSelectedLanguages: string[];
}) {
  return (
    <section id={block.id} className={styles.section} aria-labelledby={`${block.id}-heading`}>
      <h2 id={`${block.id}-heading`} className={styles.sectionHeading}>
        {block.title}
      </h2>
      <Player segment={block} orgSelectedLanguages={orgSelectedLanguages} />
    </section>
  );
}

export function StudyPage({ study }: { study: CaseStudy }) {
  // FR-021 continuity: the email segment offers exactly the languages the
  // org-settings segment's narrative ends up with — computed once from
  // content, independent of a visitor's live progress in either player.
  const orgSegment = study.blocks.find(
    (b): b is WalkthroughSegment<"org-settings"> =>
      b.kind === "walkthrough" && b.screen === "org-settings",
  );
  const orgSelectedLanguages = orgSegment
    ? reduceSettingsSteps(orgSegment.steps, orgSegment.steps.length - 1).localizationLanguages
    : [];

  return (
    <article className={styles.page}>
      <p className={styles.eyebrow}>Case study</p>
      <h1 className={styles.title}>{study.title}</h1>
      <div className={styles.metaRows}>
        <span className={styles.metaLabel}>Company</span>
        <span>{study.company}</span>
        <span className={styles.metaLabel}>Role</span>
        <span>{study.role}</span>
        <span className={styles.metaLabel}>Timeline</span>
        <span>{study.timeline}</span>
      </div>

      {study.blocks.map((block) => {
        if (block.kind === "prose") return <ProseBlock key={block.id} block={block} />;
        if (block.kind === "demo") return <DemoBlock key={block.id} block={block} />;
        return (
          <WalkthroughBlock
            key={block.id}
            block={block}
            orgSelectedLanguages={orgSelectedLanguages}
          />
        );
      })}
    </article>
  );
}
