import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = new URL("https://www.calypsospromise.org");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "Calypso’s Promise",
  title: {
    default: "Calypso’s Promise — Build Your Living Chronicle",
    template: "%s — Calypso’s Promise",
  },
  description:
    "An open-source health odyssey helping people build, understand, and control their Living Chronicles.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/compass-mark.svg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Calypso’s Promise",
    title: "Calypso’s Promise — Build Your Living Chronicle",
    description:
      "Build your Living Chronicle. Improve your health. Keep the key.",
    images: [
      {
        url: "/assets/hero-ogygia.webp",
        width: 1600,
        height: 900,
        alt: "Concept illustration of Ogygia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calypso’s Promise — Build Your Living Chronicle",
    description:
      "Build your Living Chronicle. Improve your health. Keep the key.",
    images: ["/assets/hero-ogygia.webp"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#061725",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Calypso’s Promise home">
            <Image
              src="/assets/compass-mark.svg"
              width={54}
              height={54}
              alt=""
            />
            <span>
              <strong>Calypso’s Promise</strong>
              <small>An open-source health odyssey</small>
            </span>
          </Link>
          <nav className="site-nav" aria-label="Primary navigation">
            <Link href="/">Home</Link>
            <Link href="/privacy">Signup privacy</Link>
            <a
              href="https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md"
              target="_blank"
              rel="noreferrer"
            >
              Current status
            </a>
            <a
              href="https://github.com/finalboss-tom/calypsos-promise"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
        </header>
        <main id="main" className="page-shell">
          {children}
        </main>
        <footer className="site-footer">
          <span>
            The software is open. The person’s health data is private.
          </span>
          <a
            href="https://github.com/finalboss-tom/calypsos-promise"
            target="_blank"
            rel="noreferrer"
          >
            Inspect the public repository
          </a>
        </footer>
      </body>
    </html>
  );
}
