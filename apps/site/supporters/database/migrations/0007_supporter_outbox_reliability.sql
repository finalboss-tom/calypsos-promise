-- SUPPORTER EMAIL OUTBOX RELIABILITY AND DELIVERY OBSERVABILITY
--
-- Adds claim leases, bounded exponential retry, provider idempotency state,
-- dead-letter visibility, signed provider-event ingestion, and a dedicated
-- worker capability role. No private-table SELECT is granted to web or worker
-- logins.
BEGIN;

ALTER TABLE supporter_private.email_outbox
  ADD COLUMN IF NOT EXISTS claim_token uuid,
  ADD COLUMN IF NOT EXISTS lease_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS provider_message_id text,
  ADD COLUMN IF NOT EXISTS delivery_status text NOT NULL DEFAULT 'unsubmitted',
  ADD COLUMN IF NOT EXISTS last_delivery_event_at timestamptz,
  ADD COLUMN IF NOT EXISTS delivered_at timestamptz,
  ADD COLUMN IF NOT EXISTS delivery_delayed_at timestamptz,
  ADD COLUMN IF NOT EXISTS bounced_at timestamptz,
  ADD COLUMN IF NOT EXISTS complained_at timestamptz,
  ADD COLUMN IF NOT EXISTS suppressed_at timestamptz,
  ADD COLUMN IF NOT EXISTS provider_failed_at timestamptz,
  ADD COLUMN IF NOT EXISTS terminal_at timestamptz;

UPDATE supporter_private.email_outbox AS outbox
   SET delivery_status = CASE
         WHEN outbox.status = 'sent' THEN 'accepted'
         ELSE 'unsubmitted'
       END
 WHERE outbox.delivery_status = 'unsubmitted';

ALTER TABLE supporter_private.email_outbox
  DROP CONSTRAINT IF EXISTS email_outbox_status_check;

ALTER TABLE supporter_private.email_outbox
  ADD CONSTRAINT email_outbox_status_check
  CHECK (
    status IN (
      'pending',
      'processing',
      'sent',
      'failed',
      'dead_letter',
      'cancelled'
    )
  );

ALTER TABLE supporter_private.email_outbox
  DROP CONSTRAINT IF EXISTS email_outbox_delivery_status_check;

ALTER TABLE supporter_private.email_outbox
  ADD CONSTRAINT email_outbox_delivery_status_check
  CHECK (
    delivery_status IN (
      'unsubmitted',
      'accepted',
      'delivery_delayed',
      'delivered',
      'bounced',
      'complained',
      'suppressed',
      'provider_failed'
    )
  );

CREATE UNIQUE INDEX IF NOT EXISTS email_outbox_provider_message
  ON supporter_private.email_outbox (provider_message_id)
  WHERE provider_message_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS email_outbox_processing_lease
  ON supporter_private.email_outbox (lease_expires_at)
  WHERE status = 'processing';

CREATE INDEX IF NOT EXISTS email_outbox_dead_letter
  ON supporter_private.email_outbox (terminal_at, created_at)
  WHERE status = 'dead_letter';

CREATE TABLE IF NOT EXISTS supporter_private.email_delivery_events (
  svix_id text PRIMARY KEY,
  provider_message_id text NOT NULL,
  event_type text NOT NULL CHECK (
    event_type IN (
      'email.sent',
      'email.delivery_delayed',
      'email.delivered',
      'email.bounced',
      'email.complained',
      'email.suppressed',
      'email.failed'
    )
  ),
  event_created_at timestamptz NOT NULL,
  reason_code text,
  received_at timestamptz NOT NULL,
  matched_outbox_id uuid
    REFERENCES supporter_private.email_outbox(outbox_id)
    ON DELETE SET NULL,
  CHECK (char_length(svix_id) BETWEEN 1 AND 255),
  CHECK (char_length(provider_message_id) BETWEEN 1 AND 255),
  CHECK (reason_code IS NULL OR char_length(reason_code) <= 100)
);

