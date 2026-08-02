import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { createHarness } from "./prologue-browser/cdp.mjs";
import {
  longest,
  representative,
  shortest,
  supplemental,
} from "./prologue-browser/scenarios.mjs";

const baseUrl = process.env.SITE_BASE_URL ?? "http://127.0.0.1:3000";
const reportPath = process.env.PROLOGUE_BROWSER_REPORT;
const staticReportPath = process.env.SITE_RELEASE_REPORT;
const screenshotDirectory = process.env.PROLOGUE_SCREENSHOT_DIR;
const failures = [];
const sprint8Budgets = Object.freeze({
  htmlBytes: 96 * 1024,
  javascriptBytes: 704 * 1024,
  cssBytes: 128 * 1024,
  imageBytes: 1536 * 1024,
  fontBytes: 0,
  totalBytes: 2048 * 1024,
  firstPartyRequests: 32,
});
const normalize = (value) =>
  String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
const fail = (message) => failures.push(message);

async function capture(page, name) {
  if (!screenshotDirectory) return;
  await mkdir(screenshotDirectory, { recursive: true });
  const image = await harness.client.send(
    "Page.captureScreenshot",
    { format: "png", captureBeyondViewport: true },
    page.sessionId,
  );
  await writeFile(join(screenshotDirectory, name), image.data, "base64");
}

async function runJourney(
  id,
  steps,
  screenshot,
  { durationTarget = true } = {},
) {
  const page = await harness.createPage();
  const sceneWords = new Map();
  const evidence = [];
  const startedAt = performance.now();
  try {
    await page.navigate();
    let state = await harness.snapshot(page);
    sceneWords.set(
      state.scene,
      normalize(state.text).split(" ").filter(Boolean).length,
    );

    for (const [label, scene, announcement] of steps) {
      state = await harness.activate(page, label, scene, {
        keyboard: id !== "longest-optional-exploration",
        announcement,
      });
      const visibleWords = normalize(state.text).split(" ").filter(Boolean).length;
      sceneWords.set(
        state.scene,
        Math.max(sceneWords.get(state.scene) ?? 0, visibleWords),
      );
      if (state.inputs.length)
        fail(`${id}: prologue input found in ${state.scene}`);
      if (state.positiveTabIndexes.length) {
        fail(`${id}: positive tabindex found in ${state.scene}`);
      }
      if (state.currentSteps !== 1) {
        fail(`${id}: expected one current progress step in ${state.scene}`);
      }
      evidence.push({
        label,
        scene,
        headingFocused:
          state.active.id === "prologue-scene-title" ||
          scene === evidence.at(-1)?.scene,
        announcement: state.status,
      });
    }

    const words = [...sceneWords.values()].reduce(
      (total, value) => total + value,
      0,
    );
    const modeledMinutes = Number(
      (words / 160 + steps.length * (4 / 60)).toFixed(2),
    );
    if (durationTarget && modeledMinutes >= 10) {
      fail(
        `${id}: modeled completion time ${modeledMinutes} is not under ten minutes`,
      );
    }

    const storage = await page.evaluate(
      `(async () => ({
        indexedDb: typeof indexedDB.databases === 'function' ? (await indexedDB.databases()).length : 0,
        cacheStorage: 'caches' in globalThis ? (await globalThis.caches.keys()).length : 0,
      }))()`,
      true,
    );
    const { cookies } = await harness.client.send(
      "Network.getAllCookies",
      {},
      page.sessionId,
    );
    const final = await harness.snapshot(page);
    if (
      final.localStorageLength ||
      final.sessionStorageLength ||
      final.cookie ||
      storage.indexedDb ||
      storage.cacheStorage ||
      cookies.some((cookie) => cookie.domain.includes("127.0.0.1"))
    ) {
      fail(`${id}: browser persistence was created`);
    }
    if (screenshot) await capture(page, screenshot);

    return {
      id,
      durationTarget,
      finalScene: final.scene,
      actionCount: steps.length,
      uniqueSceneCount: sceneWords.size,
      visibleWords: words,
      modeledMinutes,
      automationElapsedMs: Math.round(performance.now() - startedAt),
      evidence,
    };
  } finally {
    await page.close();
  }
}

