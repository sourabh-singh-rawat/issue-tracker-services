-- Find issue status types 
CREATE OR REPLACE FUNCTION find_issue_status_types ()
  RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    color VARCHAR(32),
    rank_order INTEGER,
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
  )
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    ist.id,
    ist.name,
    ist.color,
    ist.rank_order,
    ist.description,
    ist.created_at,
    ist.updated_at,
    ist.deleted_at
  FROM
    issue_status_types AS ist;
END;
$$;
