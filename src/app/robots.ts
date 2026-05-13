import { site } from "@/content/site";
import type { MetadataRoute } from "next";

// Explicit Allow rules for major LLM/search crawlers, per /speckit-analyze
// research finding R2026-LLM (see specs/.../research.md). Default behavior
// is permissive but explicit allows protect against future CDN/edge changes
// and signal intent.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.baseURL}/sitemap.xml`,
    host: site.baseURL,
  };
}
