import ProjectMember from "../../models/project-member/project-member.model.js";

const indexMembers = async (req, res) => {
  const { id } = req.params;

  try {
    const projectMembers = (await ProjectMember.findByProjectId(id)).rows;
    res.send({ rows: projectMembers, rowCount: projectMembers.length });
  } catch (error) {
    res.status(500).send();
  }
};

export default indexMembers;
