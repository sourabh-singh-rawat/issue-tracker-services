import IssuePriority from '../../models/issue-priority/issue-priority.model.js';

/**
 * List all the priorities of an issue
 * @param {*} req
 * @param {*} res
 * @returns List of priorities along with their row count.
 */
const indexPriority = async (req, res) => {
  try {
    const issuePriority = await IssuePriority.find();
    res.send({ rows: issuePriority.rows, rowCount: issuePriority.rowCount });
  } catch (error) {
    res.status(500).send();
  }
};

export default indexPriority;
