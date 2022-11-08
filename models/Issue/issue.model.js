import db from "../../services/db.service.js";
import { selectIssuesQuery } from "./utils/select-issues-query.utils.js";

const insertOne = ({
  name,
  description,
  status,
  priority,
  reporter_id,
  due_date,
  project_id,
  assignee_id,
}) => {
  return db.query(
    `INSERT INTO issues (name, description, status, priority, reporter_id, due_date, project_id, assignee_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      name,
      description,
      status,
      priority,
      reporter_id,
      due_date,
      project_id,
      assignee_id,
    ]
  );
};

const find = async (options) => {
  const { query, colValues } = selectIssuesQuery(options);
  return db.query(query, colValues);
};

const findOne = (id) => {
  return db.query(
    `SELECT 
     issues.id, issues.name, issues.description, issues.status,
     issues.priority, issues.id,
     issues.due_date, issues.project_id, issues.creation_date,
     issues.assignee_id,
     p.name as "project_name",
     p.owner_id as "owner_id"
     FROM issues JOIN projects AS p ON issues.project_id = p.id
     WHERE issues.id = $1`,
    [id]
  );
};

const updateOne = (id, document) => {
  if (document.assignee_id === 0) document.assignee_id = null;
  let query = Object.keys(document)
    .reduce(
      (prev, cur, index) => prev + " " + cur + "=$" + (index + 1) + ",",
      "UPDATE issues SET "
    )
    .slice(0, -1);

  query += " WHERE id='" + id + "' RETURNING *";

  return db.query(query, Object.values(document));
};

const deleteOne = (id) => {
  return db.query(`DELETE FROM issues WHERE id=$1 RETURNING *`, [id]);
};

const rowCount = (options) => {
  const { query, colValues } = selectIssuesQuery(options);
  return db.query(query, colValues);
};

export default { insertOne, findOne, find, updateOne, deleteOne, rowCount };
