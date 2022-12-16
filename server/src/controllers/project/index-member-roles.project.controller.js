import ProjectMemberRole from "../../models/project-member-roles/project-member-roles.model.js";

/**
 * Lists roles available to project members
 */
const indexMemberRoles = async (req, res) => {
  try {
    const role = await ProjectMemberRole.find();
    res.send({ rows: role.rows, rowCount: role.rowCount });
  } catch (error) {
    res.status(500).send();
  }
};

export default indexMemberRoles;
