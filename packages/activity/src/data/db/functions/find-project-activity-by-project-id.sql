DROP FUNCTION IF EXISTS find_project_activity_by_project_id;
CREATE OR REPLACE FUNCTION find_project_activity_by_project_id (
  p_id UUID
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  display_name TEXT,
  project_id UUID,
  "action" TEXT,
  "timestamp" TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE PLPGSQL AS $$
  BEGIN      
    RETURN QUERY 
      SELECT 
        pa.id, 
        pa.user_id,
        u.display_name,
        pa.project_id, 
        pa.action,
        pa.timestamp, 
        pa.created_at, 
        pa.updated_at, 
        pa.deleted_at
      FROM project_activities AS pa
      JOIN users AS u ON pa.user_id = u.id
      WHERE pa.project_id = p_id
      ORDER BY pa.updated_at DESC;
  END;
$$