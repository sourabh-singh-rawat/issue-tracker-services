/* eslint-disable-next-line import/extensions */
import User from '../../models/user/user.model.js';
/* eslint-disable-next-line import/extensions */
import Project from '../../models/project/project.model.js';

const show = async (req, res) => {
  const { uid } = req.user;
  const { id } = req.params;

  try {
    const { id: userId } = await User.findOne(uid);
    if (!userId) return res.status(404).send();

    const project = (await Project.findOne({ projectId: id, memberId: userId }))
      .rows[0];
    if (!project) return res.status(403).send();

    return res.send(project);
  } catch (error) {
    return res.status(500).send();
  }
};

export default show;
