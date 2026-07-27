import { readFileSync, writeFileSync } from "node:fs";

const path = "tools/one-time-funding-final-audit-v2.mjs";
const source = readFileSync(path, "utf8");
const oldText =
  "Repository CI is expected to validate formatting, documentation links, repository policy, content validation, lint, type checking, tests, and DCO after the review pull request opens.";
const newText =
  "Repository CI must validate formatting, documentation links, repository policy, content validation, lint, type checking, tests, and DCO after the final reconciliation commit.";

if (!source.includes(oldText)) {
  throw new Error("final-audit validation anchor not found");
}

writeFileSync(path, source.replace(oldText, newText));
