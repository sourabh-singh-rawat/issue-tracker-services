import jwt from "jsonwebtoken";

import sgMail from "../services/email.service.js";

import User from "../models/user.model.js";
import Role from "../models/roles.model.js";
import Project from "../models/project.model.js";
import ProjectStatus from "../models/projectStatus.model.js";
import ProjectMember from "../models/projectMember.model.js";

/**
 * Creates a new project member
 * @returns -- the newly created project
 */
const create = async (req, res) => {
  const { uid, email } = req.user;

  try {
    const { id } = (await User.findOne(uid)).rows[0];
    const project = (await Project.insertOne({ id, email, ...req.body }))
      .rows[0];
    await ProjectMember.insertOne(project.id, id);

    return res.send(project);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

/**
 * Creates a new project member
 * @returns -- newly created member
 */
const createMember = async (req, res) => {
  const { uid, toProject } = req.body;

  try {
    const { id } = (await User.findOne(uid)).rows[0];
    const response = (await ProjectMember.insertOne(toProject, id)).rows[0];

    res.send(response);
  } catch (error) {
    res.status(500).send();
  }
};

/**
 * Sends an email to the given email address
 * @return confirmation that the email is sent
 */
const invite = async (req, res) => {
  const { user_id } = req.user;
  const { email, role } = req.body;
  const { id } = req.params;

  try {
    const token = jwt.sign(
      { inviteEmail: email, assignRole: role, toProject: id, by: user_id },
      process.env.JWT_SECRET
    );

    // send invite link to email
    const msg = {
      to: email,
      from: "sourabh.rawatcc@gmail.com", // Change to your verified sender
      subject: "Test: Issue Tracker Member Invitation",
      text: `You are invited to ${id} by ${email}`,
      html: `<strong>Click the link to accept invite: <a href="http://localhost:4000/api/projects/${id}/members/confirm?inviteToken=${token}">${token}</a></strong>`,
    };

    await sgMail.send(msg);

    res.send("Email sent!");
  } catch (error) {
    res.status(500).send("Cannot send email");
  }
};

const confirmInvite = async (req, res) => {
  const { inviteToken } = req.query;
  const validToken = jwt.verify(inviteToken, process.env.JWT_SECRET);

  // check if the invited user has already an account
  const user = (await User.findOneByEmail(validToken.inviteEmail)).rows[0];

  if (!user) {
    // Create a new account
    res.redirect(`http://localhost:3000/signup?inviteToken=${inviteToken}`);
  } else {
    // User exist, now check if the user is already authenticated
    res.redirect(`http://localhost:3000/signin?inviteToken=${inviteToken}`);
  }
};

/**
 * List projects created by the user
 * @returns array of project created by the user
 */
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
    const { id } = (await User.findOne(uid)).rows[0];

    const projects = (
      await Project.find({
        id,
        options: { status },
        pagingOptions: {
          limit: parseInt(limit),
          offset: parseInt(limit) * parseInt(page),
        },
        sortOptions,
      })
    ).rows;
    const rowCount = (
      await Project.rowCount({
        id,
        options: { status },
        pagingOptions: {},
        sortOptions,
      })
    ).rowCount;

    res.send({ rows: projects, rowCount: parseInt(rowCount) });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const indexMembers = async (req, res) => {
  const { id } = req.params;

  try {
    const projectMembers = (await ProjectMember.findByProjectId(id)).rows;
    res.send({ rows: projectMembers, rowCount: projectMembers.length });
  } catch (error) {
    res.status(500).send();
  }
};

/**
 * Lists roles available to project members
 */
const indexRoles = async (req, res) => {
  try {
    const role = await Role.find();
    res.send({ rows: role.rows, rowCount: role.rowCount });
  } catch (error) {
    res.status(500).send();
  }
};

/**
 * List project status available to projects
 */
const indexStatus = async (req, res) => {
  try {
    const status = await ProjectStatus.find();
    res.send({ rows: status.rows, rowCount: status.rowCount });
  } catch (error) {
    res.status(500).send();
  }
};

/**
 * @returns project
 */
const show = async (req, res) => {
  const { id } = req.params;

  try {
    const project = (await Project.findOne(id)).rows[0];
    res.send(project);
  } catch (error) {
    res.status(500).send();
  }
};

const showIssuesStatusCount = async (req, res) => {
  const { id } = req.params;

  try {
    let statusCount = (await Project.statusCount(id)).rows;

    res.send(statusCount);
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

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await (await Project.deleteOne(id)).rows[0];
    if (!project) res.status(404);
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default {
  create,
  createMember,
  index,
  indexRoles,
  indexStatus,
  indexMembers,
  show,
  showIssuesStatusCount,
  update,
  destroy,
  invite,
  confirmInvite,
};
