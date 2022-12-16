import Project from "../../models/project/project.model.js";

const showIssuesStatusCount = async (req, res) => {
  const { id } = req.params;

  try {
    let statusCount = (await Project.statusCount(id)).rows;

    res.send(statusCount);
  } catch (error) {
    res.status(500).send();
  }
};

export default showIssuesStatusCount;
