import Project from "../models/Project.js";

const create = async (req, res) => {
  const document = req.body;

  try {
    const project = (await Project.insertOne(document)).rows[0];
    return res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
};

const index = async (req, res) => {
  // filtering
  const { status } = req.query;

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
    const response = await Project.find({
      options: { status },
      pagingOptions: {
        limit: parseInt(limit),
        offset: parseInt(limit) * parseInt(page),
      },
      sortOptions,
    });

    const rowCount = await (await Project.rowCount()).rows[0].count;

    res.send({ data: response.rows, rowCount: parseInt(rowCount) });
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
    console.log(error);
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
