import User from "../../models/user/user.model.js";
import IssueComment from "../../models/issue-comment/issue-comment.model.js";

/**
 * Create a comment inside an issue
 * @param {*} req
 * @param {*} res
 * @returns Comment that is created.
 */
const create = async (req, res) => {
  const { uid } = req.user;

  try {
    const { id } = (await User.findOne(uid)).rows[0];
    const createdComment = (
      await IssueComment.insertOne({ member_id: id, ...req.body })
    ).rows[0];

    res.send(createdComment);
  } catch (error) {
    res.status(500).send();
  }
};

export default create;
