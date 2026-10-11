"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/base-path";
import type { Project } from "@/lib/projects";
import ScreenshotLightbox from "./ScreenshotLightbox";
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, MaximizeIcon } from "./icons";
import styles from "./ProjectsCarousel.module.scss";

/**
 * Scroll-snap carousel: native swipe on touch devices, arrows + dots on pointer
 * devices. Clicking a screenshot opens the full-screen lightbox.
 */
export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const scrollToIndex = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track) return;

      const clamped = Math.max(0, Math.min(projects.length - 1, next));
      const slide = track.children.item(clamped) as HTMLElement | null;
      if (!slide) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: slide.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [projects.length],
  );

  // Mirror the snapped slide into `index` so dots/arrows stay in sync with swipes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const centre = track.scrollLeft + track.clientWidth / 2;
      const slides = Array.from(track.children) as HTMLElement[];

      let closest = 0;
      let best = Number.POSITIVE_INFINITY;

      slides.forEach((slide, i) => {
        const slideCentre = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(slideCentre - centre);
        if (distance < best) {
          best = distance;
          closest = i;
        }
      });

      setIndex(closest);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const multiple = projects.length > 1;

  return (
    <div className={styles.carousel}>
      <ul className={styles.track} ref={trackRef}>
        {projects.map((project) => (
          <li key={project.slug} className={styles.slide}>
            <article className={styles.card}>
              <button
                type="button"
                className={styles.shot}
                onClick={() => setLightbox(project)}
                aria-label={`View the ${project.title} screenshot full screen`}
              >
                <Image
                  src={assetPath(project.image)}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  sizes="(max-width: 720px) 86vw, (max-width: 1100px) 58vw, 46vw"
                  className={styles.shotImage}
                />
                <span className={styles.shotHint} aria-hidden="true">
                  <MaximizeIcon className={styles.shotHintIcon} />
                  View
                </span>
              </button>

              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardText}>{project.description}</p>

                {project.tags && project.tags.length > 0 && (
                  <ul className={styles.tags}>
                    {project.tags.map((tag) => (
                      <li key={tag} className={styles.tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  className={styles.link}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit project
                  <ExternalLinkIcon className={styles.linkIcon} />
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {multiple && (
        <div className={styles.controls}>
          <ul className={styles.dots}>
            {projects.map((project, i) => (
              <li key={project.slug}>
                <button
                  type="button"
                  className={styles.dot}
                  data-active={i === index}
                  aria-label={`Go to ${project.title}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => scrollToIndex(i)}
                />
              </li>
            ))}
          </ul>

          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => scrollToIndex(index - 1)}
              disabled={index === 0}
              aria-label="Previous project"
            >
              <ChevronLeftIcon className={styles.arrowIcon} />
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => scrollToIndex(index + 1)}
              disabled={index >= projects.length - 1}
              aria-label="Next project"
            >
              <ChevronRightIcon className={styles.arrowIcon} />
            </button>
          </div>
        </div>
      )}

      <ScreenshotLightbox project={lightbox} onDismiss={() => setLightbox(null)} />
    </div>
  );
}
