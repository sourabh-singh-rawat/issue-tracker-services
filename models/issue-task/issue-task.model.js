import db from "../../configs/db.config.js";
import { selectIssueTasks } from "./utils/select-issue-tasks-query.utils.js";

const insertOne = ({ issueId, dueDate, description, completed }) => {
  return db.query(
    `
    INSERT INTO 
      issue_tasks (issue_id, due_date, description, completed) 
    VALUES 
      ($1, $2, $3, $4)
    RETURNING 
      *`,
    [issueId, dueDate, description, completed]
  );
};

const findOne = (taskId) => {
  return db.query(
    `SELECT 
      * 
    FROM 
      issue_tasks
    WHERE id=$1::uuid`,
    [taskId]
  );
};

const find = ({ id, filterOptions, pagingOptions, sortOptions }) => {
  const { query, colValues } = selectIssueTasks({
    id,
    filterOptions,
    pagingOptions,
    sortOptions,
  });

  return db.query(query, colValues);
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
    `DELETE FROM 
      issue_tasks 
     WHERE 
      id=$1::uuid
     RETURNING *`,
    [taskId]
  );
};

export default { insertOne, find, findOne, updateOne, deleteOne };
