/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/base-path";
import styles from "./TechRain.module.scss";

type TechIcon = {
  src: string;
  label: string;
  duration: number;
  delay: number;
};

const icons: TechIcon[] = [
  { src: "/assets/tech_icons/angular-icon.svg", label: "Angular", duration: 14, delay: -1.4 },
  { src: "/assets/tech_icons/spring-boot-icon.png", label: "Spring Boot", duration: 20, delay: -3.2 },
  { src: "/assets/tech_icons/docker-icon.png", label: "Docker", duration: 16, delay: -0.6 },
  { src: "/assets/tech_icons/java-icon.svg", label: "Java", duration: 13, delay: -2.1 },
  { src: "/assets/tech_icons/postgres-icon.png", label: "PostgreSQL", duration: 17, delay: -4.4 },
  { src: "/assets/tech_icons/html-icon.png", label: "HTML", duration: 12, delay: -1.9 },
  { src: "/assets/tech_icons/css-icon.svg", label: "CSS", duration: 15, delay: -3.8 },
];

function Cloud() {
  return (
    <svg viewBox="0 0 222 110" fill="currentColor" className={styles.cloud} aria-hidden="true">
      <path d="M0 81C0 64.98 12.98 52 29 52H193C209.02 52 222 64.98 222 81C222 97.02 209.02 110 193 110H29C12.98 110 0 97.02 0 81Z" />
      <ellipse cx="70" cy="49" rx="41" ry="32" />
      <ellipse cx="121" cy="32" rx="41" ry="32" />
      <ellipse cx="158" cy="49" rx="41" ry="32" />
    </svg>
  );
}

export default function TechRain() {
  return (
    <div className={styles.techRain} aria-hidden="true">
      <div className={styles.cloudWrap}>
        <Cloud />
        <div className={styles.icons}>
          {icons.map((icon) => (
            <img
              key={icon.label}
              src={assetPath(icon.src)}
              alt=""
              className={styles.icon}
              loading="eager"
              style={
                {
                  "--anim-duration": icon.duration,
                  animationDelay: `${icon.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
