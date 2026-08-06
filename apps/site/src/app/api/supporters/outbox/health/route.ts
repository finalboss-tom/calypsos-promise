import { supporterMovementEnabled } from "@/lib/supporters/feature";
import { bearerAuthorized } from "@/lib/supporters/outbox-auth";
import {
  getSupporterOutboxWorkerConfig,
  supporterOutboxWorkerEnabled,
} from "@/lib/supporters/outbox-config";
import { getSupporterOutboxHealth } from "@/lib/supporters/outbox-database";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = { "cache-control": "no-store" };

export async function GET(request: Request) {
  if (!supporterMovementEnabled() || !supporterOutboxWorkerEnabled()) {
    return new Response("Not found", { status: 404, headers: noStoreHeaders });
  }

  let config: ReturnType<typeof getSupporterOutboxWorkerConfig>;
  try {
    config = getSupporterOutboxWorkerConfig();
  } catch {
    return Response.json(
      { error: "Supporter outbox health is unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  if (!bearerAuthorized(request, config.workerBearerToken)) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401, headers: noStoreHeaders },
    );
  }

  try {
    const health = await getSupporterOutboxHealth({
      databaseUrl: config.workerDatabaseUrl,
      now: new Date(),
    });
    return Response.json({ ok: true, health }, { headers: noStoreHeaders });
  } catch {
    return Response.json(
      { error: "Supporter outbox health is unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }
}
