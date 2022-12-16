import db from "../../config/db.config.js";

const insertOne = ({
  bucket,
  content_type,
  full_path,
  name,
  issue_id,
  size,
  url,
}) => {
  return db.query(
    `
    INSERT INTO
      issue_attachments (bucket, content_type, full_path, name, issue_id, size, url)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `,
    [bucket, content_type, full_path, name, issue_id, size, url]
  );
};

// finds all attachments
const find = (issueId) => {
  return db.query(
    `
    SELECT
      * 
    FROM 
      issue_attachments
    WHERE 
      issue_id=$1`,
    [issueId]
  );
};

export default { insertOne, find };
