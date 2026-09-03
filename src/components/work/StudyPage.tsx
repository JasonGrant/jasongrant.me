import { GlossaryChip } from "@/components/work/GlossaryChip";
import { MilestoneTimeline } from "@/components/work/Timeline";
import { AccordionExample } from "@/components/work/app-shell/AccordionExample";
import { ContextStrip } from "@/components/work/app-shell/ContextStrip";
import { DesignHandoffScreens } from "@/components/work/app-shell/DesignHandoffScreens";
import { NavFootprintBefore } from "@/components/work/app-shell/NavFootprintBefore";
import { OptionsExplored } from "@/components/work/app-shell/OptionsExplored";
import { RiskTiers } from "@/components/work/app-shell/RiskTiers";
import { ShellAfterScreen } from "@/components/work/app-shell/ShellAfterScreen";
import { ShellBeforeScreens } from "@/components/work/app-shell/ShellBeforeScreens";
import { FlagsRuleDemo } from "@/components/work/demos/FlagsRuleDemo";
import { FormattingDemo } from "@/components/work/demos/FormattingDemo";
import { LanguageBreakDemo } from "@/components/work/demos/LanguageBreakDemo";
import { TextExpansionDemo } from "@/components/work/demos/TextExpansionDemo";
import { WordOrderDemo } from "@/components/work/demos/WordOrderDemo";
import { Player } from "@/components/work/player/Player";
import { reduceSettingsSteps } from "@/components/work/player/stepReducer";
import { EmailTranslationFlow } from "@/components/work/replica/EmailTranslationFlow";
import type {
  CaseStudy,
  ConceptDemoBlock,
  DemoId,
  EmailFlowBlock,
  FigureBlock,
  FigureId,
  Milestone,
  ProseSection,
  RichText,
  StudyWalkthroughSegment,
  TextRun,
  WalkthroughSegment,
} from "@/content/studies/types";
import Image from "next/image";
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

// App Shell study (feature 007) figures — static recreations + annotated
// diagrams. Each reads its data from the shared fixture / constants, so the
// map values take no props.
const FIGURE_COMPONENTS: Record<FigureId, ComponentType> = {
  "context-strip": ContextStrip,
  "shell-before": ShellBeforeScreens,
  "accordion-example": AccordionExample,
  "nav-footprint-before": NavFootprintBefore,
  "options-explored": OptionsExplored,
  "design-handoff": DesignHandoffScreens,
  "shell-after": ShellAfterScreen,
  "risk-tiers": RiskTiers,
};

