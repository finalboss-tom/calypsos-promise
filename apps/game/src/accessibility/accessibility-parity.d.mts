export type AccessibilityPlatform = "browser" | "ios" | "android";

export interface AccessibilitySupport {
  readonly status: string;
  readonly evidence: string;
  readonly alternative: string;
  readonly residual: string | null;
}

export const ACCESSIBILITY_PARITY_VERSION: "0.1.0";
export const ACCESSIBILITY_MODALITIES: readonly string[];
export const ACCESSIBILITY_PLATFORMS: readonly AccessibilityPlatform[];
export const PLATFORM_SUPPORT_MATRIX: Readonly<
  Record<AccessibilityPlatform, Readonly<Record<string, AccessibilitySupport>>>
>;
export const DIRECT_PATH_PARITY: {
  readonly narrative: readonly string[];
  readonly direct: readonly string[];
};
export const CONTRAST_PAIRS: readonly {
  readonly name: string;
  readonly foreground: string;
  readonly background: string;
}[];
export const RESIDUAL_ACCESSIBILITY_LIMITATIONS: readonly string[];

export function calculateContrastRatio(
  foreground: string,
  background: string,
): number;
export function validateDirectPathParity(): {
  readonly ok: boolean;
  readonly missingFromDirect: readonly string[];
  readonly missingFromNarrative: readonly string[];
};
export function validateAccessibilityParity(): {
  readonly ok: boolean;
  readonly failures: readonly string[];
};
