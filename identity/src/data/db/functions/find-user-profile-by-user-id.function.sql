DROP FUNCTION IF EXISTS find_user_profile_by_user_id;
CREATE OR REPLACE FUNCTION find_user_profile_by_user_id (
    p_user_id UUID
  )
  RETURNS TABLE (
    userId UUID, 
    "displayName" TEXT, 
    description TEXT, 
    "photoUrl" TEXT, 
    "defaultWorkspaceId" UUID, 
    "createdAt" TIMESTAMP WITH TIME ZONE,
    email TEXT
  )
  LANGUAGE PLPGSQL AS $$
    BEGIN
      RETURN QUERY
        SELECT
          up.user_id,
          up.display_name,
          up.description,
          up.photo_url,
          up.default_workspace_id,
          up.created_at,
          u.email
        FROM user_profiles AS up
        JOIN users as u
        ON up.user_id = u.id
        WHERE up.user_id = p_user_id;
    END;
  $$;