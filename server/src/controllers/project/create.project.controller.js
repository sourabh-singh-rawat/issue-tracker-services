import db from '../../config/db.config.js';
import User from '../../models/user/user.model.js';
import Project from '../../models/project/project.model.js';
import ProjectActivity from '../../models/project-activity/project-activity.model.js';
import ProjectActivityTypes from '../../models/project-activity-types/project-activity-types.model.js';
import ProjectMember from '../../models/project-member/project-member.model.js';
import ProjectMemberRoles from '../../models/project-member-roles/project-member-roles.model.js';

/**
 * Creates a new project member
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns -- the newly created project
 */
const create = async (req, res) => {
  const { uid } = req.user;
  // eslint-disable-next-line object-curly-newline
  const { name, description, status, startDate, endDate } = req.body;

  try {
    // Begin transaction
    db.query('BEGIN');

    // Get user id
    const { id } = await User.findOne(uid);

    // Create project
    const createdProject = await Project.insertOne({
      ownerId: id,
      name,
      description,
      status,
      startDate,
      endDate,
    });

    const projectActivityTypeId = await ProjectActivityTypes.findOne({
      name: 'CREATED',
    });

    // Create project created activity
    await ProjectActivity.insertOne({
      userId: id,
      typeId: projectActivityTypeId,
      projectId: createdProject.id,
    });

    // Get default role id
    const defaultRoleId = await ProjectMemberRoles.findOne();

    // Create project member
    await ProjectMember.insertOne({
      memberId: id,
      roleId: defaultRoleId,
      projectId: createdProject.id,
    });

    // Commit transaction
    await db.query('COMMIT');

    return res.send(createdProject);
  } catch (error) {
    // Rollback transaction
    await db.query('ROLLBACK');
    return res.status(500).send();
  }
};

export default create;
