import { GAME_CONTENT_ENTRIES, GAME_CONTENT_MANIFEST } from "../dist/index.js";
import { validateGameContentPackage } from "../dist/validate.js";

const result = validateGameContentPackage(
  GAME_CONTENT_MANIFEST,
  GAME_CONTENT_ENTRIES,
);

if (!result.ok) {
  console.error(
    `Game content validation failed:\n${result.issues
      .map((issue) => `- ${issue.path}: ${issue.message}`)
      .join("\n")}`,
  );
  process.exit(1);
}

console.log(
  `Game content validation passed: ${GAME_CONTENT_MANIFEST.version}, ${GAME_CONTENT_ENTRIES.length} public synthetic entries, ${GAME_CONTENT_MANIFEST.supportedLocales.join(
    ", ",
  )}, browser/iOS/Android contract.`,
);
