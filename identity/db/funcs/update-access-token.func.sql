DROP FUNCTION IF EXISTS update_access_token;
CREATE OR REPLACE FUNCTION update_access_token (
    p_user_id UUID,
    p_status TEXT
  ) 
  RETURNS VOID
  LANGUAGE PLPGSQL AS $$
    BEGIN
      UPDATE access_tokens AS at
      SET
        status = p_status,
        update_at = NOW()
      WHERE
        at.user_id = p_user_id;
    END;
  $$;