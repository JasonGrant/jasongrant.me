import Image from "next/image";
import styles from "./EmailPreview.module.css";

export type EmailLang = "en" | "fr" | "de";

// ── Editable email creative ────────────────────────────────────────────────
// The Coastal Brew summer promo, in English and French. Rendered in the
// Templates thumbnail (Page 2), the editor canvas (Page 3), and the translation
// preview (Page 5). Edit the copy below to re-theme it; the layout scales to
// its container (container query). Brand assets live in /public/work.
const EMAIL = {
  promo: {
    en: "Free shipping on orders over $50",
    fr: "Livraison gratuite à partir de 50 $",
    de: "Kostenloser Versand ab 50 $",
  },
  headline: {
    en: "Introducing our new Summer Brew",
    fr: "Découvrez notre nouvelle infusion estivale",
    de: "Entdecken Sie unseren neuen Sommer-Brew",
  },
  tagline: {
    en: ["Fruity, bright, and impossibly smooth —", "enjoy it hot, or over ice."],
    fr: ["Fruité, éclatant et incroyablement doux —", "à savourer chaud ou glacé."],
    de: ["Fruchtig, spritzig und unglaublich mild —", "heiß oder eisgekühlt genießen."],
  },
  cta: {
    en: "Shop the Summer Brew",
    fr: "Découvrir l'infusion estivale",
    de: "Sommer-Brew entdecken",
  },
  footer: {
    en: "Brewed on the coast · Est. 2024",
    fr: "Torréfié sur la côte · Depuis 2024",
    de: "An der Küste geröstet · Seit 2024",
  },
};

export function EmailPreview({
  lang = "en",
  edited = false,
}: {
  lang?: EmailLang;
  edited?: boolean;
}) {
  // A source edit ($50 → $40) leaves the existing translations stale.
  const promo = edited && lang === "en" ? "Free shipping on orders over $40" : EMAIL.promo[lang];
  return (
    <div className={styles.emailBox}>
      <div className={styles.email}>
        <div className={styles.header}>
          <Image
            src="/work/CostalBrewTeal-clean.png"
            alt="Coastal Brew Coffee Co."
            width={552}
            height={514}
            sizes="200px"
            className={styles.logo}
          />
        </div>

        <div className={styles.promo}>{promo}</div>

        <div className={styles.intro}>
          <p className={styles.headline}>{EMAIL.headline[lang]}</p>
          <p className={styles.tagline}>
            {EMAIL.tagline[lang].map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>

        <Image
          src="/work/CoffeeCup.png"
          alt="A barista pouring latte art into a Coastal Brew cup"
          width={1280}
          height={720}
          sizes="(max-width: 900px) 90vw, 640px"
          className={styles.heroImg}
        />

        <div className={styles.ctaWrap}>
          <span className={styles.cta}>{EMAIL.cta[lang]}</span>
        </div>

        <div className={styles.footer}>
          <Image
            src="/work/CostalBrewTeal-clean.png"
            alt="Coastal Brew Coffee Co."
            width={552}
            height={514}
            sizes="140px"
            className={styles.footerLogo}
          />
          <p className={styles.footerText}>{EMAIL.footer[lang]}</p>
        </div>
      </div>
    </div>
  );
}
