import User from "../../models/user/user.model.js";
import Project from "../../models/project/project.model.js";

/**
 * Creates a new project member
 * @returns -- the newly created project
 */
const create = async (req, res) => {
  const { uid } = req.user;
  const { name, description, status, startDate, endDate } = req.body;

  try {
    const { id } = (await User.findOne(uid)).rows[0];
    const project = await Project.insertOne({
      id,
      name,
      description,
      status,
      startDate,
      endDate,
    });

    return res.send(project);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

export default create;
