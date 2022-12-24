/* eslint-disable import/extensions */
import User from '../../models/user/user.model.js';
import IssueComment from '../../models/issue-comment/issue-comment.model.js';

/**
 * Create a comment inside an issue
 * @param {*} req
 * @param {*} res
 * @returns Comment that is created.
 */
const create = async (req, res) => {
  const { uid } = req.user;
  const { id: issueId } = req.params;

  try {
    const { id } = await User.findOne(uid);
    const createdComment = (
      await IssueComment.insertOne({
        issueId,
        memberId: id,
        ...req.body,
      })
    ).rows[0];

    res.send(createdComment);
  } catch (error) {
    res.status(500).send();
  }
};

export default create;
