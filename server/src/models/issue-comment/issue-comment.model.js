import db from "../../config/db.config.js";
import ProjectMember from "../../models/project-member/project-member.model.js";

const insertOne = async ({ description, memberId, issue_id }) => {
  try {
    const projectMemberId = await ProjectMember.findOne({ memberId });

    const created_comment = await db.query(
      `
      INSERT INTO 
        issue_comments (description, member_id, issue_id) 
      VALUES
        ($1, $2, $3)
      RETURNING *
      `,
      [description, projectMemberId, issue_id]
    );

    return created_comment;
  } catch (error) {
    return error;
  }
};

const find = ({ issue_id }) => {
  return db.query(
    `
    SELECT
      issue_comments.id, issue_comments.description, issue_comments.created_at, 
      users.name, users.photo_url
    FROM
      issue_comments
    JOIN 
      project_members ON project_members.id = issue_comments.member_id
    JOIN
      users ON users.id = project_members.member_id
    WHERE issue_id=$1
    ORDER BY issue_comments.created_at DESC
    `,
    [issue_id]
  );
};

const rowCount = (issueId) => {
  return db.query(
    `
    SELECT 
      COUNT(id) 
    FROM 
      issue_comments 
    WHERE 
      issue_id=$1`,
    [issueId]
  );
};

const updateOne = ({ commentId, description }) => {
  return db.query(
    `
    UPDATE 
      issue_comments 
    SET 
      description=$1 
    WHERE 
      id=$2::uuid
    RETURNING *`,
    [description, commentId]
  );
};

const deleteOne = (commentId) => {
  return db.query(
    `DELETE FROM 
      issue_comments 
    WHERE 
      id=$1::uuid
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
