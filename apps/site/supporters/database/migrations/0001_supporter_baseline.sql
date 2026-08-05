-- SUPPORTER REGISTRY BASELINE
-- Provider-neutral PostgreSQL 15+ schema. Application code generates opaque UUIDs.

BEGIN;

CREATE SCHEMA IF NOT EXISTS supporter_private;
CREATE SCHEMA IF NOT EXISTS supporter_public;

CREATE TABLE supporter_private.promise_versions (
  promise_version_id uuid PRIMARY KEY,
  version_label text NOT NULL UNIQUE,
  canonical_text text NOT NULL,
  content_hash text NOT NULL UNIQUE,
  publication_status text NOT NULL
    CHECK (publication_status IN ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (
    (publication_status = 'draft' AND published_at IS NULL)
    OR (publication_status = 'published' AND published_at IS NOT NULL)
  )
);

CREATE OR REPLACE FUNCTION supporter_private.reject_published_promise_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.publication_status = 'published' THEN
    RAISE EXCEPTION 'published Promise versions are immutable';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER promise_versions_immutable_after_publication
BEFORE UPDATE OR DELETE ON supporter_private.promise_versions
FOR EACH ROW
EXECUTE FUNCTION supporter_private.reject_published_promise_mutation();

CREATE TABLE supporter_private.supporters (
  supporter_id uuid PRIMARY KEY,
  status text NOT NULL
    CHECK (status IN (
      'pending_verification',
      'active',
      'suspended',
      'withdrawn',
      'voided',
      'deleted'
    )),
  visibility text NOT NULL DEFAULT 'private'
    CHECK (visibility IN ('private', 'public')),
  revision integer NOT NULL DEFAULT 1 CHECK (revision > 0),
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL,
  suspended_at timestamptz,
  withdrawn_at timestamptz,
  voided_at timestamptz,
  deleted_at timestamptz,
  void_reason text
    CHECK (void_reason IS NULL OR void_reason IN (
      'duplicate',
      'fraudulent',
      'automated',
      'nonconsensual',
      'invalid_verification',
      'other'
    )),
  CHECK (status IN ('pending_verification', 'active') OR visibility = 'private')
);

CREATE TABLE supporter_private.supporter_contacts (
  contact_id uuid PRIMARY KEY,
  supporter_id uuid NOT NULL REFERENCES supporter_private.supporters(supporter_id),
  contact_type text NOT NULL CHECK (contact_type = 'email'),
  encrypted_value bytea NOT NULL,
  lookup_hmac bytea NOT NULL,
  encryption_key_version text NOT NULL,
  is_primary boolean NOT NULL DEFAULT true,
  verified_at timestamptz,
  replaced_at timestamptz,
  destroyed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (lookup_hmac),
  CHECK (destroyed_at IS NULL OR replaced_at IS NOT NULL OR is_primary = false)
);

CREATE UNIQUE INDEX one_live_primary_contact_per_supporter
  ON supporter_private.supporter_contacts (supporter_id)
  WHERE is_primary = true AND destroyed_at IS NULL;

CREATE TABLE supporter_private.consent_records (
  consent_record_id uuid PRIMARY KEY,
  supporter_id uuid REFERENCES supporter_private.supporters(supporter_id),
  purpose text NOT NULL CHECK (purpose IN (
    'promise_signature',
    'public_listing',
    'newsletter_updates',
    'advisor_public_listing',
    'future_account_link'
  )),
  policy_version text NOT NULL,
  affirmative boolean NOT NULL,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  recorded_at timestamptz NOT NULL,
  withdrawn_at timestamptz,
  CHECK (affirmative = true)
);

CREATE TABLE supporter_private.promise_signatures (
  signature_id uuid PRIMARY KEY,
  supporter_id uuid NOT NULL REFERENCES supporter_private.supporters(supporter_id),
  promise_version_id uuid NOT NULL
    REFERENCES supporter_private.promise_versions(promise_version_id),
  signature_consent_id uuid NOT NULL UNIQUE
    REFERENCES supporter_private.consent_records(consent_record_id),
  status text NOT NULL CHECK (status IN (
    'pending_verification',
    'verified',
    'withdrawn',
    'voided'
  )),
  revision integer NOT NULL DEFAULT 1 CHECK (revision > 0),
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL,
  verified_at timestamptz,
  withdrawn_at timestamptz,
  voided_at timestamptz,
  void_reason text,
  CHECK (status <> 'verified' OR verified_at IS NOT NULL)
);

CREATE UNIQUE INDEX one_current_signature_per_supporter_and_version
  ON supporter_private.promise_signatures (supporter_id, promise_version_id)
  WHERE status IN ('pending_verification', 'verified');

CREATE TABLE supporter_private.verification_challenges (
  verification_id uuid PRIMARY KEY,
  supporter_id uuid NOT NULL REFERENCES supporter_private.supporters(supporter_id),
  signature_id uuid NOT NULL REFERENCES supporter_private.promise_signatures(signature_id),
  purpose text NOT NULL CHECK (purpose IN (
    'activate_supporter',
    'manage_supporter',
    'change_contact',
    'future_account_link'
  )),
  token_hash bytea NOT NULL UNIQUE,
  sent_to_contact_id uuid NOT NULL
    REFERENCES supporter_private.supporter_contacts(contact_id),
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_at > created_at),
  CHECK (consumed_at IS NULL OR revoked_at IS NULL)
);

