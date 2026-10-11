import TechRain from "./TechRain";
import styles from "./Skills.module.scss";

type SkillGroup = {
  title: string;
  items: string[];
};

const groups: SkillGroup[] = [
  {
    title: "Programming",
    items: [
      "Java",
      "Spring Boot",
      "Quarkus",
      "Angular",
      "TypeScript",
      "JavaScript",
      "SQL",
      "NoSQL",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "RabbitMQ",
      "Kafka",
    ],
  },
  {
    title: "Tools",
    items: ["Git", "IntelliJ IDEA", "Cursor", "GitLab", "GitHub", "Jenkins"],
  },
  {
    title: "Methodologies",
    items: ["Agile", "Scrum", "CI/CD"],
  },
  {
    title: "Soft Skills",
    items: [
      "Problem Solving",
      "Critical Thinking",
      "Active Listening",
      "Teamwork",
      "Prioritization",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.tag} data-animate data-caret>
              &lt;skills /&gt;
            </span>
            <h2 className={styles.title} data-animate data-underline data-animate-delay={1}>
              Skills
            </h2>
            <p className={styles.subtitle} data-animate data-animate-delay={2}>
              The technologies, tools and ways of working I bring to a team.
            </p>
          </div>

          <div className={styles.rainWrap} data-animate data-animate-delay={1} aria-hidden="true">
            <TechRain />
          </div>
        </header>

        <div className={styles.grid}>
          {groups.map((group, index) => (
            <article
              key={group.title}
              className={styles.card}
              data-animate
              data-animate-delay={index + 1}
            >
              <h3 className={styles.cardTitle}>{group.title}</h3>
              <ul className={styles.chips}>
                {group.items.map((item) => (
                  <li key={item} className={styles.chip}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
