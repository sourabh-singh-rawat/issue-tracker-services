import db from "../../services/db.service.js";

const insertOne = ({ issueId, assigneeId }) => {
  if (assigneeId == "Unassigned") assigneeId = null;

  return db.query(
    `
    INSERT INTO 
      issue_assignee (issue_id, assignee_id) 
    VALUES
      ($1, $2)
    RETURNING
      *`,
    [issueId, assigneeId]
  );
};

export default { insertOne };
