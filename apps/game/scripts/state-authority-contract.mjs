export const STATE_AUTHORITY_FILES = Object.freeze([
  "src/state/synthetic-session-state.mjs",
  "src/state/synthetic-session-state.d.mts",
  "src/components/StateAuthorityPanel.tsx",
  "src/components/SceneRenderer.tsx",
  "src/components/QuestCard.tsx",
  "app/(shell)/play.tsx",
  "test/state-authority.test.mjs",
]);

export const REQUIRED_SESSION_STATUSES = Object.freeze([
  "pending",
  "presented",
  "failed",
  "stale",
  "corrected",
  "superseded",
  "conflict",
  "deferred",
  "refused",
  "discarded",
]);

export const REQUIRED_DENIED_CLAIMS = Object.freeze([
  "scene-completion",
  "quest-completion",
  "reward",
  "restoration",
  "unlock",
  "permission",
  "chronicle-truth",
  "personal-progress",
  "health-result",
  "authentic-preference",
  "longitudinal-intelligence",
]);

export const FORBIDDEN_STATE_SOURCE_PATTERNS = Object.freeze([
  /Date\.now/,
  /new Date/,
  /Math\.random/,
  /AsyncStorage/,
  /localStorage/,
  /sessionStorage/,
  /document\.cookie/,
  /fetch\s*\(/,
  /axios/,
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
