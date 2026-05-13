import { site } from "@/content/site";
import { writing } from "@/content/writing";

const PERSON_ID = `${site.baseURL}/#person`;

// ItemList of every published article, in publish-date-descending order
// (matches the visible Archive on the page). Each entry is a full Article
// with author back-reference and Substack canonical URL.
const allArticles = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "All writing",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: writing.length,
  itemListElement: [...writing]
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
    .map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        headline: w.title,
        url: w.href,
        datePublished: w.isoDate,
        author: { "@id": PERSON_ID },
        mainEntityOfPage: w.href,
        ...(w.blurb ? { description: w.blurb } : {}),
      },
    })),
};

function jsonLdString(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export function WritingJsonLd() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required to emit raw JSON-LD without React escaping
      dangerouslySetInnerHTML={{ __html: jsonLdString(allArticles) }}
    />
  );
}
