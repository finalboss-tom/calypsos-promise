import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { NewsletterSignupForm } from "@/components/newsletter-signup-form";
import { SiteNavigation } from "@/components/site-navigation";
import "./globals.css";
import "./homepage.css";
import "./guide-pages.css";
import "./trust-forge.css";
import "./public-records.css";

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
        <div className="skip-links" aria-label="Skip links">
          <a className="skip-link" href="#primary-navigation">
            Skip to primary navigation
          </a>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
        </div>
        <header className="site-header">
          <div className="header-bar">
            <Link
              className="brand"
              href="/"
              aria-label="Calypso’s Promise home"
            >
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
            <p className="header-promise">Build. Understand. Control.</p>
          </div>
          <SiteNavigation />
        </header>
        <main id="main" className="page-shell" tabIndex={-1}>
          {children}
        </main>
        <aside
          className="site-header contribution-callout"
          aria-labelledby="newsletter-title"
        >
          <div>
            <p className="eyebrow">Join the Founding Expedition</p>
            <h2 id="newsletter-title">
              Follow the build toward Phase 0 completion.
            </h2>
            <p>
              Receive occasional public project updates and clear opportunities
              to inspect, play, review, or contribute. Joining the newsletter
              does not create an account or enroll you in research, governance,
              fundraising, health-data sharing, or the game.
            </p>
          </div>
          <NewsletterSignupForm />
        </aside>
        <footer className="site-footer">
          <p>The software is open. The person’s health data is private.</p>
          <nav aria-label="Footer navigation">
            <Link href="/promise">The Promise</Link>
            <Link href="/trust">Trust Center</Link>
            <Link href="/forge">Open Forge</Link>
            <Link href="/roadmap">Roadmap</Link>
            <Link href="/support">Support</Link>
            <Link href="/funding">Funding transparency</Link>
            <a
              href="https://github.com/finalboss-tom/calypsos-promise"
              target="_blank"
              rel="noreferrer"
            >
              Inspect the public repository
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <Link href="/privacy">Signup privacy</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
