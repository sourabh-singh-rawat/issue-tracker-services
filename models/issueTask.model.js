import db from "../services/db.service.js";

const insertOne = function InsertOneIssueTask({
  issueId,
  dueDate,
  description,
  completed,
}) {
  return db.query(
    `INSERT INTO issue_tasks (issue_id, due_date, description, completed) VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [issueId, dueDate, description, completed]
  );
};

const findOne = function findOneIssueTask(taskId) {
  return db.query(
    `SELECT * FROM issue_tasks
     WHERE id=$1::uuid`,
    [taskId]
  );
};

const find = function findIssueTasks(id) {
  return db.query(
    `SELECT * FROM issue_tasks
     WHERE issue_id = $1::uuid`,
    [id]
  );
};

const updateOne = ({ taskId, description }) => {
  return db.query(
    `UPDATE issue_tasks 
     SET description=$1 
     WHERE id=$2::uuid
     RETURNING *`,
    [description, taskId]
  );
};

const deleteOne = (taskId) => {
  return db.query(
    `DELETE FROM issue_tasks 
     WHERE id=$1::uuid
     RETURNING *`,
    [taskId]
  );
};

export default { insertOne, find, findOne, updateOne, deleteOne };
