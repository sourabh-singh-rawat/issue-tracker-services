/* eslint-disable import/extensions */
import IssueComment from '../../models/issue-comment/issue-comment.model.js';

/**
 * Update a comment
 * @param {*} req
 * @param {*} res
 * @returns Comment that is updated.
 */
const update = async (req, res) => {
  const { commentId } = req.params;
  const { description } = req.body;

  try {
    const updatedComment = (
      await IssueComment.updateOne({ commentId, description })
    ).rows[0];

    if (!updatedComment) {
      res.status(500).send();
    }

    res.send(updatedComment);
  } catch (error) {
    res.status(500).send();
  }
};

export default update;
