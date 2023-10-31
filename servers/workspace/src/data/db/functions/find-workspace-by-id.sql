DROP FUNCTION IF EXISTS find_workspace_by_id;
CREATE OR REPLACE FUNCTION find_workspace_by_id (
  p_id UUID
)
RETURNS TABLE (
  id UUID,
  "name" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY
      SELECT 
        w.id, 
        w.name, 
        w.created_at as "createdAt" 
      FROM workspaces AS w 
      WHERE w.id = p_id;
  END;
$$;