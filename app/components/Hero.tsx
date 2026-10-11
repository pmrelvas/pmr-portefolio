"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Hero.module.scss";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;

      if (textRef.current) {
        // Text drifts down slower than the page and fades out — a parallax lag.
        textRef.current.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
        textRef.current.style.opacity = String(Math.max(0, 1 - y / 720));
      }

      if (visualRef.current) {
        // The photo layer drifts the opposite way for parallax depth.
        visualRef.current.style.transform = `translate3d(0, ${y * -0.06}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.text} ref={textRef}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowMono}>&lt;h1&gt;</span> welcome to my portfolio{" "}
            <span className={styles.eyebrowMono}>&lt;/h1&gt;</span>
          </p>

          <h1 className={styles.title}>
            Full-Stack
            <br />
            Developer
          </h1>

          <p className={styles.name}>Pedro Relvas</p>

          <p className={styles.lead}>
            I design and build clean, scalable web applications — from Java &amp; Spring back
            ends to Angular &amp; TypeScript front ends, shipped with Docker, CI/CD and a
            teamwork-first mindset.
          </p>

          <div className={styles.cta}>
            <a href="#contact" className={styles.primaryBtn}>
              Get in touch
            </a>
            <a href="#skills" className={styles.secondaryBtn}>
              See my skills
            </a>
          </div>
        </div>

        <div className={styles.visual} ref={visualRef}>
          <div className={styles.photoWrap}>
            <Image
              src="/assets/pmr-photo.webp"
              alt="Pedro Relvas"
              width={990}
              height={1400}
              priority
              sizes="(max-width: 900px) 70vw, 420px"
              className={styles.photo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
