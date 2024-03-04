DROP FUNCTION IF EXISTS find_assignee_by_user_id;
CREATE OR REPLACE FUNCTION find_assignee_by_user_id (
  p_id UUID
)
RETURNS TABLE (LIKE issue_assignees)
LANGUAGE PLPGSQL AS $$
  BEGIN      
    RETURN QUERY 
      SELECT *
      FROM issue_assignees AS ia
      WHERE ia.user_id = p_id
      LIMIT 1;
  END;
$$