DROP FUNCTION IF EXISTS find_issue_by_id;

CREATE OR REPLACE FUNCTION find_issue_by_id (
  p_id UUID
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
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
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
    i.updated_at AS "updatedAt",
    i.deleted_at AS "deletedAt"
  FROM issues AS i
  INNER JOIN users AS u ON u.id = i.reporter_id
  INNER JOIN projects AS p ON p.id = i.project_id
  WHERE
  i.id = p_id;
END;
$$;
