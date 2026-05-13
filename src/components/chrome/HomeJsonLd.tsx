import { site } from "@/content/site";
import { writing } from "@/content/writing";

const PERSON_ID = `${site.baseURL}/#person`;

// ProfilePage signals to crawlers + LLMs that "/" is the canonical profile
// page for the Person entity emitted in the site-wide JsonLd. Per schema.org,
// ProfilePage's mainEntity links the page to the entity it profiles.
const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.baseURL}/#profilepage`,
  url: site.baseURL,
  name: `${site.authorName} — ${site.jobTitle}`,
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${site.baseURL}/jason.jpeg`,
  },
  mainEntity: { "@id": PERSON_ID },
};

// ItemList of the curated Selected Writing shelf. Each item is a full Article
// with author back-reference to the Person. URLs point to the Substack
// canonical via mainEntityOfPage so Google + LLMs treat Substack as the
// authoritative copy.
const selectedArticles = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Selected writing",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  itemListElement: writing
    .filter((w) => w.selected)
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

export function HomeJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: required to emit raw JSON-LD without React escaping
        dangerouslySetInnerHTML={{ __html: jsonLdString(profilePage) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: required to emit raw JSON-LD without React escaping
        dangerouslySetInnerHTML={{ __html: jsonLdString(selectedArticles) }}
      />
    </>
  );
}
