export const OFFLINE_RESILIENCE_FILES = Object.freeze([
  "src/offline/offline-resilience.mjs",
  "src/offline/offline-resilience.d.mts",
  "src/offline/async-offline-storage.ts",
  "src/components/OfflineResiliencePanel.tsx",
  "src/components/SceneRenderer.tsx",
  "src/state/synthetic-session-state.mjs",
  "src/state/synthetic-session-state.d.mts",
  "test/offline-resilience.test.mjs",
]);

export const REQUIRED_OFFLINE_RECORD_KINDS = Object.freeze([
  "public-content-cache",
  "synthetic-session",
]);

export const REQUIRED_OFFLINE_OUTCOMES = Object.freeze([
  "missing",
  "expired",
  "corrupt",
  "stale",
  "unsupported-version",
  "conflict",
  "low-storage",
  "storage-unavailable",
]);

export const FORBIDDEN_OFFLINE_SOURCE_PATTERNS = Object.freeze([
  /fetch\s*\(/,
  /axios/i,
  /process\.env/,
  /EXPO_PUBLIC_/,
  /apiKey/i,
  /accessToken/i,
  /refreshToken/i,
  /document\.cookie/,
  /segment/i,
  /posthog/i,
  /mixpanel/i,
  /firebase/i,
  /supabase/i,
  /auth0/i,
  /clerk/i,
  /openai/i,
  /anthropic/i,
]);
