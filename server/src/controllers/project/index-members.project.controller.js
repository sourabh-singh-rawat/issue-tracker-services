/* eslint-disable import/extensions */
import ProjectMember from '../../models/project-member/project-member.model.js';
import User from '../../models/user/user.model.js';

const indexMembers = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const { id: userId } = await User.findOne(uid);
    if (!userId) return res.status(404).send();

    const projectMembers = (
      await ProjectMember.findByProjectId({ projectId: id, memberId: userId })
    ).rows;

    if (!projectMembers.length) return res.status(403).send();

    return res.send({ rows: projectMembers, rowCount: projectMembers.length });
  } catch (error) {
    return res.status(500).send();
  }
};

export default indexMembers;
