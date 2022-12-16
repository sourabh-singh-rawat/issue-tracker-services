import Team from "../../models/Team/team.model.js";

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const team = (await Team.updateOne(id, req.body)).rows[0];

    if (!team) res.status(404).send();

    res.send(team);
  } catch (error) {
    res.status(500).send();
  }
};

export default update;
