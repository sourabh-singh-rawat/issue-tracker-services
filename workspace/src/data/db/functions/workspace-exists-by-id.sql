DROP FUNCTION IF EXISTS workspace_exists_by_id;
CREATE OR REPLACE FUNCTION workspace_exists_by_id (
    p_id UUID
  )
  RETURNS BOOLEAN
  LANGUAGE PLPGSQL AS $$
    BEGIN      
      RETURN
        EXISTS (
          SELECT w.id FROM workspaces AS w
          WHERE w.id = p_id
          LIMIT 1
        );
    END;
  $$