async function runSupplemental() {
  const results = [];
  for (const check of supplemental) {
    const page = await harness.createPage();
    try {
      await page.navigate();
      for (const [label, scene, announcement] of check.setup) {
        await harness.activate(page, label, scene, { announcement });
      }
      const [label, scene] = check.target;
      const result = await harness.activate(page, label, scene);
      results.push({ id: check.id, label, finalScene: result.scene });
    } finally {
      await page.close();
    }
  }
  return results;
}

async function verifyTabOrder() {
  const page = await harness.createPage();
  try {
    await page.navigate();
    await harness.activate(
      page,
      "Skip directly to Lantern Shore",
      "lantern-shore",
    );
    const expected = await page.evaluate(`(() => {
      const visible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      };
      const normalize = (value) => String(value ?? '').replace(/\\s+/g, ' ').trim();
      return [...document.querySelectorAll('[data-scene] button:not([disabled]), [data-scene] summary, [data-scene] a[href]')]
        .filter(visible)
        .map((element) => normalize(element.textContent));
    })()`);
    await page.evaluate(
      `document.querySelector('[data-scene] button:not([disabled]), [data-scene] summary, [data-scene] a[href]')?.focus()`,
    );
    const observed = [
      await page.evaluate(
        `String(document.activeElement?.textContent ?? '').replace(/\\s+/g, ' ').trim()`,
      ),
    ];
    for (let index = 1; index < expected.length; index += 1) {
      await harness.client.send(
        "Input.dispatchKeyEvent",
        { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 },
        page.sessionId,
      );
      await harness.client.send(
        "Input.dispatchKeyEvent",
        { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 },
        page.sessionId,
      );
      observed.push(
        await page.evaluate(
          `String(document.activeElement?.textContent ?? '').replace(/\\s+/g, ' ').trim()`,
        ),
      );
    }
    if (JSON.stringify(observed) !== JSON.stringify(expected)) {
      fail(
        `keyboard tab order differed: expected ${expected.join(" → ")}; observed ${observed.join(" → ")}`,
      );
    }
    return { expected, observed, keyboardTrapDetected: false };
  } finally {
    await page.close();
  }
}

