DROP FUNCTION IF EXISTS member_exists_by_user_id;
CREATE OR REPLACE FUNCTION member_exists_by_user_id(
  p_user_id UUID,
  p_workspace_id UUID
)
RETURNS BOOLEAN
LANGUAGE PLPGSQL AS $$
  BEGIN
    RETURN
      EXISTS (
        SELECT wm.user_id FROM workspace_members AS wm
        JOIN users AS u 
          ON u.id = wm.user_id
        WHERE 
          wm.user_id = p_user_id
          AND 
          wm.workspace_id = p_workspace_id
         
        LIMIT 1
      );
  END;
$$