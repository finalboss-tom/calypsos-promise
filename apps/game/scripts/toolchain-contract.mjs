export const TOOLCHAIN = Object.freeze({
  asyncStorage: "2.2.0",
  expo: "57.0.10",
  expoRouter: "57.0.10",
  nodeMinimum: "22.13.0",
  nodeRepository: "24",
  packageManager: "pnpm@10.13.1",
  react: "19.2.3",
  reactNative: "0.86.2",
  reactNativeWeb: "0.21.0",
  reactNativeWorklets: "0.10.1",
  typescript: "6.0.3",
});

export const PLATFORMS = Object.freeze(["ios", "android", "web"]);

export const FORBIDDEN_RUNTIME_DEPENDENCY_PATTERNS = Object.freeze([
  /analytics/i,
  /anthropic/i,
  /auth0/i,
  /clerk/i,
  /firebase/i,
  /openai/i,
  /posthog/i,
  /resend/i,
  /sentry/i,
  /supabase/i,
]);
