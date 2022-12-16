import Project from "../../models/project/project.model.js";

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const project = (await Project.findOne(id)).rows[0];
    res.send(project);
  } catch (error) {
    res.status(500).send();
  }
};

export default show;
