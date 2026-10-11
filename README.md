# pmr-portefolio

Personal portfolio landing page.

Built with **Next.js 16** (App Router, Cache Components), **React 19**, **TypeScript** and
**Sass CSS Modules** (ported from the original Webpack/SCSS portfolio). Deployed to **GitHub
Pages** as a static export.

## Features

- **Navigation** — fixed top bar with anchor links (`#home`, `#skills`, `#contact`), scroll‑spy
  active link highlighting and a mobile menu.
- **Hero** — "Full‑Stack Developer" with the name underneath (left), photo (right), a
  **parallax** effect on scroll and a **cursor spotlight** that trails the pointer (both respect
  `prefers-reduced-motion`; the spotlight is skipped on touch devices).
- **Tech rain** — the cloud + falling tech icons animation from the original site, rendered with
  pure CSS keyframes (`--anim-duration` per icon).
- **Skills** — grouped cards: Programming, Tools, Methodologies, Soft Skills.
- **Contact** — a `mailto:` call-to-action linking to the address configured at build time.
- **Dark / light theme** — persisted preference, no flash on load.

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_CONTACT_EMAIL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Both are read at **build time** and are public (they ship in the client bundle), so they use the
`NEXT_PUBLIC_` prefix.

| Variable                   | Description                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address behind the contact `mailto:` link. Leave empty to hide the call-to-action.                  |
| `NEXT_PUBLIC_BASE_PATH`     | Sub-path the site is served from. Set by the deploy workflow; only needed locally to preview one.   |

## Project structure

```
app/
  layout.tsx            fonts, metadata, theme boot script
  page.tsx              Home page (sections + footer)
  globals.css           theme tokens + base styles
  components/           Nav, Hero, TechRain, Skills, Contact, ThemeToggle, icons
lib/base-path.ts         basePath-aware helper for public/ asset URLs
public/assets/           hero photo (compressed WebP), cloud, tech icons
.github/workflows/       ci.yml (PRs) + deploy.yml (GitHub Pages)
```

## Scripts

```bash
npm run dev      # development server
npm run build    # static export to out/
npm run preview  # serve the out/ export locally
npm run lint     # eslint
```

## Deployment (GitHub Pages)

`next.config.ts` sets `output: "export"`, so `npm run build` writes a static site to `out/`. Two
workflows drive CI/CD:

- **`.github/workflows/ci.yml`** — on every pull request: `npm run lint` + `npm run build`.
- **`.github/workflows/deploy.yml`** — on every push to `main`: builds the export and publishes
  `out/` to GitHub Pages.

### One-time setup

1. Push the repository to GitHub.
2. Under **Settings → Pages → Source**, choose **GitHub Actions**.
3. Under **Settings → Secrets and variables → Actions → Variables**, add
   `NEXT_PUBLIC_CONTACT_EMAIL` (the address for the contact link).

The site is published at `https://<user>.github.io/<repo>/`. `actions/configure-pages` supplies
the sub-path automatically via `NEXT_PUBLIC_BASE_PATH`, which `next.config.ts` uses as its
`basePath` and `lib/base-path.ts` uses to prefix hand-written asset URLs. For a user/org site or a
custom domain that value is empty and no prefix is applied.

> **Note:** GitHub Pages is static-only. The contact form's Resend Server Action was removed for
> this reason; the contact section is now a `mailto:` link.
