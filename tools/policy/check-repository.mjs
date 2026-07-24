import { readdir, readFile, stat } from "node:fs/promises";
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
const forbiddenPublicRecordExtensions = new Set([
  ".7z",
  ".bak",
  ".csv",
  ".db",
  ".dump",
  ".gz",
  ".sqlite",
  ".tar",
  ".tsv",
  ".xls",
  ".xlsx",
  ".zip",
]);
const suspiciousPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /sk-[A-Za-z0-9_-]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /AIza[0-9A-Za-z_-]{35}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /xox[baprs]-[A-Za-z0-9-]{20,}/,
];
const suspiciousPublicRecordNames = [
  /(?:^|[-_.])(contacts?|journalists?|leads?|mailing[-_ ]?list|media[-_ ]?list)(?:[-_.]|$)/i,
  /(?:^|[-_.])(participants?|patients?|signups?|subscribers?)(?:[-_.]|$)/i,
  /(?:^|[-_.])(crm|donor|partner|prospect)[-_ ]?export(?:[-_.]|$)/i,
];

const publicCommunicationRoot = path.join("docs", "public") + path.sep;
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

    const extension = path.extname(entry.name).toLowerCase();

    if (forbiddenExtensions.has(extension)) {
      failures.push(`${relativePath}: forbidden sensitive-key file extension`);
      continue;
    }

    if (entry.name === ".env" || entry.name.startsWith(".env.")) {
      failures.push(`${relativePath}: environment files must not be committed`);
      continue;
    }

    if (relativePath.startsWith(publicCommunicationRoot)) {
      if (forbiddenPublicRecordExtensions.has(extension)) {
        failures.push(
          `${relativePath}: raw export, archive, database, or spreadsheet files are not allowed in public communication records`,
        );
        continue;
      }

      for (const pattern of suspiciousPublicRecordNames) {
        if (pattern.test(entry.name)) {
          failures.push(
            `${relativePath}: possible private contact, participant, signup, or relationship record`,
          );
        }
      }
    }

    const fileStat = await stat(fullPath);
    if (fileStat.size > 1_000_000) continue;

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
