CREATE OR REPLACE FUNCTION find_workspace_by_user_id (
  p_userId UUID
)
RETURNS TABLE (
  id UUID,
  "name" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY
      SELECT w.id, w.name, w.created_at as "createdAt" FROM workspaces AS w WHERE owner_user_id = p_userId;
  END;
$$;