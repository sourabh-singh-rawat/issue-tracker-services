/* eslint-disable import/extensions */
import db from '../../config/db.config.js';

const insertOne = ({ issueId, assigneeId }) => {
  // eslint-disable-next-line no-param-reassign
  if (assigneeId === 'Unassigned') assigneeId = null;

  return db.query(
    `
    INSERT INTO 
      issue_assignee (issue_id, assigneeId) 
    VALUES
      ($1, $2)
    RETURNING
      *`,
    [issueId, assigneeId],
  );
};

export default { insertOne };
