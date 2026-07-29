import { writeFile } from "node:fs/promises";
import { validatePages } from "./preview-validation/pages.mjs";
import {
  baseUrl,
  contrastPairs,
  contrastRatio,
  fail,
  failures,
  performanceBudgets,
  reportPath,
  siteOrigin,
} from "./preview-validation/shared.mjs";
import { validateSupportingRoutes } from "./preview-validation/supporting.mjs";

const routeEvidence = await validatePages();
for (const pair of contrastPairs) {
  const ratio = contrastRatio(pair.foreground, pair.background);
  if (ratio < 7) {
    fail(`${pair.name}: contrast ratio ${ratio.toFixed(2)} is below 7:1`);
  }
}

const controls = await validateSupportingRoutes();
controls.newsletterRoutes = routeEvidence.length;

const report = {
  schema: "calypsos.site-release-evidence.v3",
  evidenceClass: "isolated-local-production-preview",
  certification: "repository implementation evidence only",
  origin: baseUrl,
  productionCanonicalOrigin: siteOrigin,
  routeEvidence,
  budgets: performanceBudgets,
  contrast: contrastPairs.map((pair) => ({
    name: pair.name,
    ratio: Number(contrastRatio(pair.foreground, pair.background).toFixed(2)),
  })),
  controls,
  providerContacted: false,
  failures,
};

if (reportPath) {
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}
if (failures.length) {
  console.error(
    `Site release validation failed:\n${failures
      .map((failure) => `- ${failure}`)
      .join("\n")}`,
  );
  process.exit(1);
}
console.log(JSON.stringify(report, null, 2));
