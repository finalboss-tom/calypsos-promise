import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const app = fileURLToPath(new URL("../", import.meta.url));
const required = [
  "public/site.js",
  "public/assets/compass-mark.svg",
  "public/assets/hero-ogygia.webp",
  "public/assets/aster.webp",
  "public/assets/ogygia-day.webp",
  "public/styles/base.css",
  "public/styles/hero.css",
  "public/styles/game.css",
  "public/styles/world.css",
  "public/styles/closing.css",
  "public/styles/responsive.css",
  "src/views/shell.html",
  "src/views/header.html",
  "src/views/hero.html",
  "src/views/game.html",
  "src/views/aster.html",
  "src/views/ogygia.html",
  "src/views/promise.html",
  "src/views/status.html",
  "src/views/expedition.html",
  "src/views/footer.html",
  "src/views/privacy.html",
  "src/views/joined.html",
];
await Promise.all(required.map((path) => access(`${app}/${path}`)));
const content = (
  await Promise.all(
    [
      "header",
      "hero",
      "game",
      "aster",
      "ogygia",
      "promise",
      "status",
      "expedition",
      "footer",
    ].map((name) => readFile(`${app}/src/views/${name}.html`, "utf8")),
  )
).join("");
for (const phrase of [
  "View on GitHub",
  "Meet Aster",
  "AI proposes.",
  "The Software Is Open.",
  "Planned game",
  "Content, Living Chronicle, and House of Keys contracts",
  "Do not submit personal health information.",
]) {
  if (!content.includes(phrase))
    throw new Error(`Site is missing required copy: ${phrase}`);
}
for (const field of [
  "diagnosis",
  "medical-record",
  "wallet-address",
  "health-condition",
]) {
  if (content.includes(`name="${field}"`))
    throw new Error(`Site contains prohibited signup field: ${field}`);
}
console.log("Calypso’s Promise public site bundle is complete.");
