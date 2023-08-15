DROP FUNCTION IF EXISTS update_user_profile;
CREATE OR REPLACE FUNCTION update_user_profile (
    p_user_id UUID,
    p_dispaly_name TEXT,
    p_description TEXT,
    p_photo_url TEXT,
    p_default_workspace_id UUID
  )
  RETURNS TABLE (
    user_id UUID,
    display_name TEXT,
    description TEXT,
    photo_url TEXT,
    default_workspace_id UUID
  )
  LANGUAGE PLPGSQL AS $$
    DECLARE o_row user_profiles%ROWTYPE;
    BEGIN
      SELECT * INTO o_row FROM user_profiles AS up WHERE up.user_id = p_user_id;
        
      RETURN QUERY
      UPDATE user_profiles AS up
      SET
        display_name = COALESCE(p_dispaly_name, o_row.display_name),
        description = COALESCE(p_description. o_row.description),
        photo_url = COALESCE(p_photo_url, o_row.photo_url),
        default_workspace_id = COALESCE(p_default_workspace_id, o_row.default_workspace_id)
      WHERE up.user_id = p_user_id
      RETURNING
        up.user_id,
        up.display_name,
        up.description,
        up.photo_url,
        up.default_workspace_id;
    END;
  $$
