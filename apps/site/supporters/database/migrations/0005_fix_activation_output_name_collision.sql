-- FIX ACTIVATE_SUPPORTER OUTPUT-NAME COLLISIONS
--
-- The function returns columns named supporter_id, signature_id, and
-- founding_number. In PL/pgSQL those output names are variables, so every table
-- reference using the same names must be explicitly qualified.
BEGIN;

CREATE OR REPLACE FUNCTION supporter_private.activate_supporter(
  p_token_hash bytea,
  p_now timestamptz,
  p_verification_evidence_id uuid,
  p_audit_event_id uuid
)
RETURNS TABLE (
  supporter_id uuid,
  signature_id uuid,
  founding_number smallint,
  was_idempotent boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private, supporter_public
AS $$
DECLARE
  v_challenge supporter_private.verification_challenges%ROWTYPE;
  v_supporter supporter_private.supporters%ROWTYPE;
  v_signature supporter_private.promise_signatures%ROWTYPE;
  v_founding_number integer;
BEGIN
  SELECT challenge.*
    INTO v_challenge
    FROM supporter_private.verification_challenges AS challenge
   WHERE challenge.token_hash = p_token_hash
   FOR UPDATE;

  IF NOT FOUND
     OR v_challenge.purpose <> 'activate_supporter'
     OR v_challenge.revoked_at IS NOT NULL
     OR v_challenge.expires_at <= p_now THEN
    RAISE EXCEPTION 'verification challenge is invalid or expired'
      USING ERRCODE = 'P0001';
  END IF;

  SELECT supporter.*
    INTO v_supporter
    FROM supporter_private.supporters AS supporter
   WHERE supporter.supporter_id = v_challenge.supporter_id
   FOR UPDATE;

  SELECT signature.*
    INTO v_signature
    FROM supporter_private.promise_signatures AS signature
   WHERE signature.signature_id = v_challenge.signature_id
   FOR UPDATE;

  IF NOT FOUND OR v_supporter.supporter_id IS NULL THEN
    RAISE EXCEPTION 'pending enrollment is incomplete'
      USING ERRCODE = 'P0001';
  END IF;

  IF v_challenge.consumed_at IS NOT NULL THEN
    IF v_supporter.status = 'active' AND v_signature.status = 'verified' THEN
      RETURN QUERY
      SELECT
        v_supporter.supporter_id,
        v_signature.signature_id,
        designation.founding_number,
        true
      FROM (SELECT 1) AS singleton
      LEFT JOIN supporter_private.founding_supporter_designations AS designation
        ON designation.supporter_id = v_supporter.supporter_id;
      RETURN;
    END IF;

    RAISE EXCEPTION 'consumed challenge is not attached to an active enrollment'
      USING ERRCODE = 'P0001';
  END IF;

  IF v_supporter.status <> 'pending_verification'
     OR v_signature.status <> 'pending_verification'
     OR v_signature.supporter_id <> v_supporter.supporter_id THEN
    RAISE EXCEPTION 'enrollment is not pending activation'
      USING ERRCODE = 'P0001';
  END IF;

  UPDATE supporter_private.verification_challenges AS challenge
     SET consumed_at = p_now
   WHERE challenge.verification_id = v_challenge.verification_id;

  INSERT INTO supporter_private.verification_evidence (
    verification_evidence_id,
    verification_id,
    supporter_id,
    signature_id,
    method,
    verified_at
  ) VALUES (
    p_verification_evidence_id,
    v_challenge.verification_id,
    v_supporter.supporter_id,
    v_signature.signature_id,
    'email_control',
    p_now
  );

  UPDATE supporter_private.promise_signatures AS signature
     SET status = 'verified',
         verified_at = p_now,
         updated_at = p_now,
         revision = signature.revision + 1
   WHERE signature.signature_id = v_signature.signature_id;

  UPDATE supporter_private.supporters AS supporter
     SET status = 'active',
         updated_at = p_now,
         revision = supporter.revision + 1
   WHERE supporter.supporter_id = v_supporter.supporter_id;

  UPDATE supporter_private.movement_counters AS counter
     SET counter_value = counter.counter_value + 1,
         updated_at = p_now
   WHERE counter.counter_name = 'founding_supporter'
     AND counter.counter_value < 1000
  RETURNING counter.counter_value INTO v_founding_number;

  IF v_founding_number IS NOT NULL THEN
    INSERT INTO supporter_private.founding_supporter_designations (
      founding_number,
      supporter_id,
      source_signature_id,
      assigned_at
    ) VALUES (
      v_founding_number,
      v_supporter.supporter_id,
      v_signature.signature_id,
      p_now
    );
  END IF;

  INSERT INTO supporter_private.protected_audit_events (
    audit_event_id,
    actor_class,
    actor_reference,
    event_type,
    entity_type,
    entity_id,
    event_payload,
    occurred_at
  ) VALUES (
    p_audit_event_id,
    'public_supporter',
    v_supporter.supporter_id::text,
    'supporter.activated',
    'supporter',
    v_supporter.supporter_id,
    jsonb_build_object(
      'signatureId', v_signature.signature_id,
      'promiseVersionId', v_signature.promise_version_id,
      'foundingNumber', v_founding_number
    ),
    p_now
  );

  IF v_supporter.visibility = 'public' THEN
    INSERT INTO supporter_public.supporter_profiles (
      supporter_id,
      founding_number,
      display_name,
      profile_slug,
      broad_region,
      why_i_signed,
      signed_promise_versions,
      published_at,
      refreshed_at
    )
    SELECT
      source.supporter_id,
      designation.founding_number,
      source.display_name,
      source.profile_slug,
      source.broad_region,
      source.why_i_signed,
      COALESCE((
        SELECT jsonb_agg(
          signature.promise_version_id
          ORDER BY signature.created_at
        )
          FROM supporter_private.promise_signatures AS signature
         WHERE signature.supporter_id = source.supporter_id
           AND signature.status = 'verified'
      ), '[]'::jsonb),
      p_now,
      p_now
    FROM supporter_private.public_profile_sources AS source
    JOIN supporter_private.consent_records AS consent
      ON consent.consent_record_id = source.visibility_consent_id
     AND consent.purpose = 'public_listing'
     AND consent.affirmative = true
     AND consent.withdrawn_at IS NULL
    LEFT JOIN supporter_private.founding_supporter_designations AS designation
      ON designation.supporter_id = source.supporter_id
    WHERE source.supporter_id = v_supporter.supporter_id
    ON CONFLICT ON CONSTRAINT supporter_profiles_pkey DO UPDATE
      SET founding_number = EXCLUDED.founding_number,
          display_name = EXCLUDED.display_name,
          profile_slug = EXCLUDED.profile_slug,
          broad_region = EXCLUDED.broad_region,
          why_i_signed = EXCLUDED.why_i_signed,
          signed_promise_versions = EXCLUDED.signed_promise_versions,
          refreshed_at = EXCLUDED.refreshed_at;
  ELSE
    DELETE FROM supporter_public.supporter_profiles AS profile
     WHERE profile.supporter_id = v_supporter.supporter_id;
  END IF;

  RETURN QUERY
  SELECT
    v_supporter.supporter_id,
    v_signature.signature_id,
    v_founding_number::smallint,
    false;
END;
$$;

COMMIT;
