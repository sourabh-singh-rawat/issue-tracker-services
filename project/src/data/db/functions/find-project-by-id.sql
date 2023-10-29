DROP FUNCTION IF EXISTS find_project_by_id;
CREATE OR REPLACE FUNCTION find_project_by_id (
  p_id UUID
)
RETURNS TABLE (LIKE projects)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY
      SELECT *
      FROM projects AS p
      WHERE p.id = p_id
      LIMIT 1;
  END;
$$