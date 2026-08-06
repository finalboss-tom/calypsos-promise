-- READ-ONLY SUPPORTER POST-MIGRATION CHECKS
-- Run as the Neon database owner after applying migrations.

SELECT current_database() AS database_name, current_user AS migration_actor;

SELECT schema_name
FROM information_schema.schemata
WHERE schema_name IN ('supporter_private', 'supporter_public')
ORDER BY schema_name;

SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_schema IN ('supporter_private', 'supporter_public')
ORDER BY table_schema, table_name;

SELECT routine_schema, routine_name
FROM information_schema.routines
WHERE routine_schema = 'supporter_private'
ORDER BY routine_name;

SELECT rolname, rolcanlogin
FROM pg_roles
WHERE rolname IN ('supporter_runtime', 'supporter_public_reader', 'supporter_operator')
ORDER BY rolname;

SELECT counter_name, counter_value
FROM supporter_private.movement_counters
ORDER BY counter_name;

SELECT * FROM supporter_public.movement_totals;

-- Expected: no rows before validation or public enrollment.
SELECT count(*) AS private_supporter_count FROM supporter_private.supporters;
SELECT count(*) AS public_supporter_count FROM supporter_public.supporter_profiles;
