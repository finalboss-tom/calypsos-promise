import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const app = fileURLToPath(new URL("../", import.meta.url));
const required = [
  "next-env.d.ts",
  "next.config.mjs",
  "package.json",
  "tsconfig.json",
  "src/proxy.ts",
  "src/app/globals.css",
  "src/app/homepage.css",
  "src/app/guide-pages.css",
  "src/app/trust-forge.css",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/promise/page.tsx",
  "src/app/laws/page.tsx",
  "src/app/how-it-works/page.tsx",
  "src/app/consumer-first/page.tsx",
  "src/app/aster/page.tsx",
  "src/app/trust/page.tsx",
  "src/app/forge/page.tsx",
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
  "src/lib/navigation.ts",
  "src/lib/capability-status.ts",
  "src/lib/promise.ts",
  "src/lib/seven-laws.ts",
  "src/lib/how-it-works.ts",
  "src/lib/consumer-first.ts",
  "src/lib/aster.ts",
  "src/lib/trust-center.ts",
  "src/lib/open-forge.ts",
  "public/assets/compass-mark.svg",
  "public/assets/hero-ogygia.webp",
  "vercel.json",
];

await Promise.all(required.map((path) => access(`${app}/${path}`)));

const packageJson = JSON.parse(await readFile(`${app}/package.json`, "utf8"));

const expectedVersions = {
  next: "16.2.12",
  react: "19.2.8",
  "react-dom": "19.2.8",
};

for (const [name, version] of Object.entries(expectedVersions)) {
  if (packageJson.dependencies?.[name] !== version) {
    throw new Error(`${name} must be pinned to ${version}`);
  }
}

const sourcePaths = [
  "src/app/globals.css",
  "src/app/homepage.css",
  "src/app/guide-pages.css",
  "src/app/trust-forge.css",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/promise/page.tsx",
  "src/app/laws/page.tsx",
  "src/app/how-it-works/page.tsx",
  "src/app/consumer-first/page.tsx",
  "src/app/aster/page.tsx",
  "src/app/trust/page.tsx",
  "src/app/forge/page.tsx",
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
  "src/proxy.ts",
  "next.config.mjs",
];

const source = (
  await Promise.all(
    sourcePaths.map((path) => readFile(`${app}/${path}`, "utf8")),
  )
).join("\n");
const normalizedSource = source.replace(/\s+/g, " ");

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
  "SIGNUP_MIGRATION_PAUSED",
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
  '"live"',
  '"experimental"',
  '"planned"',
  '"long-horizon"',
  "prefers-reduced-motion",
  "prefers-reduced-data",
  "prefers-contrast",
  "forced-colors",
  'loading="lazy"',
  "Read the contribution guide",
]) {
  const normalizedPhrase = phrase.replace(/\s+/g, " ");
  if (!normalizedSource.includes(normalizedPhrase)) {
    throw new Error(`Site foundation is missing required evidence: ${phrase}`);
  }
}

if (source.includes('"use client"') || source.includes("'use client'")) {
  throw new Error(
    "Sprint 8 homepage, Promise, guide, trust, Forge, navigation, and status surfaces must remain server-rendered",
  );
}

for (const phrase of [
  "diagnosis",
  "medical-record",
  "wallet-address",
  "health-condition",
]) {
  if (source.includes(`name="${phrase}"`)) {
    throw new Error(`Site contains prohibited personal-data field: ${phrase}`);
  }
}

console.log(
  "Sprint 8.6 Trust Center and Open Forge boundaries are implemented for validation.",
);
