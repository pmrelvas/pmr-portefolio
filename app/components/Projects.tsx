import { projects } from "@/lib/projects";
import ProjectsCarousel from "./ProjectsCarousel";
import styles from "./Projects.module.scss";

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.tag} data-animate data-caret>
            &lt;projects /&gt;
          </span>
          <h2 className={styles.title} data-animate data-underline data-animate-delay={1}>
            Side Projects
          </h2>
          <p className={styles.subtitle} data-animate data-animate-delay={2}>
            A few things I build outside of work. Swipe or use the arrows to browse, and select a
            screenshot to view it full size.
          </p>
        </header>

        {projects.length > 0 ? (
          <div data-animate data-animate-fade data-animate-delay={3}>
            <ProjectsCarousel projects={projects} />
          </div>
        ) : (
          <p className={styles.empty}>
            Nothing here yet — add entries in <code>lib/projects.ts</code>.
          </p>
        )}
      </div>
    </section>
  );
}
