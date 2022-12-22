/* eslint-disable import/extensions */
import db from '../../config/db.config.js';

const find = async () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (
    await db.query(`
      SELECT * 
      FROM project_member_roles`)
  ).rows;

const findOne = async () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (
    await db.query(`
      SELECT id 
      FROM project_member_roles`)
  ).rows[0].id;

export default { find, findOne };
