import IssueTask from '../../models/issue-task/issue-task.model.js';

/**
 * Shows a Task
 * @param {*} req
 * @param {*} res
 * @returns a Task
 */
const show = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = (await IssueTask.findOne(taskId)).rows[0];

    if (!task) {
      res.status(500).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
};

export default show;
