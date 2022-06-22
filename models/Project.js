import db from "../db/connect.js";
import { createSelectQuery } from "../utils/find.js";

const insertOne = (document) => {
  const {
    name = "My Project",
    description,
    owner_uid,
    owner_email,
    start_date,
    end_date,
    status,
  } = document;
  return db.query(
    `INSERT INTO projects (name, description, status, owner_uid, owner_email, start_date, end_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [name, description, status, owner_uid, owner_email, start_date, end_date]
  );
};

const find = (options) => {
  const { query, colValues } = createSelectQuery(options, "projects");

  return db.query(query, colValues);
};

const findOne = (id) =>
  db.query(
    `SELECT * FROM projects 
     WHERE id = $1`,
    [id]
  );

const updateOne = (id, document) => {
  let query = Object.keys(document).reduce((prev, cur, index) => {
    return prev + " " + cur + "=$" + (index + 1) + ",";
  }, "UPDATE projects SET");
  query = query.slice(0, -1);
  query += " WHERE id='" + id + "' RETURNING *";

  return db.query(query, Object.values(document));
};

const deleteOne = (id) =>
  db.query(
    `DELETE FROM projects 
     WHERE id = $1 
     RETURNING *`,
    [id]
  );

const rowCount = () => db.query(`SELECT count(*) FROM projects`);

export default { insertOne, find, findOne, updateOne, deleteOne, rowCount };
