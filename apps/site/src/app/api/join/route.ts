import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Email signup is paused during the Sprint 8 migration. Follow the public repository for updates.",
      code: "SIGNUP_MIGRATION_PAUSED",
    },
    {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
        "Retry-After": "86400",
      },
    },
  );
}
