DROP FUNCTION IF EXISTS find_access_token_by_id;
CREATE OR REPLACE FUNCTION find_access_token_by_id(
  p_id UUID
)
RETURNS TABLE (
  id UUID,
  "tokenValue" TEXT
)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY (
      SELECT at.id, at.token_value
      FROM access_tokens AS at
      WHERE at.id = p_id
    );
  END;
$$