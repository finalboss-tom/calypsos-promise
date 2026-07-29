import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function escaped(phrase) {
  const pattern = phrase
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\s+/g, "\\s+");
  return new RegExp(pattern, "i");
}

test("provides explicit departure, future-account, completion, and restart scenes", async () => {
  const [state, opening, departure, firstLantern] = await Promise.all([
    read("../src/lib/prologue-opening-state.ts"),
    read("../src/components/prologue-opening.tsx"),
    read("../src/components/prologue-departure-panel.tsx"),
    read("../src/components/prologue-first-lantern-panel.tsx"),
  ]);
  const source = `${state}\n${opening}\n${departure}\n${firstLantern}`;

  for (const phrase of [
    '"exit-choice"',
    '"future-account"',
    '"complete"',
    '"continue-to-departure"',
    '"view-future-account-boundary"',
    '"return-to-departure"',
    '"complete-without-account"',
    '"restart-prologue"',
    "Continue to departure choices",
    "Complete without an account",
    "Inspect the future account boundary",
    "Restart the prologue",
    "Nothing follows you off this page.",
    "PrologueDeparturePanel",
    'label: "Departure"',
  ]) {
    assert.match(source, escaped(phrase));
  }
});

test("keeps account conversion informational, optional, and separate from contact intake", async () => {
  const departure = await read(
    "../src/components/prologue-departure-panel.tsx",
  );

  for (const phrase of [
    "No account required",
    "No email requested",
    "No state retained",
    "No conversion reward",
    "Account creation",
    "unavailable in Sprint 9",
    "Identity and authentication",
    "Private Chronicle storage",
    "Recovery and deletion",
    "Email and newsletter",
    "not account identity or game state",
    "gives no progression, access, priority, eligibility, reward, health benefit, or governance authority",
    "This is an honest stopping point",
  ]) {
    assert.match(departure, escaped(phrase));
  }

  for (const prohibited of [
    /<input\b/i,
    /<textarea\b/i,
    /contentEditable/i,
    /type=["']email["']/i,
    /type=["']file["']/i,
    /\/api\/join/,
    /NewsletterSignupForm/,
    /SIGNUP_WEBHOOK/,
    /fetch\(/,
    /XMLHttpRequest/,
    /WebSocket/,
    /EventSource/,
    /localStorage/,
    /sessionStorage/,
    /indexedDB/,
    /document\.cookie/,
    /sign[- ]?up/i,
    /sign[- ]?in/i,
    /createAccount/i,
    /authenticate\(/i,
  ]) {
    assert.doesNotMatch(departure, prohibited);
  }
});

test("states the destruction and no-authority consequences of departure", async () => {
  const departure = await read(
    "../src/components/prologue-departure-panel.tsx",
  );

  for (const phrase of [
    "navigation destroys the current temporary state",
    "destroyed by leaving or restart",
    "Complete in page memory",
    "No conversion",
    "No retained state",
    "No durable progression",
    "none created",
    "not a rank, reward, canonical unlock, Fourteen Lantern progression, health outcome, or production account state",
  ]) {
    assert.match(departure, escaped(phrase));
  }
});

test("provides responsive, focus-visible, reduced-data, contrast, and forced-color treatment", async () => {
  const css = await read(
    "../src/components/prologue-departure-panel.module.css",
  );

  assert.match(css, /:focus-visible/);
  assert.match(css, /outline-offset/);
  assert.match(css, /max-width: 48rem/);
  assert.match(css, /prefers-reduced-data/);
  assert.match(css, /prefers-contrast/);
  assert.match(css, /forced-colors/);
  assert.match(css, /\.details/);
  assert.match(css, /\.boundaryNote/);
  assert.doesNotMatch(css, /outline:\s*(?:0(?:\s|;)|none)/i);
});
