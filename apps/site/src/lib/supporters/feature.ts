export function supporterMovementEnabled(): boolean {
  return process.env.SUPPORTER_MOVEMENT_ENABLED === "true";
}

export function supporterAdminEnabled(): boolean {
  return process.env.SUPPORTER_ADMIN_ENABLED === "true";
}

export function supporterPagesShouldBeIndexed(): boolean {
  return supporterMovementEnabled() && process.env.VERCEL_ENV === "production";
}

export function unavailableResponse(): Response {
  return Response.json(
    { error: "Not found" },
    {
      status: 404,
      headers: {
        "cache-control": "no-store",
        "x-robots-tag": "noindex, nofollow, noarchive",
      },
    },
  );
}
