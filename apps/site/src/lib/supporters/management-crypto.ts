import { decryptValue, type EncryptedValue } from "./crypto";

type SerializedEncryptedValue = Readonly<{
  v: string;
  n: string;
  t: string;
  c: string;
}>;

function decodeBase64(value: unknown, field: string): Buffer {
  if (typeof value !== "string" || !/^[A-Za-z0-9+/]*={0,2}$/.test(value)) {
    throw new Error(`Invalid encrypted ${field}`);
  }
  const decoded = Buffer.from(value, "base64");
  if (
    decoded.toString("base64").replace(/=+$/u, "") !== value.replace(/=+$/u, "")
  ) {
    throw new Error(`Invalid encrypted ${field}`);
  }
  return decoded;
}

export function deserializeEncryptedValue(
  serialized: Buffer,
  expectedKeyVersion: string,
): EncryptedValue {
  let parsed: SerializedEncryptedValue;
  try {
    parsed = JSON.parse(
      serialized.toString("utf8"),
    ) as SerializedEncryptedValue;
  } catch {
    throw new Error("Encrypted value could not be parsed");
  }

  if (parsed.v !== expectedKeyVersion) {
    throw new Error("Encrypted value key version is unavailable");
  }

  const nonce = decodeBase64(parsed.n, "nonce");
  const authTag = decodeBase64(parsed.t, "authentication tag");
  const ciphertext = decodeBase64(parsed.c, "ciphertext");

  if (nonce.length !== 12 || authTag.length !== 16) {
    throw new Error("Encrypted value has invalid dimensions");
  }

  return { nonce, authTag, ciphertext };
}

export function decryptSerializedValue(
  serialized: Buffer,
  key: Buffer,
  expectedKeyVersion: string,
): string {
  return decryptValue(
    deserializeEncryptedValue(serialized, expectedKeyVersion),
    key,
  );
}
