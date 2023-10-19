DROP FUNCTION IF EXISTS find_project_by_id;
CREATE OR REPLACE FUNCTION find_project_by_id (
  p_id UUID
)
RETURNS TABLE (
  id UUID,
  description TEXT,
  "workspaceId" UUID,
  "name" TEXT,
  status TEXT,
  "startDate" TIMESTAMP WITH TIME ZONE,
  "endDate" TIMESTAMP WITH TIME ZONE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL AS $$
  BEGIN      
    RETURN QUERY 
      SELECT 
        p.id,
        p.description,
        p.workspace_id,
        p.name,
        p.status,
        p.start_date,
        p.end_date,
        p.created_at,
        p.updated_at
      FROM projects AS p
      WHERE p.id = p_id
      LIMIT 1;
  END;
$$