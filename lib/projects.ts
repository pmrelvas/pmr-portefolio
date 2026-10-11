/**
 * Side projects shown on `/projects`.
 *
 * ⚠️ The three entries below are **examples** — swap the titles, descriptions,
 * links and screenshots for your own.
 *
 * Screenshots live in `public/assets/projects/` and can be PNG, JPG, WebP or
 * animated GIF. Reference them from `image` with a leading slash and they get
 * the GitHub Pages base path applied automatically, e.g.
 * `/assets/projects/my-app.png`.
 */
export type Project = {
  /** Unique id, used as a React key and anchor id. */
  slug: string;
  title: string;
  description: string;
  /** Live app URL (or the repository, when there is no deployed site). */
  href: string;
  /** Path under `public/`, e.g. `/assets/projects/my-app.png`. */
  image: string;
  /** Optional short labels rendered as chips. */
  tags?: string[];
};

export const projects: Project[] = [
  {
    slug: "pmr-keypress-aquarium",
    title: "PMR Keypress Aquarium",
    description:
      "Aquarium with fish appearing on every keypress, with audio feedback, to entertain and estimulate the younger ones.",
    href: "https://pmrelvas.github.io/pmr-keypress-aquarium",
    image: "/assets/projects/pmr-keypress-aquarium.gif",
    tags: ["HTML", "CSS"],
  },
  {
    slug: "viagens-da-relvas",
    title: "Viagens da Relvas",
    description:
      "Landing page for a travel agent.",
    href: "https://viagensdarelvas.com",
    image: "/assets/projects/viagens-da-relvas.jpeg",
    tags: ["Next.js"],
  },
  {
    slug: "pmr-base64-encoder",
    title: "PMR Base64 Encoder",
    description:
      "Static application to encode and decode Base64, also allowing to easily encode and decode Basic Auth.",
    href: "https://pmrelvas.github.io/pmr-base64-encoder-angular",
    image: "/assets/projects/pmr-base64-encoder.png",
    tags: ["Angular"],
  },
  {
    slug: "pmr-gitlab-uploader",
    title: "PMR GitLab Uploader",
    description:
      "Google Chrome extension to upload files to GitLab, allowing to upload to a custom GitLab instance.",
    href: "https://github.com/pmrelvas/pmr-gitlab-uploader",
    image: "/assets/projects/pmr-gitlab-uploader.png",
    tags: ["VueJs"],
  },
];
