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
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/joined/page.tsx",
  "src/app/api/join/route.ts",
  "src/app/not-found.tsx",
  "src/app/error.tsx",
  "src/app/global-error.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
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

const source = (
  await Promise.all(
    [
      "src/app/layout.tsx",
      "src/app/page.tsx",
      "src/app/privacy/page.tsx",
      "src/app/joined/page.tsx",
      "src/app/api/join/route.ts",
      "src/proxy.ts",
      "next.config.mjs",
    ].map((path) => readFile(`${app}/${path}`, "utf8")),
  )
).join("\n");

for (const phrase of [
  "Build your Living Chronicle. Improve your health. Keep the key.",
  "SIGNUP_MIGRATION_PAUSED",
  "Content-Security-Policy",
  "metadataBase",
  "sitemap",
  "robots",
]) {
  if (!source.includes(phrase)) {
    throw new Error(`Next.js shell is missing required evidence: ${phrase}`);
  }
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

console.log("Sprint 8.2 Next.js shell boundary is complete.");
