DROP FUNCTION IF EXISTS find_assignees_by_issue_id;
CREATE OR REPLACE FUNCTION find_assignees_by_issue_id (
  p_issue_id UUID
)
RETURNS TABLE (
  id UUID,
  "name" TEXT,
  "userId" UUID
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ia.id,
    u.display_name,
    ia.user_id
  FROM issue_assignees AS ia
  JOIN users AS u ON u.id = ia.user_id
  WHERE ia.issue_id = p_issue_id;
END;
$$;