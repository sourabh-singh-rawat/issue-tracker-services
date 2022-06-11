import db from "../db/connect.js";

const insertOne = async (name, email, uid) => {
  // check it the user already exists in the database
  const result = await findOne(uid);
  if (result.rows[0] === 0)
    return db.query(
      `INSERT INTO users (name, email, uid) VALUES ($1, $2, $3)`,
      [name, email, uid]
    );
};

const findOne = (uid) => {
  return db.query(`SELECT * FROM users WHERE uid = $1`, [uid]);
};

export default { insertOne, findOne };
