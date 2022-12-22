/* eslint-disable import/extensions */
import ProjectMemberRole from '../../models/project-member-roles/project-member-roles.model.js';

/**
 * Get all project member roles
 * @param {*} req
 * @param {*} res
 * @returns - all project member roles
 */
const indexMemberRoles = async (req, res) => {
  try {
    const projectMemberRoles = await ProjectMemberRole.find();
    if (projectMemberRoles.length === 0) res.status(404).send();

    return res.send({
      rows: projectMemberRoles,
      rowCount: projectMemberRoles.length,
    });
  } catch (error) {
    return res.status(500).send();
  }
};

export default indexMemberRoles;
