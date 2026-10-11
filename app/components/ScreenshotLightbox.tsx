"use client";

import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/base-path";
import { CloseIcon } from "./icons";
import styles from "./ScreenshotLightbox.module.scss";

export type LightboxImage = {
  title: string;
  image: string;
};

type Props = {
  /** The screenshot to display, or `null` when the lightbox is closed. */
  project: LightboxImage | null;
  /** Called on Escape, backdrop click or the close button. */
  onDismiss: () => void;
};

/**
 * Full-screen screenshot viewer built on the native `<dialog>` element, so it
 * gets focus trapping, background inerting and Escape-to-close for free.
 */
export default function ScreenshotLightbox({ project, onDismiss }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Drive the native dialog from the controlled `project` prop.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project && !dialog.open) {
      dialog.showModal();
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  // `showModal` does not stop the page behind from scrolling.
  useEffect(() => {
    if (!project) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={project ? `${project.title} screenshot` : undefined}
      onClose={onDismiss}
      onClick={(event) => {
        // Clicking the scrim (not the image) dismisses.
        if (event.target === dialogRef.current) onDismiss();
      }}
    >
      {project && (
        <>
          <button
            type="button"
            className={styles.close}
            onClick={onDismiss}
            aria-label="Close screenshot (Esc)"
          >
            <CloseIcon className={styles.closeIcon} />
          </button>

          <div
            className={styles.frame}
            onClick={(event) => {
              // Clicking the letterboxed area around the image also dismisses.
              if (event.target === event.currentTarget) onDismiss();
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- intrinsic size is unknown, and images are unoptimized under `output: export` */}
            <img
              className={styles.image}
              src={assetPath(project.image)}
              alt={`${project.title} — enlarged screenshot`}
            />
          </div>

          <p className={styles.caption}>{project.title}</p>
        </>
      )}
    </dialog>
  );
}
