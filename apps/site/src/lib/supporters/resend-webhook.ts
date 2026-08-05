import { createHmac, timingSafeEqual } from "node:crypto";

const webhookToleranceSeconds = 5 * 60;

export function verifyResendWebhook(input: {
  payload: string;
  svixId: string;
  svixTimestamp: string;
  svixSignature: string;
  webhookSecret: string;
  now?: Date;
}): boolean {
  const timestamp = Number(input.svixTimestamp);
  const nowSeconds = Math.floor((input.now ?? new Date()).getTime() / 1_000);
  if (
    !Number.isInteger(timestamp) ||
    Math.abs(nowSeconds - timestamp) > webhookToleranceSeconds
  ) {
    return false;
  }

  const encodedSecret = input.webhookSecret.startsWith("whsec_")
    ? input.webhookSecret.slice("whsec_".length)
    : "";
  const secret = Buffer.from(encodedSecret, "base64");
  if (secret.length < 16) return false;

  const expected = createHmac("sha256", secret)
    .update(`${input.svixId}.${input.svixTimestamp}.${input.payload}`, "utf8")
    .digest();

  return input.svixSignature.split(/\s+/).some((candidate) => {
    const [version, encoded] = candidate.split(",", 2);
    if (version !== "v1" || !encoded) return false;
    let actual: Buffer;
    try {
      actual = Buffer.from(encoded, "base64");
    } catch {
      return false;
    }
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  });
}

export const supportedResendSupporterEvents = new Set([
  "email.sent",
  "email.delivery_delayed",
  "email.delivered",
  "email.bounced",
  "email.complained",
  "email.suppressed",
  "email.failed",
]);

export function resendEventReason(
  event: Record<string, unknown>,
): string | undefined {
  const data =
    typeof event.data === "object" && event.data !== null
      ? (event.data as Record<string, unknown>)
      : {};
  const failed =
    typeof data.failed === "object" && data.failed !== null
      ? (data.failed as Record<string, unknown>)
      : {};
  const bounce =
    typeof data.bounce === "object" && data.bounce !== null
      ? (data.bounce as Record<string, unknown>)
      : {};
  const suppressed =
    typeof data.suppressed === "object" && data.suppressed !== null
      ? (data.suppressed as Record<string, unknown>)
      : {};

  const candidates = [failed.reason, bounce.subType, bounce.type, suppressed.reason];
  const value = candidates.find((candidate) => typeof candidate === "string");
  if (typeof value !== "string") return undefined;
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "_")
    .slice(0, 100);
  return normalized || undefined;
}
