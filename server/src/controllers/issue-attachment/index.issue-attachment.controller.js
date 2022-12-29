/* eslint-disable import/extensions */
import IssueAttachment from '../../models/issue-attachment/issue-attachment.model.js';

/**
 * Lists all attachments for a given issue
 * @param {*} req
 * @param {*} res
 */
const index = async (req, res) => {
  const { id } = req.params;

  try {
    const attachments = await IssueAttachment.find(id);

    res.send({ rows: attachments, rowCount: attachments.length });
  } catch (error) {
    res.status(500).send();
  }
};

export default index;
