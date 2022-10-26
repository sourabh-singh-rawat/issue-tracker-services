import db from "../../services/db.service.js";

const insertOne = (projectId, userId) => {
  return db.query(
    `INSERT INTO project_members (project_id, user_id, role)
     VALUES ($1::uuid, $2::uuid, $3)
     RETURNING *`,
    [projectId, userId, 0]
  );
};

const findByProjectId = (projectId) => {
  return db.query(
    `SELECT user_id, email, photo_url, name, role, project_members.creation_date
     FROM project_members 
     JOIN users ON project_members.user_id = users.id 
     WHERE project_id = $1`,
    [projectId]
  );
};

const findPeopleRelatedToUid = (id) => {
  return db.query(
    `SELECT DISTINCT user_id, email, "name", photo_url
     FROM project_members 
     INNER JOIN users ON project_members.user_id = users.id 
     WHERE project_id IN (
         SELECT project_id FROM project_members 
         WHERE user_id = $1
      )`,
    [id]
  );
};

export default { insertOne, findByProjectId, findPeopleRelatedToUid };
