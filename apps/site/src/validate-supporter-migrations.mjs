import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd(), "supporters/database/migrations");
const files = [
  "0001_supporter_baseline.sql",
  "0002_supporter_commands_and_outbox.sql",
  "0003_supporter_runtime.sql",
  "0004_supporter_public_runtime_reads.sql",
];

const joined = files
  .map((file) => readFileSync(resolve(root, file), "utf8"))
  .join("\n");

const required = [
  "CREATE SCHEMA IF NOT EXISTS supporter_private",
  "CREATE SCHEMA IF NOT EXISTS supporter_public",
  "founding_number BETWEEN 1 AND 1000",
  "CREATE OR REPLACE FUNCTION supporter_private.activate_supporter",
  "CREATE OR REPLACE FUNCTION supporter_private.start_supporter_enrollment",
  "CREATE OR REPLACE FUNCTION supporter_private.consume_supporter_attempt",
  "CREATE OR REPLACE FUNCTION supporter_private.get_published_promise",
  "CREATE OR REPLACE FUNCTION supporter_private.get_movement_totals",
  "CREATE OR REPLACE FUNCTION supporter_private.list_public_supporters",
  "GRANT EXECUTE ON FUNCTION supporter_private.get_published_promise(uuid)",
  "GRANT EXECUTE ON FUNCTION supporter_private.get_movement_totals()",
  "REVOKE EXECUTE ON FUNCTION supporter_private.withdraw_supporter",
  "REVOKE ALL ON ALL TABLES IN SCHEMA supporter_private FROM PUBLIC",
];

for (const contract of required) {
  if (!joined.includes(contract)) {
    throw new Error(`Missing supporter migration contract: ${contract}`);
  }
}

console.log("Supporter migration contracts are present.");
