-- SUPPORTER OUTBOX WORKER PRIVILEGE CHECKS
-- Run in Neon SQL Editor after migration 0007 and worker-login creation.
BEGIN;

DO $$
BEGIN
  EXECUTE format(
    'GRANT supporter_outbox_worker_login TO %I',
    session_user
  );
END
$$;

SET LOCAL ROLE supporter_outbox_worker_login;

SELECT
  session_user AS connected_as,
  current_user AS effective_as,
  has_function_privilege(
    current_user,
    'supporter_private.claim_supporter_email_v2(timestamptz, integer, integer, uuid)',
    'EXECUTE'
  ) AS can_claim_email,
  has_function_privilege(
    current_user,
    'supporter_private.record_supporter_email_attempt(uuid, uuid, text, text, text, integer, timestamptz, integer)',
    'EXECUTE'
  ) AS can_complete_email,
  has_function_privilege(
    current_user,
    'supporter_private.record_supporter_email_provider_event(text, text, text, timestamptz, text, timestamptz)',
    'EXECUTE'
  ) AS can_record_provider_event,
  has_function_privilege(
    current_user,
    'supporter_private.get_supporter_outbox_health(timestamptz)',
    'EXECUTE'
  ) AS can_read_outbox_health,
  has_function_privilege(
    current_user,
    'supporter_private.apply_supporter_management(bytea, timestamptz, integer, text, text, text, text, text, uuid, boolean, uuid)',
    'EXECUTE'
  ) AS can_manage_supporters,
  has_function_privilege(
    current_user,
    'supporter_private.withdraw_supporter(uuid, timestamptz, uuid)',
    'EXECUTE'
  ) AS can_call_broad_withdrawal,
  has_table_privilege(
    current_user,
    'supporter_private.email_outbox',
    'SELECT'
  ) AS can_read_outbox_table,
  has_table_privilege(
    current_user,
    'supporter_private.supporter_contacts',
    'SELECT'
  ) AS can_read_contacts;

ROLLBACK;
