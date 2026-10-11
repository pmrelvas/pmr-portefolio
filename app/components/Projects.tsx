import { projects } from "@/lib/projects";
import ProjectsCarousel from "./ProjectsCarousel";
import styles from "./Projects.module.scss";

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.tag}>&lt;projects /&gt;</span>
          <h2 className={styles.title}>Side Projects</h2>
          <p className={styles.subtitle}>
            A few things I build outside of work. Swipe or use the arrows to browse, and select a
            screenshot to view it full size.
          </p>
        </header>

        {projects.length > 0 ? (
          <ProjectsCarousel projects={projects} />
        ) : (
          <p className={styles.empty}>
            Nothing here yet — add entries in <code>lib/projects.ts</code>.
          </p>
        )}
      </div>
    </section>
  );
}
