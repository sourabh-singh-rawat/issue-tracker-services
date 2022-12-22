/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import db from '../../config/db.config.js';
import User from '../../models/user/user.model.js';
import Project from '../../models/project/project.model.js';
import ProjectActivityTypes from '../../models/project-activity-types/project-activity-types.model.js';
import ProjectActivity from '../../models/project-activity/project-activity.model.js';

const update = async (req, res) => {
  const { uid } = req.user;
  const { id } = req.params;
  const { name, description, status, startDate, endDate } = req.body;

  try {
    db.query('BEGIN');

    const { id: userId } = await User.findOne(uid);
    const updatedProject = (
      await Project.updateOne({
        id,
        body: req.body,
      })
    ).rows[0];

    if (name) {
      const updatedNameActivityTypeId = await ProjectActivityTypes.findOne({
        name: 'UPDATED_NAME',
      });
      await ProjectActivity.insertOne({
        projectId: id,
        typeId: updatedNameActivityTypeId,
        userId,
      });
    }

    if (description) {
      // eslint-disable-next-line operator-linebreak
      const updatedDescriptionActivityTypeId =
        await ProjectActivityTypes.findOne({
          name: 'UPDATED_DESCRIPTION',
        });
      await ProjectActivity.insertOne({
        projectId: id,
        typeId: updatedDescriptionActivityTypeId,
        userId,
      });
    }

    if (status) {
      const updatedStatusActivityTypeId = await ProjectActivityTypes.findOne({
        name: 'UPDATED_STATUS',
      });
      await ProjectActivity.insertOne({
        projectId: id,
        typeId: updatedStatusActivityTypeId,
        userId,
      });
    }

    if (startDate) {
      const updatedStartDateActivityTypeId = await ProjectActivityTypes.findOne(
        { name: 'UPDATED_START_DATE' },
      );
      await ProjectActivity.insertOne({
        projectId: id,
        typeId: updatedStartDateActivityTypeId,
        userId,
      });
    }

    if (endDate) {
      const updatedEndDateActivityTypeId = await ProjectActivityTypes.findOne({
        name: 'UPDATED_END_DATE',
      });
      await ProjectActivity.insertOne({
        projectId: id,
        typeId: updatedEndDateActivityTypeId,
        userId,
      });
    }

    db.query('COMMIT');

    return res.send(updatedProject);
  } catch (error) {
    db.query('ROLLBACK');
    return res.status(500).send();
  }
};

export default update;
