import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
} from "node:crypto";

export type EncryptedValue = Readonly<{
  ciphertext: Buffer;
  nonce: Buffer;
  authTag: Buffer;
}>;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function encryptValue(value: string, key: Buffer): EncryptedValue {
  if (key.length !== 32) throw new Error("Encryption key must be 32 bytes");
  const nonce = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, nonce);
  const ciphertext = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  return { ciphertext, nonce, authTag: cipher.getAuthTag() };
}

export function decryptValue(value: EncryptedValue, key: Buffer): string {
  if (key.length !== 32) throw new Error("Encryption key must be 32 bytes");
  const decipher = createDecipheriv("aes-256-gcm", key, value.nonce);
  decipher.setAuthTag(value.authTag);
  return Buffer.concat([
    decipher.update(value.ciphertext),
    decipher.final(),
  ]).toString("utf8");
}

export function serializeEncryptedValue(
  value: EncryptedValue,
  keyVersion: string,
): Buffer {
  return Buffer.from(
    JSON.stringify({
      v: keyVersion,
      n: value.nonce.toString("base64"),
      t: value.authTag.toString("base64"),
      c: value.ciphertext.toString("base64"),
    }),
    "utf8",
  );
}

export function encryptContact(email: string, key: Buffer): EncryptedValue {
  return encryptValue(normalizeEmail(email), key);
}

export function contactLookupHmac(email: string, key: Buffer): Buffer {
  return createHmac("sha256", key)
    .update(normalizeEmail(email), "utf8")
    .digest();
}

export function createVerificationToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashVerificationToken(token: string, pepper: Buffer): Buffer {
  if (pepper.length !== 32) {
    throw new Error("Verification token pepper must be 32 bytes");
  }
  return createHmac("sha256", pepper).update(token, "utf8").digest();
}

export function hashPromiseText(canonicalText: string): string {
  return createHash("sha256").update(canonicalText, "utf8").digest("hex");
}