CREATE TABLE supporter_private.verification_evidence (
  verification_evidence_id uuid PRIMARY KEY,
  verification_id uuid NOT NULL UNIQUE
    REFERENCES supporter_private.verification_challenges(verification_id),
  supporter_id uuid NOT NULL REFERENCES supporter_private.supporters(supporter_id),
  signature_id uuid NOT NULL REFERENCES supporter_private.promise_signatures(signature_id),
  method text NOT NULL CHECK (method = 'email_control'),
  verified_at timestamptz NOT NULL
);

CREATE TABLE supporter_private.movement_counters (
  counter_name text PRIMARY KEY,
  counter_value integer NOT NULL CHECK (counter_value BETWEEN 0 AND 1000),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO supporter_private.movement_counters (counter_name, counter_value)
VALUES ('founding_supporter', 0)
ON CONFLICT (counter_name) DO NOTHING;

CREATE TABLE supporter_private.founding_supporter_designations (
  founding_number smallint PRIMARY KEY CHECK (founding_number BETWEEN 1 AND 1000),
  supporter_id uuid NOT NULL UNIQUE
    REFERENCES supporter_private.supporters(supporter_id),
  source_signature_id uuid NOT NULL UNIQUE
    REFERENCES supporter_private.promise_signatures(signature_id),
  assigned_at timestamptz NOT NULL,
  retired_at timestamptz,
  retirement_reason text
);

CREATE TABLE supporter_private.public_profile_sources (
  supporter_id uuid PRIMARY KEY REFERENCES supporter_private.supporters(supporter_id),
  visibility_consent_id uuid NOT NULL
    REFERENCES supporter_private.consent_records(consent_record_id),
  display_name text NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 100),
  profile_slug text NOT NULL UNIQUE
    CHECK (profile_slug ~ '^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$'),
  broad_region text CHECK (broad_region IS NULL OR char_length(broad_region) <= 100),
  why_i_signed text CHECK (why_i_signed IS NULL OR char_length(why_i_signed) <= 1000),
  updated_at timestamptz NOT NULL
);

-- This table is the only public read model. It deliberately excludes contact,
-- verification, consent evidence, referral, moderation, audit, and account data.
CREATE TABLE supporter_public.supporter_profiles (
  supporter_id uuid PRIMARY KEY,
  founding_number smallint UNIQUE CHECK (founding_number BETWEEN 1 AND 1000),
  display_name text NOT NULL,
  profile_slug text NOT NULL UNIQUE,
  broad_region text,
  why_i_signed text,
  signed_promise_versions jsonb NOT NULL DEFAULT '[]'::jsonb,
  published_at timestamptz NOT NULL,
  refreshed_at timestamptz NOT NULL
);

CREATE TABLE supporter_private.founding_advisor_designations (
  designation_id uuid PRIMARY KEY,
  supporter_id uuid REFERENCES supporter_private.supporters(supporter_id),
  private_person_reference text NOT NULL,
  contribution_summary text NOT NULL CHECK (char_length(contribution_summary) <= 500),
  granted_by_actor text NOT NULL,
  granted_at timestamptz NOT NULL,
  public_listing_consent_id uuid
    REFERENCES supporter_private.consent_records(consent_record_id),
  public_display_name text,
  public_contribution_summary text,
  public_listing_accepted_at timestamptz,
  public_listing_withdrawn_at timestamptz,
  CHECK (
    public_listing_accepted_at IS NULL
    OR (
      public_listing_consent_id IS NOT NULL
      AND public_display_name IS NOT NULL
      AND public_contribution_summary IS NOT NULL
    )
  )
);

