import User from "../../models/User/user.model.js";
import Team from "../../models/Team/team.model.js";

const create = async (req, res) => {
  try {
    const { uid } = req.user;
    const { name, description } = req.body;

    const { id } = await User.findOne(uid);
    const team = (await Team.insertOne({ name, description, team_leader: id }))
      .rows[0];

    res.send(team);
  } catch (error) {
    res.status(500).send();
  }
};

export default create;
