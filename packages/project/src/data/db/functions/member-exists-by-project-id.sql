DROP FUNCTION IF EXISTS member_exists_by_project_id;
CREATE OR REPLACE FUNCTION member_exists_by_project_id (
    p_id UUID,
    p_project_id UUID
  )
  RETURNS BOOLEAN
  LANGUAGE PLPGSQL AS $$
    BEGIN      
      RETURN
        EXISTS (
          SELECT * FROM project_members AS pm
          WHERE pm.user_id = p_id AND pm.project_id = p_project_id
          LIMIT 1
        );
    END;
  $$