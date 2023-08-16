DROP FUNCTION IF EXISTS insert_user_profile;
CREATE OR REPLACE FUNCTION insert_user_profile (
    p_user_id UUID, 
    p_display_name TEXT
  )
  RETURNS TABLE (
    user_id UUID, 
    display_name TEXT,
    description TEXT,
    photo_url TEXT,
    default_workspace_id UUID
  ) 
  LANGUAGE PLPGSQL AS $$
    BEGIN
      RETURN QUERY
        INSERT INTO user_profiles AS up (user_id, display_name) 
        VALUES (p_user_id, p_display_name)
        RETURNING 
          up.user_id, 
          up.display_name, 
          up.description, 
          up.photo_url, 
          up.default_workspace_id;
    END;
  $$;