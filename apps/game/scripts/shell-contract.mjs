export const SHELL_ROUTES = Object.freeze([
  { route: "/", file: "app/index.tsx", purpose: "no-account arrival" },
  { route: "/map", file: "app/(shell)/map.tsx", purpose: "island map" },
  {
    route: "/hearth",
    file: "app/(shell)/hearth.tsx",
    purpose: "narrative Hearth",
  },
  {
    route: "/direct",
    file: "app/(shell)/direct.tsx",
    purpose: "direct information",
  },
  {
    route: "/unavailable",
    file: "app/(shell)/unavailable.tsx",
    purpose: "inactive destination fallback",
  },
  {
    route: "+not-found",
    file: "app/+not-found.tsx",
    purpose: "unknown route fallback",
  },
]);

export const SHELL_CONTENT_IDS = Object.freeze([
  "zone.lantern-shore.synthetic",
  "character.aster.synthetic-guide",
  "dialogue.aster.welcome.synthetic",
  "dialogue.aster.choice.synthetic",
  "dialogue.aster.direct-path.synthetic",
  "lesson.shell.authority-boundary.synthetic",
]);

export const FORBIDDEN_SHELL_SOURCE_PATTERNS = Object.freeze([
  /AsyncStorage/,
  /localStorage/,
  /sessionStorage/,
  /document\.cookie/,
  /process\.env/,
  /EXPO_PUBLIC_/,
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
