/* eslint-disable no-console */
/* eslint-disable import/extensions */
import User from '../../models/user/user.model.js';
import Issue from '../../models/issue/issue.model.js';
import toSnakeCase from '../../utils/toSnakeCase.util.js';

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
    'issues.projectId': projectId,
    assigneeId,
  };

  const pagingOptions = {
    limit: parseInt(limit, 10),
    offset: parseInt(limit, 10) * parseInt(page, 10),
  };

  const sortOptions = {};
  if (sortBy) {
    const [field, order] = sortBy.split(':');
    sortOptions.field = toSnakeCase(field);
    sortOptions.order = order;
  }

  try {
    const { id } = await User.findOne(uid);

    const issues = (
      await Issue.find({
        reporterId: id,
        filterOptions,
        pagingOptions,
        sortOptions,
      })
    ).rows;

    const { rowCount } = await Issue.rowCount({
      reporterId: id,
      filterOptions,
      pagingOptions: {},
      sortOptions: {},
    });

    return res.send({ rows: issues, rowCount });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export default index;
