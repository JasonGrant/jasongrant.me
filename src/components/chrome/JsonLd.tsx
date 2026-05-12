import { site } from "@/content/site";

const PERSON_ID = `${site.baseURL}/#person`;
const WEBSITE_ID = `${site.baseURL}/#website`;

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.authorName,
  url: site.baseURL,
  image: `${site.baseURL}/jason.jpeg`,
  email: `mailto:${site.email}`,
  jobTitle: site.jobTitle,
  description: site.bio,
  worksFor: {
    "@type": "Organization",
    name: site.org.himarley.name,
    url: site.org.himarley.url,
  },
  founder: {
    "@type": "Organization",
    name: site.org.hypoth.name,
    url: site.org.hypoth.url,
  },
  alumniOf: [
    { "@type": "Organization", name: site.org.klaviyo.name, url: site.org.klaviyo.url },
    { "@type": "Organization", name: site.org.vertex.name, url: site.org.vertex.url },
  ],
  knowsAbout: [...site.expertise],
  sameAs: [site.socials.linkedin, site.socials.github, site.socials.bluesky, site.socials.substack],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.baseURL,
  name: site.title,
  author: { "@id": PERSON_ID },
  inLanguage: "en-US",
};

function jsonLdString(obj: unknown): string {
  // Stringify and escape "</" to prevent script-tag breakout inside a <script> body.
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: required to emit raw JSON-LD without React escaping
        dangerouslySetInnerHTML={{ __html: jsonLdString(person) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: required to emit raw JSON-LD without React escaping
        dangerouslySetInnerHTML={{ __html: jsonLdString(website) }}
      />
    </>
  );
}
