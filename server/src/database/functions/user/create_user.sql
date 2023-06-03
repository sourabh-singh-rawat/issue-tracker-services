CREATE OR REPLACE FUNCTION insert_user(
  name VARCHAR(255),
  email VARCHAR(255),
  uid VARCHAR(255)
)

RETURNS TABLE (
  id UUID
)

LANGUAGE PLPGSQL

AS $$
BEGIN
  RETURN QUERY
  INSERT INTO users (name, email, uid) VALUES (name, email, uid) RETURNING users.id;
END;
$$;