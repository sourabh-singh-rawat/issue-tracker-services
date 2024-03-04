DROP FUNCTION IF EXISTS find_workspaces_by_user_id;
CREATE OR REPLACE FUNCTION find_workspaces_by_user_id(
  p_user_id UUID
)
RETURNS TABLE (
  id uuid, 
  NAME TEXT, 
  "createdAt" TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY
      SELECT DISTINCT
        w.id, 
        w.name, 
        w.created_at as "createdAt"
      FROM workspaces AS w
      JOIN workspace_members AS wm
      ON w.id = wm.workspace_id
      WHERE w.id IN (
        SELECT wm.workspace_id FROM workspace_members as wm
        WHERE wm.user_id = p_user_id
      );
  END;
$$
