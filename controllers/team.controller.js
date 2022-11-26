import User from "../models/User/user.model.js";
import Team from "../models/Team/team.model.js";
import TeamUser from "../models/team-user/team-user.model.js";

const create = async (req, res) => {
  const { uid } = req.user;
  const { name, description } = req.body;
  try {
    const { id } = (await User.findOne(uid)).rows[0];
    const team = (await Team.insertOne({ name, description, team_leader: id }))
      .rows[0];

    res.send(team);
  } catch (error) {
    res.status(500).send();
  }
};

const createMember = async (req, res) => {
  const { id } = req.params;

  try {
    const teamUser = (await TeamUser.insertOne({ ...req.body, team_id: id }))
      .rows[0];
    res.send(teamUser);
  } catch (error) {
    res.status(500).send();
  }
};

const index = async (req, res) => {
  try {
    const teams = (await Team.find()).rows;

    res.send({ rows: teams, rowCount: 0 });
  } catch (error) {
    res.status(500).send();
  }
};

const indexMembers = async (req, res) => {
  const { id } = req.params;

  try {
    const teamMembers = (await TeamUser.find(id)).rows;
    res.send(teamMembers);
  } catch (error) {
    res.stats(500).send();
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const team = (await Team.findOne(id)).rows[0];

    if (!team) res.status(404).send();

    res.send(team);
  } catch (error) {
    res.status(500).send();
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  try {
    const team = (await Team.updateOne(id, req.body)).rows[0];

    if (!team) res.status(404).send();

    res.send(team);
  } catch (error) {
    res.status(500).send();
  }
};

const destroy = async () => {};

const destroyMember = async () => {};

export default {
  create,
  createMember,
  index,
  indexMembers,
  show,
  update,
  destroy,
  destroyMember,
};
