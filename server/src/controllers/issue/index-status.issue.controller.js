import IssueStatus from '../../models/issue-status/issue-status.model.js';

/**
 * List all the statuses of an issue
 * @param {*} req
 * @param {*} res
 * @returns List of statuses along with their row count.
 */
const indexStatus = async (req, res) => {
  try {
    const issueStatus = await IssueStatus.find();
    res.send({ rows: issueStatus.rows, rowCount: issueStatus.rowCount });
  } catch (error) {
    res.status(500).send();
  }
};

export default indexStatus;
