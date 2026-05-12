import "@/styles/globals.css";

import { HeadComment } from "@/components/chrome/HeadComment";
import { JsonLd } from "@/components/chrome/JsonLd";
import { site } from "@/content/site";
import { dmMono, funnelSans, petrona } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import classNames from "classnames";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(site.baseURL),
  title: {
    default: `${site.authorName} — design leader who ships production code`,
    template: `%s — ${site.title}`,
  },
  description: site.bio,
  authors: [{ name: site.authorName, url: site.baseURL }],
  openGraph: {
    title: `${site.authorName} — design leader who ships production code`,
    description:
      "Director of Product Design at Hi Marley. Founder of Hypoth, an AI products studio. Writing Designing Forward on Substack.",
    url: site.baseURL,
    siteName: site.title,
    images: [{ url: "/api/og?page=home", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.authorName} — design leader who ships production code`,
    description:
      "Director of Product Design at Hi Marley. Founder of Hypoth, an AI products studio.",
    images: ["/api/og?page=home"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15120D",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={classNames(petrona.variable, funnelSans.variable, dmMono.variable)}>
      <head>
        <HeadComment />
        <JsonLd />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
