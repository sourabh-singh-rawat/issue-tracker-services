DROP FUNCTION IF EXISTS user_exists_by_id;
CREATE OR REPLACE FUNCTION user_exists_by_id (
    p_id UUID
  )
  RETURNS BOOLEAN
  LANGUAGE PLPGSQL AS $$
    BEGIN      
      RETURN
        EXISTS (
          SELECT u.id FROM users AS u
          WHERE u.id = p_id
          LIMIT 1
        );
    END;
  $$