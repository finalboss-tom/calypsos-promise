import { sendResendEmail, type SupporterEmailDelivery } from "./resend-email";

export async function sendSupporterManagementEmail(input: {
  apiKey: string;
  from: string;
  to: string;
  managementUrl: string;
  expiresInMinutes: number;
  idempotencyKey: string;
}): Promise<SupporterEmailDelivery> {
  return sendResendEmail({
    apiKey: input.apiKey,
    from: input.from,
    to: input.to,
    subject: "Manage your Personal Health Data Promise support",
    text: [
      "Use this single-use link to inspect and manage your supporter record:",
      input.managementUrl,
      "",
      `This link expires in ${input.expiresInMinutes} minutes and authorizes one change.`,
      "You can make your profile private, publish or edit consented profile fields, or withdraw your support.",
      "Withdrawing permanently retires any Founding Supporter number; it will not be reassigned.",
      "If you did not request this link, ignore this email.",
    ].join("\n"),
    idempotencyKey: input.idempotencyKey,
    templateTag: "supporter_management",
  });
}
