/* eslint-disable import/extensions */
import Project from '../../models/project/project.model.js';

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await (await Project.deleteOne(id)).rows[0];
    if (!project) res.status(404);
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default destroy;
