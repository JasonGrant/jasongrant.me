#!/usr/bin/env node
// Run axe-core via Playwright's bundled Chromium so the browser is
// version-locked to whatever this script depends on, not the runner's
// system Chrome. Fails the process on any WCAG 2.1 AA violation.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const URLS = [
  "http://localhost:3000/",
  "http://localhost:3000/experience",
  "http://localhost:3000/writing",
  "http://localhost:3000/colophon",
];

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

let totalViolations = 0;

for (const url of URLS) {
  console.log(`\nTesting ${url}`);
  await page.goto(url, { waitUntil: "networkidle" });
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
