-- SUPPORTER COMMAND FUNCTIONS AND TRANSACTIONAL EMAIL OUTBOX
BEGIN;

CREATE TABLE supporter_private.request_attempt_buckets (
  action_name text NOT NULL,
  bucket_hmac bytea NOT NULL,
  window_start timestamptz NOT NULL,
  attempt_count integer NOT NULL CHECK (attempt_count > 0),
  expires_at timestamptz NOT NULL,
  PRIMARY KEY (action_name, bucket_hmac, window_start)
);

CREATE INDEX request_attempt_buckets_expiry
  ON supporter_private.request_attempt_buckets (expires_at);

CREATE OR REPLACE FUNCTION supporter_private.consume_supporter_attempt(
  p_action_name text,
  p_bucket_hmac bytea,
  p_now timestamptz,
  p_window_seconds integer,
  p_limit integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private
AS $$
DECLARE
  v_window_start timestamptz;
  v_count integer;
BEGIN
  IF p_window_seconds < 60 OR p_window_seconds > 86400 OR p_limit < 1 OR p_limit > 1000 THEN
    RAISE EXCEPTION 'invalid attempt budget' USING ERRCODE = 'P0001';
  END IF;
  v_window_start := to_timestamp(
    floor(extract(epoch FROM p_now) / p_window_seconds) * p_window_seconds
  );
  INSERT INTO supporter_private.request_attempt_buckets (
    action_name, bucket_hmac, window_start, attempt_count, expires_at
  ) VALUES (
    p_action_name, p_bucket_hmac, v_window_start, 1,
    v_window_start + make_interval(secs => p_window_seconds * 2)
  )
  ON CONFLICT (action_name, bucket_hmac, window_start) DO UPDATE
    SET attempt_count = supporter_private.request_attempt_buckets.attempt_count + 1
  RETURNING attempt_count INTO v_count;
  RETURN v_count <= p_limit;
END;
$$;

CREATE TABLE supporter_private.email_outbox (
  outbox_id uuid PRIMARY KEY,
  supporter_id uuid NOT NULL REFERENCES supporter_private.supporters(supporter_id),
  verification_id uuid NOT NULL REFERENCES supporter_private.verification_challenges(verification_id),
  contact_id uuid NOT NULL REFERENCES supporter_private.supporter_contacts(contact_id),
  template_name text NOT NULL CHECK (template_name IN ('supporter_verification', 'supporter_management')),
  encrypted_token bytea NOT NULL,
  token_encryption_key_version text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'processing', 'sent', 'failed', 'cancelled')),
  attempt_count integer NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  not_before timestamptz NOT NULL,
  claimed_at timestamptz,
  sent_at timestamptz,
  last_error_code text,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL
);

CREATE INDEX email_outbox_pending_delivery
  ON supporter_private.email_outbox (not_before, created_at)
  WHERE status IN ('pending', 'failed');

