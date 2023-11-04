DROP FUNCTION IF EXISTS member_exists_by_id;
CREATE OR REPLACE FUNCTION member_exists_by_id (
    p_id UUID
  )
  RETURNS BOOLEAN
  LANGUAGE PLPGSQL AS $$
    BEGIN      
      RETURN
        EXISTS (
          SELECT * FROM project_members AS pm
          WHERE pm.user_id = p_id
          LIMIT 1
        );
    END;
  $$