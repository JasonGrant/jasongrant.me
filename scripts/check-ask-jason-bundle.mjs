#!/usr/bin/env node
// Proves what the Ask Jason widget's build flag keeps out of the site (feature 009,
// constitution v1.4.0 gate, specs/009-ask-jason-chat/contracts/flag-and-environments.md).
//
//   node scripts/check-ask-jason-bundle.mjs <off|private|on> [--dir .next]
//
// Run after a production build made with the matching NEXT_PUBLIC_ASK_JASON. It looks
// for a few strings that only widget code carries:
//
//   challenges.cloudflare.com   the Turnstile script address
//   data-ask-jason              the entry bar's marker attribute
//   ask-jason.preview-key       private mode's key check
//   ask-jason.session           the session-token storage key
//   <the chat API host>         api.jasongrant.me, when the build points at it
//   bot-interactive             a stand-in scenario id (the stand-in must not ship)
//
//   off      none of them anywhere in the build output's static files or pages
//   private  none in any page or in the scripts a page loads on first load, except the
//            key check, which private mode is allowed to ship; a lazy chunk that carries
//            them is reported, not failed (nothing references it)
//   on       the entry bar in every page that has the site chrome (the top bar's home
//            link), and neither Turnstile nor the key check in a first-load script; the
//            deck has no widget at all
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const mode = process.argv[2];
if (!["off", "private", "on"].includes(mode ?? "")) {
  console.error("usage: check-ask-jason-bundle.mjs <off|private|on> [--dir .next]");
  process.exit(2);
}
const dirFlag = process.argv.indexOf("--dir");
const next = dirFlag > -1 ? process.argv[dirFlag + 1] : ".next";
const pagesDir = join(next, "server", "app");
const staticDir = join(next, "static");
if (!existsSync(pagesDir) || !existsSync(staticDir)) {
  console.error(`No build output under ${next}. Run a production build first.`);
  process.exit(2);
}

const api = process.env.NEXT_PUBLIC_ASK_JASON_API ?? "";
const markers = [
  "challenges.cloudflare.com",
  "data-ask-jason",
  "ask-jason.preview-key",
  "ask-jason.session",
];
if (api && api !== "standin") markers.push(new URL(api).host);
else if (api !== "standin") markers.push("api.jasongrant.me");
// The stand-in ships only in builds that ask for it.
if (api !== "standin") markers.push("bot-interactive");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

const pages = walk(pagesDir).filter((f) => f.endsWith(".html"));
const isDeck = (f) => relative(pagesDir, f).split(sep)[0] === "deck";
// A page "has the site chrome" when it renders the top bar's home link. Pages without
// it (the deck, the not-found page, standalone design spikes) never get the widget.
const HOME_LINK = 'aria-label="jasongrant.me — home"';

/** The scripts a page loads on first load, as paths under the build directory. */
function firstLoadScripts(html) {
  const found = new Set();
  for (const match of html.matchAll(/<script[^>]+src="([^"]+)"/g)) {
    const src = match[1].split("?")[0];
    if (src.startsWith("/_next/")) found.add(join(next, src.slice("/_next/".length)));
  }
  return [...found].filter((f) => existsSync(f));
}

const failures = [];
const notes = [];
const hits = (text, list = markers) => list.filter((m) => text.includes(m));

const pageText = new Map(pages.map((f) => [f, readFileSync(f, "utf8")]));
const scriptsOf = new Map(pages.map((f) => [f, firstLoadScripts(pageText.get(f))]));
const scriptText = new Map();
for (const scripts of scriptsOf.values()) {
  for (const f of scripts) if (!scriptText.has(f)) scriptText.set(f, readFileSync(f, "utf8"));
}

if (mode === "off") {
  const files = [...pages, ...walk(staticDir)];
  for (const f of files) {
    const text = pageText.get(f) ?? readFileSync(f, "utf8");
    const found = hits(text);
    if (found.length) failures.push(`${relative(next, f)} carries: ${found.join(", ")}`);
  }
  console.log(`off: searched ${files.length} files for ${markers.length} markers`);
}

if (mode === "private") {
  const allowedInFirstLoad = ["ask-jason.preview-key"];
  for (const f of pages) {
    const found = hits(pageText.get(f));
    if (found.length) failures.push(`${relative(next, f)} (page) carries: ${found.join(", ")}`);
  }
  for (const [f, text] of scriptText) {
    const found = hits(text).filter((m) => !allowedInFirstLoad.includes(m));
    if (found.length)
      failures.push(`${relative(next, f)} (first-load script) carries: ${found.join(", ")}`);
  }
  const firstLoad = new Set(scriptText.keys());
  for (const f of walk(staticDir).filter((p) => p.endsWith(".js") && !firstLoad.has(p))) {
    const found = hits(readFileSync(f, "utf8"));
    if (found.length)
      notes.push(`${relative(next, f)} (lazy, unreferenced by pages): ${found.join(", ")}`);
  }
  console.log(`private: ${pages.length} pages, ${scriptText.size} first-load scripts checked`);
}

if (mode === "on") {
  for (const f of pages) {
    const html = pageText.get(f);
    if (html.includes(HOME_LINK) && !html.includes("data-ask-jason")) {
      failures.push(`${relative(next, f)} has the site chrome but no entry bar`);
    }
    if (isDeck(f)) {
      const found = hits(html);
      if (found.length) failures.push(`${relative(next, f)} (deck) carries: ${found.join(", ")}`);
    }
  }
  for (const [f, text] of scriptText) {
    const found = hits(text, ["challenges.cloudflare.com", "ask-jason.preview-key"]);
    if (found.length)
      failures.push(`${relative(next, f)} (first-load script) carries: ${found.join(", ")}`);
  }
  const chromePages = pages.filter((f) => pageText.get(f).includes(HOME_LINK));
  if (chromePages.length === 0) failures.push("no page with the site chrome was found");
  console.log(
    `on: ${chromePages.length} chrome pages, ${scriptText.size} first-load scripts checked`,
  );
}

for (const note of notes) console.log(`  note: ${note}`);
if (failures.length) {
  for (const failure of failures) console.error(`  FAIL: ${failure}`);
  console.error(`check-ask-jason-bundle (${mode}): ${failures.length} problem(s)`);
  process.exit(1);
}
console.log(`check-ask-jason-bundle (${mode}): ok`);
