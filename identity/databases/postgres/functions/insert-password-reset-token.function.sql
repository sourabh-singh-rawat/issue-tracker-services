DROP FUNCTION IF EXISTS insert_password_reset_token;
CREATE OR REPLACE FUNCTION insert_password_reset_token (
    p_user_id UUID,
    p_token_value TEXT,
    p_status TEXT,
    p_expiration_at TIMESTAMP WITH TIME ZONE
  )
  RETURNS VOID
  LANGUAGE PLPGSQL AS $$
    BEGIN
      INSERT INTO password_reset_tokens (
        user_id,
        token_value,
        status,
        expiration_at
      )
      VALUES (
        p_user_id,
        p_token_value,
        p_status,
        p_expiration_at
      );
    END;
  $$;