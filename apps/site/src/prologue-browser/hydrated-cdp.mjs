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
      try {
        await page.wait(
          reactHydrationExpression,
          "React prologue event hydration",
          15_000,
        );
      } catch (error) {
        const documentState = await page.evaluate(`(() => ({
          readyState: document.readyState,
          hydrated: document.querySelector('[data-hydrated]')?.getAttribute('data-hydrated') ?? null,
          scene: document.querySelector('[data-scene]')?.getAttribute('data-scene') ?? null,
          scripts: [...document.scripts].map((script) => script.src || '[inline]'),
          nextResources: performance.getEntriesByType('resource')
            .map((entry) => entry.name)
            .filter((name) => name.includes('/_next/')),
          userAgent: navigator.userAgent,
        }))()`);
        throw new Error(
          `${error.message}; diagnostics=${JSON.stringify({
            documentState,
            requests: page.requests,
            browserErrors: harness.state.browserErrors,
          })}`,
        );
      }
      await page.evaluate(
        "new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))",
        true,
      );
    };

    return page;
  };

  return harness;
}
