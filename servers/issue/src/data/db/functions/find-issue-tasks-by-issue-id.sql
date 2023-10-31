DROP FUNCTION IF EXISTS find_issue_tasks_by_issue_id;
CREATE OR REPLACE FUNCTION find_issue_tasks_by_issue_id (
  p_issue_id UUID
)
RETURNS TABLE (LIKE issue_tasks)
LANGUAGE PLPGSQL AS $$
  BEGIN      
    RETURN QUERY 
      SELECT 
        *
      FROM issue_tasks AS it
      WHERE it.issue_id = p_issue_id;
  END;
$$