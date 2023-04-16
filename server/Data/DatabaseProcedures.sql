-- Gets all projects created by the user or projects where user is a member
CREATE OR REPLACE FUNCTION fn_projects_find (
  userId UUID
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
  LIMIT 10;
END;
$$;

-- Finds all the project members
CREATE OR REPLACE FUNCTION fn_project_members_find(
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

-- Find project
CREATE OR REPLACE FUNCTION fn_find_project (
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

-- Find project issues status counts
CREATE OR REPLACE FUNCTION fn_get_project_issues_status_count (
  projectId UUID, 
  memberUserId UUID
)
RETURNS TABLE (
  id UUID,
  name VARCHAR(32),
  description VARCHAR(255),
  count INT,
  weeklyCount INT
)
LANGUAGE PLPGSQL 
AS $$
BEGIN
RETURN QUERY
  SELECT
  issue_status_types.id, 
  issue_status_types.name, 
  issue_status_types.description, 
  CAST(COUNT(issues.status)  AS INTEGER) as "count",
  (
    SELECT CAST(COUNT(*) AS INTEGER) FROM issues 
    WHERE project_id = projectId AND memberUserId IN (
      SELECT member_user_id
      FROM project_members
      WHERE project_id = projectId
    )
    AND status = issue_status_types.id
    AND created_at BETWEEN (NOW() - INTERVAL '1 WEEK') AND NOW()
  ) as "weeklyCount"
FROM
  (
    SELECT * FROM issues 
    WHERE project_id = projectId AND memberUserId IN (
      SELECT member_user_id
      FROM project_members
      WHERE project_id = projectId
    )
  ) as issues
RIGHT OUTER JOIN issue_status_types ON issue_status_types.id = issues.status
GROUP BY issue_status_types.id
ORDER BY issue_status_types.rank_order;
END;
$$;

-- Find issue status types 
CREATE OR REPLACE FUNCTION fn_issue_status_types ()
  RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    color VARCHAR(32),
    rank_order INTEGER,
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
  )
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    ist.id,
    ist.name,
    ist.color,
    ist.rank_order,
    ist.description,
    ist.created_at,
    ist.updated_at,
    ist.deleted_at
  FROM
    issue_status_types AS ist;
END;
$$;

CREATE OR REPLACE FUNCTION fn_issue_priority_types()
RETURNS TABLE (
  id UUID,
  rank_order INTEGER,
  name VARCHAR(32),
  description VARCHAR(3000),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM issue_priority_types;
END;
$$;