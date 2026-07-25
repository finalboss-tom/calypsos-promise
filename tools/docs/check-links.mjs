import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".turbo",
  "coverage",
  "dist",
  "node_modules",
]);
const markdownFiles = [];
const failures = [];

async function collectMarkdownFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue;

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectMarkdownFiles(fullPath);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      markdownFiles.push(fullPath);
    }
  }
}

function destinationFromLink(rawDestination) {
  const trimmed = rawDestination.trim();
  if (trimmed.startsWith("<")) {
    const closingBracket = trimmed.indexOf(">");
    return closingBracket === -1
      ? trimmed.slice(1)
      : trimmed.slice(1, closingBracket);
  }

  const titleBoundary = trimmed.search(/\s+["']/);
  return titleBoundary === -1 ? trimmed : trimmed.slice(0, titleBoundary);
}

function isExternalOrAnchor(destination) {
  return (
    destination === "" ||
    destination.startsWith("#") ||
    destination.startsWith("//") ||
    /^[a-z][a-z0-9+.-]*:/i.test(destination)
  );
}

async function targetExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

await collectMarkdownFiles(root);

const { readFile } = await import("node:fs/promises");
const markdownLinkPattern = /!?\[[^\]]*\]\(([^)\n]+)\)/g;

for (const filePath of markdownFiles) {
  const content = await readFile(filePath, "utf8");
  const relativeFilePath = path.relative(root, filePath);

  for (const match of content.matchAll(markdownLinkPattern)) {
    const destination = destinationFromLink(match[1]);
    if (isExternalOrAnchor(destination)) continue;

    const pathOnly = destination.split("#", 1)[0].split("?", 1)[0];
    if (pathOnly === "") continue;

    let decodedPath;
    try {
      decodedPath = decodeURIComponent(pathOnly);
    } catch {
      failures.push(`${relativeFilePath}: invalid encoded link ${destination}`);
      continue;
    }

    const resolvedPath = decodedPath.startsWith("/")
      ? path.join(root, decodedPath.slice(1))
      : path.resolve(path.dirname(filePath), decodedPath);

    if (!(await targetExists(resolvedPath))) {
      const line = content.slice(0, match.index).split("\n").length;
      failures.push(
        `${relativeFilePath}:${line}: missing relative link target ${destination}`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error(
    "Documentation link checks failed:\n" +
      failures.map((failure) => `- ${failure}`).join("\n"),
  );
  process.exit(1);
}

console.log(
  `Documentation link checks passed for ${markdownFiles.length} Markdown files.`,
);
