import { supporterMovementEnabled } from "@/lib/supporters/feature";
import { bearerAuthorized } from "@/lib/supporters/outbox-auth";
import {
  getSupporterOutboxWorkerConfig,
  supporterOutboxWorkerEnabled,
} from "@/lib/supporters/outbox-config";
import { runSupporterOutboxWorker } from "@/lib/supporters/outbox-worker";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

const noStoreHeaders = { "cache-control": "no-store" };

async function handle(request: Request) {
  if (!supporterMovementEnabled() || !supporterOutboxWorkerEnabled()) {
    return new Response("Not found", { status: 404, headers: noStoreHeaders });
  }

  let config: ReturnType<typeof getSupporterOutboxWorkerConfig>;
  try {
    config = getSupporterOutboxWorkerConfig();
  } catch {
    return Response.json(
      { error: "Supporter outbox worker is unavailable." },
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
    const result = await runSupporterOutboxWorker({ config });
    return Response.json({ ok: true, ...result }, { headers: noStoreHeaders });
  } catch {
    return Response.json(
      { error: "Supporter outbox worker failed closed." },
      { status: 503, headers: noStoreHeaders },
    );
  }
}

export const GET = handle;
export const POST = handle;
