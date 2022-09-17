import jwt from "jsonwebtoken";

import sgMail from "../services/email.service.js";

import User from "../models/user.model.js";
import Role from "../models/roles.model.js";
import Project from "../models/project.model.js";
import ProjectStatus from "../models/projectStatus.model.js";
import ProjectMember from "../models/projectMember.model.js";
import { response } from "express";

/**
 * Creates a new project member
 * @returns -- the newly created member
 */
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
  const { uid, toProject } = req.body;

  try {
    response = await ProjectMember.insertOne(toProject, uid);
    res.send(response);
  } catch (error) {
    res.status(500);
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
    console.log(error);
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
    const response = await Project.find({
      owner_uid: uid,
      options: { status },
      pagingOptions: {
        limit: parseInt(limit),
        offset: parseInt(limit) * parseInt(page),
      },
      sortOptions,
      whereClause: `WHERE id IN (SELECT project_id from project_members where user_id = '${uid}') `,
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

/**
 * Lists roles available to project members
 */
const indexProjectMemberRole = async (req, res) => {
  try {
    const role = await Role.find();
    res.send(role.rows);
  } catch (error) {
    res.status(500).send();
  }
};

/**
 * List project status available to projects
 */
const indexProjectStatus = async (req, res) => {
  try {
    const status = await ProjectStatus.find();
    res.send(status.rows);
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
    console.log(error);
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
    res.status(500).send(error);
  }
};

export default {
  create,
  createProjectMember,
  index,
  indexProjectStatus,
  indexProjectMembers,
  indexProjectMemberRole,
  show,
  showIssuesStatusCount,
  update,
  destroy,
  invite,
  confirmInvite,
};