CREATE OR REPLACE FUNCTION supporter_private.start_supporter_enrollment(
  p_supporter_id uuid,
  p_signature_id uuid,
  p_verification_id uuid,
  p_contact_id uuid,
  p_signature_consent_id uuid,
  p_visibility_consent_id uuid,
  p_promise_version_id uuid,
  p_encrypted_contact bytea,
  p_lookup_hmac bytea,
  p_encryption_key_version text,
  p_visibility text,
  p_display_name text,
  p_profile_slug text,
  p_broad_region text,
  p_why_i_signed text,
  p_signature_policy_version text,
  p_visibility_policy_version text,
  p_token_hash bytea,
  p_encrypted_token bytea,
  p_token_encryption_key_version text,
  p_expires_at timestamptz,
  p_now timestamptz,
  p_audit_event_id uuid,
  p_outbox_id uuid
)
RETURNS TABLE (
  created boolean,
  supporter_id uuid,
  signature_id uuid,
  verification_id uuid,
  outbox_id uuid
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private, supporter_public
AS $$
DECLARE
  v_promise_status text;
BEGIN
  IF p_expires_at <= p_now THEN
    RAISE EXCEPTION 'verification expiry must be in the future' USING ERRCODE = 'P0001';
  END IF;
  IF p_visibility NOT IN ('private', 'public') THEN
    RAISE EXCEPTION 'invalid visibility' USING ERRCODE = 'P0001';
  END IF;
  IF p_visibility = 'public' AND (
    p_visibility_consent_id IS NULL OR
    p_visibility_policy_version IS NULL OR
    p_display_name IS NULL OR
    p_profile_slug IS NULL
  ) THEN
    RAISE EXCEPTION 'public enrollment requires consent and profile' USING ERRCODE = 'P0001';
  END IF;
  IF p_visibility = 'private' AND (
    p_visibility_consent_id IS NOT NULL OR
    p_display_name IS NOT NULL OR
    p_profile_slug IS NOT NULL OR
    p_broad_region IS NOT NULL OR
    p_why_i_signed IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'private enrollment cannot include public profile fields' USING ERRCODE = 'P0001';
  END IF;

  SELECT publication_status INTO v_promise_status
    FROM supporter_private.promise_versions
   WHERE promise_version_id = p_promise_version_id;
  IF v_promise_status IS DISTINCT FROM 'published' THEN
    RAISE EXCEPTION 'Promise version is not published' USING ERRCODE = 'P0001';
  END IF;

  -- Existing contacts receive the same generic HTTP response but do not create
  -- a second movement identity or reveal the existing supporter identifier.
  IF EXISTS (
    SELECT 1 FROM supporter_private.supporter_contacts
     WHERE lookup_hmac = p_lookup_hmac AND destroyed_at IS NULL
  ) THEN
    RETURN QUERY SELECT false, NULL::uuid, NULL::uuid, NULL::uuid, NULL::uuid;
    RETURN;
  END IF;

  INSERT INTO supporter_private.supporters (
    supporter_id, status, visibility, revision, created_at, updated_at
  ) VALUES (
    p_supporter_id, 'pending_verification', p_visibility, 1, p_now, p_now
  );

  INSERT INTO supporter_private.supporter_contacts (
    contact_id, supporter_id, contact_type, encrypted_value, lookup_hmac,
    encryption_key_version, is_primary, created_at
  ) VALUES (
    p_contact_id, p_supporter_id, 'email', p_encrypted_contact, p_lookup_hmac,
    p_encryption_key_version, true, p_now
  );

  INSERT INTO supporter_private.consent_records (
    consent_record_id, supporter_id, purpose, policy_version, affirmative,
    evidence, recorded_at
  ) VALUES (
    p_signature_consent_id, p_supporter_id, 'promise_signature',
    p_signature_policy_version, true, '{}'::jsonb, p_now
  );

  IF p_visibility = 'public' THEN
    INSERT INTO supporter_private.consent_records (
      consent_record_id, supporter_id, purpose, policy_version, affirmative,
      evidence, recorded_at
    ) VALUES (
      p_visibility_consent_id, p_supporter_id, 'public_listing',
      p_visibility_policy_version, true, '{}'::jsonb, p_now
    );

    INSERT INTO supporter_private.public_profile_sources (
      supporter_id, visibility_consent_id, display_name, profile_slug,
      broad_region, why_i_signed, updated_at
    ) VALUES (
      p_supporter_id, p_visibility_consent_id, p_display_name, p_profile_slug,
      p_broad_region, p_why_i_signed, p_now
    );
  END IF;

  INSERT INTO supporter_private.promise_signatures (
    signature_id, supporter_id, promise_version_id, signature_consent_id,
    status, revision, created_at, updated_at
  ) VALUES (
    p_signature_id, p_supporter_id, p_promise_version_id,
    p_signature_consent_id, 'pending_verification', 1, p_now, p_now
  );

  INSERT INTO supporter_private.verification_challenges (
    verification_id, supporter_id, signature_id, purpose, token_hash,
    sent_to_contact_id, expires_at, created_at
  ) VALUES (
    p_verification_id, p_supporter_id, p_signature_id, 'activate_supporter',
    p_token_hash, p_contact_id, p_expires_at, p_now
  );

  INSERT INTO supporter_private.email_outbox (
    outbox_id, supporter_id, verification_id, contact_id, template_name,
    encrypted_token, token_encryption_key_version, status, attempt_count,
    not_before, created_at, updated_at
  ) VALUES (
    p_outbox_id, p_supporter_id, p_verification_id, p_contact_id,
    'supporter_verification', p_encrypted_token, p_token_encryption_key_version,
    'pending', 0, p_now, p_now, p_now
  );

  INSERT INTO supporter_private.protected_audit_events (
    audit_event_id, actor_class, actor_reference, event_type, entity_type,
    entity_id, event_payload, occurred_at
  ) VALUES (
    p_audit_event_id, 'public_supporter', p_supporter_id::text,
    'supporter.enrollment_started', 'supporter', p_supporter_id,
    jsonb_build_object('promiseVersionId', p_promise_version_id, 'visibility', p_visibility),
    p_now
  );

  RETURN QUERY SELECT true, p_supporter_id, p_signature_id, p_verification_id, p_outbox_id;
EXCEPTION
  WHEN unique_violation THEN
    IF EXISTS (
      SELECT 1 FROM supporter_private.supporter_contacts
       WHERE lookup_hmac = p_lookup_hmac AND destroyed_at IS NULL
    ) THEN
      RETURN QUERY SELECT false, NULL::uuid, NULL::uuid, NULL::uuid, NULL::uuid;
    ELSE
      RAISE;
    END IF;
END;
$$;

CREATE OR REPLACE FUNCTION supporter_private.claim_supporter_email(
  p_now timestamptz,
  p_max_attempts integer DEFAULT 5
)
RETURNS TABLE (
  outbox_id uuid,
  verification_id uuid,
  encrypted_contact bytea,
  encryption_key_version text,
  encrypted_token bytea,
  token_encryption_key_version text,
  expires_at timestamptz,
  template_name text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private
AS $$
DECLARE
  v_outbox_id uuid;
BEGIN
  SELECT candidate.outbox_id INTO v_outbox_id
    FROM supporter_private.email_outbox AS candidate
    JOIN supporter_private.verification_challenges AS challenge
      ON challenge.verification_id = candidate.verification_id
   WHERE candidate.status IN ('pending', 'failed')
     AND candidate.not_before <= p_now
     AND candidate.attempt_count < p_max_attempts
     AND challenge.consumed_at IS NULL
     AND challenge.revoked_at IS NULL
     AND challenge.expires_at > p_now
   ORDER BY candidate.created_at
   FOR UPDATE OF candidate SKIP LOCKED
   LIMIT 1;

  IF v_outbox_id IS NULL THEN RETURN; END IF;

  UPDATE supporter_private.email_outbox
     SET status = 'processing',
         attempt_count = attempt_count + 1,
         claimed_at = p_now,
         updated_at = p_now
   WHERE supporter_private.email_outbox.outbox_id = v_outbox_id;

  RETURN QUERY
  SELECT outbox.outbox_id,
         outbox.verification_id,
         contact.encrypted_value,
         contact.encryption_key_version,
         outbox.encrypted_token,
         outbox.token_encryption_key_version,
         challenge.expires_at,
         outbox.template_name
    FROM supporter_private.email_outbox AS outbox
    JOIN supporter_private.supporter_contacts AS contact
      ON contact.contact_id = outbox.contact_id
    JOIN supporter_private.verification_challenges AS challenge
      ON challenge.verification_id = outbox.verification_id
   WHERE outbox.outbox_id = v_outbox_id;
END;
$$;

CREATE OR REPLACE FUNCTION supporter_private.complete_supporter_email(
  p_outbox_id uuid,
  p_sent boolean,
  p_error_code text,
  p_now timestamptz
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private
AS $$
BEGIN
  UPDATE supporter_private.email_outbox
     SET attempt_count = CASE WHEN status = 'pending' THEN attempt_count + 1 ELSE attempt_count END,
         status = CASE WHEN p_sent THEN 'sent' ELSE 'failed' END,
         sent_at = CASE WHEN p_sent THEN p_now ELSE sent_at END,
         last_error_code = CASE WHEN p_sent THEN NULL ELSE left(COALESCE(p_error_code, 'provider_error'), 100) END,
         encrypted_token = CASE WHEN p_sent THEN ''::bytea ELSE encrypted_token END,
         token_encryption_key_version = CASE WHEN p_sent THEN 'destroyed' ELSE token_encryption_key_version END,
         not_before = CASE WHEN p_sent THEN not_before ELSE p_now + interval '5 minutes' END,
         updated_at = p_now
   WHERE outbox_id = p_outbox_id AND status IN ('pending', 'processing');
  IF NOT FOUND THEN
    RAISE EXCEPTION 'email outbox item is not processing' USING ERRCODE = 'P0001';
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION supporter_private.withdraw_supporter(
  p_supporter_id uuid,
  p_now timestamptz,
  p_audit_event_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private, supporter_public
AS $$
BEGIN
  PERFORM 1 FROM supporter_private.supporters
   WHERE supporter_id = p_supporter_id AND status IN ('active', 'suspended')
   FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'supporter is not withdrawable' USING ERRCODE = 'P0001';
  END IF;

  UPDATE supporter_private.supporters
     SET status = 'withdrawn', visibility = 'private', withdrawn_at = p_now,
         updated_at = p_now, revision = revision + 1
   WHERE supporter_id = p_supporter_id;

  UPDATE supporter_private.promise_signatures
     SET status = 'withdrawn', withdrawn_at = p_now, updated_at = p_now,
         revision = revision + 1
   WHERE supporter_id = p_supporter_id AND status = 'verified';

  UPDATE supporter_private.consent_records
     SET withdrawn_at = COALESCE(withdrawn_at, p_now)
   WHERE supporter_id = p_supporter_id
     AND purpose IN ('promise_signature', 'public_listing');

  UPDATE supporter_private.founding_supporter_designations
     SET retired_at = COALESCE(retired_at, p_now),
         retirement_reason = COALESCE(retirement_reason, 'supporter_withdrew')
   WHERE supporter_id = p_supporter_id;

  UPDATE supporter_private.verification_challenges
     SET revoked_at = COALESCE(revoked_at, p_now)
   WHERE supporter_id = p_supporter_id AND consumed_at IS NULL;

  UPDATE supporter_private.email_outbox
     SET status = 'cancelled', updated_at = p_now
   WHERE supporter_id = p_supporter_id AND status IN ('pending', 'failed', 'processing');

  DELETE FROM supporter_public.supporter_profiles WHERE supporter_id = p_supporter_id;
  DELETE FROM supporter_private.public_profile_sources WHERE supporter_id = p_supporter_id;

  INSERT INTO supporter_private.protected_audit_events (
    audit_event_id, actor_class, actor_reference, event_type, entity_type,
    entity_id, event_payload, occurred_at
  ) VALUES (
    p_audit_event_id, 'public_supporter', p_supporter_id::text,
    'supporter.withdrawn', 'supporter', p_supporter_id, '{}'::jsonb, p_now
  );
END;
$$;

CREATE OR REPLACE VIEW supporter_public.movement_totals AS
SELECT
  count(*) FILTER (WHERE supporter.status = 'active')::bigint AS active_verified_supporters,
  count(*) FILTER (WHERE supporter.status = 'active' AND supporter.visibility = 'public')::bigint AS public_supporters,
  count(*) FILTER (
    WHERE supporter.status = 'active' AND designation.founding_number IS NOT NULL
  )::bigint AS active_founding_supporters,
  (SELECT counter_value FROM supporter_private.movement_counters WHERE counter_name = 'founding_supporter')::integer
    AS founding_numbers_assigned
FROM supporter_private.supporters AS supporter
LEFT JOIN supporter_private.founding_supporter_designations AS designation
  ON designation.supporter_id = supporter.supporter_id;

COMMIT;
