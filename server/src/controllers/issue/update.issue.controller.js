import Issue from '../../models/issue/issue.model.js';

/**
 * Update an issue
 * @param {*} req
 * @param {*} res
 * @returns Updated issue.
 */
const update = async (req, res) => {
  const { id } = req.params;
  const updatables = {
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    reporter_id: req.body.reporterId,
    project_id: req.body.projectId,
    assignee_id: req.body.assigneeId,
    due_date: req.body.dueDate,
  };

  try {
    const issue = (await Issue.updateOne(id, updatables)).rows[0];
    return res.send(issue);
  } catch (error) {
    return res.status(500).send();
  }
};

export default update;
