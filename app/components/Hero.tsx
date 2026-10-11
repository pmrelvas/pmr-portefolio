"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/base-path";
import styles from "./Hero.module.scss";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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

  // A soft spotlight that trails the cursor across the hero. Roughly eases
  // toward the pointer for a lagging, fading feel, and fades out on leave.
  // Skipped for coarse-pointer (touch) devices and reduced-motion users.
  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let placed = false;

    const paint = () => {
      frame = 0;
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        frame = requestAnimationFrame(paint);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;

      if (!placed) {
        // Snap to the cursor the first time so the glow does not sweep in
        // from the top-left corner while it fades in.
        placed = true;
        x = targetX;
        y = targetY;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        glow.dataset.active = "true";
      }

      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onPointerLeave = () => {
      placed = false;
      delete glow.dataset.active;
    };

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    hero.addEventListener("pointercancel", onPointerLeave);

    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      hero.removeEventListener("pointercancel", onPointerLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      <div className={styles.glow} aria-hidden="true" ref={glowRef} />
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
            I design and build clean, scalable web applications — from Java &amp; SpringBoot and Quarkus backends to Angular &amp; TypeScript front ends, shipped with Docker, CI/CD and a
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
              src={assetPath("/assets/pmr-photo.webp")}
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
