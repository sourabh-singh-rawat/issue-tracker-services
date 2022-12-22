/* eslint-disable import/extensions */
import db from '../../config/db.config.js';
/**
 *
 * @param {string} name
 * @returns The id of the project activity type
 */
const findOne = async ({ name }) => {
  try {
    const projectActivityType = (
      await db.query(
        `
        SELECT id FROM project_activity_types
        WHERE name=$1;
      `,
        [name],
      )
    ).rows[0];

    return projectActivityType.id;
  } catch (error) {
    return error;
  }
};

export default { findOne };