async function verifyAccessibility() {
  const reviewPage = await harness.createPage();
  let disabledConfirmation;
  try {
    await reviewPage.navigate();
    for (const [label, scene] of shortest.slice(0, 6)) {
      await harness.activate(reviewPage, label, scene);
    }
    disabledConfirmation = await reviewPage.evaluate(
      `[...document.querySelectorAll('[data-scene] button')]
        .find((element) => element.textContent.includes('Confirm this synthetic demonstration'))
        ?.disabled === true`,
    );
    if (!disabledConfirmation)
      fail("confirmation enabled before review choice");
  } finally {
    await reviewPage.close();
  }

  const media = [];
  for (const [id, features, query] of [
    [
      "reduced-motion",
      [{ name: "prefers-reduced-motion", value: "reduce" }],
      "(prefers-reduced-motion: reduce)",
    ],
    [
      "increased-contrast",
      [{ name: "prefers-contrast", value: "more" }],
      "(prefers-contrast: more)",
    ],
    [
      "forced-colors",
      [{ name: "forced-colors", value: "active" }],
      "(forced-colors: active)",
    ],
  ]) {
    const page = await harness.createPage({ media: features });
    try {
      await page.navigate();
      const matches = await page.evaluate(
        `matchMedia(${JSON.stringify(query)}).matches`,
      );
      await harness.activate(
        page,
        "Skip directly to Lantern Shore",
        "lantern-shore",
      );
      const state = await harness.snapshot(page);
      if (!matches || state.horizontalOverflow > 1) {
        fail(`${id}: media mode or layout failed`);
      }
      media.push({ id, matches, horizontalOverflow: state.horizontalOverflow });
      if (id === "forced-colors") {
        await capture(page, "prologue-forced-colors.png");
      }
    } finally {
      await page.close();
    }
  }

  const narrowPage = await harness.createPage({ width: 360, height: 800 });
  let narrow;
  try {
    await narrowPage.navigate();
    await harness.activate(
      narrowPage,
      "Skip directly to Lantern Shore",
      "lantern-shore",
    );
    const state = await harness.snapshot(narrowPage);
    const heights = state.controls.map((control) => control.height);
    narrow = {
      horizontalOverflow: state.horizontalOverflow,
      minimumTargetHeight: Math.min(...heights),
    };
    if (
      narrow.horizontalOverflow > 1 ||
      heights.some((height) => height < 44)
    ) {
      fail("narrow viewport overflowed or exposed a control shorter than 44px");
    }
  } finally {
    await narrowPage.close();
  }

  const lowDataPage = await harness.createPage({
    blockedUrls: ["*.png", "*.jpg", "*.jpeg", "*.webp", "*.gif", "*.svg"],
  });
  let lowData;
  try {
    await lowDataPage.navigate();
    await harness.activate(
      lowDataPage,
      "Skip directly to Lantern Shore",
      "lantern-shore",
    );
    const cssUrls = await lowDataPage.evaluate(
      `performance.getEntriesByType('resource')
        .map((entry) => entry.name)
        .filter((url) => url.includes('.css'))`,
    );
    const css = (
      await Promise.all(
        cssUrls.map((url) => fetch(url).then((response) => response.text())),
      )
    ).join("\n");
    lowData = {
      controlsAvailable:
        (await harness.snapshot(lowDataPage)).controls.length > 0,
      reducedDataRulePresent: css.includes("prefers-reduced-data"),
    };
    if (!lowData.controlsAvailable || !lowData.reducedDataRulePresent) {
      fail("low-data simulation failed");
    }
  } finally {
    await lowDataPage.close();
  }

  const noJavaScriptPage = await harness.createPage({ noJavaScript: true });
  let noJavaScript;
  try {
    await noJavaScriptPage.navigate();
    const { root } = await harness.client.send(
      "DOM.getDocument",
      { depth: -1, pierce: true },
      noJavaScriptPage.sessionId,
    );
    const { outerHTML } = await harness.client.send(
      "DOM.getOuterHTML",
      { nodeId: root.nodeId },
      noJavaScriptPage.sessionId,
    );
    noJavaScript = {
      fallbackPresent: outerHTML.includes(
        "interactive opening needs JavaScript",
      ),
      directLink: outerHTML.includes('href="/how-it-works"'),
    };
    if (!noJavaScript.fallbackPresent || !noJavaScript.directLink) {
      fail("no-JavaScript fallback failed");
    }
  } finally {
    await noJavaScriptPage.close();
  }

  const axPage = await harness.createPage();
  let accessibilityTree;
  try {
    await axPage.navigate();
    const { nodes } = await harness.client.send(
      "Accessibility.getFullAXTree",
      {},
      axPage.sessionId,
    );
    const roles = new Set(nodes.map((node) => node.role?.value));
    const names = new Set(nodes.map((node) => node.name?.value));
    accessibilityTree = {
      nodeCount: nodes.length,
      requiredRolesPresent: ["main", "heading", "button", "link"].every(
        (role) => roles.has(role),
      ),
      openingButtonNamed: names.has("Begin the opening"),
    };
    if (
      !accessibilityTree.requiredRolesPresent ||
      !accessibilityTree.openingButtonNamed
    ) {
      fail("accessibility tree is incomplete");
    }
  } finally {
    await axPage.close();
  }

  return {
    disabledConfirmation,
    media,
    narrow,
    lowData,
    noJavaScript,
    accessibilityTree,
  };
}

async function verifyExitLifecycle() {
  const page = await harness.createPage();
  try {
    await page.navigate();
    await harness.activate(
      page,
      "Skip directly to Lantern Shore",
      "lantern-shore",
    );
    await page.evaluate(
      `document.querySelector('[data-scene] a[href="/"]').click()`,
    );
    await page.wait("location.pathname === '/'", "public exit");
    await page.navigate();
    const state = await harness.snapshot(page);
    if (state.scene !== "arrival") fail(`exit restored ${state.scene}`);
    return { returnedScene: state.scene, stateRestored: false };
  } finally {
    await page.close();
  }
}

async function readStaticEvidence() {
  if (!staticReportPath) return null;
  try {
    const report = JSON.parse(
      await readFile(resolve(process.cwd(), staticReportPath), "utf8"),
    );
    const route = report.routeEvidence.find(
      (item) => item.path === "/prologue",
    );
    for (const [metric, budget] of Object.entries(sprint8Budgets)) {
      if (route[metric] > budget) {
        fail(`/prologue ${metric} exceeds the accepted Sprint 8 ceiling`);
      }
    }
    return route;
  } catch (error) {
    fail(`static evidence unavailable: ${error.message}`);
    return null;
  }
}

