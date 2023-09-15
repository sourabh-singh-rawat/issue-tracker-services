CREATE OR REPLACE FUNCTION find_user_by_email (
  p_email TEXT
)
RETURNS TABLE (
  id UUID,
  email TEXT,
  "passwordHash" TEXT,
  "passwordSalt" TEXT,
  "isEmailVerified" BOOLEAN
)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY
      SELECT 
        u.id, 
        u.email,
        u.password_hash,
        u.password_salt,
        u.is_email_verified
      FROM users AS u 
      WHERE u.email ILIKE p_email;
  END;
$$;
