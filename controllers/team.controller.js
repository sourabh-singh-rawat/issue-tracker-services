import Team from "../models/team.model.js";
import TeamUser from "../models/teamUser.model.js";

const create = async (req, res) => {
  try {
    const team = (await Team.insertOne(req.body)).rows[0];

    res.send(team);
  } catch (error) {
    res.stats(500).send();
  }
};

const createTeamMember = async (req, res) => {
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
    res.send(500);
  }
};

const indexTeamMembers = async (req, res) => {
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
    res.send(500);
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

const destroyTeamMember = async () => {};

export default {
  create,
  createTeamMember,
  index,
  indexTeamMembers,
  show,
  update,
  destroy,
  destroyTeamMember,
};
