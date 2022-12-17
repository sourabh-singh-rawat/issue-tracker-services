import db from "../../config/db.config.js";

const findOne = ({ member_id }) => {
  return db.query(
    `
  SELECT 
    *
  FROM
    project_members
  WHERE 
    member_id=$1`,
    [member_id]
  );
};

const insertOne = ({ projectId, memberId, roleId }) => {
  return db.query(
    `
    INSERT INTO 
      project_members (project_id, member_id, member_role)
    VALUES 
      ($1, $2, $3)
    RETURNING *`,
    [projectId, memberId, roleId]
  );
};

const findByProjectId = (projectId) => {
  return db.query(
    `
    SELECT
      users.name, users.email, users.photo_url, project_members.id, member_id, member_role, 
      project_members.created_at, project_member_roles.name as "project_member_role_name"
    FROM 
      project_members 
    JOIN 
      users ON project_members.member_id = users.id 
    JOIN
      project_member_roles ON project_member_roles.id = project_members.member_role
    WHERE 
      project_id=$1`,
    [projectId]
  );
};

const findPeopleRelatedToUid = (id) => {
  return db.query(
    `
    SELECT DISTINCT 
      users.id, users.name, users.email, users.photo_url, project_members.member_id, project_members.member_role, project_members.created_at 
    FROM 
      project_members
    INNER JOIN 
      users ON project_members.member_id = users.id 
    WHERE 
      project_id IN (
        SELECT 
          project_id 
        FROM 
          project_members 
        WHERE
          member_id=$1
      )
    `,
    [id]
  );
};

export default { findOne, insertOne, findByProjectId, findPeopleRelatedToUid };
