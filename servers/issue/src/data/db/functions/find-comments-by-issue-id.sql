DROP FUNCTION IF EXISTS find_comments_by_issue_id;
CREATE OR REPLACE FUNCTION find_comments_by_issue_id (
  p_issue_id UUID
)
RETURNS TABLE (
  id UUID,
  description TEXT,
  issue_id UUID,
  user_id UUID,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ic.id,
    ic.description,
    ic.issue_id,
    ic.user_id,
    u.display_name,
    ic.created_at,
    ic.updated_at
  FROM issue_comments AS ic
  JOIN users AS u ON u.id = ic.user_id
  WHERE ic.issue_id = p_issue_id;
END;
$$;