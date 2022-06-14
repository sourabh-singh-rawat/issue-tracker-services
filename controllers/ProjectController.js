import Project from "../models/Project.js";

const create = async (req, res) => {
  const document = req.body;

  // TODO santitize document
  if (document.name.length === 0) document.name = "Untitled Document";

  try {
    const project = (await Project.insertOne(document)).rows[0];
    return res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
};

const index = async (req, res) => {
  try {
    const response = await Project.find();
    res.send(response.rows);
  } catch (error) {
    if (error) {
      console.log("READ_ERROR: Cannot get all projects", error);
      res.status(404).send("Cannot get all projects");
    }
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const project = (await Project.findOne(id)).rows[0];
    res.send(project);
  } catch (error) {
    res.status(500).send();
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  try {
    const project = (await Project.updateOne(id, req.body)).rows[0];
    res.send(project);
  } catch (error) {
    res.status(500).send();
  }
};

// Asks model to delete project
const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await (await Project.deleteOne(id)).rows[0];
    if (!project) res.status(404);
    res.send(project);
  } catch (error) {
    res.status(500).send();
  }
};

export default { create, index, show, update, destroy };
