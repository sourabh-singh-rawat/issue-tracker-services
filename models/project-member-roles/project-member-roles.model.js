import db from "../../services/db.service.js";

const find = () => {
  return db.query(`SELECT * FROM project_member_roles`);
};

export default { find };
