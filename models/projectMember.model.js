import db from "../services/db.service.js";

const insertOne = (projectId, userUid) => {
  return db.query(
    `INSERT INTO project_members (project_id, user_id, role)
     VALUES ($1, $2, 'admin')`,
    [projectId, userUid]
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

const findPeopleRelatedToUid = (uid) => {
  return db.query(
    `SELECT DISTINCT user_id 
    FROM project_members 
    WHERE project_id IN (SELECT project_id FROM project_members WHERE user_id = $1)`,
    [uid]
  );
};

export default { insertOne, findByProjectId, findPeopleRelatedToUid };
