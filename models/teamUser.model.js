import db from "../config/connect.config.js";

const insertOne = (document) => {
  const { user_id, team_id, role } = document;

  return db.query(
    `INSERT INTO user_team_map (user_id, team_id, role)
     VALUES ($1, $2, $3)
     RETURNING *
    `,
    [user_id, team_id, role]
  );
};

const find = (id) =>
  db.query(`SELECT * FROM user_team_map WHERE team_id = $1`, [id]);

export default { insertOne, find };
