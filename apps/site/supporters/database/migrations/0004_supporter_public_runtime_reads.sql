-- SUPPORTER PUBLIC-RUNTIME READ COMMANDS
-- Apply after 0003. These SECURITY DEFINER functions expose only the exact
-- published Promise, aggregate totals, and consented public profile fields.
BEGIN;

-- The web enrollment runtime does not yet expose operator outbox claiming or
-- supporter withdrawal. Keep those capabilities unavailable until their
-- authenticated workflows are implemented and separately reviewed.
REVOKE EXECUTE ON FUNCTION supporter_private.claim_supporter_email(timestamptz, integer)
  FROM supporter_runtime;
REVOKE EXECUTE ON FUNCTION supporter_private.withdraw_supporter(uuid, timestamptz, uuid)
  FROM supporter_runtime;

CREATE OR REPLACE FUNCTION supporter_private.get_published_promise(
  p_promise_version_id uuid
)
RETURNS TABLE (
  promise_version_id uuid,
  version_label text,
  canonical_text text,
  content_hash text,
  published_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private
AS $$
  SELECT version.promise_version_id,
         version.version_label,
         version.canonical_text,
         version.content_hash,
         version.published_at
    FROM supporter_private.promise_versions AS version
   WHERE version.promise_version_id = p_promise_version_id
     AND version.publication_status = 'published';
$$;

CREATE OR REPLACE FUNCTION supporter_private.get_movement_totals()
RETURNS TABLE (
  active_verified_supporters bigint,
  public_supporters bigint,
  active_founding_supporters bigint,
  founding_numbers_assigned integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, supporter_private, supporter_public
AS $$
  SELECT totals.active_verified_supporters,
         totals.public_supporters,
         totals.active_founding_supporters,
         totals.founding_numbers_assigned
    FROM supporter_public.movement_totals AS totals;
$$;

CREATE OR REPLACE FUNCTION supporter_private.list_public_supporters(
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0
)
RETURNS TABLE (
  founding_number smallint,
  display_name text,
  profile_slug text,
  broad_region text,
  why_i_signed text,
  published_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, supporter_public
AS $$
BEGIN
  IF p_limit < 1 OR p_limit > 100 OR p_offset < 0 THEN
    RAISE EXCEPTION 'invalid public supporter page' USING ERRCODE = 'P0001';
  END IF;

  RETURN QUERY
  SELECT profile.founding_number,
         profile.display_name,
         profile.profile_slug,
         profile.broad_region,
         profile.why_i_signed,
         profile.published_at
    FROM supporter_public.supporter_profiles AS profile
   ORDER BY profile.founding_number ASC NULLS LAST,
            profile.published_at ASC,
            profile.supporter_id ASC
   LIMIT p_limit
  OFFSET p_offset;
END;
$$;

REVOKE ALL ON FUNCTION supporter_private.get_published_promise(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION supporter_private.get_movement_totals() FROM PUBLIC;
REVOKE ALL ON FUNCTION supporter_private.list_public_supporters(integer, integer) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION supporter_private.get_published_promise(uuid)
  TO supporter_runtime;
GRANT EXECUTE ON FUNCTION supporter_private.get_movement_totals()
  TO supporter_runtime;
GRANT EXECUTE ON FUNCTION supporter_private.list_public_supporters(integer, integer)
  TO supporter_runtime;

COMMIT;
