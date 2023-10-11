CREATE OR REPLACE FUNCTION find_user_by_email (
  p_email TEXT
)
RETURNS TABLE (
  id UUID,
  email TEXT,
  "isEmailVerified" BOOLEAN,
  "defaultWorkspaceId" uuid
)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY
      SELECT 
        u.id, 
        u.email,
        u.is_email_verified,
        u.default_workspace_id
      FROM users AS u 
      WHERE u.email ILIKE p_email;
  END;
$$;
