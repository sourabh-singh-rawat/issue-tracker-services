import db from "../services/db.service.js";
import { createSelectQuery } from "../utils/createSelectQuery.utils.js";

const insertOne = function insertOneProject(project) {
  const {
    name = "My Project",
    description,
    id,
    email,
    start_date,
    end_date,
    status,
  } = project;

  return db.query(
    `INSERT INTO projects (name, description, status, owner_uid, owner_email, start_date, end_date)
     VALUES ($1, $2, $3, ($4)::uuid, $5, $6, $7)
     RETURNING *`,
    [name, description, status, id, email, start_date, end_date]
  );
};

const find = function findProjects(options) {
  const { query, colValues } = createSelectQuery(options, "projects");
  return db.query(query, colValues);
};

const findOne = function findOneProject(id) {
  return db.query(
    `SELECT * FROM projects 
     WHERE id = $1`,
    [id]
  );
};

const updateOne = function updateOneProject(id, project) {
  let query = Object.keys(project).reduce((prev, cur, index) => {
    return prev + " " + cur + "=$" + (index + 1) + ",";
  }, "UPDATE projects SET");
  query = query.slice(0, -1);
  query += " WHERE id='" + id + "' RETURNING *";

  return db.query(query, Object.values(project));
};

const deleteOne = function deleteOneProject(id) {
  return db.query(
    `DELETE FROM projects 
     WHERE id=$1 
     RETURNING *`,
    [id]
  );
};

const statusCount = function statusCount(id) {
  return db.query(
    `SELECT issue_status.status, message, COUNT(issues.status) 
    FROM (SELECT * FROM issues WHERE project_id = $1) AS issues 
    RIGHT OUTER JOIN issue_status ON issues.status = issue_status.status
    GROUP BY issue_status.status, message
    ORDER BY issue_status.status`,
    [id]
  );
};

const rowCount = function rowCount() {
  return db.query(`SELECT count(*) FROM projects`);
};

export default {
  insertOne,
  find,
  findOne,
  updateOne,
  deleteOne,
  statusCount,
  rowCount,
};
