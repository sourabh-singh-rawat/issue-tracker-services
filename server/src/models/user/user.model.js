/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/extensions */
import db from '../../config/db.config.js';

const insertOne = (name, email, uid) =>
  db.query(
    `INSERT INTO 
      users (name, email, uid) 
     VALUES 
      ($1, $2, $3)
     RETURNING *`,
    [name, email, uid],
  );

const findOne = async (uid) =>
  (
    await db.query(
      `
    SELECT 
      * 
    FROM 
      users 
    WHERE 
      uid=$1`,
      [uid],
    )
  ).rows[0];

const findOneByEmail = (email) =>
  db.query(
    `
    SELECT 
      * 
    FROM 
      users 
    WHERE 
      email ILIKE $1`,
    [email],
  );

const updateOne = ({ id, document }) => {
  let query = Object.keys(document)
    .reduce(
      (prev, cur, index) => `${prev} ${cur}=$${index + 1},`,
      'UPDATE users SET',
    )
    .slice(0, -1); // removing last ,

  query += ` WHERE id='${id}' RETURNING *`;

  return db.query(query, Object.values(document));
};

const deleteOne = (uid) =>
  db.query(
    `
    DELETE FROM
      users 
    WHERE 
      uid = $1
    RETURNING *`,
    [uid],
  );

export default {
  insertOne,
  findOne,
  findOneByEmail,
  updateOne,
  deleteOne,
};
