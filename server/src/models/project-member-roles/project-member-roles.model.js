import db from "../../config/db.config.js";

const find = async () => {
  return (
    await db.query(`
      SELECT * 
      FROM project_member_roles`)
  ).rows;
};

const findOne = async () => {
  return (
    await db.query(`
      SELECT id 
      FROM project_member_roles`)
  ).rows[0].id;
};

export default { find, findOne };
