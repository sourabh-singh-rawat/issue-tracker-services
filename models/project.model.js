import db from "../services/db.service.js";
import { selectProjectsQuery } from "../utils/projects/selectProjectsQuery.utils.js";

const insertOne = (project) => {
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
    `INSERT INTO projects (name, description, status, owner_id, owner_email, start_date, end_date)
     VALUES ($1, $2, $3, ($4)::uuid, $5, $6, $7)
     RETURNING *`,
    [name, description, status, id, email, start_date, end_date]
  );
};

const find = (options) => {
  const { query, colValues } = selectProjectsQuery(options);
  return db.query(query, colValues);
};

const findOne = (id) => {
  return db.query(
    `SELECT * FROM projects 
     WHERE id = $1`,
    [id]
  );
};

const updateOne = (id, project) => {
  let query = Object.keys(project).reduce((prev, cur, index) => {
    return prev + " " + cur + "=$" + (index + 1) + ",";
  }, "UPDATE projects SET");
  query = query.slice(0, -1);
  query += " WHERE id='" + id + "' RETURNING *";

  return db.query(query, Object.values(project));
};

const deleteOne = (id) => {
  return db.query(
    `DELETE FROM projects 
     WHERE id=$1 
     RETURNING *`,
    [id]
  );
};

const statusCount = (id) => {
  return db.query(
    `SELECT issue_status.status, message, COUNT(issues.status) 
    FROM (SELECT * FROM issues WHERE project_id = $1) AS issues 
    RIGHT OUTER JOIN issue_status ON issues.status = issue_status.status
    GROUP BY issue_status.status, message
    ORDER BY issue_status.status`,
    [id]
  );
};

const rowCount = (options) => {
  const { query, colValues } = selectProjectsQuery(options, "projects");
  return db.query(query, colValues);
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
