/* eslint-disable import/extensions */
import Team from '../../models/team/team.model.js';

const index = async (req, res) => {
  try {
    const teams = (await Team.find()).rows;

    return res.send({ rows: teams, rowCount: 0 });
  } catch (error) {
    return res.status(500).send();
  }
};

export default index;
