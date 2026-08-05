import { timingSafeEqual } from "node:crypto";

export function bearerAuthorized(
  request: Request,
  expectedToken: string,
): boolean {
  const authorization = request.headers.get("authorization") ?? "";
  const prefix = "Bearer ";
  if (!authorization.startsWith(prefix)) return false;
  const actual = Buffer.from(authorization.slice(prefix.length), "utf8");
  const expected = Buffer.from(expectedToken, "utf8");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
