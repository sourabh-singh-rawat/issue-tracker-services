/* eslint-disable import/extensions */
import User from '../../models/user/user.model.js';
import Team from '../../models/team/team.model.js';

const create = async (req, res) => {
  try {
    const { uid } = req.user;
    const { name, description } = req.body;

    const { id } = await User.findOne(uid);
    const team = (await Team.insertOne({ name, description, team_leader: id }))
      .rows[0];

    return res.send(team);
  } catch (error) {
    return res.status(500).send();
  }
};

export default create;
