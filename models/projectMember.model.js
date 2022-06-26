import db from "../config/connect.config.js";

const insertOne = (projectId, projectOwnerUid) => {
  return db.query(
    `INSERT INTO project_members (project_id, user_id, role)
     VALUES ($1, $2, 'admin')`,
    [projectId, projectOwnerUid]
  );
};

const findByProjectId = (projectId) => {
  return db.query(
    `SELECT user_id, project_id, name, email, role
     FROM project_members 
     JOIN users ON project_members.user_id = users.uid 
     WHERE project_id = $1`,
    [projectId]
  );
};

export default { insertOne, findByProjectId };
