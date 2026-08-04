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
      if (result.status === 0 && result.stdout.trim())
        return result.stdout.trim();
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
        if (message.error)
          pending.reject(new Error(JSON.stringify(message.error)));
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
    this.listeners.set(method, [
      ...(this.listeners.get(method) ?? []),
      listener,
    ]);
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
    const { browserContextId } = await client.send(
      "Target.createBrowserContext",
    );
    const { targetId } = await client.send("Target.createTarget", {
      url: "about:blank",
      browserContextId,
    });
    const { sessionId } = await client.send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    await client.send("Target.activateTarget", { targetId });
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
        if (message.sessionId === sessionId)
          state.webSockets.push(message.params.url);
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
    await client.send("Page.bringToFront", {}, sessionId);
    await client.send(
      "Emulation.setFocusEmulationEnabled",
      { enabled: true },
      sessionId,
    );
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
        status: root?.querySelectoŠ	ÎœØÛÜHˆÜ›ÛOHœİ]\È—IÊOË^ÛÛ[Ëœ™\XÙJ×ÊËÙË	È	ÊKš[J
HÏÈ	ÉËˆXİ]™Nˆ\ØÜšX™JØİ[Y[˜Xİ]™Q[[Y[
KˆÛÛ›ÛÎˆØÙ[™HÈË‹‹™Øİ[Y[œ]Y\TÙ[XİÜ[
	ÖÙ]K\ØÙ[™WH]Û‹Ù]K\ØÙ[™WHİ[[X\KØ\šXK[X™[H”›ÛÙİYH][]HÛÛ›ÛÈ—H]Û‰ÊWK™š[\Šš\ÚX›JK›X\
\ØÜšX™JHˆ×Kˆ[šÜÎˆØÙ[™HÈË‹‹œØÙ[™Kœ]Y\TÙ[XİÜ[
	ØIÊWK™š[\Šš\ÚX›JK›X\
\ØÜšX™JHˆ×Kˆ[œ]Îˆ›ÛİÈË‹‹œ›Ûİœ]Y\TÙ[XİÜ[
	Ú[œ]^\™XKÙ[XİØÛÛ[Y]X›OHYH—IÊWK›X\
\ØÜšX™JHˆ×KˆÜÚ]]™UX’[™^\ÎˆË‹‹™Øİ[Y[œ]Y\TÙ[XİÜ[
	ÖİXš[™^IÊWK™š[\Š
[[Y[
HOˆ[[Y[X’[™^ˆ
K›X\
\ØÜšX™JKˆİ\œ™[İ\Îˆ›ÛİËœ]Y\TÙ[XİÜ[
	ÖØ\šXKXİ\œ™[Hœİ\—IÊK›[™İÏÈˆÜš^›Û[İ™\™›İÎˆØİ[Y[™Øİ[Y[[[Y[œØÜ›ÛÚYHØİ[Y[™Øİ[Y[[[Y[˜ÛY[ÚYˆØØ[İÜ˜YÙS[™İˆØØ[İÜ˜YÙK›[™İˆÙ\ÜÚ[Û”İÜ˜YÙS[™İˆÙ\ÜÚ[Û”İÜ˜YÙK›[™İˆÛÛÚÚYNˆØİ[Y[˜ÛÛÚÚYKˆNÂˆJJ
X
NÂˆ™\İ[˜ÛÛ›ÛË™›Ü‘XXÚ

ÛÛ›Û
HOˆİ]KœÙY[ÛÛ›ÛË˜Y
ÛÛ›Û^
JNÂˆ™\İ[›[šÜË™›Ü‘XXÚ

[šÊHOˆİ]KœÙY[“[šÜËœÙ]
[šË^[šËš™YŠJNÂˆ™]\›ˆ™\İ[ÂˆB‚ˆ\Ş[˜È[˜İ[ÛˆXİ]˜]JYÙKX™[^XİYØÙ[™KÜ[ÛœÈHßJHÂˆÛÛœİ™Y›Ü™HH]ØZ]Û˜\Úİ
YÙJNÂˆÛÛœİ›İ[™H]ØZ]YÙK™]˜[X]J


HOˆÂˆÛÛœİ›Ü›X[^™HH
˜[YJHOˆİš[™Ê˜[YHÏÈ	ÉÊKœ™\XÙJ×ÊËÙË	È	ÊKš[J
NÂˆÛÛœİ\™Ù]HË‹‹™Øİ[Y[œ]Y\TÙ[XİÜ[
	ÖÙ]K\ØÙ[™WH]Û››İ
Ù\ØX›YJKÙ]K\ØÙ[™WHİ[[X\KØ\šXK[X™[H”›ÛÙİYH][]HÛÛ›ÛÈ—H]Û››İ
Ù\ØX›YJIÊWBˆ™š[™

[[Y[
HOˆ›Ü›X[^™J[[Y[^ÛÛ[
HOOH	Ò”ÓÓ‹œİš[™ÚYJX™[
_JNÂˆYˆ
]\™Ù]
H™]\›ˆ˜[ÙNÂˆ\™Ù]™›Øİ\Ê
NÂˆ™]\›ˆYNÂˆJJ
X
NÂˆYˆ
Y›İ[™
H›İÈ™]È\œ›ÜŠZ\ÜÚ[™ÈÛÛ›Û	ÛX™[H[ˆ	Ø™Y›Ü™KœØÙ[™_X
NÂˆİ]K\ÙYÛÛ›ÛË˜Y
X™[
NÂ‚ˆYˆ
Ü[ÛœËšÙ^X›Ø\™
HÂˆ]ØZ]ÛY[œÙ[™
ˆ’[œ]™\Ü]ÚÙ^Q]™[‹ˆÂˆ\NˆšÙ^QİÛˆ‹ˆÙ^Nˆ‘[\ˆ‹ˆÛÙNˆ‘[\ˆ‹ˆ^ˆ—ˆ‹ˆ[›[ÙYšYY^ˆ—ˆ‹ˆÚ[™İÜÕš\X[Ù^PÛÙNˆLËˆ˜]]™Uš\X[Ù^PÛÙNˆLËˆKˆYÙKœÙ\ÜÚ[Û’Yˆ
NÂˆ]ØZ]ÛY[œÙ[™
ˆ’[œ]™\Ü]ÚÙ^Q]™[‹ˆÂˆ\NˆšÙ^U\‹ˆÙ^Nˆ‘[\ˆ‹ˆÛÙNˆ‘[\ˆ‹ˆÚ[™İÜÕš\X[Ù^PÛÙNˆLËˆ˜]]™Uš\X[Ù^PÛÙNˆLËˆKˆYÙKœÙ\ÜÚ[Û’Yˆ
NÂˆH[ÙHÂˆ]ØZ]YÙK™]˜[X]J


HOˆÂˆÛÛœİ›Ü›X[^™HH
˜[YJHOˆİš[™Ê˜[YHÏÈ	ÉÊKœ™\XÙJ×ÊËÙË	È	ÊKš[J
NÂˆÛÛœİ\™Ù]HË‹‹™Øİ[Y[œ]Y\TÙ[XİÜ[
	ÖÙ]K\ØÙ[™WH]Û››İ
Ù\ØX›YJKÙ]K\ØÙ[™WHİ[[X\KØ\šXK[X™[H”›ÛÙİYH][]HÛÛ›ÛÈ—H]Û››İ
Ù\ØX›YJIÊWBˆ™š[™

[[Y[
HOˆ›Ü›X[^™J[[Y[^ÛÛ[
HOOH	Ò”ÓÓ‹œİš[™ÚYJX™[
_JNÂˆ\™Ù]˜ÛXÚÊ
NÂˆJJ
X
NÂˆB‚ˆHÂˆ]ØZ]YÙKØZ]
ˆØİ[Y[œ]Y\TÙ[XİÜŠ	ÖÙ]K\ØÙ[™WIÊOË™]\Ù]œØÙ[™HOOH	Ò”ÓÓ‹œİš[™ÚYJ^XİYØÙ[™J_Xˆ^XİYØÙ[™Kˆ
NÂˆHØ]Ú
\œ›ÜŠHÂˆÛÛœİXYÛ›ÜİXÈH]ØZ]Û˜\Úİ
YÙJNÂˆ›İÈ™]È\œ›ÜŠˆ	Ù\œ›Ü‹›Y\ÜØYÙ_NÈX™[IÛX™[NÈØÙ[™OIÙXYÛ›ÜİXËœØÙ[™_NÈXİ]™OIÙXYÛ›ÜİXË˜Xİ]™KYßN‰ÙXYÛ›ÜİXË˜Xİ]™K^Xˆ
NÂˆBˆYˆ
^XİYØÙ[™HOOH™Y›Ü™KœØÙ[™JHÂˆ]ØZ]YÙKØZ]
ˆ™Øİ[Y[˜Xİ]™Q[[Y[ËšYOOH	Ü›ÛÙİYK\ØÙ[™K]]IÈ‹ˆ›Øİ\ÈY\ˆ	ÛX™[Xˆ
NÂˆH[ÙHYˆ
Ü[ÛœË˜[››İ[˜Ù[Y[
HÂˆ]ØZ]YÙKØZ]
ˆ
Øİ[Y[œ]Y\TÙ[XİÜŠ	ÖÙ]K\ØÙ[™WIÊOË˜ÛÜÙ\İ
	ÜÙXİ[Û‰ÊOËœ]Y\TÙ[XİÜŠ	ÎœØÛÜHˆÜ›ÛOHœİ]\È—IÊOË^ÛÛ[ÏÈ	ÉÊKš[˜ÛY\Ê	Ò”ÓÓ‹œİš[™ÚYJÜ[ÛœË˜[››İ[˜Ù[Y[
_JXˆ[››İ[˜Ù[Y[Y\ˆ	ÛX™[Xˆ
NÂˆBˆ™]\›ˆÛ˜\Úİ
YÙJNÂˆB‚ˆ™]\›ˆÂˆ^Xİ]X›Kˆ™\œÚ[Û‹ˆÛY[ˆİ]KˆÜ™X]TYÙKˆÛ˜\ÚİˆXİ]˜]Kˆ\Ş[˜ÈÛÜÙJ
HÂˆHÂˆ]ØZ]ÛY[œÙ[™
œ›İÜÙ\‹˜ÛÜÙHŠNÂˆHØ]ÚÂˆ›ØÙ\ÜËšÚ[
”ÒQÕT“HŠNÂˆBˆ]ØZ][^JL
NÂˆYˆ
›ØÙ\ÜË™^]ÛÙHOOH[
H›ØÙ\ÜËšÚ[
”ÒQÒÒSŠNÂˆ]ØZ]›J›Ùš[KÈ™Xİ\œÚ]™NˆYK›Ü˜ÙNˆYHJNÂˆKˆNÂŸB