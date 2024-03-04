DROP FUNCTION IF EXISTS find_issue_attachments;
CREATE OR REPLACE FUNCTION find_issue_attachments(
  p_id UUID
)
RETURNS TABLE (LIKE issue_attachments)
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN QUERY (
      SELECT * FROM issue_attachments AS ia
      WHERE issue_id = p_id
    );
  END;
$$