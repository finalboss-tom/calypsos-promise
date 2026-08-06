import { timingSafeEqual } from "node:crypto";

function bearerToken(request: Request): Buffer | undefined {
  const authorization = request.headers.get("authorization") ?? "";
  const prefix = "Bearer ";
  if (!authorization.startsWith(prefix)) return undefined;
  return Buffer.from(authorization.slice(prefix.length), "utf8");
}

function tokenMatches(actual: Buffer, expectedToken: string): boolean {
  const expected = Buffer.from(expectedToken, "utf8");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function bearerAuthorized(
  request: Request,
  expectedToken: string,
): boolean {
  const actual = bearerToken(request);
  return actual !== undefined && tokenMatches(actual, expectedToken);
}

export function bearerAuthorizedByAny(
  request: Request,
  expectedTokens: readonly (string | undefined)[],
): boolean {
  const actual = bearerToken(request);
  if (!actual) return false;
  return expectedTokens.some(
    (expectedToken) =>
      expectedToken !== undefined && tokenMatches(actual, expectedToken),
  );
}
