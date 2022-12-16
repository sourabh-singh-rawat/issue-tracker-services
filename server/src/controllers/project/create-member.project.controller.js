import User from "../../models/user/user.model.js";

/**
 * Creates a new project member
 * @returns -- newly created member
 */
const createMember = async (req, res) => {
  const { uid, projectId, roleId } = req.body;

  try {
    const { id } = (await User.findOne(uid)).rows[0];
    const response = (
      await ProjectMember.insertOne({ projectId, memberId: id, roleId })
    ).rows[0];

    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

export default createMember;
