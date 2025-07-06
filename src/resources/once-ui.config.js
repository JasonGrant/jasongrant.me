// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://jasongrant.me";

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
const style = {
  theme: "system", // dark | light | system
  neutral: "gray", // sand | gray | slate
  brand: "cyan", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast | inverse
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "filled", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: "2",
    color: "brand-on-background-weak",
    opacity: 40,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    thickness: 1,
    angle: 45,
    size: "8",
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    width: "2",
    height: "2",
  },
};

// metadata for pages
const meta = {
  home: {
    path: "/",
    title: "Jason Grant",
    description:
      "Jason Grant is a software engineer and designer with a passion for building products that are easy to use and accessible.",
    image: "/images/JasonHeadshot2025.jpeg",
    canonical: "https://jasongrant.me",
    robots: "index,follow",
    alternates: [{ href: "https://jasongrant.me", hrefLang: "en" }],
  },
  experience: {
    path: "/experience",
    title: "Experience - Jason Grant",
    description:
      "Professional experience and work history showcasing expertise in design systems and UI development.",
    image: "/images/JasonHeadshot2025.jpeg",
    canonical: "https://jasongrant.me/experience",
    robots: "index,follow",
    alternates: [{ href: "https://jasongrant.me/experience", hrefLang: "en" }],
  },
  writing: {
    path: "/writing",
    title: "Writing - Jason Grant",
    description:
      "Articles, tutorials, and insights about design systems, UI development, and web technologies.",
    image: "/images/JasonHeadshot2025.jpeg",
    canonical: "https://jasongrant.me/writing",
    robots: "index,follow",
    alternates: [{ href: "https://jasongrant.me/writing", hrefLang: "en" }],
  },
  // add more routes and reference them in page.tsx
};

// default schema data
const schema = {
  logo: "https://jasongrant.me/images/JasonHeadshot2025.jpeg",
  type: "Person",
  name: "Jason Grant",
  description: meta.home.description,
  email: "hello@jasongrant.me",
};

// social links
const social = {
  github: "https://github.com/jasongrant",
  linkedin: "https://www.linkedin.com/in/mrjasongrant/",
  BsSubstack: "https://mrjasongrant.substack.com/",
  bluesky: "https://bsky.app/profile/jasongrant.bsky.social/",
};

export { baseURL, fonts, style, meta, schema, social, effects, dataStyle };
