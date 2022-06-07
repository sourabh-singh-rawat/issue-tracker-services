import db from "../db/connect.js";

// CREATE A NEW PROJECT
const createOne = (name, description, uid, email, startDate, endDate) => {
  return db.query(
    `INSERT INTO projects (name, description, owner_uid, owner_email, start_date, end_date)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [name, description, uid, email, startDate, endDate]
  );
};

// GET ALL PROJECTS
const getAll = () => {
  return db.query(`SELECT * FROM projects`);
};

// GET PROJECT BY ID
const getOne = (id) => {
  return db.query(`SELECT * FROM projects WHERE id = $1`, [id]);
};

// UPDATE PROJECT
const updateOne = (id, field, value) => {
  const commands = {
    name: "UPDATE projects SET name = $1 WHERE id = $2",
    status: "UPDATE projects SET status = $1 WHERE id = $2",
    description: "UPDATE projects SET description = $1 WHERE id = $2",
    startDate: "UPDATE projects SET start_date = $1 WHERE id = $2",
    endDate: "UPDATE projects SET end_date = $1 WHERE id = $2",
  };

  return db.query(commands[field], [value, id]);
};

// DELETE PROJECT
const deleteOne = (id) => {
  return db.query("DELETE FROM WHERE id = $1", [id]);
};
export default { createOne, getAll, getOne, updateOne, deleteOne };
