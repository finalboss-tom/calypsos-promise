import type { ForgeSourceErrorCode } from "./source-contracts.js";

export class ForgeSourceError extends Error {
  readonly code: ForgeSourceErrorCode;
  readonly publicDetails: Readonly<Record<string, string | number | boolean>>;

  constructor(
    code: ForgeSourceErrorCode,
    message: string,
    publicDetails: Readonly<Record<string, string | number | boolean>> = {},
  ) {
    super(message);
    this.name = "ForgeSourceError";
    this.code = code;
    this.publicDetails = publicDetails;
  }
}

export const createForgeSourceError = (
  code: ForgeSourceErrorCode,
  message: string,
  publicDetails: Readonly<Record<string, string | number | boolean>> = {},
): ForgeSourceError => new ForgeSourceError(code, message, publicDetails);
