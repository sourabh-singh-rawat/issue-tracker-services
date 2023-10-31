DROP FUNCTION IF EXISTS find_members_by_workspace_id;
CREATE OR REPLACE FUNCTION find_members_by_workspace_id (
  p_workspace_id UUID
)
RETURNS TABLE (
  id UUID,
  email TEXT,
  display_name TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  workspace_id UUID,
  is_member BOOLEAN,
  ROLE TEXT
)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY
      SELECT 
        u.id,
        u.email,
        u.display_name,
        u.photo_url,
        u.created_at,
        wm.workspace_id,
        EXISTS(SELECT * FROM project_members AS pm WHERE pm.member_user_id = u.id) AS is_member,
        pm.role
      FROM workspace_members AS wm
      INNER JOIN users AS u ON u.id = wm.user_id
      LEFT JOIN project_members AS pm ON pm.member_user_id = u.id
      WHERE wm.workspace_id = p_workspace_id;
  END;
$$