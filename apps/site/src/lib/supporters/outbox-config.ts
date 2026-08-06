import { getSupporterEnrollmentConfig } from "./config";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing server configuration: ${name}`);
  return value;
}

function secret(name: string): string {
  const encoded = required(name);
  const bytes = Buffer.from(encoded, "base64");
  if (bytes.length !== 32) {
    throw new Error(`${name} must decode to exactly 32 bytes`);
  }
  return encoded;
}

function optionalSecret(name: string): string | undefined {
  const encoded = process.env[name]?.trim();
  if (!encoded) return undefined;
  const bytes = Buffer.from(encoded, "base64");
  if (bytes.length !== 32) {
    throw new Error(`${name} must decode to exactly 32 bytes`);
  }
  return encoded;
}

export type SupporterOutboxWorkerConfig = ReturnType<
  typeof getSupporterEnrollmentConfig
> &
  Readonly<{
    workerDatabaseUrl: string;
    workerBearerToken: string;
    cronBearerToken: string | undefined;
  }>;

export function supporterOutboxWorkerEnabled(): boolean {
  return process.env.SUPPORTER_OUTBOX_WORKER_ENABLED === "true";
}

export function getSupporterOutboxWorkerConfig(): SupporterOutboxWorkerConfig {
  const enrollment = getSupporterEnrollmentConfig();
  const workerDatabaseUrl = required("SUPPORTER_OUTBOX_WORKER_DATABASE_URL");
  if (
    workerDatabaseUrl === enrollment.databaseUrl ||
    workerDatabaseUrl === process.env.SUPPORTER_DATABASE_URL
  ) {
    throw new Error(
      "Supporter outbox worker must use a dedicated least-privilege database login",
    );
  }
  const workerBearerToken = secret("SUPPORTER_OUTBOX_WORKER_SECRET_B64");
  const cronBearerToken = optionalSecret("CRON_SECRET");
  return {
    ...enrollment,
    workerDatabaseUrl,
    workerBearerToken,
    cronBearerToken,
  };
}

export function getSupporterResendWebhookConfig(): Readonly<{
  workerDatabaseUrl: string;
  webhookSecret: string;
}> {
  const enrollment = getSupporterEnrollmentConfig();
  const workerDatabaseUrl = required("SUPPORTER_OUTBOX_WORKER_DATABASE_URL");
  if (
    workerDatabaseUrl === enrollment.databaseUrl ||
    workerDatabaseUrl === process.env.SUPPORTER_DATABASE_URL
  ) {
    throw new Error(
      "Supporter webhook must use the dedicated outbox-worker database login",
    );
  }
  const webhookSecret = required("SUPPORTER_EMAIL_RESEND_WEBHOOK_SECRET");
  if (!webhookSecret.startsWith("whsec_") || webhookSecret.length < 20) {
    throw new Error("Invalid SUPPORTER_EMAIL_RESEND_WEBHOOK_SECRET");
  }
  return { workerDatabaseUrl, webhookSecret };
}
