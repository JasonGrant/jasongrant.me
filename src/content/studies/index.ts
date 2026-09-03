import { appShellStudy } from "./app-shell";
import { internationalizationStudy } from "./internationalization";
import type { CaseStudy } from "./types";

export const studies: CaseStudy[] = [internationalizationStudy, appShellStudy];

function assertStudy(study: CaseStudy): void {
  if (study.blocks.length === 0) {
    throw new Error(`Study "${study.slug}" has zero content blocks.`);
  }

  const blockIds = new Set<string>();
  for (const block of study.blocks) {
    blockIds.add(block.id);
    if (block.kind === "walkthrough" && block.steps.length === 0) {
      throw new Error(`Walkthrough segment "${block.id}" in study "${study.slug}" has zero steps.`);
    }
    if (block.kind === "walkthrough") {
      for (const step of block.steps) {
        if (!step.narrationText || step.narrationText.trim() === "") {
          throw new Error(
            `Step targeting "${step.target}" in segment "${block.id}" (study "${study.slug}") is missing narrationText.`,
          );
        }
      }
    }
    // Figure blocks (feature 007): the FigureId → component mapping is
    // compile-checked in StudyPage's FIGURE_COMPONENTS record; here we enforce
    // the non-visual text equivalent every figure must carry (FR-019a).
    if (
      block.kind === "figure" &&
      (!block.staticDescription || block.staticDescription.trim() === "")
    ) {
      throw new Error(
        `Figure block "${block.id}" in study "${study.slug}" is missing a staticDescription.`,
      );
    }
  }

  for (const block of study.blocks) {
    if (block.kind === "demo" && block.annotationLinks) {
      for (const [annotationId, targetBlockId] of Object.entries(block.annotationLinks)) {
        if (!blockIds.has(targetBlockId)) {
          throw new Error(
            `Demo "${block.id}" in study "${study.slug}" has annotationLinks["${annotationId}"] pointing at unknown block id "${targetBlockId}".`,
          );
        }
      }
    }
  }
}

function assertRegistry(all: CaseStudy[]): void {
  const seenSlugs = new Set<string>();
  for (const study of all) {
    if (seenSlugs.has(study.slug)) {
      throw new Error(`Duplicate study slug "${study.slug}" in the registry.`);
    }
    seenSlugs.add(study.slug);
    assertStudy(study);
  }
}

assertRegistry(studies);

export function getStudy(slug: string): CaseStudy | undefined {
  return studies.find((s) => s.slug === slug);
}
