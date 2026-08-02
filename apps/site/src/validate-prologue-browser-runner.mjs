import { readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHarness } from "./prologue-browser/cdp.mjs";
import { representative, shortest } from "./prologue-browser/scenarios.mjs";

const baseUrl = process.env.SITE_BASE_URL ?? "http://127.0.0.1:3000";
const reportPath = process.env.PROLOGUE_BROWSER_REPORT;
const directory = dirname(fileURLToPath(import.meta.url));
const validatorPath = resolve(directory, "validate-prologue-browser.mjs");
const clickValidatorPath = resolve(
  directory,
  ".validate-prologue-browser-click.mjs",
);

async function runRenderedValidator() {
  const source = await readFile(validatorPath, "utf8");
  const transformed = source.replace(
    'keyboard: id !== "longest-direct-exploration",',
    "keyboard: false,",
  );
  if (transformed === source) {
    throw new Error("Rendered validator keyboard switch was not found");
  }
  await writeFile(clickValidatorPath, transformed, "utf8");
  try {
    await import(`${pathToFileURL(clickValidatorPath).href}?run=${Date.now()}`);
    if (process.exitCode) {
      throw new Error("Rendered click validation failed before keyboard evidence");
    }
  } finally {
    await rm(clickValidatorPath, { force: true });
  }
}

const strategies = Object.freeze([
  {
    id: "enter-keydown-text",
    events: [
      {
        type: "keyDown",
        key: "Enter",
        code: "Enter",
        text: "\r",
        unmodifiedText: "\r",
        windowsVirtualKeyCode: 13,
        nativeVirtualKeyCode: 13,
      },
      {
        type: "keyUp",
        key: "Enter",
        code: "Enter",
        windowsVirtualKeyCode: 13,
        nativeVirtualKeyCode: 13,
      },
    ],
  },
  {
    id: "enter-raw-char",
    events: [
      {
        type: "rawKeyDown",
        key: "Enter",
        code: "Enter",
        windowsVirtualKeyCode: 13,
        nativeVirtualKeyCode: 13,
      },
      {
        type: "char",
        key: "Enter",
        code: "Enter",
        text: "\r",
        unmodifiedText: "\r",
        windowsVirtualKeyCode: 13,
        nativeVirtualKeyCode: 13,
      },
      {
        type: "keyUp",
        key: "Enter",
        code: "Enter",
        windowsVirtualKeyCode: 13,
        nativeVirtualKeyCode: 13,
      },
    ],
  },
  {
    id: "space-keydown-text",
    events: [
      {
        type: "keyDown",
        key: " ",
        code: "Space",
        text: " ",
        unmodifiedText: " ",
        windowsVirtualKeyCode: 32,
        nativeVirtualKeyCode: 32,
      },
      {
        type: "keyUp",
        key: " ",
        code: "Space",
        windowsVirtualKeyCode: 32,
        nativeVirtualKeyCode: 32,
      },
    ],
  },
]);

async function focusControl(page, label) {
  return page.evaluate(`(() => {
    const normalize = (value) => String(value ?? '').replace(/\\s+/g, ' ').trim();
    const target = [...document.querySelectorAll('[data-scene] button:not([disabled]), [data-scene] summary, [aria-label="Prologue utility controls"] button:not([disabled])')]
      .find((element) => normalize(element.textContent) === ${JSON.stringify(label)});
    if (!target) return false;
    target.focus();
    return document.activeElement === target;
  })()`);
}

async function transitionObserved(page, beforeScene, expectedScene, announcement) {
  const deadline = Date.now() + 1_200;
  while (Date.now() < deadline) {
    const state = await page.evaluate(`(() => ({
      scene: document.querySelector('[data-scene]')?.dataset.scene ?? null,
      status: document.querySelector('[data-scene]')?.closest('section')?.querySelector(':scope > [role="status"]')?.textContent?.replace(/\\s+/g, ' ').trim() ?? '',
    }))()`);
    if (expectedScene !== beforeScene && state.scene === expectedScene) return true;
    if (
      expectedScene === beforeScene &&
      announcement &&
      state.status.includes(announcement)
    ) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 40));
  }
  return false;
}

