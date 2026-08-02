import { spawn, spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function findChrome() {
  for (const candidate of [
    process.env.CHROME_BIN,
    "google-chrome",
    "google-chrome-stable",
    "chromium",
    "chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean)) {
    if (candidate.includes("/")) {
      if (spawnSync("test", ["-x", candidate]).status === 0) return candidate;
    } else {
      const result = spawnSync("sh", ["-lc", `command -v ${candidate}`], {
        encoding: "utf8",
      });
      if (result.status === 0 && result.stdout.trim()) return result.stdout.trim();
    }
  }
  throw new Error("Chrome or Chromium was not found");
}

class Client {
  constructor(url) {
    this.url = url;
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async open() {
    this.socket = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
        else pending.resolve(message.result);
        return;
      }
      for (const listener of this.listeners.get(message.method) ?? []) {
        listener(message);
      }
    });
  }

  send(method, params = {}, sessionId) {
    const id = ++this.id;
    const message = { id, method, params };
    if (sessionId) message.sessionId = sessionId;
    this.socket.send(JSON.stringify(message));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  on(method, listener) {
    this.listeners.set(method, [...(this.listeners.get(method) ?? []), listener]);
    return () => {
      this.listeners.set(
        method,
        (this.listeners.get(method) ?? []).filter((item) => item !== listener),
      );
    };
  }

  wait(method, sessionId, timeout = 10_000) {
    return new Promise((resolve, reject) => {
      const stop = this.on(method, (message) => {
        if (message.sessionId !== sessionId) return;
        clearTimeout(timer);
        stop();
        resolve(message.params);
      });
      const timer = setTimeout(() => {
        stop();
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeout);
    });
  }
}

export async function createHarness(baseUrl) {
  const origin = new URL(baseUrl).origin;
  const executable = findChrome();
  const profile = await mkdtemp(join(tmpdir(), "calypso-prologue-browser-"));
  const process = spawn(
    executable,
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-sync",
      "--no-first-run",
      "--no-default-browser-check",
      "--remote-debugging-port=0",
      `--user-data-dir=${profile}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let port;
  for (let attempt = 0; attempt < 200; attempt += 1) {
    try {
      port = Number(
        (await readFile(join(profile, "DevToolsActivePort"), "utf8")).split(
          /\s+/,
        )[0],
      );
      if (port) break;
    } catch {
      // Chrome creates this file after startup.
    }
    if (process.exitCode !== null) {
      throw new Error("Chrome exited before DevTools started");
    }
    await delay(50);
  }
  if (!port) throw new Error("Chrome DevTools port was not created");

  const version = await fetch(`http://127.0.0.1:${port}/json/version`).then(
    (response) => response.json(),
  );
  const client = new Client(version.webSocketDebuggerUrl);
  await client.open();

  const state = {
    seenControls: new Set(),
    usedControls: new Set(),
    externalRequests: new Set(),
    newsletterRequests: [],
    webSockets: [],
    browserErrors: [],
    seenLinks: new Map(),
  };

  async function createPage(options = {}) {
    const { browserContextId } = await client.send("Target.createBrowserContext");
    const { targetId } = await client.send("Target.createTarget", {
      url: "about:blank",
      browserContextId,
    });
    const { sessionId } = await client.send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    const requests = [];
    const stops = [
      client.on("Network.requestWillBeSent", (message) => {
        if (message.sessionId !== sessionId) return;
        const url = message.params.request.url;
        requests.push(url);
        if (/^https?:/.test(url) && new URL(url).origin !== origin) {
          state.externalRequests.add(url);
        }
        if (url.includes("/api/join")) state.newsletterRequests.push(url);
      }),
      client.on("Network.webSocketCreated", (message) => {
        if (message.sessionId === sessionId) {
          state.webSockets.push(message.params.url);
        }
      }),
      client.on("Runtime.exceptionThrown", (message) => {
        if (message.sessionId === sessionId) {
          state.browserErrors.push(
            message.params.exceptionDetails.exception?.description ??
              message.params.exceptionDetails.text,
          );
        }
      }),
      client.on("Log.entryAdded", (message) => {
        if (
          message.sessionId === sessionId &&
          message.params.entry.level === "error"
        ) {
          if (
            options.blockedUrls &&
            /ERR_(?:BLOCKED_BY_CLIENT|FAILED)/.test(message.params.entry.text)
          ) {
            return;
          }
          state.browserErrors.push(message.params.entry.text);
        }
      }),
    ];

    for (const domain of [
      "Page",
      "Runtime",
      "Network",
      "Log",
      "DOM",
      "Accessibility",
    ]) {
      await client.send(`${domain}.enable`, {}, sessionId);
    }
    await client.send(
      "Network.setCacheDisabled",
      { cacheDisabled: true },
      sessionId,
    );
    await client.send(
      "Emulation.setDeviceMetricsOverride",
      {
        width: options.width ?? 1280,
        height: options.height ?? 900,
        deviceScaleFactor: 1,
        mobile: false,
      },
      sessionId,
    );
    if (options.media) {
      await client.send(
        "Emulation.setEmulatedMedia",
        { media: "screen", features: options.media },
        sessionId,
      );
    }
    if (options.noJavaScript) {
      await client.send(
        "Emulation.setScriptExecutionDisabled",
        { value: true },
        sessionId,
      );
    }
    if (options.blockedUrls) {
      await client.send(
        "Network.setBlockedURLs",
        { urls: options.blockedUrls },
        sessionId,
      );
    }

    async function evaluate(expression, awaitPromise = false) {
      const result = await client.send(
        "Runtime.evaluate",
        {
          expression,
          returnByValue: true,
          awaitPromise,
          userGesture: true,
        },
        sessionId,
      );
      if (result.exceptionDetails) {
        throw new Error(
          result.exceptionDetails.exception?.description ??
            result.exceptionDetails.text,
        );
      }
      return result.result.value;
    }

    async function wait(expression, description, timeout = 8_000) {
      const deadline = Date.now() + timeout;
      while (Date.now() < deadline) {
        try {
          if (await evaluate(expression, true)) return;
        } catch {
          // Hydration may temporarily replace the document.
        }
        await delay(50);
      }
      throw new Error(`Timed out waiting for ${description}`);
    }

    async function navigate(path = "/prologue") {
      const loaded = client.wait("Page.loadEventFired", sessionId);
      await client.send(
        "Page.navigate",
        { url: new URL(path, baseUrl).toString() },
        sessionId,
      );
      await loaded;
      if (!options.noJavaScript) {
        await wait(
          "Boolean(document.querySelector('[data-scene]'))",
          "prologue hydration",
        );
      }
    }

    async function close() {
      stops.forEach((stop) => stop());
      await client.send("Target.closeTarget", { targetId });
      await client.send("Target.disposeBrowserContext", { browserContextId });
    }

    return { sessionId, requests, evaluate, wait, navigate, close };
  }

  async function snapshot(page) {
    const result = await page.evaluate(`(() => {
      const scene = document.querySelector('[data-scene]');
      const root = scene?.closest('section');
      const visible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      };
      const describe = (element) => ({
        tag: element?.tagName?.toLowerCase() ?? null,
        id: element?.id ?? null,
        text: (element?.textContent ?? '').replace(/\\s+/g, ' ').trim(),
        href: element?.href ?? null,
        height: element?.getBoundingClientRect?.().height ?? 0,
      });
      return {
        scene: scene?.dataset.scene ?? null,
        text: scene?.innerText ?? '',
        status: root?.querySelector(':scope > [role="status"]')?.textContent?.replace(/\\s+/g, ' ').trim() ?? '',
        active: describe(document.activeElement),
        controls: scene ? [...scene.querySelectorAll('button, summary')].filter(visible).map(describe) : [],
        links: scene ? [...scene.querySelectorAll('a')].filter(visible).map(describe) : [],
        inputs: root ? [...root.querySelectorAll('input, textarea, select, [contenteditable="true"]')].map(describe) : [],
        positiveTabIndexes: [...document.querySelectorAll('[tabindex]')].filter((element) => element.tabIndex > 0).map(describe),
        currentSteps: root?.querySelectorAll('[aria-current="step"]').length ?? 0,
        horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        localStorageLength: localStorage.length,
        sessionStorageLength: sessionStorage.length,
        cookie: document.cookie,
      };
    })()`);
    result.controls.forEach((control) => state.seenControls.add(control.text));
    result.links.forEach((link) => state.seenLinks.set(link.text, link.href));
    return result;
  }

  async function activate(page, label, expectedScene, options = {}) {
    const before = await snapshot(page);
    const found = await page.evaluate(`(() => {
      const normalize = (value) => String(value ?? '').replace(/\\s+/g, ' ').trim();
      const target = [...document.querySelectorAll('[data-scene] button:not([disabled]), [data-scene] summary')]
        .find((element) => normalize(element.textContent) === ${JSON.stringify(label)});
      if (!target) return false;
      target.focus();
      return true;
    })()`);
    if (!found) throw new Error(`Missing control ${label} in ${before.scene}`);
    state.usedControls.add(label);

    if (options.keyboard) {
      for (const type of ["keyDown", "keyUp"]) {
        await client.send(
          "Input.dispatchKeyEvent",
          { type, key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 },
          page.sessionId,
        );
      }
    } else {
      await page.evaluate(`(() => {
        const normalize = (value) => String(value ?? '').replace(/\\s+/g, ' ').trim();
        const target = [...document.querySelectorAll('[data-scene] button:not([disabled]), [data-scene] summary')]
          .find((element) => normalize(element.textContent) === ${JSON.stringify(label)});
        target.click();
      })()`);
    }

    await page.wait(
      `document.querySelector('[data-scene]')?.dataset.scene === ${JSON.stringify(expectedScene)}`,
      expectedScene,
    );
    if (expectedScene !== before.scene) {
      await page.wait(
        "document.activeElement?.id === 'prologue-scene-title'",
        `focus after ${label}`,
      );
    } else if (options.announcement) {
      await page.wait(
        `(document.querySelector('[data-scene]')?.closest('section')?.querySelector(':scope > [role="status"]')?.textContent ?? '').includes(${JSON.stringify(options.announcement)})`,
        `announcement after ${label}`,
      );
    }
    return snapshot(page);
  }

  return {
    executable,
    version,
    client,
    state,
    createPage,
    snapshot,
    activate,
    async close() {
      try {
        await client.send("Browser.close");
      } catch {
        process.kill("SIGTERM");
      }
      await delay(100);
      if (process.exitCode === null) process.kill("SIGKILL");
      await rm(profile, { recursive: true, force: true });
    },
  };
}
