import { site } from "@/content/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.baseURL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.baseURL}/experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${site.baseURL}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${site.baseURL}/colophon`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
