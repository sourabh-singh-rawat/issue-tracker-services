DROP FUNCTION IF EXISTS find_members_by_project_id;
CREATE OR REPLACE FUNCTION find_members_by_project_id (
  p_project_id UUID
)
RETURNS TABLE (
  id UUID,
  "name" TEXT,
  email TEXT,
  user_id UUID,
  ROLE TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  SELECT
    pm.id,
    u.display_name,
    u.email,
    pm.user_id,
    pm.role,
    pm.created_at,
    pm.updated_at
  FROM projects as p
  JOIN project_members as pm ON pm.project_id = p.id
  JOIN users as u ON u.id = pm.user_id
  WHERE p.id = p_project_id;
END;
$$;