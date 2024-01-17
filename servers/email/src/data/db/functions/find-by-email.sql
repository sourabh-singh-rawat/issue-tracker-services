DROP FUNCTION IF EXISTS find_by_email;
CREATE OR REPLACE FUNCTION find_by_email (
  p_email UUID
)
RETURNS TABLE (LIKE emails)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY
      SELECT *
      FROM email AS e
      WHERE e.recipient = p_email
      LIMIT 1;
  END;
$$