DROP FUNCTION IF EXISTS find_workspace_members_by_workspace_id;
CREATE OR REPLACE FUNCTION find_workspace_members_by_workspace_id (
  p_project_id UUID,
  p_workspace_id UUID
)
RETURNS TABLE (
  id UUID,
  email TEXT,
  display_name TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  workspace_id UUID,
  invite_status TEXT
)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY
      SELECT  
        u.id,
        u.email,
        u.display_name,
        u.photo_url,
        wm.created_at,
        wm.workspace_id,
        pm.invite_status
      FROM workspace_members AS wm
      LEFT JOIN project_members AS pm ON pm.user_id = wm.user_id AND pm.project_id = p_project_id
      JOIN users AS u ON u.id = wm.user_id
      WHERE wm.workspace_id = p_workspace_id;
  END;
$$
