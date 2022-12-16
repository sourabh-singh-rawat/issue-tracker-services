import User from "../../models/user/user.model.js";
import Issue from "../../models/issue/issue.model.js";
import ProjectMember from "../../models/project-member/project-member.model.js";

/**
 * Lists all the issues of project
 * @param {*} req
 * @param {*} res
 * @returns List of issues that are created along with their row count.
 */
const index = async (req, res) => {
  const { uid } = req.user;
  const { status, priority, assigned_to, projectId, limit, page, sort_by } =
    req.query;

  const filterOptions = {
    status,
    priority,
    assigned_to,
    ["issues.project_id"]: projectId,
  };

  const pagingOptions = {
    limit: parseInt(limit),
    offset: parseInt(limit) * parseInt(page),
  };

  const sortOptions = {};
  if (sort_by) {
    const [field, order] = sort_by.split(":");
    sortOptions.field = field;
    sortOptions.order = order;
  }

  try {
    const { id } = (await User.findOne(uid)).rows[0];
    const member = (await ProjectMember.findOne({ member_id: id })).rows[0];

    const issues = (
      await Issue.find({
        reporter_id: member.member_id,
        filterOptions,
        pagingOptions,
        sortOptions,
      })
    ).rows;

    const rowCount = (
      await Issue.rowCount({
        reporter_id: member.member_id,
        filterOptions,
        pagingOptions: {},
        sortOptions: {},
      })
    ).rowCount;

    res.send({ rows: issues, rowCount: rowCount });
  } catch (error) {
    res.status(500).send();
  }
};

export default index;
