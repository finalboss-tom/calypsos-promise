-- SUPPORTER RUNTIME PRIVILEGES
-- Run as the migration owner after 0001 and 0002.
BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'supporter_runtime') THEN
    CREATE ROLE supporter_runtime NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'supporter_public_reader') THEN
    CREATE ROLE supporter_public_reader NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'supporter_operator') THEN
    CREATE ROLE supporter_operator NOLOGIN;
  END IF;
END
$$;

REVOKE ALL ON SCHEMA supporter_private FROM PUBLIC;
REVOKE ALL ON SCHEMA supporter_public FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA supporter_private FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA supporter_public FROM PUBLIC;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA supporter_private FROM PUBLIC;

GRANT USAGE ON SCHEMA supporter_private TO supporter_runtime, supporter_operator;
GRANT USAGE ON SCHEMA supporter_public TO supporter_runtime, supporter_public_reader, supporter_operator;

-- Public application reads only the deliberately minimized projection.
GRANT SELECT ON supporter_public.supporter_profiles TO supporter_public_reader;
GRANT SELECT ON supporter_public.founding_advisors TO supporter_public_reader;
GRANT SELECT ON supporter_public.movement_totals TO supporter_public_reader;

-- Runtime uses reviewed commands/functions, not arbitrary private-table reads.
GRANT EXECUTE ON FUNCTION supporter_private.activate_supporter(bytea, timestamptz, uuid, uuid)
  TO supporter_runtime;
GRANT EXECUTE ON FUNCTION supporter_private.consume_supporter_attempt(text, bytea, timestamptz, integer, integer) TO supporter_runtime;
GRANT EXECUTE ON FUNCTION supporter_private.start_supporter_enrollment(uuid, uuid, uuid, uuid, uuid, uuid, uuid, bytea, bytea, text, text, text, text, text, text, text, text, bytea, bytea, text, timestamptz, timestamptz, uuid, uuid) TO supporter_runtime;
GRANT EXECUTE ON FUNCTION supporter_private.claim_supporter_email(timestamptz, integer) TO supporter_runtime;
GRANT EXECUTE ON FUNCTION supporter_private.complete_supporter_email(uuid, boolean, text, timestamptz) TO supporter_runtime;
GRANT EXECUTE ON FUNCTION supporter_private.withdraw_supporter(uuid, timestamptz, uuid) TO supporter_runtime;

-- Operator access is intentionally explicit and temporary until a capability
-- based admin service replaces direct operational queries.
GRANT SELECT ON supporter_private.promise_versions TO supporter_operator;
GRANT SELECT ON supporter_private.supporters TO supporter_operator;
GRANT SELECT ON supporter_private.promise_signatures TO supporter_operator;
GRANT SELECT ON supporter_private.verification_challenges TO supporter_operator;
GRANT SELECT ON supporter_private.verification_evidence TO supporter_operator;
GRANT SELECT ON supporter_private.founding_supporter_designations TO supporter_operator;
GRANT SELECT ON supporter_private.protected_audit_events TO supporter_operator;
GRANT SELECT ON supporter_private.email_outbox TO supporter_operator;
GRANT SELECT ON supporter_private.request_attempt_buckets TO supporter_operator;

ALTER DEFAULT PRIVILEGES IN SCHEMA supporter_private REVOKE ALL ON TABLES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA supporter_public REVOKE ALL ON TABLES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA supporter_private REVOKE ALL ON FUNCTIONS FROM PUBLIC;

COMMIT;
