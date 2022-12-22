// eslint-disable-next-line import/extensions
import User from '../../models/user/user.model.js';
// eslint-disable-next-line import/extensions
import Project from '../../models/project/project.model.js';

const showIssuesStatusCount = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const { id: userId } = await User.findOne(uid);
    if (!userId) return res.status(404).send();

    const statusCount = (
      await Project.statusCount({ projectId: id, memberId: userId })
    ).rows;

    return res.send(statusCount);
  } catch (error) {
    return res.status(500).send();
  }
};

export default showIssuesStatusCount;
