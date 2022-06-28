import Role from "../models/roles.model.js";
import Project from "../models/project.model.js";
import ProjectStatus from "../models/projectStatus.model.js";
import ProjectMember from "../models/projectMember.model.js";

const create = async (req, res) => {
  try {
    const project = (await Project.insertOne(req.body)).rows[0];
    await ProjectMember.insertOne(project.id, project.owner_uid);

    return res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createProjectMember = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send();
  }
};

const index = async (req, res) => {
  const { uid } = req.user;

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
      options: { owner_uid: uid, status },
      pagingOptions: {
        limit: parseInt(limit),
        offset: parseInt(limit) * parseInt(page),
      },
      sortOptions,
    });

    const rowCount = await (await Project.rowCount()).rows[0].count;

    res.send({ rows: response.rows, rowCount: parseInt(rowCount) });
  } catch (error) {
    res.status(500).send();
  }
};

const indexProjectMembers = async (req, res) => {
  const { id } = req.params;

  try {
    const projectMembers = (await ProjectMember.findByProjectId(id)).rows;
    res.send({ rows: projectMembers, rowCount: -1 });
  } catch (error) {
    res.status(500).send();
  }
};

const indexProjectMemberRole = async (req, res) => {
  try {
    const role = await Role.find();
    res.send(role.rows);
  } catch (error) {
    res.status(500).send();
  }
};

const indexProjectStatus = async (req, res) => {
  try {
    const status = await ProjectStatus.find();
    res.send(status.rows);
  } catch (error) {
    res.status(500).send();
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

export default {
  create,
  index,
  indexProjectStatus,
  indexProjectMembers,
  indexProjectMemberRole,
  show,
  update,
  destroy,
};
