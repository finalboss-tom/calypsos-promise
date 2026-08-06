export const PRESENTATION_ROUTE = Object.freeze({
  route: "/play",
  file: "app/(shell)/play.tsx",
  purpose: "generic scene, dialogue, and quest presentation",
});

export const PRESENTATION_COMPONENTS = Object.freeze([
  "src/components/SceneRenderer.tsx",
  "src/components/DialogueChoices.tsx",
  "src/components/QuestCard.tsx",
  "src/components/WayfinderOrb.tsx",
  "src/presentation/synthetic-presentation.ts",
]);

export const PRESENTATION_CONTENT_IDS = Object.freeze([
  "zone.lantern-shore.synthetic",
  "scene.hearth.welcome.synthetic",
  "scene.hearth.direct-path.synthetic",
  "dialogue.aster.welcome.synthetic",
  "dialogue.aster.choice.synthetic",
  "dialogue.aster.direct-path.synthetic",
  "quest.first-lantern.shell-demo.synthetic",
]);

export const FORBIDDEN_PRESENTATION_PATTERNS = Object.freeze([
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
  /grant(?:ed|s)?\s+(?:reward|permission|progress)/i,
  /canonical\s+(?:completion|progress|unlock)/i,
]);
