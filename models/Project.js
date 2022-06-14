import db from "../db/connect.js";

const insertOne = (document) => {
  const {
    name,
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

const find = () => db.query(`SELECT * FROM projects`);

const findOne = (id) => db.query(`SELECT * FROM projects WHERE id = $1`, [id]);

const updateOne = (id, document) => {
  let query = Object.keys(document).reduce((prev, cur, index) => {
    return prev + " " + cur + "=$" + (index + 1) + ",";
  }, "UPDATE projects SET");
  query = query.slice(0, -1);
  query += " WHERE id='" + id + "' RETURNING *";

  return db.query(query, Object.values(document));
};

const deleteOne = (id) =>
  db.query("DELETE FROM projects WHERE id = $1 RETURNING *", [id]);

export default { insertOne, find, findOne, updateOne, deleteOne };
