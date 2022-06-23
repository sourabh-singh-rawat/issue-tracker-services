import Issue from "../models/issues.model.js";

const create = async (req, res) => {
  try {
    const issue = (await Issue.insertOne(req.body)).rows[0];
    res.send(issue);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// get /api/issues
// GET /api/issues?status=open
// GET /api/issues?project_id=517b4cca-0b00-4ea4-9ab9-874f6c5aeb74
// GET /api/issues?status=open&limit=10
// GET /api/issues?status=open&limit=10&offset=0
const index = async (req, res) => {
  // filtering
  const { status, priority, project_id, reporter, assigned_to } = req.query;

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
        options: { status, priority, project_id, reporter, assigned_to },
        pagingOptions: {
          limit: parseInt(limit),
          offset: parseInt(limit) * parseInt(page),
        },
        sortOptions,
      })
    ).rows;

    const rowCount = await (await Issue.rowCount()).rows[0].count;

    res.send({ data: issues, rowCount: parseInt(rowCount) });
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const project = (await Issue.findOne(id)).rows[0];
    if (!project) res.status(404).send();

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
