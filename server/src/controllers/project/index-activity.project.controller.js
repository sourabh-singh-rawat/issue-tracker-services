import db from '../../config/db.config.js';
import ProjectActivity from '../../models/project-activity/project-activity.model.js';
import User from '../../models/user/user.model.js';

const indexActivity = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    // Start a transaction
    db.query('BEGIN');
    const { id: userId } = await User.findOne(uid);

    const projectActivity = await ProjectActivity.find({
      projectId: id,
      memberId: userId,
    });

    // Commit the transaction
    db.query('COMMIT');

    return res.send({
      rows: projectActivity.rows,
      rowCount: projectActivity.rowCount,
    });
  } catch (error) {
    // Rollback the transaction
    db.query('ROLLBACK');
    return res.status(500).send();
  }
};

export default indexActivity;