CREATE TABLE supporter_public.founding_advisors (
  designation_id uuid PRIMARY KEY,
  display_name text NOT NULL,
  contribution_summary text NOT NULL,
  published_at timestamptz NOT NULL,
  refreshed_at timestamptz NOT NULL
);

CREATE TABLE supporter_private.protected_audit_events (
  audit_event_id uuid PRIMARY KEY,
  actor_class text NOT NULL,
  actor_reference text NOT NULL,
  event_type text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  event_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL
);

-- One-call, transaction-bound activation function suitable for a serverless
-- HTTP database query. The migration owner should retain ownership; the runtime
-- role should receive EXECUTE only after a separate role/grant migration.
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
  SELECT *
    INTO v_challenge
    FROM supporter_private.verification_challenges
   WHERE token_hash = p_token_hash
   FOR UPDATE;

  IF NOT FOUND
     OR v_challenge.purpose <> 'activate_supporter'
     OR v_challenge.revoked_at IS NOT NULL
     OR v_challenge.expires_at <= p_now THEN
    RAISE EXCEPTION 'verification challenge is invalid or expired'
      USING ERRCODE = 'P0001';
  END IF;

  SELECT *
    INTO v_supporter
    FROM supporter_private.supporters
   WHERE supporter_id = v_challenge.supporter_id
   FOR UPDATE;

  SELECT *
    INTO v_signature
    FROM supporter_private.promise_signatures
   WHERE signature_id = v_challenge.signature_id
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

  UPDATE supporter_private.verification_challenges
     SET consumed_at = p_now
   WHERE verification_id = v_challenge.verification_id;

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

  UPDATE supporter_private.promise_signatures
     SET status = 'verified',
         verified_at = p_now,
         updated_at = p_now,
         revision = revision + 1
   WHERE signature_id = v_signature.signature_id;

  UPDATE supporter_private.supporters
     SET status = 'active',
         updated_at = p_now,
         revision = revision + 1
   WHERE supporter_id = v_supporter.supporter_id;

  UPDATE supporter_private.movement_counters
     SET counter_value = counter_value + 1,
         updated_at = p_now
   WHERE counter_name = 'founding_supporter'
     AND counter_value < 1000
  RETURNING counter_value INTO v_founding_number;

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
        SELECT jsonb_agg(signature.promise_version_id ORDER BY signature.created_at)
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
    ON CONFLICT (supporter_id) DO UPDATE
      SET founding_number = EXCLUDED.founding_number,
          display_name = EXCLUDED.display_name,
          profile_slug = EXCLUDED.profile_slug,
          broad_region = EXCLUDED.broad_region,
          why_i_signed = EXCLUDED.why_i_signed,
          signed_promise_versions = EXCLUDED.signed_promise_versions,
          refreshed_at = EXCLUDED.refreshed_at;
  ELSE
    DELETE FROM supporter_public.supporter_profiles
     WHERE supporter_id = v_supporter.supporter_id;
  END IF;

  RETURN QUERY
  SELECT
    v_supporter.supporter_id,
    v_signature.signature_id,
    v_founding_number::smallint,
    false;
END;
$$;

CREATE INDEX supporter_signatures_by_supporter
  ON supporter_private.promise_signatures (supporter_id, created_at);
CREATE INDEX verification_challenges_expiry
  ON supporter_private.verification_challenges (expires_at)
  WHERE consumed_at IS NULL AND revoked_at IS NULL;
CREATE INDEX audit_events_by_entity
  ON supporter_private.protected_audit_events (entity_type, entity_id, occurred_at);

-- Atomic activation outline (must execute in one transaction):
-- 1. Lock and consume one unexpired verification_challenges row.
-- 2. Lock the pending supporter and pending signature rows.
-- 3. Insert verification_evidence and mark the signature verified.
-- 4. Mark the supporter active.
-- 5. Allocate a founding number without count-then-insert:
--
--    UPDATE supporter_private.movement_counters
--       SET counter_value = counter_value + 1,
--           updated_at = now()
--     WHERE counter_name = 'founding_supporter'
--       AND counter_value < 1000
--     RETURNING counter_value;
--
-- 6. If a number was returned, insert founding_supporter_designations.
-- 7. Upsert or remove the public projection according to active consent.
-- 8. Append a protected audit event.
-- 9. Commit. Any failure rolls back every step.

COMMIT;
