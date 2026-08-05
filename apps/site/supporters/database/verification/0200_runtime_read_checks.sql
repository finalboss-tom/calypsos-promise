-- Run while connected as supporter_runtime_login after 0004.
SELECT
  has_function_privilege(current_user, 'supporter_private.get_published_promise(uuid)', 'EXECUTE')
    AS can_read_published_promise,
  has_function_privilege(current_user, 'supporter_private.get_movement_totals()', 'EXECUTE')
    AS can_read_movement_totals,
  has_function_privilege(current_user, 'supporter_private.list_public_supporters(integer, integer)', 'EXECUTE')
    AS can_list_public_supporters,
  has_function_privilege(current_user, 'supporter_private.withdraw_supporter(uuid, timestamptz, uuid)', 'EXECUTE')
    AS can_withdraw_supporter,
  has_table_privilege(current_user, 'supporter_private.supporters', 'SELECT')
    AS can_read_private_supporters;

-- Expected: true, true, true, false, false.
