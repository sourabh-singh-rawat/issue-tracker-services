DROP FUNCTION IF EXISTS is_archived;
CREATE OR REPLACE FUNCTION is_archived (
    p_id UUID
  )
  RETURNS BOOLEAN
  LANGUAGE PLPGSQL AS $$
    BEGIN      
      RETURN
        EXISTS (
          SELECT i.id FROM issues AS i
          WHERE i.id = p_id AND deleted_at IS NOT NULL
          LIMIT 1
        );
    END;
  $$