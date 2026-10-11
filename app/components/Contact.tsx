import styles from "./Contact.module.scss";

/**
 * Static contact section.
 *
 * The site is a static export hosted on GitHub Pages, which cannot run the
 * Resend Server Action the form used to call — so the call-to-action is a
 * `mailto:` link instead. The address is injected at build time from the
 * `NEXT_PUBLIC_CONTACT_EMAIL` environment variable.
 */
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.tag} data-animate data-caret>
            &lt;contact /&gt;
          </span>
          <h2 className={styles.title} data-animate data-underline data-animate-delay={1}>
            Get in touch
          </h2>
          <p className={styles.subtitle} data-animate data-animate-delay={2}>
            Have a project or an opportunity in mind? Send me an email and I&apos;ll get back to
            you.
          </p>
        </header>

        <div className={styles.card} data-animate data-animate-delay={3}>
          {email ? (
            <a className={styles.cta} href={`mailto:${email}`}>
              Contact me
            </a>
          ) : (
            <p className={styles.empty}>
              The contact email isn&apos;t configured yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
