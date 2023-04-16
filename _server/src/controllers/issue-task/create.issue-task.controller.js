import IssueTask from '../../models/issue-task/issue-task.model.js';

/**
 * Creates a task inside an issue
 * @param {*} req
 * @param {*} res
 * @returns Task that is created.
 */
const create = async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { issueId, description, dueDate, completed } = req.body;

  try {
    const createdTask = (
      await IssueTask.insertOne({
        issueId,
        description,
        dueDate,
        completed,
      })
    ).rows[0];
    res.send(createdTask);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default create;
