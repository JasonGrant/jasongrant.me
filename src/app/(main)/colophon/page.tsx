import { site } from "@/content/site";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "Typefaces, framework, hosting, and design tokens for jasongrant.me. Hand-rolled in Next.js 15 + React 19 with plain CSS.",
  alternates: { canonical: "/colophon" },
  openGraph: {
    title: "Colophon — jasongrant.me",
    description: "Typefaces, framework, hosting, and design tokens.",
    url: "/colophon",
    images: [{ url: "/api/og?page=colophon", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colophon — jasongrant.me",
    description: "Typefaces, framework, hosting, and design tokens.",
    images: ["/api/og?page=colophon"],
  },
};

export default function Colophon() {
  return (
    <>
      <h1 className={styles.h1}>Colophon</h1>
      <div className={styles.body}>
        <p>
          This site is hand-rolled in Next.js 15 (App Router) and React 19, with plain CSS modules
          and CSS custom properties. No design-system library, no CSS-in-JS, no build step beyond
          Next.js itself. Hosted on{" "}
          <a href="https://vercel.com" target="_blank" rel="noreferrer">
            Vercel
          </a>
          .
        </p>
        <p>
          Three typefaces, served via <code className={styles.spec}>next/font/google</code> with the
          Latin subset only.{" "}
          <a href="https://fonts.google.com/specimen/Petrona" target="_blank" rel="noreferrer">
            Petrona
          </a>{" "}
          carries display italic; body and UI use{" "}
          <a href="https://fonts.google.com/specimen/Funnel+Sans" target="_blank" rel="noreferrer">
            Funnel Sans
          </a>
          ; metadata and small labels use{" "}
          <a href="https://fonts.google.com/specimen/DM+Mono" target="_blank" rel="noreferrer">
            DM Mono
          </a>
          .
        </p>
        <p>
          Source on{" "}
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          . View source on any page for the build-credit comment at the top of{" "}
          <code className={styles.spec}>&lt;head&gt;</code>.
        </p>
      </div>

      <dl className={styles.dl}>
        <dt>Framework</dt>
        <dd>Next.js 15 · React 19 · TypeScript 5.8</dd>

        <dt>Hosting</dt>
        <dd>Vercel · Analytics + Speed Insights (non-blocking)</dd>

        <dt>Styling</dt>
        <dd>CSS Modules · custom-property tokens · no preprocessor</dd>

        <dt>Type</dt>
        <dd>Petrona · Funnel Sans · DM Mono</dd>

        <dt>Colors</dt>
        <dd>
          <div className={styles.swatchRow}>
            <span className={styles.swatchItem}>
              <span
                className={styles.swatch}
                style={{ background: "var(--bg)" }}
                aria-hidden="true"
              />
              <span className={styles.mono}>--bg oklch(0.184 0.011 80.5)</span>
            </span>
            <span className={styles.swatchItem}>
              <span
                className={styles.swatch}
                style={{ background: "var(--ink)" }}
                aria-hidden="true"
              />
              <span className={styles.mono}>--ink oklch(0.918 0.028 86.6)</span>
            </span>
            <span className={styles.swatchItem}>
              <span
                className={styles.swatch}
                style={{ background: "var(--accent)" }}
                aria-hidden="true"
              />
              <span className={styles.mono}>--accent oklch(0.78 0.10 195)</span>
            </span>
          </div>
        </dd>

        <dt>Reveal</dt>
        <dd>IntersectionObserver, JS-opt-in (no-JS visitors see content immediately)</dd>

        <dt>Domain &amp; TLS</dt>
        <dd>
          jasongrant.me · DNS and TLS via{" "}
          <a href="https://www.cloudflare.com/" target="_blank" rel="noreferrer">
            Cloudflare
          </a>
        </dd>

        <dt>Newsletter</dt>
        <dd>
          <a href={site.socials.substack} target="_blank" rel="noreferrer">
            {site.newsletter.name}
          </a>{" "}
          on Substack
        </dd>

        <dt>Repo</dt>
        <dd>
          <a href={site.github} target="_blank" rel="noreferrer">
            {site.github.replace("https://", "")}
          </a>
        </dd>
      </dl>
    </>
  );
}
