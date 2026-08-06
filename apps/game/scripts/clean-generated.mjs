import { rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const gameRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

for (const path of [".expo", "dist", "android", "ios"]) {
  rmSync(resolve(gameRoot, path), { force: true, recursive: true });
}
