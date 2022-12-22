/* eslint-disable import/extensions */
import IssueComment from '../../models/issue-comment/issue-comment.model.js';

/**
 * Deletes a comment
 * @param {*} req
 * @param {*} res
 * @returns Comment that is deleted.
 */
const destroy = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = (await IssueComment.deleteOne(commentId)).rows[0];
    if (!deletedComment) res.status(500).send();

    res.send(deletedComment);
  } catch (error) {
    res.status(500).send();
  }
};

export default destroy;
