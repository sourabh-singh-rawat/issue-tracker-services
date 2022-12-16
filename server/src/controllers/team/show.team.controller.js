import Team from "../../models/Team/team.model.js";

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const team = (await Team.findOne(id)).rows[0];

    if (!team) res.status(404).send();

    res.send(team);
  } catch (error) {
    res.status(500).send();
  }
};

export default show;
