export async function sendSupporterVerification(input: {
  apiKey: string;
  from: string;
  to: string;
  verificationUrl: string;
  promiseVersionLabel: string;
  expiresInMinutes: number;
}): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${input.apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: input.from,
      to: [input.to],
      subject: "Verify your support for the Personal Health Data Promise",
      text: [
        `Confirm your affirmation of the Personal Health Data Promise (${input.promiseVersionLabel}):`,
        input.verificationUrl,
        "",
        `This link expires in ${input.expiresInMinutes} minutes and can be used once.`,
        "Signing the Promise does not create a Calypso account, share health data, enroll you in research, or subscribe you to the newsletter.",
        "If you did not request this, ignore this email.",
      ].join("\n"),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Supporter verification email could not be delivered");
  }
}
