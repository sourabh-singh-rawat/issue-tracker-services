DROP FUNCTION IF EXISTS update_email_confirmation_token;
CREATE OR REPLACE FUNCTION update_email_confirmation_token (
    p_sender_user_id UUID,
    p_status TEXT
  ) 
  RETURNS VOID
  LANGUAGE PLPGSQL AS $$
    BEGIN
      UPDATE email_confirmation_tokens AS ect
      SET
        status = p_status,
        update_at = NOW()
      WHERE
        ect.user_id = p_sender_user_id;
    END;
  $$;