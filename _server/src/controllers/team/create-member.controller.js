import TeamUser from '../../models/team-user/team-user.model.js';

const createMember = async (req, res) => {
  try {
    const { id } = req.params;

    const teamUser = (await TeamUser.insertOne({ ...req.body, team_id: id }))
      .rows[0];

    res.send(teamUser);
  } catch (error) {
    res.status(500).send();
  }
};

export default createMember;
