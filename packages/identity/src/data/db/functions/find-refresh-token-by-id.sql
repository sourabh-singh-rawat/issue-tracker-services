DROP FUNCTION IF EXISTS find_refresh_token_by_id;
CREATE OR REPLACE FUNCTION find_refresh_token_by_id(
  p_id UUID
)
RETURNS TABLE (
  id UUID,
  "tokenValue" TEXT
)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY (
      SELECT rt.id, rt.token_value
      FROM refresh_tokens AS rt
      WHERE rt.id = p_id
    );
  END;
$$