function renderRun(run: TextRun, key: number) {
  if (typeof run === "string") return <span key={key}>{run}</span>;
  if ("term" in run) return <GlossaryChip key={key} term={run.term} />;
  if ("em" in run) return <em key={key}>{run.em}</em>;
  return (
    <a
      key={key}
      className={styles.sourceLink}
      href={run.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {run.text}
    </a>
  );
}

function renderRichText(body: RichText) {
  return body.map((node) => {
    const runs = Array.isArray(node) ? node : [node];
    const firstRun = runs[0];
    const key =
      typeof firstRun === "string"
        ? firstRun.slice(0, 32)
        : "term" in firstRun
          ? firstRun.term
          : "em" in firstRun
            ? firstRun.em.slice(0, 32)
            : firstRun.href;
    return <p key={key}>{runs.map(renderRun)}</p>;
  });
}

// Inserts an <h3> between two body paragraphs (see ProseSection.subheading) —
// a secondary point that earns its own label without breaking out to a new
// top-level section.
function renderBody(body: RichText, subheading: ProseSection["subheading"]) {
  const paragraphs = renderRichText(body);
  if (!subheading) return paragraphs;
  const result = paragraphs.slice();
  result.splice(
    subheading.afterParagraph + 1,
    0,
    <h3 key="subheading" className={styles.subheading}>
      {subheading.text}
    </h3>,
  );
  return result;
}

// Standout stat: a large figure plus a completing phrase, with an optional
// link to the figure's public source. Shared by prose and demo blocks.
function Callout({ callout }: { callout: NonNullable<ProseSection["callout"]> }) {
  return (
    <p className={styles.demoCallout}>
      <span className={styles.calloutFigure}>{callout.figure}</span>
      <span className={styles.calloutBody}>
        <span className={styles.calloutText}>{callout.text}</span>
        {callout.source ? (
          <a
            className={styles.calloutSource}
            href={callout.source.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {callout.source.label}
          </a>
        ) : null}
      </span>
    </p>
  );
}

function ProseBlock({
  block,
  milestones,
}: {
  block: ProseSection;
  milestones: readonly Milestone[];
}) {
  const EmbeddedDemo = block.embedDemo ? DEMO_COMPONENTS[block.embedDemo] : null;
  const MidFigure = block.midFigure ? FIGURE_COMPONENTS[block.midFigure.figure] : null;

  const mainContent = (
    <>
      <div className={styles.body}>{renderBody(block.body, block.subheading)}</div>
      {MidFigure ? (
        <div className={styles.midFigure}>
          <MidFigure />
          <p className={styles.srOnly}>{block.midFigure?.staticDescription}</p>
        </div>
      ) : null}
      {block.list ? (
        <ul className={styles.list}>
          {block.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {block.callout ? <Callout callout={block.callout} /> : null}
      {block.image ? (
        <figure className={styles.figure}>
          <div className={styles.figureFrame}>
            <Image
              src={block.image.src}
              alt={block.image.alt}
              width={block.image.width}
              height={block.image.height}
              className={styles.figureImg}
              sizes="(min-width: 900px) 1080px, 100vw"
            />
          </div>
          {block.image.caption ? (
            <figcaption className={styles.figureCaption}>{block.image.caption}</figcaption>
          ) : null}
        </figure>
      ) : null}
      {block.showTimeline ? <MilestoneTimeline milestones={milestones} /> : null}
      {EmbeddedDemo ? (
        <div className={styles.embeddedDemo}>
          <EmbeddedDemo annotationLinks={block.embedDemoLinks} />
        </div>
      ) : null}
    </>
  );

  if (block.sideFigure) {
    const SideFigure = FIGURE_COMPONENTS[block.sideFigure.figure];
    return (
      <section
        id={block.id}
        className={`${styles.section} ${styles.wide}`}
        aria-labelledby={`${block.id}-heading`}
      >
        <h2 id={`${block.id}-heading`} className={styles.sectionHeading}>
          {block.heading}
        </h2>
        <div className={styles.withSideFigure}>
          <div className={styles.withSideFigureMain}>{mainContent}</div>
          <div className={styles.withSideFigureAside}>
            <SideFigure />
            <p className={styles.srOnly}>{block.sideFigure.staticDescription}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={block.id} className={styles.section} aria-labelledby={`${block.id}-heading`}>
      <h2 id={`${block.id}-heading`} className={styles.sectionHeading}>
        {block.heading}
      </h2>
      {mainContent}
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
      {block.callout ? <Callout callout={block.callout} /> : null}
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
    <section
      id={block.id}
      className={`${styles.section} ${styles.wide}`}
      aria-labelledby={`${block.id}-heading`}
    >
      <h2 id={`${block.id}-heading`} className={styles.sectionHeading}>
        {block.title}
      </h2>
      <Player segment={block} orgSelectedLanguages={orgSelectedLanguages} />
    </section>
  );
}

function FigureSection({ block }: { block: FigureBlock }) {
  const Figure = FIGURE_COMPONENTS[block.figure];
  return (
    <section
      id={block.id}
      className={`${styles.section} ${styles.wide} ${block.heading ? "" : styles.attached}`}
      aria-labelledby={block.heading ? `${block.id}-heading` : undefined}
    >
      {block.heading ? (
        <h2 id={`${block.id}-heading`} className={styles.sectionHeading}>
          {block.heading}
        </h2>
      ) : null}
      {block.intro ? <div className={styles.demoIntro}>{renderRichText(block.intro)}</div> : null}
      {block.callout ? <Callout callout={block.callout} /> : null}
      <div className={styles.figureBlock}>
        <Figure />
      </div>
      {block.caption ? <p className={styles.figureBlockCaption}>{block.caption}</p> : null}
      <p className={styles.srOnly}>{block.staticDescription}</p>
    </section>
  );
}

function EmailFlowSection({ block }: { block: EmailFlowBlock }) {
  return (
    <section
      id={block.id}
      className={`${styles.section} ${styles.wide}`}
      aria-labelledby={`${block.id}-heading`}
    >
      <h2 id={`${block.id}-heading`} className={styles.sectionHeading}>
        {block.heading}
      </h2>
      <EmailTranslationFlow />
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

  // Meta row shows only the span (first to last milestone) unless the study
  // overrides it; the full milestone breakdown lives in the Overview timeline
  // below regardless.
  const firstMilestone = study.milestones[0];
  const lastMilestone = study.milestones[study.milestones.length - 1];
  const timelineRange =
    study.timelineLabel ??
    `${firstMilestone.quarter} ${firstMilestone.year} to ${lastMilestone.quarter} ${lastMilestone.year}`;

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
        <span>{timelineRange}</span>
      </div>

      {study.blocks.map((block) => {
        if (block.kind === "prose")
          return <ProseBlock key={block.id} block={block} milestones={study.milestones} />;
        if (block.kind === "demo") return <DemoBlock key={block.id} block={block} />;
        if (block.kind === "figure") return <FigureSection key={block.id} block={block} />;
        if (block.kind === "email-flow") return <EmailFlowSection key={block.id} block={block} />;
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
