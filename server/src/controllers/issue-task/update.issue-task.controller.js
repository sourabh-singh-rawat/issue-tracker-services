/* eslint-disable import/extensions */
import IssueTask from '../../models/issue-task/issue-task.model.js';

/**
 * Update a Task
 * @param {*} req
 * @param {*} res
 * @returns an updated Task
 */
const update = async (req, res) => {
  const { taskId } = req.params;
  const { description, completed } = req.body;

  try {
    const task = (
      await IssueTask.updateOne({
        taskId,
        updates: { description, completed },
      })
    ).rows[0];

    if (!task) {
      res.status(500).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
};

export default update;
