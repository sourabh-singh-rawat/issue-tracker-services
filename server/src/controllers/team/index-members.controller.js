import TeamUser from "../../models/team-user/team-user.model.js";

const indexMembers = async (req, res) => {
  try {
    const { id } = req.params;

    const teamMembers = (await TeamUser.find(id)).rows;

    res.send(teamMembers);
  } catch (error) {
    res.stats(500).send();
  }
};

export default indexMembers;
