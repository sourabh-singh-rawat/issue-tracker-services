DROP FUNCTION IF EXISTS find_user_by_id;
CREATE OR REPLACE FUNCTION find_user_by_id (
  p_id UUID
)
RETURNS TABLE (
  id UUID,
  "defaultWorkspaceId" UUID,
  "isEmailVerified" BOOLEAN,
  "version" INTEGER,
  "createdAt" TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL AS $$
  BEGIN      
    RETURN QUERY 
      SELECT 
        u.id, 
        u.default_workspace_id,
        u.is_email_verified,
        u.version,
        u.created_at 
      FROM users AS u
      WHERE u.id = p_id
      LIMIT 1;
  END;
$$