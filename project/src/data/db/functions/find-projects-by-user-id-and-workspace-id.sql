DROP FUNCTION IF EXISTS find_projects_by_user_id_and_workspace_id;
CREATE OR REPLACE FUNCTION find_projects_by_user_id_and_workspace_id (
  p_user_id UUID,
  p_workspace_id UUID,
  p_sort_by TEXT DEFAULT 'updatedAt',
  p_sort_order TEXT DEFAULT 'desc',
  p_limit INTEGER DEFAULT 10,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  NAME TEXT,
  description TEXT,
  STATUS TEXT,
  "ownerUserId" UUID,
  "workspaceId" UUID,
  "startDate" TIMESTAMP WITH TIME ZONE,
  "endDate" TIMESTAMP WITH TIME ZONE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.description,
    p.status,
    p.owner_user_id,
    p.workspace_id,
    p.start_date,
    p.end_date,
    p.created_at,
    p.updated_at
  FROM projects as p
  WHERE p.id in (
    SELECT pm.project_id FROM project_members AS pm
    WHERE pm.member_user_id = p_user_id
  ) AND
  p.workspace_id = p_workspace_id
  ORDER BY 
    CASE WHEN p_sort_order = 'asc' THEN
      CASE
        WHEN p_sort_by = 'name' THEN p.name
        WHEN p_sort_by = 'description' THEN p.description
        WHEN p_sort_by = 'startDate' THEN p.start_date::TEXT
        WHEN p_sort_by = 'endDate' THEN p.end_date::TEXT
        WHEN p_sort_by = 'updatedAt' THEN p.updated_at::TEXT
        ELSE p.updated_at::TEXT
      END
    END ASC,
    CASE WHEN p_sort_order = 'desc' THEN
      CASE
        WHEN p_sort_by = 'name' THEN p.name
        WHEN p_sort_by = 'description' THEN p.description
        WHEN p_sort_by = 'startDate' THEN p.start_date::TEXT
        WHEN p_sort_by = 'endDate' THEN p.end_date::TEXT
        WHEN p_sort_by = 'updatedAt' THEN p.updated_at::TEXT
        ELSE p.updated_at::TEXT
      END
    END DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;