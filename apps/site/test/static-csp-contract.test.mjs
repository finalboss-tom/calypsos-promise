import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

const site = fileURLToPath(new URL("../", import.meta.url));

async function read(path) {
  return readFile(`${site}/${path}`, "utf8");
}

test("keeps the CSP compatible with static Next.js rendering", async () => {
  const [proxy, contract, previewValidation, sourceValidation] =
    await Promise.all([
      read("src/proxy.ts"),
      read("src/release-contract.mjs"),
      read("src/preview-validation/pages.mjs"),
      read("src/validate-release-source.mjs"),
    ]);

  assert.match(proxy, /script-src 'self' 'unsafe-inline'/);
  assert.match(proxy, /Content-Security-Policy/);
  assert.doesNotMatch(proxy, /crypto\.randomUUID|x-nonce|'strict-dynamic'/);

  assert.match(contract, /script-src 'self' 'unsafe-inline'/);
  assert.doesNotMatch(contract, /'strict-dynamic'/);

  assert.match(previewValidation, /static CSP must not depend on per-request nonces/);
  assert.match(sourceValidation, /static-rendering-compatible CSP/);
  assert.match(sourceValidation, /per-request nonce behavior/);
});
