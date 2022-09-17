import Issue from "../models/issue.model.js";
import IssueStatus from "../models/issueStatus.model.js";
import IssuePriority from "../models/issuePriority.model.js";

const create = async (req, res) => {
  try {
    const issue = (await Issue.insertOne(req.body)).rows[0];
    res.send(issue);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const index = async (req, res) => {
  const uid = req.user.uid;
  // filtering
  const { status, priority, project_id, reporterId, assigned_to } = req.query;

  // sorting
  const { sort_by } = req.query;
  const sortOptions = {};
  if (sort_by) {
    const [field, order] = sort_by.split(":");
    sortOptions.field = field;
    sortOptions.order = order;
  }

  // pagination
  const { limit, page } = req.query;

  try {
    const issues = (
      await Issue.find({
        options: {
          status,
          priority,
          project_id,
          reporter: reporterId,
          assigned_to,
        },
        pagingOptions: {
          limit: parseInt(limit),
          offset: parseInt(limit) * parseInt(page),
        },
        sortOptions,
      })
    ).rows;

    const rowCount = await (await Issue.rowCount(project_id)).rows[0].count;

    res.send({ rows: issues, rowCount: parseInt(rowCount) });
  } catch (error) {
    res.status(500).send();
  }
};

const indexIssueStatus = async (req, res) => {
  try {
    const issueStatus = await IssueStatus.find();
    res.send(issueStatus.rows);
  } catch (error) {
    res.status(500).send();
  }
};

const indexIssuePriority = async (req, res) => {
  try {
    const issuePriority = await IssuePriority.find();
    res.send(issuePriority.rows);
  } catch (error) {
    res.status(500).send();
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const issue = (await Issue.findOne(id)).rows[0];

    if (!issue) res.status(404).send();

    return res.send(issue);
  } catch (error) {
    res.status(500).send();
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  try {
    const issue = await (await Issue.updateOne(id, req.body)).rows[0];
    return res.send(issue);
  } catch (error) {
    return res.status(500).send();
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const issue = (await Issue.deleteOne(id)).rows[0];
    if (!issue) res.status(404);
    res.send(issue);
  } catch (error) {
    res.status(500).send();
  }
};

export default {
  create,
  index,
  indexIssueStatus,
  indexIssuePriority,
  show,
  update,
  destroy,
};
