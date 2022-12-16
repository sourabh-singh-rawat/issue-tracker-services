import Team from "../../models/Team/team.model.js";

const index = async (req, res) => {
  try {
    const teams = (await Team.find()).rows;

    res.send({ rows: teams, rowCount: 0 });
  } catch (error) {
    res.status(500).send();
  }
};

export default index;
