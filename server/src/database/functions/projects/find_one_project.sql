-- Find project
CREATE OR REPLACE FUNCTION find_one_project (
  projectId UUID, 
  memberUserId UUID 
)
RETURNS TABLE (
  id UUID,
  name VARCHAR(255),
  description VARCHAR(4000),
  status UUID,
  owner_id UUID,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM projects as p
  WHERE 
    p.id = projectId 
    AND 
    memberUserId IN (
      SELECT member_user_id
      FROM project_members pm
      WHERE  pm.project_id = projectId
    );
END;
$$