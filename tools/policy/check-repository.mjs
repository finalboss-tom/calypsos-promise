import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignored = new Set([
  ".git",
  "node_modules",
  ".turbo",
  "dist",
  ".next",
  "coverage",
]);
const forbiddenExtensions = new Set([".pem", ".key", ".p12", ".pfx"]);
const suspiciousPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /sk-[A-Za-z0-9_-]{20,}/,
  /AKIA[0-9A-Z]{16}/,
];

const failures = [];

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.relative(root, fullPath);

    if (entry.isDirectory()) {
      await visit(fullPath);
      continue;
    }

    if (forbiddenExtensions.has(path.extname(entry.name).toLowerCase())) {
      failures.push(`${relativePath}: forbidden sensitive-key file extension`);
      continue;
    }

    if (entry.name === ".env" || entry.name.startsWith(".env.")) {
      failures.push(`${relativePath}: environment files must not be committed`);
      continue;
    }

    const stat = await import("node:fs/promises").then(({ stat }) =>
      stat(fullPath),
    );
    if (stat.size > 1_000_000) continue;

    const content = await readFile(fullPath, "utf8").catch(() => "");
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(content))
        failures.push(`${relativePath}: possible committed secret`);
    }
  }
}

await visit(root);

if (failures.length > 0) {
  console.error(
    "Repository policy checks failed:\n" +
      failures.map((failure) => `- ${failure}`).join("\n"),
  );
  process.exit(1);
}

console.log("Repository policy checks passed.");
