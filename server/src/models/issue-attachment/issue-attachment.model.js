/* eslint-disable import/extensions */
import db from '../../config/db.config.js';

const insertOne = ({
  bucket,
  contentType,
  fullPath,
  name,
  issueId,
  size,
  url,
}) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  db.query(
    `
    INSERT INTO
      issue_attachments (bucket, content_type, full_path, name, issue_id, size, url)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `,
    [bucket, contentType, fullPath, name, issueId, size, url],
  );

// finds all attachments
const find = (issueId) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  db.query(
    `
    SELECT
      * 
    FROM 
      issue_attachments
    WHERE 
      issue_id=$1`,
    [issueId],
  );

export default { insertOne, find };
