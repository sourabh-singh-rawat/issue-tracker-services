DROP FUNCTION IF EXISTS update_password_reset_token;
CREATE OR REPLACE FUNCTION update_password_reset_token (
    p_user_id UUID,
    p_status TEXT
  ) 
  RETURNS VOID
  LANGUAGE PLPGSQL AS $$
    BEGIN
      UPDATE password_reset_token AS prt
      SET
        status = p_status,
        update_at = NOW()
      WHERE
        prt.user_id = p_user_id;
    END;
  $$;