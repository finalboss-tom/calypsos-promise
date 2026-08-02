import { createHarness as createBaseHarness } from "./cdp.mjs";

const reactHydrationExpression = `document.readyState === 'complete' && Boolean(document.querySelector('[data-hydrated="true"]'))`;

export async function createHarness(baseUrl) {
  const harness = await createBaseHarness(baseUrl);
  const createBasePage = harness.createPage;

  harness.createPage = async (options = {}) => {
    const page = await createBasePage(options);
    const navigateBase = page.navigate;

    page.navigate = async (path = "/prologue") => {
      await navigateBase(path);
      if (options.noJavaScript) return;
      await page.wait(
        reactHydrationExpression,
        "React prologue event hydration",
        15_000,
      );
      await page.evaluate(
        "new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))",
        true,
      );
    };

    return page;
  };

  return harness;
}