CREATE INDEX IF NOT EXISTS email_delivery_events_provider_message
  ON supporter_private.email_delivery_events (
    provider_message_id,
    event_created_at
  );

CREATE OR REPLACE FUNCTION supporter_private.apply_supporter_email_event(
  p_provider_message_id text,
  p_event_type text,
  p_event_created_at timestamptz
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private
AS $$
DECLARE
  v_outbox_id uuid;
BEGIN
  SELECT outbox.outbox_id
    INTO v_outbox_id
    FROM supporter_private.email_outbox AS outbox
   WHERE outbox.provider_message_id = p_provider_message_id
   FOR UPDATE;

  IF v_outbox_id IS NULL THEN
    RETURN false;
  END IF;

  UPDATE supporter_private.email_delivery_events AS event
     SET matched_outbox_id = v_outbox_id
   WHERE event.provider_message_id = p_provider_message_id
     AND event.matched_outbox_id IS NULL;

  UPDATE supporter_private.email_outbox AS outbox
     SET delivery_status = CASE
           WHEN p_event_type = 'email.complained' THEN 'complained'
           WHEN p_event_type = 'email.bounced'
             AND outbox.delivery_status <> 'complained'
             THEN 'bounced'
           WHEN p_event_type = 'email.suppressed'
             AND outbox.delivery_status NOT IN ('complained', 'bounced')
             THEN 'suppressed'
           WHEN p_event_type = 'email.failed'
             AND outbox.delivery_status NOT IN (
               'complained',
               'bounced',
               'suppressed'
             )
             THEN 'provider_failed'
           WHEN p_event_type = 'email.delivered'
             AND outbox.delivery_status NOT IN (
               'complained',
               'bounced',
               'suppressed',
               'provider_failed'
             )
             THEN 'delivered'
           WHEN p_event_type = 'email.delivery_delayed'
             AND outbox.delivery_status IN ('unsubmitted', 'accepted')
             THEN 'delivery_delayed'
           WHEN p_event_type = 'email.sent'
             AND outbox.delivery_status = 'unsubmitted'
             THEN 'accepted'
           ELSE outbox.delivery_status
         END,
         last_delivery_event_at = CASE
           WHEN outbox.last_delivery_event_at IS NULL
             OR p_event_created_at > outbox.last_delivery_event_at
             THEN p_event_created_at
           ELSE outbox.last_delivery_event_at
         END,
         delivered_at = CASE
           WHEN p_event_type = 'email.delivered'
             THEN COALESCE(outbox.delivered_at, p_event_created_at)
           ELSE outbox.delivered_at
         END,
         delivery_delayed_at = CASE
           WHEN p_event_type = 'email.delivery_delayed'
             THEN COALESCE(outbox.delivery_delayed_at, p_event_created_at)
           ELSE outbox.delivery_delayed_at
         END,
         bounced_at = CASE
           WHEN p_event_type = 'email.bounced'
             THEN COALESCE(outbox.bounced_at, p_event_created_at)
           ELSE outbox.bounced_at
         END,
         complained_at = CASE
           WHEN p_event_type = 'email.complained'
             THEN COALESCE(outbox.complained_at, p_event_created_at)
           ELSE outbox.complained_at
         END,
         suppressed_at = CASE
           WHEN p_event_type = 'email.suppressed'
             THEN COALESCE(outbox.suppressed_at, p_event_created_at)
           ELSE outbox.suppressed_at
         END,
         provider_failed_at = CASE
           WHEN p_event_type = 'email.failed'
             THEN COALESCE(outbox.provider_failed_at, p_event_created_at)
           ELSE outbox.provider_failed_at
         END,
         updated_at = greatest(outbox.updated_at, p_event_created_at)
   WHERE outbox.outbox_id = v_outbox_id;

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION supporter_private.record_supporter_email_provider_event(
  p_svix_id text,
  p_provider_message_id text,
  p_event_type text,
  p_event_created_at timestamptz,
  p_reason_code text,
  p_received_at timestamptz
)
RETURNS TABLE (
  result_duplicate boolean,
  result_matched boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private
AS $$
DECLARE
  v_inserted integer;
  v_matched boolean;
BEGIN
  IF p_svix_id IS NULL
     OR char_length(p_svix_id) NOT BETWEEN 1 AND 255
     OR p_provider_message_id IS NULL
     OR char_length(p_provider_message_id) NOT BETWEEN 1 AND 255
     OR p_event_type NOT IN (
       'email.sent',
       'email.delivery_delayed',
       'email.delivered',
       'email.bounced',
       'email.complained',
       'email.suppressed',
       'email.failed'
     )
     OR p_event_created_at IS NULL
     OR p_received_at IS NULL THEN
    RAISE EXCEPTION 'invalid provider delivery event'
      USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO supporter_private.email_delivery_events (
    svix_id,
    provider_message_id,
    event_type,
    event_created_at,
    reason_code,
    received_at
  ) VALUES (
    p_svix_id,
    p_provider_message_id,
    p_event_type,
    p_event_created_at,
    left(NULLIF(p_reason_code, ''), 100),
    p_received_at
  )
  ON CONFLICT (svix_id) DO NOTHING;

  GET DIAGNOSTICS v_inserted = ROW_COUNT;

  IF v_inserted = 0 THEN
    RETURN QUERY
    SELECT
      true,
      event.matched_outbox_id IS NOT NULL
    FROM supporter_private.email_delivery_events AS event
    WHERE event.svix_id = p_svix_id;
    RETURN;
  END IF;

  v_matched := supporter_private.apply_supporter_email_event(
    p_provider_message_id,
    p_event_type,
    p_event_created_at
  );

  RETURN QUERY SELECT false, v_matched;
END;
$$;

CREATE OR REPLACE FUNCTION supporter_private.record_supporter_email_attempt(
  p_outbox_id uuid,
  p_claim_token uuid,
  p_outcome text,
  p_provider_message_id text,
  p_error_code text,
  p_retry_after_seconds integer,
  p_now timestamptz,
  p_max_attempts integer DEFAULT 5
)
RETURNS TABLE (
  result_status text,
  result_attempt_count integer,
  result_not_before timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private
AS $$
DECLARE
  v_outbox supporter_private.email_outbox%ROWTYPE;
  v_challenge supporter_private.verification_challenges%ROWTYPE;
  v_attempt_count integer;
  v_backoff_seconds integer;
  v_next_attempt timestamptz;
  v_event record;
BEGIN
  IF p_outcome NOT IN ('sent', 'retry', 'dead_letter')
     OR p_max_attempts NOT BETWEEN 1 AND 10
     OR p_retry_after_seconds IS NOT NULL
        AND p_retry_after_seconds NOT BETWEEN 0 AND 86400 THEN
    RAISE EXCEPTION 'invalid email-attempt outcome'
      USING ERRCODE = 'P0001';
  END IF;

  SELECT outbox.*
    INTO v_outbox
    FROM supporter_private.email_outbox AS outbox
   WHERE outbox.outbox_id = p_outbox_id
   FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'email outbox item is unavailable'
      USING ERRCODE = 'P0001';
  END IF;

  SELECT challenge.*
    INTO v_challenge
    FROM supporter_private.verification_challenges AS challenge
   WHERE challenge.verification_id = v_outbox.verification_id;

  IF v_challenge.verification_id IS NULL THEN
    RAISE EXCEPTION 'email challenge is unavailable'
      USING ERRCODE = 'P0001';
  END IF;

  IF p_claim_token IS NULL THEN
    IF v_outbox.status NOT IN ('pending', 'failed') THEN
      IF v_outbox.status = 'sent' AND p_outcome = 'sent' THEN
        RETURN QUERY
        SELECT v_outbox.status, v_outbox.attempt_count, v_outbox.not_before;
        RETURN;
      END IF;
      RAISE EXCEPTION 'email outbox item is not directly completable'
        USING ERRCODE = 'P0001';
    END IF;
    v_attempt_count := v_outbox.attempt_count + 1;
  ELSE
    IF v_outbox.status <> 'processing'
       OR v_outbox.claim_token IS DISTINCT FROM p_claim_token THEN
      RAISE EXCEPTION 'email outbox claim is invalid'
        USING ERRCODE = 'P0001';
    END IF;
    v_attempt_count := v_outbox.attempt_count;
  END IF;

  IF p_outcome = 'sent' THEN
    IF p_provider_message_id IS NULL
       OR char_length(p_provider_message_id) NOT BETWEEN 1 AND 255 THEN
      RAISE EXCEPTION 'provider message id is required'
        USING ERRCODE = 'P0001';
    END IF;

    UPDATE supporter_private.email_outbox AS outbox
       SET status = 'sent',
           attempt_count = v_attempt_count,
           provider_message_id = p_provider_message_id,
           delivery_status = CASE
             WHEN outbox.delivery_status = 'unsubmitted' THEN 'accepted'
             ELSE outbox.delivery_status
           END,
           sent_at = COALESCE(outbox.sent_at, p_now),
           terminal_at = COALESCE(outbox.terminal_at, p_now),
           last_error_code = NULL,
           encrypted_token = ''::bytea,
           token_encryption_key_version = 'destroyed',
           claim_token = NULL,
           lease_expires_at = NULL,
           updated_at = p_now
     WHERE outbox.outbox_id = p_outbox_id;

    FOR v_event IN
      SELECT event.event_type, event.event_created_at
      FROM supporter_private.email_delivery_events AS event
      WHERE event.provider_message_id = p_provider_message_id
      ORDER BY event.event_created_at, event.svix_id
    LOOP
      PERFORM supporter_private.apply_supporter_email_event(
        p_provider_message_id,
        v_event.event_type,
        v_event.event_created_at
      );
    END LOOP;

    RETURN QUERY
    SELECT 'sent'::text, v_attempt_count, v_outbox.not_before;
    RETURN;
  END IF;

  IF p_outcome = 'dead_letter'
     OR v_attempt_count >= p_max_attempts THEN
    UPDATE supporter_private.email_outbox AS outbox
       SET status = 'dead_letter',
           attempt_count = v_attempt_count,
           last_error_code = left(
             COALESCE(NULLIF(p_error_code, ''), 'delivery_failed'),
             100
           ),
           terminal_at = COALESCE(outbox.terminal_at, p_now),
           claim_token = NULL,
           lease_expires_at = NULL,
           updated_at = p_now
     WHERE outbox.outbox_id = p_outbox_id;

    RETURN QUERY
    SELECT 'dead_letter'::text, v_attempt_count, v_outbox.not_before;
    RETURN;
  END IF;

  IF v_challenge.consumed_at IS NOT NULL
     OR v_challenge.revoked_at IS NOT NULL
     OR v_challenge.expires_at <= p_now THEN
    UPDATE supporter_private.email_outbox AS outbox
       SET status = 'cancelled',
           attempt_count = v_attempt_count,
           last_error_code = 'challenge_unavailable',
           encrypted_token = ''::bytea,
           token_encryption_key_version = 'destroyed',
           terminal_at = COALESCE(outbox.terminal_at, p_now),
           claim_token = NULL,
           lease_expires_at = NULL,
           updated_at = p_now
     WHERE outbox.outbox_id = p_outbox_id;

    RETURN QUERY
    SELECT 'cancelled'::text, v_attempt_count, v_outbox.not_before;
    RETURN;
  END IF;

  v_backoff_seconds := least(
    900,
    60 * (2 ^ greatest(v_attempt_count - 1, 0))::integer
  );
  v_backoff_seconds := greatest(
    v_backoff_seconds,
    COALESCE(p_retry_after_seconds, 0)
  );
  v_next_attempt := p_now + make_interval(secs => v_backoff_seconds);

  IF v_next_attempt >= v_challenge.expires_at THEN
    UPDATE supporter_private.email_outbox AS outbox
       SET status = 'dead_letter',
           attempt_count = v_attempt_count,
           last_error_code = left(
             COALESCE(NULLIF(p_error_code, ''), 'retry_window_exhausted'),
             100
           ),
           terminal_at = COALESCE(outbox.terminal_at, p_now),
           claim_token = NULL,
           lease_expires_at = NULL,
           updated_at = p_now
     WHERE outbox.outbox_id = p_outbox_id;

    RETURN QUERY
    SELECT 'dead_letter'::text, v_attempt_count, v_outbox.not_before;
    RETURN;
  END IF;

  UPDATE supporter_private.email_outbox AS outbox
     SET status = 'failed',
         attempt_count = v_attempt_count,
         last_error_code = left(
           COALESCE(NULLIF(p_error_code, ''), 'provider_error'),
           100
         ),
         not_before = v_next_attempt,
         claimed_at = NULL,
         claim_token = NULL,
         lease_expires_at = NULL,
         updated_at = p_now
   WHERE outbox.outbox_id = p_outbox_id;

  RETURN QUERY
  SELECT 'failed'::text, v_attempt_count, v_next_attempt;
END;
$$;

CREATE OR REPLACE FUNCTION supporter_private.claim_supporter_email_v2(
  p_now timestamptz,
  p_max_attempts integer,
  p_lease_seconds integer,
  p_claim_token uuid
)
RETURNS TABLE (
  result_outbox_id uuid,
  result_claim_token uuid,
  result_attempt_count integer,
  result_verification_id uuid,
  result_encrypted_contact bytea,
  result_contact_key_version text,
  result_encrypted_token bytea,
  result_token_key_version text,
  result_expires_at timestamptz,
  result_template_name text,
  result_promise_version_label text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private
AS $$
DECLARE
  v_outbox_id uuid;
BEGIN
  IF p_max_attempts NOT BETWEEN 1 AND 10
     OR p_lease_seconds NOT BETWEEN 30 AND 600
     OR p_claim_token IS NULL THEN
    RAISE EXCEPTION 'invalid email-worker claim'
      USING ERRCODE = 'P0001';
  END IF;

  UPDATE supporter_private.email_outbox AS outbox
     SET status = CASE
           WHEN challenge.consumed_at IS NOT NULL
             OR challenge.revoked_at IS NOT NULL
             OR challenge.expires_at <= p_now
             THEN 'cancelled'
           WHEN outbox.attempt_count >= p_max_attempts
             THEN 'dead_letter'
           ELSE 'failed'
         END,
         last_error_code = CASE
           WHEN challenge.consumed_at IS NOT NULL
             OR challenge.revoked_at IS NOT NULL
             OR challenge.expires_at <= p_now
             THEN 'challenge_unavailable'
           WHEN outbox.attempt_count >= p_max_attempts
             THEN 'lease_expired_max_attempts'
           ELSE 'lease_expired'
         END,
         not_before = p_now,
         terminal_at = CASE
           WHEN challenge.consumed_at IS NOT NULL
             OR challenge.revoked_at IS NOT NULL
             OR challenge.expires_at <= p_now
             OR outbox.attempt_count >= p_max_attempts
             THEN COALESCE(outbox.terminal_at, p_now)
           ELSE outbox.terminal_at
         END,
         encrypted_token = CASE
           WHEN challenge.consumed_at IS NOT NULL
             OR challenge.revoked_at IS NOT NULL
             OR challenge.expires_at <= p_now
             THEN ''::bytea
           ELSE outbox.encrypted_token
         END,
         token_encryption_key_version = CASE
           WHEN challenge.consumed_at IS NOT NULL
             OR challenge.revoked_at IS NOT NULL
             OR challenge.expires_at <= p_now
             THEN 'destroyed'
           ELSE outbox.token_encryption_key_version
         END,
         claimed_at = NULL,
         claim_token = NULL,
         lease_expires_at = NULL,
         updated_at = p_now
    FROM supporter_private.verification_challenges AS challenge
   WHERE challenge.verification_id = outbox.verification_id
     AND outbox.status = 'processing'
     AND outbox.lease_expires_at <= p_now;

  UPDATE supporter_private.email_outbox AS outbox
     SET status = 'cancelled',
         last_error_code = 'challenge_unavailable',
         encrypted_token = ''::bytea,
         token_encryption_key_version = 'destroyed',
         terminal_at = COALESCE(outbox.terminal_at, p_now),
         updated_at = p_now
    FROM supporter_private.verification_challenges AS challenge
   WHERE challenge.verification_id = outbox.verification_id
     AND outbox.status IN ('pending', 'failed', 'dead_letter')
     AND (
       challenge.consumed_at IS NOT NULL
       OR challenge.revoked_at IS NOT NULL
       OR challenge.expires_at <= p_now
     );

  UPDATE supporter_private.email_outbox AS outbox
     SET status = 'dead_letter',
         last_error_code = COALESCE(
           outbox.last_error_code,
           'max_attempts_exhausted'
         ),
         terminal_at = COALESCE(outbox.terminal_at, p_now),
         updated_at = p_now
   WHERE outbox.status IN ('pending', 'failed')
     AND outbox.attempt_count >= p_max_attempts;

  SELECT candidate.outbox_id
    INTO v_outbox_id
    FROM supporter_private.email_outbox AS candidate
    JOIN supporter_private.verification_challenges AS challenge
      ON challenge.verification_id = candidate.verification_id
   WHERE candidate.status IN ('pending', 'failed')
     AND candidate.not_before <= p_now
     AND candidate.attempt_count < p_max_attempts
     AND challenge.consumed_at IS NULL
     AND challenge.revoked_at IS NULL
     AND challenge.expires_at > p_now
   ORDER BY candidate.not_before, candidate.created_at, candidate.outbox_id
   FOR UPDATE OF candidate SKIP LOCKED
   LIMIT 1;

  IF v_outbox_id IS NULL THEN
    RETURN;
  END IF;

  UPDATE supporter_private.email_outbox AS outbox
     SET status = 'processing',
         attempt_count = outbox.attempt_count + 1,
         claimed_at = p_now,
         claim_token = p_claim_token,
         lease_expires_at = p_now + make_interval(secs => p_lease_seconds),
         updated_at = p_now
   WHERE outbox.outbox_id = v_outbox_id;

  RETURN QUERY
  SELECT
    outbox.outbox_id,
    outbox.claim_token,
    outbox.attempt_count,
    outbox.verification_id,
    contact.encrypted_value,
    contact.encryption_key_version,
    outbox.encrypted_token,
    outbox.token_encryption_key_version,
    challenge.expires_at,
    outbox.template_name,
    version.version_label
  FROM supporter_private.email_outbox AS outbox
  JOIN supporter_private.supporter_contacts AS contact
    ON contact.contact_id = outbox.contact_id
  JOIN supporter_private.verification_challenges AS challenge
    ON challenge.verification_id = outbox.verification_id
  LEFT JOIN supporter_private.promise_signatures AS signature
    ON signature.signature_id = challenge.signature_id
  LEFT JOIN supporter_private.promise_versions AS version
    ON version.promise_version_id = signature.promise_version_id
  WHERE outbox.outbox_id = v_outbox_id;
END;
$$;

CREATE OR REPLACE FUNCTION supporter_private.get_supporter_outbox_health(
  p_now timestamptz
)
RETURNS TABLE (
  pending_ready bigint,
  retry_scheduled bigint,
  processing_active bigint,
  processing_stale bigint,
  dead_letter bigint,
  cancelled_last_24h bigint,
  sent_last_24h bigint,
  delivered_last_24h bigint,
  delayed_current bigint,
  bounced_last_24h bigint,
  complained_last_24h bigint,
  suppressed_last_24h bigint,
  provider_failed_last_24h bigint,
  oldest_actionable_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private
AS $$
  SELECT
    count(*) FILTER (
      WHERE outbox.status IN ('pending', 'failed')
        AND outbox.not_before <= p_now
    )::bigint,
    count(*) FILTER (
      WHERE outbox.status = 'failed'
        AND outbox.not_before > p_now
    )::bigint,
    count(*) FILTER (
      WHERE outbox.status = 'processing'
        AND outbox.lease_expires_at > p_now
    )::bigint,
    count(*) FILTER (
      WHERE outbox.status = 'processing'
        AND outbox.lease_expires_at <= p_now
    )::bigint,
    count(*) FILTER (
      WHERE outbox.status = 'dead_letter'
    )::bigint,
    count(*) FILTER (
      WHERE outbox.status = 'cancelled'
        AND outbox.updated_at >= p_now - interval '24 hours'
    )::bigint,
    count(*) FILTER (
      WHERE outbox.status = 'sent'
        AND outbox.sent_at >= p_now - interval '24 hours'
    )::bigint,
    count(*) FILTER (
      WHERE outbox.delivered_at >= p_now - interval '24 hours'
    )::bigint,
    count(*) FILTER (
      WHERE outbox.delivery_status = 'delivery_delayed'
    )::bigint,
    count(*) FILTER (
      WHERE outbox.bounced_at >= p_now - interval '24 hours'
    )::bigint,
    count(*) FILTER (
      WHERE outbox.complained_at >= p_now - interval '24 hours'
    )::bigint,
    count(*) FILTER (
      WHERE outbox.suppressed_at >= p_now - interval '24 hours'
    )::bigint,
    count(*) FILTER (
      WHERE outbox.provider_failed_at >= p_now - interval '24 hours'
    )::bigint,
    min(outbox.not_before) FILTER (
      WHERE outbox.status IN ('pending', 'failed')
    )
  FROM supporter_private.email_outbox AS outbox;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_roles WHERE rolname = 'supporter_outbox_worker'
  ) THEN
    CREATE ROLE supporter_outbox_worker NOLOGIN;
  END IF;
END
$$;

GRANT USAGE ON SCHEMA supporter_private TO supporter_outbox_worker;

REVOKE ALL ON FUNCTION supporter_private.apply_supporter_email_event(
  text,
  text,
  timestamptz
) FROM PUBLIC;
REVOKE ALL ON FUNCTION supporter_private.record_supporter_email_provider_event(
  text,
  text,
  text,
  timestamptz,
  text,
  timestamptz
) FROM PUBLIC;
REVOKE ALL ON FUNCTION supporter_private.record_supporter_email_attempt(
  uuid,
  uuid,
  text,
  text,
  text,
  integer,
  timestamptz,
  integer
) FROM PUBLIC;
REVOKE ALL ON FUNCTION supporter_private.claim_supporter_email_v2(
  timestamptz,
  integer,
  integer,
  uuid
) FROM PUBLIC;
REVOKE ALL ON FUNCTION supporter_private.get_supporter_outbox_health(
  timestamptz
) FROM PUBLIC;

REVOKE EXECUTE ON FUNCTION supporter_private.claim_supporter_email(
  timestamptz,
  integer
) FROM supporter_runtime;
REVOKE EXECUTE ON FUNCTION supporter_private.complete_supporter_email(
  uuid,
  boolean,
  text,
  timestamptz
) FROM supporter_runtime;

GRANT EXECUTE ON FUNCTION supporter_private.record_supporter_email_attempt(
  uuid,
  uuid,
  text,
  text,
  text,
  integer,
  timestamptz,
  integer
) TO supporter_runtime;

GRANT EXECUTE ON FUNCTION supporter_private.record_supporter_email_provider_event(
  text,
  text,
  text,
  timestamptz,
  text,
  timestamptz
) TO supporter_outbox_worker;
GRANT EXECUTE ON FUNCTION supporter_private.record_supporter_email_attempt(
  uuid,
  uuid,
  text,
  text,
  text,
  integer,
  timestamptz,
  integer
) TO supporter_outbox_worker;
GRANT EXECUTE ON FUNCTION supporter_private.claim_supporter_email_v2(
  timestamptz,
  integer,
  integer,
  uuid
) TO supporter_outbox_worker;
GRANT EXECUTE ON FUNCTION supporter_private.get_supporter_outbox_health(
  timestamptz
) TO supporter_outbox_worker, supporter_operator;

COMMIT;
