import db from "../config/connect.config.js";
import { createSelectQuery } from "../utils/createSelectQuery.utils.js";

const insertOne = ({
  name,
  description,
  status,
  priority,
  reporter,
  assigned_to,
  due_date,
  project_id,
  // team_id,
}) => {
  return db.query(
    `INSERT INTO issues (name, description, status, priority, reporter, assigned_to, due_date, project_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      name,
      description,
      status,
      priority,
      reporter,
      assigned_to,
      due_date,
      project_id,
      // team_id,
    ]
  );
};

const find = (options) => {
  const { query, colValues } = createSelectQuery(options, "issues");

  return db.query(query, colValues);
};

const findOne = (id) => {
  return db.query(
    `SELECT 
     i.id, i.name, i.description, i.status, i.priority, i.reporter,i.assigned_to, i.due_date,
     i.project_id, i.creation_date,
     p.name as "project_name",
     p.owner_uid as "owner_uid"
     FROM issues AS i JOIN projects AS p ON i.project_id = p.id 
     WHERE i.id = $1`,
    [id]
  );
};

const updateOne = (id, document) => {
  let query = Object.keys(document)
    .reduce(
      (prev, cur, index) => prev + " " + cur + "=$" + (index + 1) + ",",
      "UPDATE issues SET"
    )
    .slice(0, -1);

  query += " WHERE id='" + id + "' RETURNING *";

  return db.query(query, Object.values(document));
};

const deleteOne = (id) =>
  db.query(`DELETE FROM issues WHERE id=$1 RETURNING *`, [id]);

const rowCount = () => db.query(`SELECT count(*) FROM issues`);

export default { insertOne, findOne, find, updateOne, deleteOne, rowCount };
