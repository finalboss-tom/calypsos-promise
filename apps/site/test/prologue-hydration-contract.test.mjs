import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("exposes one inert client-ready signal for rendered validation", async () => {
  const [opening, hydratedHarness] = await Promise.all([
    read("../src/components/prologue-opening.tsx"),
    read("../src/prologue-browser/hydrated-cdp.mjs"),
  ]);

  assert.match(opening, /const \[hydrated, setHydrated\] = useState\(false\)/);
  assert.match(opening, /useEffect\(\(\) => \{\s*setHydrated\(true\);\s*\}, \[\]\)/);
  assert.match(opening, /data-hydrated=\{hydrated \? "true" : "false"\}/);
  assert.match(hydratedHarness, /\[data-hydrated=\\?"true\\?"\]/);
  assert.doesNotMatch(hydratedHarness, /__reactFiber|__reactProps/);
  assert.doesNotMatch(opening, /localStorage|sessionStorage|indexedDB|document\.cookie/);
});
