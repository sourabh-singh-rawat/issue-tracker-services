import db from "../services/db.service.js";

const insertOne = ({ description, user_id, issue_id }) => {
  return db.query(
    `INSERT INTO issue_comments (description, user_id, issue_id) 
     VALUES ($1, $2::uuid, $3::uuid)
     RETURNING *`,
    [description, user_id, issue_id]
  );
};

const find = (issueId) => {
  return db.query(
    `SELECT issue_comments.id, name, issue_id, description, photo_url, user_id, issue_comments.creation_date 
     FROM issue_comments INNER JOIN users
     ON issue_comments.user_id = users.id
     WHERE issue_id=$1
     ORDER BY issue_comments.creation_date DESC`,
    [issueId]
  );
};

const rowCount = (issueId) => {
  return db.query(`SELECT COUNT(id) FROM issue_comments WHERE issue_id=$1`, [
    issueId,
  ]);
};

const updateOne = ({ commentId, description }) => {
  return db.query(
    `UPDATE issue_comments SET description=$1 WHERE id=$2::uuid
     RETURNING *`,
    [description, commentId]
  );
};

const deleteOne = (commentId) => {
  return db.query(
    `DELETE FROM issue_comments WHERE id=$1::uuid
     RETURNING *`,
    [commentId]
  );
};

export default {
  insertOne,
  find,
  rowCount,
  updateOne,
  deleteOne,
};
