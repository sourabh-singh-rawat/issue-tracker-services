CREATE OR REPLACE FUNCTION update_user(
  username VARCHAR(255),
  useremail VARCHAR(255),
  newphotourl VARCHAR(255),
  userid UUID
)

RETURNS TABLE (
  id UUID
)

LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  UPDATE users SET name=username, email=useremail, photo_url=newphotourl 
  WHERE users.id = userid
  RETURNING users.id;
END;
$$;