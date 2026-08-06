import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const siteRoot = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(siteRoot, path), "utf8");

test("management requests preserve email enumeration resistance", () => {
  const route = read("src/app/api/supporters/manage/start/route.ts");

  assert.match(route, /const genericAccepted/);
  assert.match(route, /When the address is eligible/);
  assert.match(route, /status: 202/);
  assert.match(route, /contactLookupHmac/);
  assert.doesNotMatch(route, /supporter_contacts.*SELECT/is);
});

test("management secrets remain in URL fragments and client memory", () => {
  const start = read("src/app/api/supporters/manage/start/route.ts");
  const client = read("src/app/supporters/manage/management-client.tsx");

  assert.match(
    start,
    /url\.hash = new URLSearchParams\(\{ token \}\)\.toString\(\)/,
  );
  assert.match(client, /window\.location\.hash\.slice\(1\)/);
  assert.match(client, /window\.history\.replaceState/);
  assert.doesNotMatch(start, /searchParams\.set\([^)]*token/);
});

test("management is one-action, revision-bound, and email-controlled", () => {
  const migration = read(
    "supporters/database/migrations/0006_supporter_management.sql",
  );
  const apply = read("src/app/api/supporters/manage/apply/route.ts");

  assert.match(migration, /get_supporter_management_state/);
  assert.match(migration, /apply_supporter_management/);
  assert.match(migration, /supporter\.revision <> p_expected_revision/);
  assert.match(migration, /SET consumed_at = p_now/);
  assert.match(migration, /challenge\.purpose = 'manage_supporter'/);
  assert.match(apply, /expectedRevision/);
});

test("visibility changes preserve separate public-listing consent", () => {
  const migration = read(
    "supporters/database/migrations/0006_supporter_management.sql",
  );
  const input = read("src/lib/supporters/management-input.ts");

  assert.match(migration, /p_public_listing_consent_id IS NULL/);
  assert.match(migration, /'public_listing'/);
  assert.match(migration, /consent\.withdrawn_at/);
  assert.match(migration, /DELETE FROM supporter_public\.supporter_profiles/);
  assert.match(input, /body\.publicListingConsent !== true/);
});

test("withdrawal permanently retires designation numbers", () => {
  const baseline = read(
    "supporters/database/migrations/0002_supporter_commands_and_outbox.sql",
  );
  const management = read(
    "supporters/database/migrations/0006_supporter_management.sql",
  );
  const client = read("src/app/supporters/manage/management-client.tsx");

  assert.match(baseline, /retired_at = COALESCE\(retired_at, p_now\)/);
  assert.match(baseline, /supporter_withdrew/);
  assert.match(management, /withdraw_supporter/);
  assert.doesNotMatch(management, /counter_value = counter_value - 1/);
  assert.match(client, /permanently retires the Founding Supporter number/);
});

test("web runtime receives narrow management commands, not table access", () => {
  const migration = read(
    "supporters/database/migrations/0006_supporter_management.sql",
  );

  assert.match(
    migration,
    /GRANT EXECUTE ON FUNCTION supporter_private\.start_supporter_management/,
  );
  assert.match(
    migration,
    /GRANT EXECUTE ON FUNCTION supporter_private\.get_supporter_management_state/,
  );
  assert.match(
    migration,
    /GRANT EXECUTE ON FUNCTION supporter_private\.apply_supporter_management/,
  );
  assert.match(
    migration,
    /REVOKE EXECUTE ON FUNCTION supporter_private\.withdraw_supporter/,
  );
  assert.doesNotMatch(migration, /GRANT SELECT ON supporter_private/);
});
