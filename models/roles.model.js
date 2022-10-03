import db from "../services/db.service.js";

const find = function findProjectMemberRoles() {
  return db.query(`SELECT * FROM roles`);
};

export default { find };
