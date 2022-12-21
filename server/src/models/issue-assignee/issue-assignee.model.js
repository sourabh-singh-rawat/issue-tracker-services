import db from "../../config/db.service.js";

const insertOne = ({ issueId, assigneeId }) => {
  if (assigneeId == "Unassigned") assigneeId = null;

  return db.query(
    `
    INSERT INTO 
      issue_assignee (issue_id, assigneeId) 
    VALUES
      ($1, $2)
    RETURNING
      *`,
    [issueId, assigneeId]
  );
};

export default { insertOne };
