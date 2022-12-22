/* eslint-disable import/extensions */
import Team from '../../models/team/team.model.js';

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const team = (await Team.findOne(id)).rows[0];

    if (!team) res.status(404).send();

    return res.send(team);
  } catch (error) {
    return res.status(500).send();
  }
};

export default show;
