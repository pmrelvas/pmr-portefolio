import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Roboto_Mono, Russo_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const heading = Russo_One({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
});

const mono = Roboto_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const monoAlt = Geist_Mono({
  variable: "--font-mono-alt",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pedro Relvas | Full-Stack Developer",
  description:
    "Portfolio of Pedro Relvas, a full-stack software engineer building clean, scalable web applications with Java, Spring, Angular and TypeScript.",
  icons: {
    icon: "/assets/pmr-computer.png",
  },
};

// Runs before the body paints so the saved theme is applied without a flash.
const themeBoot = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${display.variable} ${heading.variable} ${mono.variable} ${monoAlt.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        {children}
      </body>
    </html>
  );
}
