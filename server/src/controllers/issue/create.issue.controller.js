import User from "../../models/user/user.model.js";
import Issue from "../../models/issue/issue.model.js";
import ProjectMember from "../../models/project-member/project-member.model.js";
import db from "../../config/db.config.js";
import ProjectActivity from "../../models/project-activity/project-activity.model.js";
import ProjectActivityTypes from "../../models/project-activity-types/project-activity-types.model.js";

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
    db.query("BEGIN");
    const { id: userId } = await User.findOne(uid);
    const reporterId = await ProjectMember.findOne({ memberId: userId });
    const createdIssue = (await Issue.insertOne({ reporterId, ...body }))
      .rows[0];

    // Add created activity to project activity
    const createdIssueActivityTypeId = await ProjectActivityTypes.findOne({
      name: "CREATED_ISSUE",
    });
    await ProjectActivity.insertOne({
      projectId: body.projectId,
      typeId: createdIssueActivityTypeId,
      userId: userId,
    });

    // TODO: Add created activity to issue activity

    db.query("COMMIT");

    res.send(createdIssue);
  } catch (error) {
    db.query("ROLLBACK");
    console.log(error);
    return res.status(500).send();
  }
};

export default create;
