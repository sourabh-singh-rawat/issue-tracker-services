import User from '../../models/user/user.model.js';
import Project from '../../models/project/project.model.js';

/**
 * List projects created by the user
 * @returns array of project created by the user
 */
const index = async (req, res) => {
  const { uid } = req.user;
  // eslint-disable-next-line
  const { status, sortBy, limit, page } = req.query;

  const sortOptions = {};
  if (sortBy) {
    const [field, order] = sortBy.split(':');
    sortOptions.field = field;
    sortOptions.order = order;
  }

  try {
    const { id } = await User.findOne(uid);

    const projects = (
      await Project.find({
        id,
        options: { status },
        pagingOptions: {
          limit: parseInt(limit, 10),
          offset: parseInt(limit, 10) * parseInt(page, 10),
        },
        sortOptions,
      })
    ).rows;

    const { rowCount } = await Project.rowCount({
      id,
      options: { status },
      pagingOptions: {},
      sortOptions,
    });

    return res.send({ rows: projects, rowCount: parseInt(rowCount, 10) });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export default index;
