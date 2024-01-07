DROP FUNCTION IF EXISTS find_issues_by_user_id_and_project_id;

CREATE OR REPLACE FUNCTION find_issues_by_user_id_and_project_id (
  p_user_id UUID,
  p_project_id UUID DEFAULT NULL,
  p_sort_by TEXT DEFAULT 'updatedAt',
  p_sort_order TEXT DEFAULT 'desc',
  p_limit INTEGER DEFAULT 10,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  NAME TEXT,
  description TEXT,
  status TEXT,
  priority TEXT,
  resolution BOOLEAN,
  owner_id UUID,
  reporter JSONB,
  assignees JSONB, 
  project_id UUID,
  project_name TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  SELECT
    i.id,
    i.name,
    i.description,
    i.status,
    i.priority,
    i.resolution,
    i.owner_id AS "ownerId",
    jsonb_build_object(
      'id', i.reporter_id, 
      'name', u.display_name,
      'userId', u.id,
      'email', u.email,
      'photoUrl', u.photo_url,
      'createdAt', u.created_at,
      'updatedAt', u.updated_at
    ) AS reporter,
    (
      SELECT jsonb_agg(jsonb_build_object(
        'id', ia.id,
        'name', u.display_name,
        'userId', ia.user_id, 
        'email', u.email,
        'photoUrl', u.photo_url,
        'createdAt', ia.created_at,
        'updatedAt', ia.updated_at
      ))
      FROM issue_assignees AS ia
      JOIN users as u ON u.id = ia.user_id
      WHERE ia.issue_id = i.id
    ) AS assignees,
    i.project_id AS "projectId",
    p.name AS "projectName",
    i.due_date AS "dueDate",
    i.created_at AS "createdAt",
    i.updated_at AS "updatedAt"
  FROM issues AS i
  INNER JOIN users AS u ON u.id = i.reporter_id
  INNER JOIN projects AS p ON p.id = i.project_id
  WHERE
  -- 1. Where the user is owner or an assignee of the issue
  (i.owner_id = p_user_id OR i.id IN (SELECT ia.issue_id FROM issue_assignees AS ia WHERE ia.user_id = p_user_id))
  AND
  -- 2. Also always check is project id is provided (if not provided then assume all issues are required)
  (p_project_id IS NULL OR i.project_id = p_project_id)
  ORDER BY 
    CASE WHEN p_sort_order = 'asc' THEN
      CASE
        WHEN p_sort_by = 'name' THEN i.name
        WHEN p_sort_by = 'description' THEN i.description
        WHEN p_sort_by = 'due_date' THEN i.due_date::TEXT
        WHEN p_sort_by = 'updatedAt' THEN i.updated_at::TEXT
        ELSE i.updated_at::TEXT
      END
    END ASC,
    CASE WHEN p_sort_order = 'desc' THEN
      CASE
        WHEN p_sort_by = 'name' THEN i.name
        WHEN p_sort_by = 'description' THEN i.description
        WHEN p_sort_by = 'due_date' THEN i.due_date::TEXT
        WHEN p_sort_by = 'updatedAt' THEN i.updated_at::TEXT
        ELSE i.updated_at::TEXT
      END
    END DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;
