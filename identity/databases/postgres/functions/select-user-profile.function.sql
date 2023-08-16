DROP FUNCTION IF EXISTS select_user_profile;
CREATE OR REPLACE FUNCTION select_user_profile (
    p_user_id UUID
  )
  RETURNS TABLE (
    user_id UUID, 
    display_name TEXT, 
    description TEXT, 
    photo_url TEXT, 
    default_workspace_id UUID, 
    created_at TIMESTAMP WITH TIME ZONE,
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