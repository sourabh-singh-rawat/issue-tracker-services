-- Finds all the project members
CREATE OR REPLACE FUNCTION find_project_members(
  projectId UUID,
  memberUserId UUID
)
RETURNS TABLE (
  name VARCHAR(255),
  email VARCHAR(255),
  photo_url VARCHAR(255),
  id UUID,
  project_id UUID, 
  member_user_id UUID,
  member_role UUID,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.name,
    u.email,
    u.photo_url,
    pm.id, 
    pm.project_id, 
    pm.member_user_id,
    pm.member_role,
    pm.created_at,
    pm.updated_at,
    pm.deleted_at
  FROM project_members AS pm
  JOIN 
    users AS u ON pm.member_user_id = u.id 
  JOIN
    project_member_roles as pmr ON pmr.id = pm.member_role
  WHERE
    pm.project_id = projectId
    AND
    memberUserId IN (
      SELECT pm2.member_user_id
      FROM project_members as pm2
      WHERE project_members.project_id = projectId
    );
END;
$$;