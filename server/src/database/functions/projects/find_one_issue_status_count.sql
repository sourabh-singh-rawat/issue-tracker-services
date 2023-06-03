-- Find project issues status counts
CREATE OR REPLACE FUNCTION find_one_issue_status_count (
  projectId UUID, 
  memberUserId UUID
)
RETURNS TABLE (
  id UUID,
  name VARCHAR(32),
  description VARCHAR(255),
  count INT,
  weeklyCount INT
)
LANGUAGE PLPGSQL 
AS $$
BEGIN
RETURN QUERY
  SELECT
  issue_status_types.id, 
  issue_status_types.name, 
  issue_status_types.description, 
  CAST(COUNT(issues.status)  AS INTEGER) as "count",
  (
    SELECT CAST(COUNT(*) AS INTEGER) FROM issues 
    WHERE project_id = projectId AND memberUserId IN (
      SELECT member_user_id
      FROM project_members
      WHERE project_id = projectId
    )
    AND status = issue_status_types.id
    AND created_at BETWEEN (NOW() - INTERVAL '1 WEEK') AND NOW()
  ) as "weeklyCount"
FROM
  (
    SELECT * FROM issues 
    WHERE project_id = projectId AND memberUserId IN (
      SELECT member_user_id
      FROM project_members
      WHERE project_id = projectId
    )
  ) as issues
RIGHT OUTER JOIN issue_status_types ON issue_status_types.id = issues.status
GROUP BY issue_status_types.id
ORDER BY issue_status_types.rank_order;
END;
$$;