import IssuesModel from "../models/Issues.js";

const getAllIssues = async (req, res) => {
  try {
    const response = await IssuesModel.find();
    res.send(response.rows);
  } catch (error) {
    console.log("READ_ERROR: Cannot get all issues", error);
    res.status(404).send("Cannot get all issues");
  }
};

const getAllIssuesByProjectId = async (req, res) => {
  const { projectId } = req.query;

  if (projectId) {
    try {
      const response = await IssuesModel.findByProjectId(projectId);
      return res.send(response.rows);
    } catch (error) {
      console.log(
        "READ_ERROR: Cannot get all issues inside project: " + projectId,
        error
      );
      return res
        .status(404)
        .send("Cannot get all issues inside project: " + projectId);
    }
  }
};

const getIssue = async (req, res) => {
  const { issueId } = req.params;

  try {
    const response = await IssuesModel.findOne(issueId);
    return res.send(response.rows[0]);
  } catch (error) {
    console.log("READ_ERROR: Cannot get issue");
    res.status(404).send("Cannot get issue");
  }
};

const updateIssue = async (req, res) => {
  const { issueId } = req.params;
  const { field, value } = req.body;
  try {
    await IssuesModel.updateOne(issueId, field, value);
    return res.send("Issue Updated");
  } catch (error) {
    return res.status(400).send("Cannot update issue");
  }
};

const createIssue = async (req, res) => {
  const {
    name,
    description,
    status,
    priority,
    reporter,
    assignee,
    dueDate,
    projectId,
  } = req.body;

  try {
    await IssuesModel.createOne(
      name,
      description,
      status,
      priority,
      reporter,
      assignee,
      dueDate,
      projectId
    );
  } catch (error) {
    console.log("CREATE_ERROR: Cannot create issue", error);
    return res.status(400).send("Cannot create issue");
  }
};

export default {
  getAllIssues,
  getAllIssuesByProjectId,
  getIssue,
  updateIssue,
  createIssue,
};
