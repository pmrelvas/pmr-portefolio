"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, GitHubIcon, LinkedInIcon, MenuIcon } from "./icons";
import styles from "./Nav.module.scss";

const links = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#home" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandMark}>&lt;/&gt;</span>
          <span className={styles.brandName}>Pedro Relvas</span>
        </a>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${open ? styles.navOpen : ""}`}
          aria-label="Primary"
        >
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${styles.navLink} ${
                    active === link.href.slice(1) ? styles.active : ""
                  }`}
                  aria-current={active === link.href.slice(1) ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a
            href="https://www.linkedin.com/in/pedro-relvas/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className={styles.iconLink}
          >
            <LinkedInIcon className={styles.icon} />
          </a>
          <a
            href="https://github.com/pmrelvas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={styles.iconLink}
          >
            <GitHubIcon className={styles.icon} />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuButton}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className={styles.icon} /> : <MenuIcon className={styles.icon} />}
          </button>
        </div>
      </div>
    </header>
  );
}
