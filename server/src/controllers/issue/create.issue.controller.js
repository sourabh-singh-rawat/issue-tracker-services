import User from "../../models/user/user.model.js";
import Issue from "../../models/issue/issue.model.js";
import ProjectMember from "../../models/project-member/project-member.model.js";

/**
 * Creates an issue
 * @param {*} req
 * @param {*} res
 * @returns Issue that is created.
 */
const create = async (req, res) => {
  const { uid } = req.user;
  const body = req.body;

  try {
    const { id } = (await User.findOne(uid)).rows[0];
    const member = (await ProjectMember.findOne({ member_id: id })).rows[0];
    const createdIssue = (
      await Issue.insertOne({ reporter_id: member.id, ...body })
    ).rows[0];

    res.send(createdIssue);
  } catch (error) {
    return res.status(500).send();
  }
};

export default create;
