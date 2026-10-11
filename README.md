# pmr-portefolio

Personal portfolio landing page for **Pedro Relvas — Full-Stack Developer**.

Built with **Next.js 16** (App Router, Cache Components), **React 19**, **TypeScript** and
**Sass CSS Modules** (ported from the original Webpack/SCSS portfolio).

## Features

- **Navigation** — fixed top bar with anchor links (`#home`, `#skills`, `#contact`), scroll‑spy
  active link highlighting and a mobile menu.
- **Hero** — "Full‑Stack Developer" with the name underneath (left), photo (right) and a
  **parallax** effect on scroll (respects `prefers-reduced-motion`).
- **Tech rain** — the cloud + falling tech icons animation from the original site, rendered with
  pure CSS keyframes (`--anim-duration` per icon).
- **Skills** — grouped cards: Programming, Tools, Methodologies, Soft Skills.
- **Contact form** — validated client form submitted through a **Server Action** that sends the
  message with **Resend** (honeypot + length caps included).
- **Dark / light theme** — persisted preference, no flash on load.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables (contact form)

Copy `.env.example` to `.env.local` and fill in the values. The keys are **server-side only** —
never prefix them with `NEXT_PUBLIC_`.

| Variable              | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `RESEND_API_KEY`      | Resend API key (create it with sending-only access). |
| `CONTACT_TO_EMAIL`    | Address that receives the contact messages.          |
| `CONTACT_FROM_EMAIL`  | Verified sender address on your domain.              |

While testing without a verified domain you can use Resend's onboarding sender:
`Portfolio <onboarding@resend.dev>`.

## Project structure

```
app/
  layout.tsx            fonts, metadata, theme boot script
  page.tsx              Home page (sections + footer)
  globals.css           theme tokens + base styles
  components/           Nav, Hero, TechRain, Skills, Contact, ThemeToggle, icons
  actions/contact.ts    Server Action for the contact form
lib/mailer.ts           server-only Resend sender
public/assets/          hero photo (compressed WebP), cloud, tech icons
```

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```