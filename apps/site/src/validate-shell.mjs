import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const app = fileURLToPath(new URL("../", import.meta.url));
const required = [
  "next-env.d.ts",
  "next.config.mjs",
  "package.json",
  "tsconfig.json",
  "vercel.json",
  "src/proxy.ts",
  "src/app/globals.css",
  "src/app/homepage.css",
  "src/app/guide-pages.css",
  "src/app/trust-forge.css",
  "src/app/public-records.css",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/promise/page.tsx",
  "src/app/laws/page.tsx",
  "src/app/how-it-works/page.tsx",
  "src/app/consumer-first/page.tsx",
  "src/app/aster/page.tsx",
  "src/app/trust/page.tsx",
  "src/app/forge/page.tsx",
  "src/app/roadmap/page.tsx",
  "src/app/support/page.tsx",
  "src/app/funding/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/joined/page.tsx",
  "src/app/api/join/route.ts",
  "src/app/not-found.tsx",
  "src/app/error.tsx",
  "src/app/global-error.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/components/site-navigation.tsx",
  "src/components/status-badge.tsx",
  "src/components/capability-status-grid.tsx",
  "src/components/connected-loops.tsx",
  "src/components/promise-principles.tsx",
  "src/components/newsletter-signup-form.tsx",
  "src/components/newsletter-signup-form.module.css",
  "src/lib/navigation.ts",
  "src/lib/capability-status.ts",
  "src/lib/promise.ts",
  "src/lib/seven-laws.ts",
  "src/lib/how-it-works.ts",
  "src/lib/consumer-first.ts",
  "src/lib/aster.ts",
  "src/lib/trust-center.ts",
  "src/lib/open-forge.ts",
  "src/lib/public-roadmap.ts",
  "src/lib/support-routes.ts",
  "src/lib/funding-transparency.ts",
  "public/assets/compass-mark.svg",
  "public/assets/hero-ogygia.webp",
];

await Promise.all(required.map((path) => access(`${app}/${path}`)));

const packageJson = JSON.parse(await readFile(`${app}/package.json`, "utf8"));
for (const [name, version] of Object.entries({
  next: "16.2.12",
  react: "19.2.8",
  "react-dom": "19.2.8",
})) {
  if (packageJson.dependencies?.[name] !== version) {
    throw new Error(`${name} must be pinned to ${version}`);
  }
}

const serverSourcePaths = [
  "src/app/globals.css",
  "src/app/homepage.css",
  "src/app/guide-pages.css",
  "src/app/trust-forge.css",
  "src/app/public-records.css",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/promise/page.tsx",
  "src/app/laws/page.tsx",
  "src/app/how-it-works/page.tsx",
  "src/app/consumer-first/page.tsx",
  "src/app/aster/page.tsx",
  "src/app/trust/page.tsx",
  "src/app/forge/page.tsx",
  "src/app/roadmap/page.tsx",
  "src/app/support/page.tsx",
  "src/app/funding/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/joined/page.tsx",
  "src/app/api/join/route.ts",
  "src/app/sitemap.ts",
  "src/components/site-navigation.tsx",
  "src/components/status-badge.tsx",
  "src/components/capability-status-grid.tsx",
  "src/components/connected-loops.tsx",
  "src/components/promise-principles.tsx",
  "src/lib/navigation.ts",
  "src/lib/capability-status.ts",
  "src/lib/promise.ts",
  "src/lib/seven-laws.ts",
  "src/lib/how-it-works.ts",
  "src/lib/consumer-first.ts",
  "src/lib/aster.ts",
  "src/lib/trust-center.ts",
  "src/lib/open-forge.ts",
  "src/lib/public-roadmap.ts",
  "src/lib/support-routes.ts",
  "src/lib/funding-transparency.ts",
  "src/proxy.ts",
  "next.config.mjs",
  "vercel.json",
];

const serverSource = (
  await Promise.all(
    serverSourcePaths.map((path) => readFile(`${app}/${path}`, "utf8")),
  )
).join("\n");
const normalizedSource = serverSource.replace(/\s+/g, " ");

