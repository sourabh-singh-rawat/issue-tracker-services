import db from "../../services/db.service.js";

const insertOne = (name, email, uid) => {
  return db.query(
    `INSERT INTO users (name, email, uid) 
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, uid]
  );
};

const findOne = (uid) => {
  return db.query(`SELECT * FROM users WHERE uid=$1`, [uid]);
};

const findOneByEmail = (email) => {
  return db.query(`SELECT * FROM users WHERE email ILIKE $1`, [email]);
};

const updateOne = ({ id, document }) => {
  let query = Object.keys(document)
    .reduce((prev, cur, index) => {
      return prev + " " + cur + "=$" + (index + 1) + ",";
    }, "UPDATE users SET")
    .slice(0, -1); // removing last ,

  query += " WHERE id='" + id + "' RETURNING *";

  return db.query(query, Object.values(document));
};

const deleteOne = (uid) => {
  return db.query(`DELETE FROM users WHERE uid = $1 RETURNING *`, [uid]);
};

export default {
  insertOne,
  findOne,
  findOneByEmail,
  updateOne,
  deleteOne,
};
