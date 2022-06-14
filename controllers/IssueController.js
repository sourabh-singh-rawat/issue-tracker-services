import Issue from "../models/Issue.js";

const create = async (req, res) => {
  try {
    const issue = (await Issue.insertOne(req.body)).rows[0];
    res.send(issue);
  } catch (error) {
    return res.status(500).send();
  }
};

const index = async (req, res) => {
  const { project_id } = req.query;

  try {
    const project = (await Issue.find({ project_id })).rows;
    res.send(project);
  } catch (error) {
    res.status(500).send();
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const project = (await Issue.findOne(id)).rows[0];
    return res.send(project);
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

export default { create, index, show, update, destroy };
