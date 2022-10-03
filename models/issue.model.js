import db from "../services/db.service.js";
import { createSelectQuery } from "../utils/createSelectQuery.utils.js";

const insertOne = function insertOneIssue({
  name,
  description,
  status,
  priority,
  reporter_id,
  assigned_to,
  due_date,
  project_id,
}) {
  return db.query(
    `INSERT INTO issues (name, description, status, priority, reporter_id, assigned_to, due_date, project_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      name,
      description,
      status,
      priority,
      reporter_id,
      assigned_to,
      due_date,
      project_id,
    ]
  );
};

const find = function findIssues(options) {
  const { query, colValues } = createSelectQuery(options, "issues");
  return db.query(query, colValues);
};

const findOne = function findOneIssue(id) {
  return db.query(
    `SELECT 
     issues.id, issues.name, issues.description, issues.status, 
     issues.priority, issues.id, issues.assigned_to, 
     issues.due_date, issues.project_id, issues.creation_date,
     p.name as "project_name",
     p.owner_uid as "owner_uid"
     FROM issues JOIN projects AS p ON issues.project_id = p.id 
     WHERE issues.id = $1`,
    [id]
  );
};

const updateOne = function updateOneIssue(id, document) {
  let query = Object.keys(document)
    .reduce(
      (prev, cur, index) => prev + " " + cur + "=$" + (index + 1) + ",",
      "UPDATE issues SET"
    )
    .slice(0, -1);

  query += " WHERE id='" + id + "' RETURNING *";

  return db.query(query, Object.values(document));
};

const deleteOne = function deleteOneIssue(id) {
  return db.query(`DELETE FROM issues WHERE id=$1 RETURNING *`, [id]);
};

const rowCount = function rowCount(projectId) {
  return db.query(`SELECT count(*) FROM issues WHERE project_id = $1`, [
    projectId,
  ]);
};

export default { insertOne, findOne, find, updateOne, deleteOne, rowCount };
