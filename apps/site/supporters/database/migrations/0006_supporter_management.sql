-- EMAIL-CONTROLLED SUPPORTER SELF-MANAGEMENT
--
-- Adds generic management-link issuance, token-scoped state inspection, and
-- one-action management commands without granting arbitrary private-table reads.
BEGIN;

CREATE OR REPLACE FUNCTION supporter_private.start_supporter_management(
  p_lookup_hmac bytea,
  p_token_hash bytea,
  p_encrypted_token bytea,
  p_token_encryption_key_version text,
  p_expires_at timestamptz,
  p_now timestamptz,
  p_verification_id uuid,
  p_outbox_id uuid,
  p_audit_event_id uuid
)
RETURNS TABLE (
  created boolean,
  management_outbox_id uuid,
  encrypted_contact bytea,
  contact_encryption_key_version text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private
AS $$
DECLARE
  v_contact supporter_private.supporter_contacts%ROWTYPE;
  v_signature_id uuid;
BEGIN
  IF p_expires_at <= p_now
     OR octet_length(p_token_hash) <> 32
     OR octet_length(p_encrypted_token) < 1
     OR p_token_encryption_key_version IS NULL
     OR btrim(p_token_encryption_key_version) = '' THEN
    RAISE EXCEPTION 'invalid management challenge input'
      USING ERRCODE = 'P0001';
  END IF;

  SELECT contact.*
    INTO v_contact
    FROM supporter_private.supporter_contacts AS contact
    JOIN supporter_private.supporters AS supporter
      ON supporter.supporter_id = contact.supporter_id
   WHERE contact.lookup_hmac = p_lookup_hmac
     AND contact.is_primary = true
     AND contact.destroyed_at IS NULL
     AND supporter.status = 'active'
   FOR UPDATE OF contact;

  IF NOT FOUND THEN
    RETURN QUERY
    SELECT false, NULL::uuid, NULL::bytea, NULL::text;
    RETURN;
  END IF;

  IF EXISTS (
    SELECT 1
      FROM supporter_private.verification_challenges AS challenge
     WHERE challenge.supporter_id = v_contact.supporter_id
       AND challenge.purpose = 'manage_supporter'
       AND challenge.consumed_at IS NULL
       AND challenge.revoked_at IS NULL
       AND challenge.expires_at > p_now
       AND challenge.created_at > p_now - interval '5 minutes'
  ) THEN
    RETURN QUERY
    SELECT false, NULL::uuid, NULL::bytea, NULL::text;
    RETURN;
  END IF;

  SELECT signature.signature_id
    INTO v_signature_id
    FROM supporter_private.promise_signatures AS signature
   WHERE signature.supporter_id = v_contact.supporter_id
     AND signature.status = 'verified'
   ORDER BY signature.verified_at DESC NULLS LAST, signature.created_at DESC
   LIMIT 1;

  IF v_signature_id IS NULL THEN
    RETURN QUERY
    SELECT false, NULL::uuid, NULL::bytea, NULL::text;
    RETURN;
  END IF;

  UPDATE supporter_private.email_outbox AS outbox
     SET status = 'cancelled',
         updated_at = p_now
    FROM supporter_private.verification_challenges AS challenge
   WHERE challenge.verification_id = outbox.verification_id
     AND challenge.supporter_id = v_contact.supporter_id
     AND challenge.purpose = 'manage_supporter'
     AND outbox.status IN ('pending', 'failed', 'processing');

  UPDATE supporter_private.verification_challenges AS challenge
     SET revoked_at = COALESCE(challenge.revoked_at, p_now)
   WHERE challenge.supporter_id = v_contact.supporter_id
     AND challenge.purpose = 'manage_supporter'
     AND challenge.consumed_at IS NULL
     AND challenge.revoked_at IS NULL;

  INSERT INTO supporter_private.verification_challenges (
    verification_id,
    supporter_id,
    signature_id,
    purpose,
    token_hash,
    sent_to_contact_id,
    expires_at,
    created_at
  ) VALUES (
    p_verification_id,
    v_contact.supporter_id,
    v_signature_id,
    'manage_supporter',
    p_token_hash,
    v_contact.contact_id,
    p_expires_at,
    p_now
  );

  INSERT INTO supporter_private.email_outbox (
    outbox_id,
    supporter_id,
    verification_id,
    contact_id,
    template_name,
    encrypted_token,
    token_encryption_key_version,
    status,
    attempt_count,
    not_before,
    created_at,
    updated_at
  ) VALUES (
    p_outbox_id,
    v_contact.supporter_id,
    p_verification_id,
    v_contact.contact_id,
    'supporter_management',
    p_encrypted_token,
    p_token_encryption_key_version,
    'pending',
    0,
    p_now,
    p_now,
    p_now
  );

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
    v_contact.supporter_id::text,
    'supporter.management_requested',
    'supporter',
    v_contact.supporter_id,
    jsonb_build_object('verificationId', p_verification_id),
    p_now
  );

  RETURN QUERY
  SELECT
    true,
    p_outbox_id,
    v_contact.encrypted_value,
    v_contact.encryption_key_version;
