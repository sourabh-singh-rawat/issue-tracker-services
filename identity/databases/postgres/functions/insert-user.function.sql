DROP FUNCTION IF EXISTS insert_user;
CREATE OR REPLACE FUNCTION insert_user (
    p_email TEXT,
    p_password TEXT
  )
  RETURNS TABLE (  
    id UUID,
    email TEXT,
    is_email_verified BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE
  ) 
  LANGUAGE PLPGSQL AS $$
    BEGIN
      RETURN QUERY
        INSERT INTO users AS u (email, password)
        VALUES (p_email, p_password)
        RETURNING
          u.id,
          u.email,
          u.is_email_verified,
          u.created_at;
    END;
  $$;