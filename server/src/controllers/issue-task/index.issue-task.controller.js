/* eslint-disable import/extensions */
import IssueTask from '../../models/issue-task/issue-task.model.js';

/**
 * List all the tasks of an issue
 * @param {*} req
 * @param {*} res
 * @returns List of tasks along with their row count.
 */
const index = async (req, res) => {
  const { id } = req.params;

  // filtering
  const filterOptions = {};

  // pagination
  const pagingOptions = {
    limit: 10,
    offset: 0,
  };

  // sorting
  const sortOptions = {};

  try {
    const tasks = await IssueTask.find({
      id,
      filterOptions,
      pagingOptions,
      sortOptions,
    });
    res.send({ rows: tasks.rows, rowCount: tasks.rowCount });
  } catch (error) {
    res.status(500).send();
  }
};

export default index;
