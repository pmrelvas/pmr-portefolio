import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { GitHubIcon, LinkedInIcon } from "./components/icons";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-[var(--border)] py-6">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="m-0 text-sm text-[var(--muted)]">
            © Pedro Relvas. Built with Next.js.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/pedro-relvas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-[var(--secondary)] transition-colors hover:text-[var(--primary)]"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/pmrelvas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-[var(--secondary)] transition-colors hover:text-[var(--primary)]"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
