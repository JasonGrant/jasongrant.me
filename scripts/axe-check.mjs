#!/usr/bin/env node
import AxeBuilder from "@axe-core/playwright";
// Run axe-core via Playwright's bundled Chromium so the browser is
// version-locked to whatever this script depends on, not the runner's
// system Chrome. Fails the process on any WCAG 2.1 AA violation.
import { chromium } from "playwright";

const ASK = "http://localhost:3000";

const URLS = [
  "http://localhost:3000/",
  "http://localhost:3000/experience",
  "http://localhost:3000/writing",
  "http://localhost:3000/colophon",
  // Unlisted case-study routes (constitution: unlisted routes are shipped
  // pages for every gate). See specs/002-interactive-case-studies/ and
  // specs/007-app-shell-case-study/.
  "http://localhost:3000/work/internationalization",
  "http://localhost:3000/work/app-shell",
  // Unlisted presentation deck (constitution v1.3.0). "ci" is the CI
  // placeholder for the secret segment (DECK_SLUG=ci at build); the real
  // value never appears in this repo. See specs/008-presentation-deck/.
  "http://localhost:3000/deck/ci/intro/cover",
  "http://localhost:3000/deck/ci/internationalization/the-cascade",
  "http://localhost:3000/deck/ci/internationalization/translation-flow",
  "http://localhost:3000/deck/ci/app-shell/overview",
  "http://localhost:3000/deck/ci/app-shell/baseline",
  "http://localhost:3000/deck/ci/app-shell/outcome",
  // Ask Jason widget (feature 009): the panel open in every state of its spec's FR-030,
  // played from the scripted stand-in (the gate build sets NEXT_PUBLIC_ASK_JASON_API=standin).
  // &fast=1 skips the waiting; the panel marks itself data-ask-settled once it stops moving.
  `${ASK}/?ask=empty&open=1&fast=1`,
  `${ASK}/?ask=answer-1&open=1&fast=1`,
  `${ASK}/?ask=answer-3&open=1&fast=1`,
  `${ASK}/?ask=options&open=1&fast=1`,
  `${ASK}/?ask=deflect&open=1&fast=1`,
  `${ASK}/?ask=none&open=1&fast=1`,
  `${ASK}/?ask=correction-text&open=1&fast=1`,
  `${ASK}/?ask=correction-options&open=1&fast=1`,
  `${ASK}/?ask=long&open=1&fast=1`,
  `${ASK}/?ask=error-event&open=1&fast=1`,
  `${ASK}/?ask=no-meta&open=1&fast=1`,
  `${ASK}/?ask=drop&open=1&fast=1`,
  `${ASK}/?ask=too-long&open=1&fast=1`,
  `${ASK}/?ask=not-text&open=1&fast=1`,
  `${ASK}/?ask=address-limit&open=1&fast=1`,
  `${ASK}/?ask=countdown&open=1&fast=1`,
  `${ASK}/?ask=turn-limit&open=1&fast=1`,
  `${ASK}/?ask=session-closed&open=1&fast=1`,
  `${ASK}/?ask=session-expired&open=1&fast=1`,
  `${ASK}/?ask=capped-health&open=1&fast=1`,
  `${ASK}/?ask=down-health&open=1&fast=1`,
  `${ASK}/?ask=old-version&open=1&fast=1`,
  `${ASK}/?ask=capped-session&open=1&fast=1`,
  `${ASK}/?ask=unavailable-chat&open=1&fast=1`,
  `${ASK}/?ask=voice-on&open=1&fast=1`,
  `${ASK}/?ask=bot-pass&open=1&fast=1`,
  `${ASK}/?ask=bot-fail&open=1&fast=1`,
  `${ASK}/?ask=bot-interactive&open=1&fast=1`,
  `${ASK}/?ask=answer-3&open=1&fast=1&container=sheet`,
  `${ASK}/?ask=options&open=1&fast=1&container=sheet`,
  // The loading state needs real timing: health takes two seconds in this scenario.
  `${ASK}/?ask=slow-health&open=1`,
];

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

let totalViolations = 0;

for (const url of URLS) {
  console.log(`\nTesting ${url}`);
  await page.goto(url, { waitUntil: "networkidle" });
  if (url.includes("ask=slow-health")) {
    // Loading state: the panel is open and shows "Connecting…" while health is slow.
    // innerText follows text-transform, and this line is set in capitals, so match any case.
    await page.waitForFunction(() => /connecting/i.test(document.body.innerText), null, {
      timeout: 15000,
    });
  } else if (url.includes("?ask=")) {
    // Ask Jason: wait for the scenario to play out and the panel to stop moving.
    await page.waitForSelector('[data-ask-settled="true"]', { timeout: 20000 });
  }
  // Give intersection observers a beat to settle reveal animations.
  await page.waitForTimeout(400);
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  if (results.violations.length === 0) {
    console.log("  ✓ 0 violations");
    continue;
  }
  totalViolations += results.violations.length;
  for (const v of results.violations) {
    console.log(`  ✗ ${v.id} (${v.impact}) — ${v.help}`);
    for (const n of v.nodes) {
      console.log(`      target: ${n.target.join(", ")}`);
      const reason = n.any?.[0]?.message || n.failureSummary || "";
      if (reason) console.log(`      reason: ${reason}`);
    }
  }
}

await browser.close();

if (totalViolations > 0) {
  console.log(`\n${totalViolations} total violations. Failing.`);
  process.exit(1);
}
console.log("\nAll routes pass WCAG 2.1 AA.");
