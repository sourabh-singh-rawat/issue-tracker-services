DROP FUNCTION IF EXISTS user_exists_by_email;
CREATE OR REPLACE FUNCTION user_exists_by_email (
  p_email TEXT
)
RETURNS BOOLEAN
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN 
      EXISTS (
        SELECT u.id 
        FROM users AS u
        WHERE u.email = p_email
        LIMIT 1
      );
  END; 
$$;