/* eslint-disable import/extensions */
import User from '../../models/user/user.model.js';
import Issue from '../../models/issue/issue.model.js';
import ProjectMember from '../../models/project-member/project-member.model.js';

/**
 * Lists all the issues of project
 * @param {*} req
 * @param {*} res
 * @returns List of issues that are created along with their row count.
 */
const index = async (req, res) => {
  const { uid } = req.user;
  // eslint-disable-next-line
  const { status, priority, assigneeId, projectId, limit, page, sortBy } =
    req.query;

  const filterOptions = {
    status,
    priority,
    assignee_id: assigneeId,
    'issues.project_id': projectId,
  };

  const pagingOptions = {
    limit: parseInt(limit, 10),
    offset: parseInt(limit, 10) * parseInt(page, 10),
  };

  const sortOptions = {};
  if (sortBy) {
    const [field, order] = sortBy.split(':');
    sortOptions.field = field.replace(/([A-Z])/g, '_$1').toLowerCase();
    sortOptions.order = order;
  }

  try {
    const { id } = await User.findOne(uid);
    const reporterId = await ProjectMember.findOne({ memberId: id });

    const issues = (
      await Issue.find({
        reporterId,
        filterOptions,
        pagingOptions,
        sortOptions,
      })
    ).rows;

    const { rowCount } = await Issue.rowCount({
      reporterId,
      filterOptions,
      pagingOptions: {},
      sortOptions: {},
    });

    res.send({ rows: issues, rowCount });
  } catch (error) {
    res.status(500).send();
  }
};

export default index;
