DROP FUNCTION IF EXISTS refresh_token_exists_by_id;
CREATE OR REPLACE FUNCTION refresh_token_exists_by_id (
    p_id UUID
)
RETURNS BOOLEAN
LANGUAGE PLPGSQL AS $$
  BEGIN      
    RETURN
      EXISTS (
        SELECT at.id 
        FROM refresh_tokens AS at
        WHERE at.id = p_id
        LIMIT 1
      );
  END;
$$