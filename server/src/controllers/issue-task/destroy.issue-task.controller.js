import IssueTask from "../../models/issue-task/issue-task.model.js";

/**
 * Deletes a particular Task
 * @param {*} req
 * @param {*} res
 * @returns a deleted Task
 */
const destroy = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = (await IssueTask.deleteOne({ taskId })).rows[0];
    if (!deletedTask) res.status(500).send();

    res.send(deletedTask);
  } catch (error) {
    res.status(500).send();
  }
};

export default destroy;
