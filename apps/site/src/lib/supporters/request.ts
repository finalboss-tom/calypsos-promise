import { createHmac } from "node:crypto";

export const supporterRequestBodyLimit = 16_384;

export function clientBucketHmac(request: Request, key: Buffer): Buffer {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";
  const client = forwarded.split(",", 1)[0]?.trim() || "unknown";
  return createHmac("sha256", key).update(client, "utf8").digest();
}

export async function readBoundedJson(
  request: Request,
): Promise<Record<string, unknown>> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > supporterRequestBodyLimit) {
    throw new Error("BODY_TOO_LARGE");
  }
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > supporterRequestBodyLimit) {
    throw new Error("BODY_TOO_LARGE");
  }
  const value: unknown = JSON.parse(raw);
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

export function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  return typeof body.website === "string" && body.website.trim().length > 0;
}
