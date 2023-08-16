DROP FUNCTION IF EXISTS update_user;
CREATE OR REPLACE FUNCTION update_user (
    p_id UUID,
    p_email TEXT, 
    p_password TEXT, 
    p_is_email_verified BOOLEAN
  )
  RETURNS TABLE (
    id UUID,
    email TEXT,
    is_email_verified BOOLEAN
  )
  LANGUAGE PLPGSQL AS $$
    DECLARE o_row users%ROWTYPE;
    BEGIN
      SELECT * INTO o_row FROM users AS u WHERE u.id = p_id; 

      RETURN QUERY
        UPDATE users AS u 
        SET 
          email = COALESCE(p_email, o_row.email),
          password = COALESCE(p_password, o_row.password),
          is_email_verified = COALESCE(p_is_email_verified, o_row.is_email_verified),
          updated_at = NOW()
        WHERE u.id = p_id
        RETURNING
          u.id,
          u.email,
          u.is_email_verified;
    END;
  $$;