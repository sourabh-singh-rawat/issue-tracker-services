import Project from "../../models/project/project.model.js";

const update = async (req, res) => {
  const { id } = req.params;

  try {
    const project = (await Project.updateOne(id, req.body)).rows[0];
    res.send(project);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

export default update;
