const maxBody = 16_384;
const attempts = new Map();

const consented = (value) =>
  value === true || ["true", "on", "yes"].includes(value);

export function validateSignup(value) {
  const email =
    typeof value?.email === "string" ? value.email.trim().toLowerCase() : "";
  if (typeof value?.website === "string" && value.website.trim())
    return { ok: true, ignored: true };
  if (!consented(value?.consent))
    return { ok: false, error: "Please consent to receive project updates." };
  if (
    email.length < 3 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { ok: false, error: "Enter a valid email address." };
  }
  return { ok: true, email };
}

async function body(request) {
  const chunks = [];
  let bytes = 0;
  for await (const chunk of request) {
    bytes += chunk.length;
    if (bytes > maxBody) throw new Error("BODY_TOO_LARGE");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  const type = request.headers["content-type"] ?? "";
  if (type.includes("application/json")) return JSON.parse(raw);
  if (type.includes("application/x-www-form-urlencoded"))
    return Object.fromEntries(new URLSearchParams(raw));
  throw new Error("UNSUPPORTED_MEDIA_TYPE");
}

function allowed(request, now = Date.now()) {
  const forwarded = request.headers["x-forwarded-for"];
  const key =
    typeof forwarded === "string"
      ? forwarded.split(",", 1)[0].trim()
      : (request.socket.remoteAddress ?? "unknown");
  const current = attempts.get(key);
  if (!current || now - current.start > 900_000) {
    attempts.set(key, { count: 1, start: now });
    return true;
  }
  if (current.count >= 5) return false;
  current.count += 1;
  return true;
}

async function forward(email) {
  const target = process.env.SIGNUP_WEBHOOK_URL;
  if (!target) return false;
  const url = new URL(target);
  const loopback = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  if (url.protocol !== "https:" && !loopback)
    throw new Error("SIGNUP_WEBHOOK_URL must use HTTPS");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8_000);
  try {
    const headers = {
      "content-type": "application/json",
      "user-agent": "calypsos-promise-site/0.1",
    };
    if (process.env.SIGNUP_WEBHOOK_TOKEN)
      headers.authorization = `Bearer ${process.env.SIGNUP_WEBHOOK_TOKEN}`;
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        consent: true,
        policyVersion: "2026-07-25",
        purpose: "Calypso's Promise public project updates",
        source: "founding-expedition-website",
        receivedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });
    if (!response.ok)
      throw new Error(`Signup provider returned ${response.status}`);
    return true;
  } finally {
    clearTimeout(timer);
  }
}

export async function handleSignup(request, sendJson) {
  if (!allowed(request))
    return sendJson(429, {
      error: "Too many attempts. Please try again later.",
    });
  try {
    const result = validateSignup(await body(request));
    if (!result.ok) return sendJson(400, { error: result.error });
    if (result.ignored) return sendJson(202, { ok: true });
    if (!(await forward(result.email))) {
      return sendJson(503, {
        error:
          "Email signup is not connected yet. Please follow the repository while private intake is configured.",
      });
    }
    return sendJson(201, { ok: true, redirect: "/joined" });
  } catch (error) {
    if (error instanceof SyntaxError)
      return sendJson(400, { error: "The signup request was not valid." });
    if (error?.message === "BODY_TOO_LARGE")
      return sendJson(413, { error: "The signup request was too large." });
    if (error?.message === "UNSUPPORTED_MEDIA_TYPE")
      return sendJson(415, { error: "Unsupported signup request format." });
    console.error("Founding Expedition signup could not be delivered.");
    return sendJson(502, {
      error: "Signup is temporarily unavailable. Please try again later.",
    });
  }
}
