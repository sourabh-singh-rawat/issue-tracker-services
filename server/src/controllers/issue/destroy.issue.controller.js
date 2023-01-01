import Issue from '../../models/issue/issue.model.js';

/**
 * Delete an issue
 * @param {*} req
 * @param {*} res
 * @returns Deleted issue.
 */
const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const issue = (await Issue.deleteOne(id)).rows[0];
    if (!issue) res.status(404);

    return res.send(issue);
  } catch (error) {
    return res.status(500).send();
  }
};

export default destroy;
