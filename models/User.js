import db from "../db/connect.js";

const insertOne = (name, email, uid) => {
  return db.query(
    `INSERT INTO users (name, email, uid) 
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, uid]
  );
};

const find = () => db.query("SELECT * FROM users");

const findOne = (uid) => db.query(`SELECT * FROM users WHERE uid = $1`, [uid]);

const updateOne = (uid, document) => {
  let query = Object.keys(document)
    .reduce((prev, cur, index) => {
      return prev + " " + cur + "=$" + (index + 1) + ",";
    }, "UPDATE users SET")
    .slice(0, -1); // removing last ,

  query += " WHERE uid='" + uid + "' RETURNING *";

  return db.query(query, Object.values(document));
};

const deleteOne = (uid) =>
  db.query(`DELETE FROM users WHERE uid = $1 RETURNING *`, [uid]);

export default { insertOne, find, findOne, updateOne, deleteOne };