for (const phrase of [
  "Build your Living Chronicle. Improve your health. Keep the key.",
  "The software is open. The person’s health data is private.",
  "without agreeing to research",
  "Build your health record",
  "Improve your health",
  "Control and share in created value",
  "The Law of the Open Hand",
  "The Right of the Key",
  "The Sanctity of the Hearth",
  "The Law of the True Chronicle",
  "No Oracle Above Evidence",
  "The Right of Return",
  "The Covenant of the Commons",
  "three to eight minutes",
  "AI may assist. Deterministic services decide.",
  "No broken-streak punishment.",
  "Standards at the edges",
  "No provider or connector capability is live.",
  "AI proposes. The player confirms.",
  "The domain service validates and stores.",
  "No production Aster capability is live.",
  "Trust begins with visible limits.",
  "A documented control is not a deployed control.",
  "Do not open a public issue.",
  "No public page closes these gates.",
  "Useful tools without hidden authority.",
  "Exactly ten tools",
  "forge.invocation-receipt.v1",
  "forge.error.v1",
  "Nineteen specialist holdpoints and eighteen unresolved-work records remain open",
  "Contributors do not need Forge to participate.",
  "Evidence decides what comes next.",
  "A roadmap is a sequence of evidence gates",
  "Use the route that protects the person.",
  "Do not make private evidence public.",
  "Support cannot purchase the Promise.",
  "No accepted funding relationships are recorded.",
  "No live funding opportunity is published.",
  "Attribution is not authority.",
  "No payment handoff is available.",
  "forge.search.lore",
  "forge.validate.content",
  "forge.inspect.quest-schema",
  "forge.validate.quest",
  "forge.search.architecture",
  "forge.search.decision",
  "forge.search.public-standards",
  "forge.validate.mapping-draft",
  "forge.search.synthetic-connector-fixtures",
  "forge.generate.synthetic-data",
  "SIGNUP_WEBHOOK_URL",
  "SIGNUP_WEBHOOK_TOKEN",
  "SIGNUP_NOT_CONFIGURED",
  "Content-Security-Policy",
  "metadataBase",
  "sitemap",
  "robots",
  "Skip to primary navigation",
  'aria-label="Narrative journey"',
  "No story traversal is required.",
  'href: "/promise"',
  'href: "/laws"',
  'href: "/how-it-works"',
  'href: "/consumer-first"',
  'href: "/aster"',
  'href: "/trust"',
  'href: "/forge"',
  'href: "/roadmap"',
  'href: "/support"',
  'href: "/funding"',
  '"live"',
  '"experimental"',
  '"planned"',
  '"long-horizon"',
  "prefers-reduced-motion",
  "prefers-reduced-data",
  "prefers-contrast",
  "forced-colors",
  'loading="lazy"',
  "NewsletterSignupForm",
  "Follow the build toward Phase 0 completion.",
  '"framework": "nextjs"',
  '"deploymentEnabled": false',
]) {
  if (!normalizedSource.includes(phrase.replace(/\s+/g, " "))) {
    throw new Error(`Site foundation is missing required evidence: ${phrase}`);
  }
}

if (serverSource.includes('"use client"') || serverSource.includes("'use client'")) {
  throw new Error(
    "Essential routes, navigation, status, trust, roadmap, support, and funding surfaces must remain server-rendered",
  );
}

const newsletter = await readFile(
  `${app}/src/components/newsletter-signup-form.tsx`,
  "utf8",
);
for (const phrase of [
  '"use client"',
  'name="email"',
  'name="consent"',
  'name="website"',
  'aria-live="polite"',
  'href="/privacy"',
]) {
  if (!newsletter.includes(phrase)) {
    throw new Error(`Newsletter form is missing required boundary: ${phrase}`);
  }
}

const fundingRecords = await readFile(
  `${app}/../../docs/economics/funding-records.yml`,
  "utf8",
);
const fundingOpportunities = await readFile(
  `${app}/../../docs/economics/funding-opportunities.yml`,
  "utf8",
);
if (!/^records: \[\]$/m.test(fundingRecords)) {
  throw new Error("Canonical funding relationships must remain parseable");
}
if (!/^opportunities: \[\]$/m.test(fundingOpportunities)) {
  throw new Error("Canonical funding opportunities must remain parseable");
}
if (!/contains no accepted funding relationships/i.test(fundingRecords)) {
  throw new Error("Funding relationship empty-state notice is missing");
}
if (!/contains no live opportunity/i.test(fundingOpportunities)) {
  throw new Error("Funding opportunity empty-state notice is missing");
}

const fundingPage = await readFile(`${app}/src/app/funding/page.tsx`, "utf8");
if (/<(?:form|input|button)\b/i.test(fundingPage)) {
  throw new Error("Funding transparency must not activate transaction controls");
}
if (/stripe|paypal|checkout session|payment intent/i.test(serverSource)) {
  throw new Error("Site must not contain a payment runtime");
}
for (const phrase of ["diagnosis", "medical-record", "wallet-address", "health-condition"]) {
  if (`${serverSource}\n${newsletter}`.includes(`name="${phrase}"`)) {
    throw new Error(`Site contains prohibited personal-data field: ${phrase}`);
  }
}

console.log(
  "Post-Sprint 8 public site, bounded newsletter, manual release, and Sprint 9 preparation boundaries are implemented for validation.",
);