END;
$$;

CREATE OR REPLACE FUNCTION supporter_private.get_supporter_management_state(
  p_token_hash bytea,
  p_now timestamptz
)
RETURNS TABLE (
  result_revision integer,
  result_visibility text,
  result_founding_number smallint,
  result_display_name text,
  result_profile_slug text,
  result_broad_region text,
  result_why_i_signed text,
  result_expires_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private
AS $$
  SELECT
    supporter.revision,
    supporter.visibility,
    designation.founding_number,
    source.display_name,
    source.profile_slug,
    source.broad_region,
    source.why_i_signed,
    challenge.expires_at
  FROM supporter_private.verification_challenges AS challenge
  JOIN supporter_private.supporters AS supporter
    ON supporter.supporter_id = challenge.supporter_id
  LEFT JOIN supporter_private.founding_supporter_designations AS designation
    ON designation.supporter_id = supporter.supporter_id
  LEFT JOIN supporter_private.public_profile_sources AS source
    ON source.supporter_id = supporter.supporter_id
  WHERE challenge.token_hash = p_token_hash
    AND challenge.purpose = 'manage_supporter'
    AND challenge.consumed_at IS NULL
    AND challenge.revoked_at IS NULL
    AND challenge.expires_at > p_now
    AND supporter.status = 'active'
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION supporter_private.apply_supporter_management(
  p_token_hash bytea,
  p_now timestamptz,
  p_expected_revision integer,
  p_action text,
  p_display_name text,
  p_profile_slug text,
  p_broad_region text,
  p_why_i_signed text,
  p_public_listing_consent_id uuid,
  p_confirmation boolean,
  p_audit_event_id uuid
)
RETURNS TABLE (
  result_status text,
  result_visibility text,
  result_founding_number smallint,
  result_revision integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private, supporter_public
AS $$
DECLARE
  v_challenge supporter_private.verification_challenges%ROWTYPE;
  v_supporter supporter_private.supporters%ROWTYPE;
  v_founding_number smallint;
  v_public_consent_id uuid;
  v_result_revision integer;
  v_result_visibility text;
  v_event_type text;
BEGIN
  IF p_action NOT IN (
    'set_private',
    'set_public',
    'update_public_profile',
    'withdraw'
  ) OR p_confirmation IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'invalid management action'
      USING ERRCODE = 'P0001';
  END IF;

  SELECT challenge.*
    INTO v_challenge
    FROM supporter_private.verification_challenges AS challenge
   WHERE challenge.token_hash = p_token_hash
   FOR UPDATE;

  IF NOT FOUND
     OR v_challenge.purpose <> 'manage_supporter'
     OR v_challenge.consumed_at IS NOT NULL
     OR v_challenge.revoked_at IS NOT NULL
     OR v_challenge.expires_at <= p_now THEN
    RAISE EXCEPTION 'management challenge is invalid or expired'
      USING ERRCODE = 'P0001';
  END IF;

  SELECT supporter.*
    INTO v_supporter
    FROM supporter_private.supporters AS supporter
   WHERE supporter.supporter_id = v_challenge.supporter_id
   FOR UPDATE;

  IF NOT FOUND
     OR v_supporter.status <> 'active'
     OR v_supporter.revision <> p_expected_revision THEN
    RAISE EXCEPTION 'supporter state changed or is unavailable'
      USING ERRCODE = 'P0001';
  END IF;

  SELECT designation.founding_number
    INTO v_founding_number
    FROM supporter_private.founding_supporter_designations AS designation
   WHERE designation.supporter_id = v_supporter.supporter_id;

  IF p_action IN ('set_public', 'update_public_profile') THEN
    IF p_display_name IS NULL
       OR char_length(btrim(p_display_name)) NOT BETWEEN 1 AND 100
       OR p_profile_slug IS NULL
       OR p_profile_slug !~ '^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$'
       OR (p_broad_region IS NOT NULL AND char_length(p_broad_region) > 100)
       OR (p_why_i_signed IS NOT NULL AND char_length(p_why_i_signed) > 1000) THEN
      RAISE EXCEPTION 'invalid public profile'
        USING ERRCODE = 'P0001';
    END IF;

    IF EXISTS (
      SELECT 1
        FROM supporter_private.public_profile_sources AS source
       WHERE source.profile_slug = p_profile_slug
         AND source.supporter_id <> v_supporter.supporter_id
    ) THEN
      RAISE EXCEPTION 'profile slug is unavailable'
        USING ERRCODE = 'P0001';
    END IF;
  END IF;

  IF p_action = 'withdraw' THEN
    PERFORM supporter_private.withdraw_supporter(
      v_supporter.supporter_id,
      p_now,
      p_audit_event_id
    );

    SELECT supporter.revision
      INTO v_result_revision
      FROM supporter_private.supporters AS supporter
     WHERE supporter.supporter_id = v_supporter.supporter_id;

    RETURN QUERY
    SELECT
      'withdrawn'::text,
      'private'::text,
      v_founding_number,
      v_result_revision;
    RETURN;
  END IF;

  IF p_action = 'set_private' THEN
    UPDATE supporter_private.consent_records AS consent
       SET withdrawn_at = COALESCE(consent.withdrawn_at, p_now)
     WHERE consent.supporter_id = v_supporter.supporter_id
       AND consent.purpose = 'public_listing'
       AND consent.withdrawn_at IS NULL;

    DELETE FROM supporter_public.supporter_profiles AS profile
     WHERE profile.supporter_id = v_supporter.supporter_id;

    DELETE FROM supporter_private.public_profile_sources AS source
     WHERE source.supporter_id = v_supporter.supporter_id;

    UPDATE supporter_private.supporters AS supporter
       SET visibility = 'private',
           updated_at = p_now,
           revision = supporter.revision + 1
     WHERE supporter.supporter_id = v_supporter.supporter_id;

    v_event_type := 'supporter.visibility_private';
  ELSIF p_action = 'set_public' THEN
    IF v_supporter.visibility <> 'private'
       OR p_public_listing_consent_id IS NULL THEN
      RAISE EXCEPTION 'public visibility requires fresh consent from private state'
        USING ERRCODE = 'P0001';
    END IF;

    INSERT INTO supporter_private.consent_records (
      consent_record_id,
      supporter_id,
      purpose,
      policy_version,
      affirmative,
      evidence,
      recorded_at
    ) VALUES (
      p_public_listing_consent_id,
      v_supporter.supporter_id,
      'public_listing',
      'public-listing-v1',
      true,
      jsonb_build_object(
        'method',
        'email_control',
        'verificationId',
        v_challenge.verification_id
      ),
      p_now
    );

    INSERT INTO supporter_private.public_profile_sources (
      supporter_id,
      visibility_consent_id,
      display_name,
      profile_slug,
      broad_region,
      why_i_signed,
      updated_at
    ) VALUES (
      v_supporter.supporter_id,
      p_public_listing_consent_id,
      btrim(p_display_name),
      p_profile_slug,
      NULLIF(btrim(COALESCE(p_broad_region, '')), ''),
      NULLIF(btrim(COALESCE(p_why_i_signed, '')), ''),
      p_now
    )
    ON CONFLICT (supporter_id) DO UPDATE
      SET visibility_consent_id = EXCLUDED.visibility_consent_id,
          display_name = EXCLUDED.display_name,
          profile_slug = EXCLUDED.profile_slug,
          broad_region = EXCLUDED.broad_region,
          why_i_signed = EXCLUDED.why_i_signed,
          updated_at = EXCLUDED.updated_at;

    UPDATE supporter_private.supporters AS supporter
       SET visibility = 'public',
           updated_at = p_now,
           revision = supporter.revision + 1
     WHERE supporter.supporter_id = v_supporter.supporter_id;

    v_event_type := 'supporter.visibility_public';
  ELSE
    IF v_supporter.visibility <> 'public' THEN
      RAISE EXCEPTION 'only public profiles can be edited'
        USING ERRCODE = 'P0001';
    END IF;

    SELECT source.visibility_consent_id
      INTO v_public_consent_id
      FROM supporter_private.public_profile_sources AS source
      JOIN supporter_private.consent_records AS consent
        ON consent.consent_record_id = source.visibility_consent_id
       AND consent.purpose = 'public_listing'
       AND consent.affirmative = true
       AND consent.withdrawn_at IS NULL
     WHERE source.supporter_id = v_supporter.supporter_id;

    IF v_public_consent_id IS NULL THEN
      RAISE EXCEPTION 'active public-listing consent is unavailable'
        USING ERRCODE = 'P0001';
    END IF;

    UPDATE supporter_private.public_profile_sources AS source
       SET display_name = btrim(p_display_name),
           profile_slug = p_profile_slug,
           broad_region = NULLIF(btrim(COALESCE(p_broad_region, '')), ''),
           why_i_signed = NULLIF(btrim(COALESCE(p_why_i_signed, '')), ''),
           updated_at = p_now
     WHERE source.supporter_id = v_supporter.supporter_id;

    UPDATE supporter_private.supporters AS supporter
       SET updated_at = p_now,
           revision = supporter.revision + 1
     WHERE supporter.supporter_id = v_supporter.supporter_id;

    v_event_type := 'supporter.public_profile_updated';
  END IF;

  IF p_action IN ('set_public', 'update_public_profile') THEN
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
      COALESCE(profile.published_at, p_now),
      p_now
    FROM supporter_private.public_profile_sources AS source
    LEFT JOIN supporter_private.founding_supporter_designations AS designation
      ON designation.supporter_id = source.supporter_id
    LEFT JOIN supporter_public.supporter_profiles AS profile
      ON profile.supporter_id = source.supporter_id
    WHERE source.supporter_id = v_supporter.supporter_id
    ON CONFLICT ON CONSTRAINT supporter_profiles_pkey DO UPDATE
      SET founding_number = EXCLUDED.founding_number,
          display_name = EXCLUDED.display_name,
          profile_slug = EXCLUDED.profile_slug,
          broad_region = EXCLUDED.broad_region,
          why_i_signed = EXCLUDED.why_i_signed,
          signed_promise_versions = EXCLUDED.signed_promise_versions,
          refreshed_at = EXCLUDED.refreshed_at;
  END IF;

  UPDATE supporter_private.verification_challenges AS challenge
     SET consumed_at = p_now
   WHERE challenge.verification_id = v_challenge.verification_id;

  UPDATE supporter_private.verification_challenges AS challenge
     SET revoked_at = p_now
   WHERE challenge.supporter_id = v_supporter.supporter_id
     AND challenge.purpose = 'manage_supporter'
     AND challenge.verification_id <> v_challenge.verification_id
     AND challenge.consumed_at IS NULL
     AND challenge.revoked_at IS NULL;

  UPDATE supporter_private.email_outbox AS outbox
     SET status = 'cancelled',
         updated_at = p_now
    FROM supporter_private.verification_challenges AS challenge
   WHERE challenge.verification_id = outbox.verification_id
     AND challenge.supporter_id = v_supporter.supporter_id
     AND challenge.purpose = 'manage_supporter'
     AND outbox.status IN ('pending', 'failed', 'processing');

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
    v_event_type,
    'supporter',
    v_supporter.supporter_id,
    jsonb_build_object(
      'visibility',
      CASE WHEN p_action = 'set_private' THEN 'private' ELSE 'public' END,
      'foundingNumber',
      v_founding_number
    ),
    p_now
  );

  SELECT supporter.revision, supporter.visibility
    INTO v_result_revision, v_result_visibility
    FROM supporter_private.supporters AS supporter
   WHERE supporter.supporter_id = v_supporter.supporter_id;

  RETURN QUERY
  SELECT
    'active'::text,
    v_result_visibility,
    v_founding_number,
    v_result_revision;
END;
$$;

REVOKE ALL ON FUNCTION supporter_private.start_supporter_management(
  bytea, bytea, bytea, text, timestamptz, timestamptz, uuid, uuid, uuid
) FROM PUBLIC;
REVOKE ALL ON FUNCTION supporter_private.get_supporter_management_state(
  bytea, timestamptz
) FROM PUBLIC;
REVOKE ALL ON FUNCTION supporter_private.apply_supporter_management(
  bytea, timestamptz, integer, text, text, text, text, text, uuid, boolean, uuid
) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION supporter_private.start_supporter_management(
  bytea, bytea, bytea, text, timestamptz, timestamptz, uuid, uuid, uuid
) TO supporter_runtime;
GRANT EXECUTE ON FUNCTION supporter_private.get_supporter_management_state(
  bytea, timestamptz
) TO supporter_runtime;
GRANT EXECUTE ON FUNCTION supporter_private.apply_supporter_management(
  bytea, timestamptz, integer, text, text, text, text, text, uuid, boolean, uuid
) TO supporter_runtime;

REVOKE EXECUTE ON FUNCTION supporter_private.withdraw_supporter(
  uuid, timestamptz, uuid
) FROM supporter_runtime;

COMMIT;