async function dispatch(page, strategy) {
  for (const event of strategy.events) {
    await keyboardHarness.client.send(
      "Input.dispatchKeyEvent",
      {
        modifiers: 0,
        autoRepeat: false,
        location: 0,
        isKeypad: false,
        ...event,
      },
      page.sessionId,
    );
  }
}

async function activateKeyboard(
  page,
  label,
  expectedScene,
  announcement,
  preferredStrategy,
) {
  const before = await keyboardHarness.snapshot(page);
  const candidates = preferredStrategy
    ? strategies.filter((strategy) => strategy.id === preferredStrategy)
    : strategies;

  for (const strategy of candidates) {
    if (!(await focusControl(page, label))) {
      throw new Error(`Native keyboard target ${label} was not focusable`);
    }
    await dispatch(page, strategy);
    if (
      await transitionObserved(
        page,
        before.scene,
        expectedScene,
        announcement,
      )
    ) {
      if (expectedScene !== before.scene) {
        await page.wait(
          "document.activeElement?.id === 'prologue-scene-title'",
          `focus after native ${label}`,
        );
      }
      return strategy.id;
    }
  }

  const diagnostic = await keyboardHarness.snapshot(page);
  const pageFocused = await page.evaluate("document.hasFocus()");
  throw new Error(
    `No native keyboard strategy activated ${label}; scene=${diagnostic.scene}; active=${diagnostic.active.tag}:${diagnostic.active.text}; pageFocused=${pageFocused}`,
  );
}

async function runKeyboardJourney(id, steps, preferredStrategy) {
  const page = await keyboardHarness.createPage();
  const evidence = [];
  let strategy = preferredStrategy;
  try {
    await page.navigate();
    for (const [label, scene, announcement] of steps) {
      strategy = await activateKeyboard(
        page,
        label,
        scene,
        announcement,
        strategy,
      );
      const state = await keyboardHarness.snapshot(page);
      evidence.push({
        label,
        scene,
        strategy,
        headingFocused:
          state.active.id === "prologue-scene-title" ||
          scene === evidence.at(-1)?.scene,
        announcement: state.status,
      });
    }
    return { id, strategy, finalScene: evidence.at(-1)?.scene, evidence };
  } finally {
    await page.close();
  }
}

await runRenderedValidator();

const keyboardHarness = await createHarness(baseUrl);
try {
  const shortestKeyboard = await runKeyboardJourney(
    "shortest-manual-text-native-keyboard",
    shortest,
  );
  const representativeKeyboard = await runKeyboardJourney(
    "representative-aster-voice-native-keyboard",
    representative,
    shortestKeyboard.strategy,
  );

  if (!reportPath) {
    throw new Error("PROLOGUE_BROWSER_REPORT is required for keyboard evidence");
  }
  const absoluteReportPath = resolve(process.cwd(), reportPath);
  const report = JSON.parse(await readFile(absoluteReportPath, "utf8"));
  report.keyboardJourneys = [shortestKeyboard, representativeKeyboard];
  report.keyboardNativeStrategy = shortestKeyboard.strategy;
  report.limitations = [
    ...(report.limitations ?? []),
    "Native keyboard evidence uses the first Chrome DevTools key strategy that activates the focused control and records that strategy in the report.",
  ];
  await writeFile(
    absoluteReportPath,
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  console.log(
    JSON.stringify(
      {
        keyboardNativeStrategy: shortestKeyboard.strategy,
        keyboardJourneys: report.keyboardJourneys.map((journey) => ({
          id: journey.id,
          finalScene: journey.finalScene,
          actionCount: journey.evidence.length,
        })),
      },
      null,
      2,
    ),
  );
} finally {
  await keyboardHarness.close();
}
