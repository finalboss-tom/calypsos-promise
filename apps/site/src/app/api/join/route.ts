import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const maxBodyBytes = 16_384;
const attemptWindowMs = 15 * 60 * 1_000;
const maxAttemptsPerWindow = 5;
const attempts = new Map<string, { count: number; start: number }>();

function consented(value: unknown) {
  return value === true || ["true", "on", "yes"].includes(String(value));
}

function validateSignup(value: unknown) {
  const record =
    typeof value === "object" && value !== null
      ? (value as Record<string, unknown>)
      : {};
  const email =
    typeof record.email === "string" ? record.email.trim().toLowerCase() : "";

  if (typeof record.website === "string" && record.website.trim()) {
    return { ok: true as const, ignored: true as const };
  }
  if (!consented(record.consent)) {
    return {
      ok: false as const,
      error: "Please consent to receive project updates.",
    };
  }
  if (
    email.length < 3 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { ok: false as const, error: "Enter a valid email address." };
  }

  return { ok: true as const, email };
}

function clientKey(request: NextRequest) {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";
  return forwarded.split(",", 1)[0]?.trim() || "unknown";
}

function allowed(request: NextRequest, now = Date.now()) {
  const key = clientKey(request);
  const current = attempts.get(key);

  if (!current || now - current.start > attemptWindowMs) {
    attempts.set(key, { count: 1, start: now });
    return true;
  }
  if (current.count >= maxAttemptsPerWindow) return false;

  current.count += 1;
  return true;
}

async function parseBody(request: NextRequest) {
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBodyBytes) {
    throw new Error("BODY_TOO_LARGE");
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > maxBodyBytes) {
    throw new Error("BODY_TOO_LARGE");
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return JSON.parse(raw);
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  throw new Error("UNSUPPORTED_MEDIA_TYPE");
}

async function forwardSignup(email: string) {
  const target = process.env.SIGNUP_WEBHOOK_URL;
  if (!target) return false;

  const url = new URL(target);
  const loopback = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  if (url.protocol !== "https:" && !loopback) {
    throw new Error("SIGNUP_WEBHOOK_URL must use HTTPS");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8_000);

  try {
    const headers: Record<string, string> = {
      "content-type": "application/json",
      "user-agent": "calypsos-promise-site/phase-0-newsletter",
    };
    if (process.env.SIGNUP_WEBHOOK_TOKEN) {
      headers.authorization = `Bearer ${process.env.SIGNUP_WEBHOOK_TOKEN}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        consent: true,
        policyVersion: "2026-07-29",
        purpose: "Calypso's Promise public project updates",
        source: "phase-0-newsletter-website",
        receivedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Signup provider returned ${response.status}`);
    }
    return true;
  } finally {
    clearTimeout(timer);
  }
}

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: NextRequest) {
  if (!allowed(request)) {
    return json(429, {
      error: "Too many attempts. Please try again later.",
      code: "SIGNUP_RATE_LIMITED",
    });
  }

  try {
    const result = validateSignup(await parseBody(request));
    if (!result.ok) return json(400, { error: result.error });
    if ("ignored" in result) return json(202, { ok: true });

    if (!(await forwardSignup(result.email))) {
      return json(503, {
        error:
          "Newsletter signup is not configured in this environment. Please follow the public repository for updates.",
        code: "SIGNUP_NOT_CONFIGURED",
      });
    }

    return json(201, { ok: true, redirect: "/joined" });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return json(400, { error: "The signup request was not valid." });
    }
    if (error instanceof Error && error.message === "BODY_TOO_LARGE") {
      return json(413, { error: "The signup request was too large." });
    }
    if (error instanceof Error && error.message === "UNSUPPORTED_MEDIA_TYPE") {
      return json(415, { error: "Unsupported signup request format." });
    }

    console.error("Founding Expedition signup could not be delivered.");
    return json(502, {
      error: "Signup is temporarily unavailable. Please try again later.",
      code: "SIGNUP_PROVIDER_UNAVAILABLE",
    });
  }
}
