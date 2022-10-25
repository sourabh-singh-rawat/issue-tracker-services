import db from "../../services/db.service.js";

const insertOne = (document) => {
  const { user_id, team_id, role } = document;

  return db.query(
    `INSERT INTO team_members (user_id, team_id, role)
     VALUES ($1, $2, $3)
     RETURNING *
    `,
    [user_id, team_id, role]
  );
};

const find = (id) => {
  return db.query(`SELECT * FROM team_members WHERE team_id = $1`, [id]);
};

export default { insertOne, find };
