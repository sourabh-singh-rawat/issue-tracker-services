import Team from '../../models/team/team.model.js';

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const team = (await Team.updateOne(id, req.body)).rows[0];

    if (!team) res.status(404).send();

    return res.send(team);
  } catch (error) {
    return res.status(500).send();
  }
};

export default update;
