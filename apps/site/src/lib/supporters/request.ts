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

  if (!request.body) throw new Error("EMPTY_BODY");

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let byteLength = 0;
  let raw = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    byteLength += value.byteLength;
    if (byteLength > supporterRequestBodyLimit) {
      await reader.cancel("BODY_TOO_LARGE");
      throw new Error("BODY_TOO_LARGE");
    }
    raw += decoder.decode(value, { stream: true });
  }
  raw += decoder.decode();

  const value: unknown = JSON.parse(raw);
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

export function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  return typeof body.website === "string" && body.website.trim().length > 0;
}
