/* eslint-disable implicit-arrow-linebreak */

import db from '../../db.config.js';

const insertOne = ({ name, teamLeader }) =>
  db.query(
    `INSERT INTO 
      teams (name, teamLeader) 
     VALUES 
      ($1, $2)
     RETURNING 
      *`,
    [name, teamLeader],
  );

const find = () => db.query('SELECT * FROM teams');

const findOne = function findOneTeam(id) {
  return db.query(
    `SELECT * FROM teams
     WHERE id = $1`,
    [id],
  );
};

const updateOne = (id, document) => {
  let query = Object.keys(document)
    .reduce(
      (prev, cur, index) => `${prev} ${cur}=$${index + 1},`,
      'UPDATE teams SET',
    )
    .slice(0, -1);

  query += ` WHERE id='${id}' RETURNING *`;

  return db.query(query, Object.values(document));
};

export default {
  insertOne,
  find,
  findOne,
  updateOne,
};
