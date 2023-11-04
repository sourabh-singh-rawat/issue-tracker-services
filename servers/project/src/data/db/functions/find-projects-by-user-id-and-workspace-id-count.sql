DROP FUNCTION IF EXISTS find_projects_by_user_id_and_workspace_id_count;
CREATE OR REPLACE FUNCTION find_projects_by_user_id_and_workspace_id_count (
  p_user_id UUID,
  p_workspace_id UUID
)
RETURNS TABLE (
  count BIGINT
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*) AS count
  FROM projects AS p
  WHERE p.id in (
    SELECT pm.project_id FROM project_members AS pm
    WHERE pm.user_id = p_user_id
  ) AND
  p.workspace_id = p_workspace_id;
END;
$$;