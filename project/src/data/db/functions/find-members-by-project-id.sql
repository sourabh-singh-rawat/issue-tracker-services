DROP FUNCTION IF EXISTS find_members_by_project_id;
CREATE OR REPLACE FUNCTION find_members_by_project_id (
  p_project_id UUID
)
RETURNS TABLE (
  id UUID,
  "name" TEXT,
  email TEXT,
  "memberUserId" UUID,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  SELECT
    pm.id,
    u.display_name,
    u.email,
    pm.member_user_id,
    pm.created_at,
    pm.updated_at
  FROM projects as p
  JOIN project_members as pm ON p.id = pm.project_id
  JOIN users as u ON pm.member_user_id = u.id
  WHERE p.id = p_project_id;
END;
$$;