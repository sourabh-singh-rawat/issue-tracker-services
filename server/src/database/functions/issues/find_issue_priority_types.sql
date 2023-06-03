CREATE OR REPLACE FUNCTION find_issue_priority_types()
RETURNS TABLE (
  id UUID,
  rank_order INTEGER,
  name VARCHAR(32),
  description VARCHAR(3000),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM issue_priority_types;
END;
$$;