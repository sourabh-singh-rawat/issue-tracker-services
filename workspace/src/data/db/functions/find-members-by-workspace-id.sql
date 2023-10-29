DROP FUNCTION IF EXISTS find_members_by_workspace_id;
CREATE OR REPLACE FUNCTION find_members_by_workspace_id (
  p_workspace_id UUID
)
RETURNS TABLE (LIKE users)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY
      SELECT u.*
      FROM workspace_members AS wm
      JOIN users AS u ON u.id = wm.user_id
      WHERE wm.workspace_id = p_workspace_id;
  END;
$$