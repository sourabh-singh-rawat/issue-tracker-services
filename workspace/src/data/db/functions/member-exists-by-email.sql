DROP FUNCTION IF EXISTS member_exists_by_email;
CREATE OR REPLACE FUNCTION member_exists_by_email (
  p_email TEXT
)
RETURNS BOOLEAN
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN
      EXISTS (
        SELECT wm.user_id FROM workspace_members AS wm
        JOIN users AS u ON u.id = wm.user_id
        WHERE u.email = p_email
        LIMIT 1
      );
  END;
$$