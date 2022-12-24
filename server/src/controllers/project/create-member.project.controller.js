/* eslint-disable import/extensions */
import User from '../../models/user/user.model.js';
import ProjectMember from '../../models/project-member/project-member.model.js';

/**
 * Creates a new project member
 * @returns -- newly created member
 */
const createMember = async (req, res) => {
  const { uid, projectId } = req.body;

  try {
    const { id } = await User.findOne(uid);
    const response = (
      await ProjectMember.insertOne({
        projectId,
        memberId: id,
        roleId: 'fc7562a2-fd0b-4f0f-af43-3d4e30434d0f',
      })
    ).rows[0];

    res.send(response);
  } catch (error) {
    res.status(500).send();
  }
};

export default createMember;
