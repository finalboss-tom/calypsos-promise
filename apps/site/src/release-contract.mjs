export const siteOrigin = "https://www.calypsospromise.org";

export const routeContracts = Object.freeze([
  { path: "/", title: "Build Your Living Chronicle", sitemap: true },
  { path: "/promise", title: "The Promise", sitemap: true },
  { path: "/laws", title: "Seven Laws", sitemap: true },
  { path: "/how-it-works", title: "How It Works", sitemap: true },
  { path: "/consumer-first", title: "Consumer First", sitemap: true },
  { path: "/aster", title: "Aster and AI", sitemap: true },
  { path: "/trust", title: "Trust Center", sitemap: true },
  { path: "/forge", title: "Open Forge", sitemap: true },
  {
    path: "/roadmap",
    title: "Roadmap and Capability Status",
    sitemap: true,
  },
  { path: "/support", title: "Support and Contribute", sitemap: true },
  { path: "/funding", title: "Funding Transparency", sitemap: true },
  { path: "/privacy", title: "Signup privacy", sitemap: true },
  { path: "/joined", title: "Signup status", sitemap: false, noindex: true },
]);

export const performanceBudgets = Object.freeze({
  htmlBytes: 96 * 1024,
  javascriptBytes: 704 * 1024,
  cssBytes: 128 * 1024,
  imageBytes: 1536 * 1024,
  fontBytes: 0,
  totalBytes: 2048 * 1024,
  firstPartyRequests: 32,
});

export const requiredPageHeaders = Object.freeze({
  "cross-origin-opener-policy": "same-origin",
  "permissions-policy": "camera=(), geolocation=(), microphone=(), payment=()",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-content-type-options": "nosniff",
  "x-dns-prefetch-control": "off",
  "x-frame-options": "DENY",
});

export const requiredCspDirectives = Object.freeze([
  "default-src 'self'",
  "base-uri 'none'",
  "connect-src 'self'",
  "font-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "object-src 'none'",
  "script-src 'self'",
  "'strict-dynamic'",
  "style-src 'self' 'unsafe-inline'",
  "upgrade-insecure-requests",
]);

export const contrastPairs = Object.freeze([
  { name: "primary text", foreground: "#f6ecd7", background: "#04111d" },
  { name: "secondary text", foreground: "#ead7b5", background: "#0b2436" },
  { name: "gold links", foreground: "#e8c982", background: "#0b2436" },
  { name: "sea links", foreground: "#87c8d5", background: "#0b2436" },
  { name: "live status", foreground: "#92d4ae", background: "#0b2436" },
  {
    name: "experimental status",
    foreground: "#9bc5e1",
    background: "#0b2436",
  },
  { name: "planned status", foreground: "#e8c982", background: "#0b2436" },
  {
    name: "long-horizon status",
    foreground: "#d6a6df",
    background: "#0b2436",
  },
  { name: "primary button", foreground: "#04111d", background: "#e8c982" },
]);

export const secretPatterns = Object.freeze([
  {
    name: "private key",
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  },
  { name: "GitHub token", pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/ },
  { name: "AWS access key", pattern: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "Slack token", pattern: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/ },
  { name: "Stripe live key", pattern: /\bsk_live_[A-Za-z0-9]{16,}\b/ },
  { name: "signup webhook configuration", pattern: /SIGNUP_WEBHOOK_URL/ },
]);

export const signupGateIssue =
  "https://github.com/finalboss-tom/calypsos-promise/issues/63";
