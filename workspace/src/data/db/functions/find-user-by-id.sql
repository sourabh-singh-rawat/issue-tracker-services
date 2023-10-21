DROP FUNCTION IF EXISTS find_user_by_id;
CREATE OR REPLACE FUNCTION find_user_by_id (
    p_id UUID
  )
  RETURNS TABLE (
    id UUID,
    email TEXT,
    "displayName" TEXT,
    "defaultWorkspaceId" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    VERSION INTEGER
  )
  LANGUAGE PLPGSQL AS $$
    BEGIN      
      RETURN QUERY 
        SELECT 
          u.id,
          u.email,
          u.display_name,
          u.default_workspace_id,
          u.created_at,
          u.version
        FROM users AS u
        WHERE u.id = p_id
        LIMIT 1;
    END;
  $$