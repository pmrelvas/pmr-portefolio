"use client";

import { useEffect } from "react";

/**
 * Arms and plays the scroll-reveal animations defined in `globals.css`.
 *
 * Elements tagged with `data-animate` are revealed as they scroll into view.
 * Only elements that start **off-screen** are armed (hidden) and observed, so:
 *
 * - there is never a flash of hidden content before hydration (anything already
 *   visible is left untouched), and
 * - without JS nothing is hidden at all — the content simply renders normally.
 *
 * Renders nothing; it is mounted once from the root layout.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") return;

    const targets = document.querySelectorAll<HTMLElement>("[data-animate]");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.dataset.animateSeen = "";
          observer.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    // Arm only what is off-screen right now: anything the visitor can already
    // see stays visible, so there is never a flash of hidden content. The
    // observer's bottom margin still holds the reveal until the element has
    // scrolled a little past the fold.
    targets.forEach((element) => {
      const { top, bottom } = element.getBoundingClientRect();
      const onScreen = top < window.innerHeight && bottom > 0;
      if (onScreen) return;

      element.dataset.animateArmed = "";
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