const harness = await createHarness(baseUrl);
try {
  const journeys = [
    await runJourney(
      "shortest-manual-text",
      shortest,
      "prologue-complete-manual.png",
    ),
    await runJourney(
      "representative-aster-voice",
      representative,
      "prologue-complete-aster.png",
    ),
    await runJourney(
      "longest-optional-exploration",
      longest,
      undefined,
      { durationTarget: false },
    ),
  ];
  const supplementalChecks = await runSupplemental();
  const keyboardOrder = await verifyTabOrder();
  const accessibility = await verifyAccessibility();
  const exitLifecycle = await verifyExitLifecycle();
  const staticEvidence = await readStaticEvidence();

  const missingControls = [...harness.state.seenControls].filter(
    (control) => !harness.state.usedControls.has(control),
  );
  if (missingControls.length) {
    fail(
      `visible button controls were not exercised: ${missingControls.join(", ")}`,
    );
  }
  const visibleLinks = [...harness.state.seenLinks.entries()].map(
    ([text, href]) => ({ text, href }),
  );
  const invalidLinks = visibleLinks.filter(({ href }) => {
    const url = new URL(href);
    return !(
      (url.origin === new URL(baseUrl).origin && url.pathname === "/") ||
      (url.origin === "https://github.com" &&
        url.pathname.startsWith("/finalboss-tom/calypsos-promise/"))
    );
  });
  if (invalidLinks.length) {
    fail(
      `unexpected visible links: ${invalidLinks.map(({ href }) => href).join(", ")}`,
    );
  }
  if (harness.state.externalRequests.size) {
    fail(
      `external runtime requests: ${[...harness.state.externalRequests].join(", ")}`,
    );
  }
  if (harness.state.newsletterRequests.length) {
    fail(
      `newsletter API requests: ${harness.state.newsletterRequests.join(", ")}`,
    );
  }
  if (harness.state.webSockets.length) {
    fail(`WebSockets opened: ${harness.state.webSockets.join(", ")}`);
  }
  if (harness.state.browserErrors.length) {
    fail(`browser errors: ${harness.state.browserErrors.join(" | ")}`);
  }

  const report = {
    schema: "calypsos.prologue-browser-evidence.v1",
    evidenceClass: "isolated-local-rendered-browser",
    certification: "maintainer implementation evidence only",
    origin: new URL(baseUrl).origin,
    browser: {
      executable: harness.executable,
      product: harness.version.Browser,
      protocolVersion: harness.version["Protocol-Version"],
    },
    journeys,
    supplementalChecks,
    keyboardOrder,
    links: { visible: visibleLinks, invalid: invalidLinks },
    controls: {
      discovered: [...harness.state.seenControls].sort(),
      exercised: [...harness.state.usedControls].sort(),
      missing: missingControls,
    },
    accessibility,
    privacyAndSecurity: {
      externalRuntimeRequests: [...harness.state.externalRequests],
      newsletterApiRequests: harness.state.newsletterRequests,
      webSockets: harness.state.webSockets,
      browserErrors: harness.state.browserErrors,
      exitLifecycle,
    },
    staticPrologueEvidence: staticEvidence,
    acceptedSprint8PerformanceBudgets: sprint8Budgets,
    sprint8BudgetDisposition: staticEvidence
      ? Object.fromEntries(
          Object.entries(sprint8Budgets).map(([metric, budget]) => [
            metric,
            {
              measured: staticEvidence[metric],
              budget,
              remaining: budget - staticEvidence[metric],
              passes: staticEvidence[metric] <= budget,
            },
          ]),
        )
      : null,
    durationMethod: {
      method:
        "unique visible scene words at 160 words per minute plus four seconds per activated control",
      limitation:
        "maintainer model, not affected-user or assistive-technology timing evidence. Automated elapsed time is recorded separately from the reading-time model.",
      target:
        "shortest and representative direct completion journeys under ten modeled minutes; optional exploration measured separately",
    },
    limitations: [
      "Chrome automation is not independent accessibility certification.",
      "Affected-user, named screen reader, browser/device matrix, and field performance review remain open.",
      "Chrome cannot emulate prefers-reduced-data directly; evidence combines compiled media-rule inspection with an image-blocked control check.",
    ],
    failures,
  };

  if (reportPath) {
    const absolute = resolve(process.cwd(), reportPath);
    await mkdir(dirname(absolute), { recursive: true });
    await writeFile(absolute, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  }

  if (failures.length) {
    console.error(
      `Prologue browser validation failed:\n${failures
        .map((message) => `- ${message}`)
        .join("\n")}`,
    );
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
} finally {
  await harness.close();
}
