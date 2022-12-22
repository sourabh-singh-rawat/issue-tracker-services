/* eslint-disable import/extensions */
import TeamUser from '../../models/team-user/team-user.model.js';

const indexMembers = async (req, res) => {
  try {
    const { id } = req.params;

    const teamMembers = (await TeamUser.find(id)).rows;

    return res.send(teamMembers);
  } catch (error) {
    return res.stats(500).send();
  }
};

export default indexMembers;
