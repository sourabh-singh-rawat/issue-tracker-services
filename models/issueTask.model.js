import db from "../services/db.service.js";

const insertOne = ({ issueId, dueDate, description, completed }) => {
  return db.query(
    `INSERT INTO issue_tasks (issue_id, due_date, description, completed) VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [issueId, dueDate, description, completed]
  );
};

const findOne = (taskId) => {
  return db.query(
    `SELECT * FROM issue_tasks
     WHERE id=$1::uuid`,
    [taskId]
  );
};

const find = (id) => {
  return db.query(
    `SELECT * FROM issue_tasks
     WHERE issue_id = $1::uuid
     ORDER BY creation_date`,
    [id]
  );
};

const updateOne = ({ taskId, updates }) => {
  let query = Object.keys(updates)
    .reduce(
      (prev, cur, index) => prev + " " + cur + "=$" + (index + 1) + ",",
      "UPDATE issue_tasks SET"
    )
    .slice(0, -1);

  query += " WHERE id='" + taskId + "' RETURNING *";

  return db.query(query, Object.values(updates));
};

const deleteOne = ({ taskId }) => {
  return db.query(
    `DELETE FROM issue_tasks 
     WHERE id=$1::uuid
     RETURNING *`,
    [taskId]
  );
};

export default { insertOne, find, findOne, updateOne, deleteOne };