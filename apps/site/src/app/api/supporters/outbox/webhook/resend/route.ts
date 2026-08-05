import { supporterMovementEnabled } from "@/lib/supporters/feature";
import { getSupporterResendWebhookConfig } from "@/lib/supporters/outbox-config";
import { recordSupporterEmailProviderEvent } from "@/lib/supporters/outbox-database";
import {
  resendEventReason,
  supportedResendSupporterEvents,
  verifyResendWebhook,
} from "@/lib/supporters/resend-webhook";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = { "cache-control": "no-store" };
const maximumWebhookBytes = 65_536;

async function readRawPayload(request: Request): Promise<string> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > maximumWebhookBytes) {
    throw new Error("WEBHOOK_TOO_LARGE");
  }
  if (!request.body) throw new Error("EMPTY_WEBHOOK");

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let payload = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > maximumWebhookBytes) {
      await reader.cancel("WEBHOOK_TOO_LARGE");
      throw new Error("WEBHOOK_TOO_LARGE");
    }
    payload += decoder.decode(value, { stream: true });
  }
  payload += decoder.decode();
  return payload;
}

export async function POST(request: Request) {
  if (!supporterMovementEnabled()) {
    return new Response("Not found", { status: 404, headers: noStoreHeaders });
  }

  let config: ReturnType<typeof getSupporterResendWebhookConfig>;
  let payload: string;
  try {
    config = getSupporterResendWebhookConfig();
    payload = await readRawPayload(request);
  } catch {
    return new Response("Invalid webhook", {
      status: 400,
      headers: noStoreHeaders,
    });
  }

  const svixId = request.headers.get("svix-id") ?? "";
  const svixTimestamp = request.headers.get("svix-timestamp") ?? "";
  const svixSignature = request.headers.get("svix-signature") ?? "";
  if (
    !verifyResendWebhook({
      payload,
      svixId,
      svixTimestamp,
      svixSignature,
      webhookSecret: config.webhookSecret,
    })
  ) {
    return new Response("Invalid webhook", {
      status: 400,
      headers: noStoreHeaders,
    });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(payload) as Record<string, unknown>;
  } catch {
    return new Response("Invalid webhook", {
      status: 400,
      headers: noStoreHeaders,
    });
  }

  const eventType = typeof event.type === "string" ? event.type : "";
  if (!supportedResendSupporterEvents.has(eventType)) {
    return Response.json(
      { ok: true, ignored: true },
      { headers: noStoreHeaders },
    );
  }

  const data =
    typeof event.data === "object" && event.data !== null
      ? (event.data as Record<string, unknown>)
      : {};
  const providerMessageId =
    typeof data.email_id === "string" ? data.email_id : "";
  const eventCreatedAt =
    typeof event.created_at === "string"
      ? new Date(event.created_at)
      : new Date(Number.NaN);

  if (!svixId || !providerMessageId || Number.isNaN(eventCreatedAt.getTime())) {
    return new Response("Invalid webhook", {
      status: 400,
      headers: noStoreHeaders,
    });
  }

  try {
    const result = await recordSupporterEmailProviderEvent({
      databaseUrl: config.workerDatabaseUrl,
      svixId,
      providerMessageId,
      eventType,
      eventCreatedAt,
      reasonCode: resendEventReason(event),
      receivedAt: new Date(),
    });
    return Response.json(
      {
        ok: true,
        duplicate: result?.result_duplicate ?? false,
        matched: result?.result_matched ?? false,
      },
      { headers: noStoreHeaders },
    );
  } catch {
    return Response.json(
      { error: "Webhook processing is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }
}
