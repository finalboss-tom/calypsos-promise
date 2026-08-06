export type SupporterEmailDelivery = Readonly<{
  providerMessageId: string;
}>;

export class SupporterEmailDeliveryError extends Error {
  readonly code: string;
  readonly retryable: boolean;
  readonly retryAfterSeconds?: number;

  constructor(input: {
    code: string;
    retryable: boolean;
    retryAfterSeconds?: number;
  }) {
    super("Supporter email delivery failed");
    this.name = "SupporterEmailDeliveryError";
    this.code = input.code;
    this.retryable = input.retryable;
    this.retryAfterSeconds = input.retryAfterSeconds;
  }
}

function providerCode(value: unknown): string {
  if (typeof value !== "string") return "unknown_error";
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "_")
    .slice(0, 60);
  return normalized || "unknown_error";
}

function retryAfterSeconds(response: Response): number | undefined {
  const raw = response.headers.get("retry-after");
  if (!raw) return undefined;
  const seconds = Number(raw);
  if (!Number.isFinite(seconds) || seconds < 0) return undefined;
  return Math.min(86_400, Math.ceil(seconds));
}

export function classifyResendFailure(input: {
  status: number;
  code: string;
  retryAfterSeconds?: number;
}): SupporterEmailDeliveryError {
  const code = providerCode(input.code);
  const permanent =
    (input.status === 400 && code === "invalid_idempotency_key") ||
    (input.status === 409 && code === "invalid_idempotent_request") ||
    input.status === 422;

  const retryable =
    !permanent &&
    (input.status === 401 ||
      input.status === 403 ||
      input.status === 408 ||
      input.status === 409 ||
      input.status === 425 ||
      input.status === 429 ||
      input.status >= 500);

  return new SupporterEmailDeliveryError({
    code: `resend_${input.status}_${code}`.slice(0, 100),
    retryable,
    ...(input.retryAfterSeconds === undefined
      ? {}
      : { retryAfterSeconds: input.retryAfterSeconds }),
  });
}

export async function sendResendEmail(input: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  idempotencyKey: string;
  templateTag: "supporter_verification" | "supporter_management";
}): Promise<SupporterEmailDelivery> {
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${input.apiKey}`,
        "content-type": "application/json",
        "idempotency-key": input.idempotencyKey,
      },
      body: JSON.stringify({
        from: input.from,
        to: [input.to],
        subject: input.subject,
        text: input.text,
        tags: [
          { name: "calypso_subsystem", value: "supporter_outbox" },
          { name: "supporter_template", value: input.templateTag },
        ],
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new SupporterEmailDeliveryError({
      code: "resend_network_error",
      retryable: true,
    });
  }

  const result = (await response.json().catch(() => ({}))) as {
    id?: unknown;
    name?: unknown;
    error?: { name?: unknown };
  };

  if (response.ok && typeof result.id === "string" && result.id) {
    return { providerMessageId: result.id };
  }

  const code =
    typeof result.name === "string"
      ? result.name
      : typeof result.error?.name === "string"
        ? result.error.name
        : "http_error";
  const retryAfter = retryAfterSeconds(response);

  throw classifyResendFailure({
    status: response.status,
    code,
    ...(retryAfter === undefined ? {} : { retryAfterSeconds: retryAfter }),
  });
}
