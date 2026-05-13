import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <h1 className={styles.headline}>
        I&rsquo;m a design leader who <span className={styles.em}>ships production code</span>
        <span className={styles.emPunct}>.</span> I lead design at Hi Marley and founded{" "}
        <span className={styles.em}>Hypoth</span>
        <span className={styles.emPunct}>,</span> an AI products studio.
      </h1>
      <p className={styles.context}>
        I lead product design at <a href="#hi-marley">Hi Marley</a>, where I&rsquo;m consolidating
        the front-end onto one design system, designing AI-native experiences end-to-end, and
        shipping production code alongside engineering. Before Hi Marley I led design teams at{" "}
        <a href="#klaviyo">Klaviyo</a> and <a href="#vertex">Vertex</a>, and built design orgs from
        zero at both. I founded{" "}
        <a href="https://hypoth.ai" target="_blank" rel="noreferrer">
          Hypoth
        </a>
        , a small studio for AI products, where we write the question first and ship narrow.
      </p>
    </section>
  );
}
