/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/extensions */
import db from '../../config/db.config.js';

const insertOne = (document) => {
  const { userId, teamId, role } = document;

  return db.query(
    `
    INSERT INTO 
      team_members (user_id, team_id, role)
    VALUES 
      ($1, $2, $3)
    RETURNING *
    `,
    [userId, teamId, role],
  );
};

const find = (id) =>
  db.query(
    `
  SELECT 
    * 
  FROM 
    team_members 
  WHERE 
    team_id = $1`,
    [id],
  );

export default { insertOne, find };
