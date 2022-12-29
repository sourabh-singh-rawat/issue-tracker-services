/* eslint-disable arrow-body-style */
/* eslint-disable import/extensions */
import db from '../../config/db.config.js';

const insertOne = ({
  filename,
  originalFilename,
  contentType,
  path,
  bucket,
  variant,
  ownerId,
  issueId,
}) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  db.query(
    `
    INSERT INTO
      issue_attachments (filename, original_filename, content_type, path, bucket, variant, owner_id, issue_id)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `,
    [
      filename,
      originalFilename,
      contentType,
      path,
      bucket,
      variant,
      ownerId,
      issueId,
    ],
  );

// finds all attachments
const find = async (issueId) => {
  const issueAttachments = (
    await db.query(
      `
      SELECT
        *
      FROM
        issue_attachments
      WHERE 
        issue_id=$1 AND variant='small'
      LIMIT 10
      `,
      [issueId],
    )
  ).rows;

  return issueAttachments;
};

// find one
const findOne = async (id) => {
  const issueAttachment = (
    await db.query(
      `
      SELECT
        *
      FROM
        issue_attachments
      WHERE
        id=$1
      `,
      [id],
    )
  ).rows[0];

  return issueAttachment;
};

export default { insertOne, find, findOne };
