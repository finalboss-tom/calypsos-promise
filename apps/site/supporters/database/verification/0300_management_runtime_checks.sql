-- Run through SET ROLE supporter_runtime_login after migration 0006.
SELECT
  has_function_privilege(
    current_user,
    'supporter_private.start_supporter_management(bytea, bytea, bytea, text, timestamptz, timestamptz, uuid, uuid, uuid)',
    'EXECUTE'
  ) AS can_start_management,
  has_function_privilege(
    current_user,
    'supporter_private.get_supporter_management_state(bytea, timestamptz)',
    'EXECUTE'
  ) AS can_read_management_state,
  has_function_privilege(
    current_user,
    'supporter_private.apply_supporter_management(bytea, timestamptz, integer, text, text, text, text, text, uuid, boolean, uuid)',
    'EXECUTE'
  ) AS can_apply_management,
  has_function_privilege(
    current_user,
    'supporter_private.withdraw_supporter(uuid, timestamptz, uuid)',
    'EXECUTE'
  ) AS can_call_broad_withdrawal,
  has_table_privilege(
    current_user,
    'supporter_private.supporter_contacts',
    'SELECT'
  ) AS can_read_contacts;

-- Expected: true, true, true, false, false.
