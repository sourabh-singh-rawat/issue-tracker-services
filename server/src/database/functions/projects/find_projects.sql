-- Gets all projects created by the user or projects where user is a member
CREATE OR REPLACE FUNCTION find_projects (
  userId UUID,
  maxLimit INTEGER
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
  SELECT
    *
  FROM projects as p
  WHERE p.id in (
    SELECT project_id FROM project_members
    WHERE member_user_id = userId
  )
  ORDER BY created_at DESC
  LIMIT maxLimit;
END;
$$;