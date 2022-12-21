import User from "../../models/user/user.model.js";
import Project from "../../models/project/project.model.js";

/**
 * List projects created by the user
 * @returns array of project created by the user
 */
const index = async (req, res) => {
  const { uid } = req.user;
  const { status, sort_by, limit, page } = req.query;

  const sortOptions = {};
  if (sort_by) {
    const [field, order] = sort_by.split(":");
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
          limit: parseInt(limit),
          offset: parseInt(limit) * parseInt(page),
        },
        sortOptions,
      })
    ).rows;

    const rowCount = (
      await Project.rowCount({
        id,
        options: { status },
        pagingOptions: {},
        sortOptions,
      })
    ).rowCount;

    res.send({ rows: projects, rowCount: parseInt(rowCount) });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

export default index;
