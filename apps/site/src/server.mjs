import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { handleSignup } from "./signup.mjs";

const root = fileURLToPath(new URL("../public/", import.meta.url));
const views = fileURLToPath(new URL("./views/", import.meta.url));
const types = { ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".webp": "image/webp" };
const headers = {
  "content-security-policy": "default-src 'self';base-uri 'none';connect-src 'self';font-src 'self';form-action 'self';frame-ancestors 'none';img-src 'self' data:;object-src 'none';script-src 'self';style-src 'self'",
  "cross-origin-opener-policy": "same-origin",
  "permissions-policy": "camera=(), geolocation=(), microphone=(), payment=()",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
};

const read = (name) => readFile(join(views, name), "utf8");
const shell = await read("shell.html");
const header = await read("header.html");
const footer = await read("footer.html");
const homepage = (await Promise.all(["hero", "game", "aster", "ogygia", "promise", "status", "expedition"].map((name) => read(`${name}.html`)))).join("");
const page = (title, description, content) => shell.replace("{{TITLE}}", title).replace("{{DESCRIPTION}}", description).replace("{{CONTENT}}", `${header}<main id="main">${content}</main>${footer}`);
const pages = new Map([
  ["/", page("Calypso’s Promise — Build Your Living Chronicle", "An open-source, narrative-driven health game planned for Ogygia.", homepage)],
  ["/privacy", page("Signup Privacy — Calypso’s Promise", "How Founding Expedition email signups are handled.", await read("privacy.html"))],
  ["/joined", page("Founding Expedition — Calypso’s Promise", "Confirmation for the Founding Expedition.", await read("joined.html"))],
]);

function send(response, status, body, extra = {}) {
  response.writeHead(status, { ...headers, ...extra });
  response.end(body);
}
const json = (response, status, value) => send(response, status, JSON.stringify(value), { "cache-control": "no-store", "content-type": "application/json; charset=utf-8" });

async function staticFile(request, response, pathname) {
  const candidate = join(root, pathname.replace(/^\/+/, ""));
  const rel = relative(root, normalize(candidate));
  if (!rel || rel.startsWith("..") || rel.startsWith("/")) return send(response, 404, "Not found");
  try {
    const info = await stat(candidate);
    if (!info.isFile()) throw new Error();
    const content = await readFile(candidate);
    send(response, 200, request.method === "HEAD" ? "" : content, {
      "cache-control": "public, max-age=86400, immutable",
      "content-length": String(content.length),
      "content-type": types[extname(candidate)] ?? "application/octet-stream",
    });
  } catch {
    send(response, 404, "Not found", { "content-type": "text/plain; charset=utf-8" });
  }
}

export function createSiteServer() {
  return createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", "http://localhost");
    if (url.pathname === "/api/join") {
      if (request.method !== "POST") return json(response, 405, { error: "Method not allowed." });
      return handleSignup(request, (status, value) => json(response, status, value));
    }
    if (!["GET", "HEAD"].includes(request.method)) return send(response, 405, "Method not allowed", { allow: "GET, HEAD" });
    const pathname = url.pathname.length > 1 ? url.pathname.replace(/\/$/, "") : "/";
    if (pages.has(pathname)) return send(response, 200, request.method === "HEAD" ? "" : pages.get(pathname), { "cache-control": "no-cache", "content-type": "text/html; charset=utf-8" });
    return staticFile(request, response, url.pathname);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT ?? 3000);
  createSiteServer().listen(port, () => console.log(`Calypso’s Promise site listening on http://localhost:${port}`));
}
