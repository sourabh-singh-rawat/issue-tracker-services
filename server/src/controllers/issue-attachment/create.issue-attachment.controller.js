/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import IssueAttachment from '../../models/issue-attachment/issue-attachment.model.js';

/**
 * Creates a new attachment entry
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const { id } = req.params;
  const { bucket, fullPath, name, size, contentType, url } = req.body;

  try {
    const createdAttachment = (
      await IssueAttachment.insertOne({
        issueId: id,
        url,
        name,
        size,
        bucket,
        fullPath,
        contentType,
      })
    ).rows[0];

    res.send(createdAttachment);
  } catch (error) {
    res.status(500).send();
  }
};

export default create;
