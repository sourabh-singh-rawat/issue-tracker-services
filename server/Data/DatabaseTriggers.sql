-- Trigger to insert project owners as project member and also create 'CREATED' activity when creating project
CREATE OR REPLACE FUNCTION add_project_member_and_activity() 
RETURNS TRIGGER 
LANGUAGE PLPGSQL 
AS $$
BEGIN
  INSERT INTO project_members(project_id, member_user_id, member_role)
  VALUES(NEW.id, NEW.owner_id, (SELECT id FROM project_member_roles WHERE name = 'admin'));

  INSERT INTO project_activities (project_activity_type_id, project_id, member_id)
  VALUES (
    (SELECT id FROM project_activity_types WHERE name = 'CREATED'), 
    NEW.id, 
    (SELECT id FROM project_members WHERE project_id = NEW.id)
  );
  RETURN NEW;
END;
$$;
CREATE OR REPLACE TRIGGER tg_projects_add_member_after_insert 
AFTER INSERT ON projects
FOR EACH ROW EXECUTE PROCEDURE add_project_member_and_activity();