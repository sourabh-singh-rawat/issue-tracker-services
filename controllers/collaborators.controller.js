import User from "../models/user.model.js";
import ProjectMember from "../models/projectMember.model.js";

const index = async (req, res) => {
  const { uid } = req.user;

  try {
    const { id } = (await User.findOne(uid)).rows[0];
    const result = (await ProjectMember.findPeopleRelatedToUid(id)).rows;
    res.send({ rows: result, rowCount: -1 });
  } catch (error) {
    res.status(500).send();
  }
};

export default { index };
