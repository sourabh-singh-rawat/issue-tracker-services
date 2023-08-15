DROP FUNCTION IF EXISTS update_refresh_token;
CREATE OR REPLACE FUNCTION update_refresh_token (
    p_user_id UUID,
    p_status TEXT
  ) 
  RETURNS VOID
  LANGUAGE PLPGSQL AS $$
    BEGIN
      UPDATE refresh_tokens AS rt
      SET
        status = p_status,
        update_at = NOW()
      WHERE
        rt.user_id = p_user_id;
    END;
  $$;