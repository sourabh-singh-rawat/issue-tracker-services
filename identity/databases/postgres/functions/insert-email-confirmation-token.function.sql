-- Inserts the email confimration token generated into a table
-- This will be used to regenerate token again if the there was some problem
DROP FUNCTION IF EXISTS insert_email_confirmation_token();
CREATE OR REPLACE FUNCTION insert_email_confirmation_token (
    p_sender_user_id UUID,
    p_receiver_email TEXT,
    p_token_value TEXT,
    p_status TEXT,
    p_expiration_at TIMESTAMP WITH TIME ZONE
  )
  RETURNS VOID
  LANGUAGE PLPGSQL AS 
  $$
    BEGIN
      INSERT INTO email_confirmation_tokens (
        sender_user_id,
        receiver_email,
        token_value,
        status,
        expiration_at
      )
      VALUES (
        p_sender_user_id,
        p_receiver_email,
        p_token_value,
        p_status,
        p_expiration_at
      );
    END;
  $$;
  