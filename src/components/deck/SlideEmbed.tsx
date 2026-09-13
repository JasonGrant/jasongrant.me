import { ContextStrip } from "@/components/work/app-shell/ContextStrip";
import type { DeckEmbedId, DeckFigureRef } from "@/content/deck/types";
import type { ComponentType } from "react";
import styles from "./Slide.module.css";
import { AccordionExampleDeck } from "./embeds/AccordionExampleDeck";
import { CareerStrip } from "./embeds/CareerStrip";
import { DeckEmailFlow } from "./embeds/DeckEmailFlow";
import { DeckImage } from "./embeds/DeckImage";
import { DesignHandoffDeck } from "./embeds/DesignHandoffDeck";
import { HiringTimeline } from "./embeds/HiringTimeline";
import { I18nTimeline } from "./embeds/I18nTimeline";
import { InboxRevealDeck } from "./embeds/InboxRevealDeck";
import { InitiativeVenn } from "./embeds/InitiativeVenn";
import { LanguageBreakDeck } from "./embeds/LanguageBreakDeck";
import { OptionsExploredDeck } from "./embeds/OptionsExploredDeck";
import { OrgMap } from "./embeds/OrgMap";
import { OutreachRevealDeck } from "./embeds/OutreachRevealDeck";
import { RiskTiersDeck } from "./embeds/RiskTiersDeck";
import { SettingsCascade } from "./embeds/SettingsCascade";
import { SettingsRevealDeck } from "./embeds/SettingsRevealDeck";
import { ShellAfterDeck } from "./embeds/ShellAfterDeck";
import { ShellBeforeDeck } from "./embeds/ShellBeforeDeck";
import { ShellSequencing } from "./embeds/ShellSequencing";

// The deck's embed registry (data-model.md §3) — the compile-time
// counterpart to StudyPage's DEMO_COMPONENTS/FIGURE_COMPONENTS. Adding a
// DeckEmbedId that isn't listed here is a tsc error.
const EMBEDS: Record<DeckEmbedId, ComponentType> = {
  "language-break": LanguageBreakDeck,
  "context-strip": ContextStrip,
  "accordion-example": AccordionExampleDeck,
  "options-explored": OptionsExploredDeck,
  "risk-tiers": RiskTiersDeck,
  "shell-after": ShellAfterDeck,
  "shell-before": ShellBeforeDeck,
  "design-handoff": DesignHandoffDeck,
  "career-strip": CareerStrip,
  "initiative-venn": InitiativeVenn,
  "org-map": OrgMap,
  "hiring-timeline": HiringTimeline,
  "i18n-timeline": I18nTimeline,
  "shell-sequencing": ShellSequencing,
  "settings-reveal": SettingsRevealDeck,
  "outreach-reveal": OutreachRevealDeck,
  "inbox-reveal": InboxRevealDeck,
  "settings-cascade": SettingsCascade,
  "email-flow": DeckEmailFlow,
};

// Hidden <h2> naming each embed region, keeping the outline logical under
// the slide's single <h1> (contracts/accessibility.md). settings-cascade is
// omitted deliberately — its own component renders two hidden headings, one
// per panel, instead of one generic wrapper heading.
const EMBED_LABELS: Partial<Record<DeckEmbedId, string>> = {
  "language-break": "Language break demo",
  "context-strip": "Platform sequencing",
  "accordion-example": "Accordion category demo",
  "options-explored": "Options explored",
  "risk-tiers": "Risk tiers",
  "shell-after": "Shell after",
  "shell-before": "Shell before",
  "design-handoff": "Design handoff spec",
  "career-strip": "Career strip",
  "initiative-venn": "Initiative leadership",
  "org-map": "Design org map",
  "hiring-timeline": "Hiring timeline",
  "i18n-timeline": "Project timeline",
  "shell-sequencing": "Platform sequencing",
  "settings-reveal": "Settings before and after",
  "outreach-reveal": "Outreach before and after",
  "inbox-reveal": "Inbox before and after",
  "email-flow": "Email translation flow",
};

export function SlideEmbed({ id }: { id: DeckEmbedId }) {
  const Component = EMBEDS[id];
  const label = EMBED_LABELS[id];
  if (!label) return <Component />;
  return (
    <div className={styles.embedWrapper}>
      <h2 className={styles.embedHeading}>{label}</h2>
      <Component />
    </div>
  );
}

export function DeckFigure({ figure, priority }: { figure: DeckFigureRef; priority?: boolean }) {
  if (figure.kind === "image") return <DeckImage image={figure.image} priority={priority} />;
  return <SlideEmbed id={figure.embed} />;
}
