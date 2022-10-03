import db from "../services/db.service.js";

const find = function findProjectStatus() {
  return db.query(`SELECT * FROM project_status ORDER BY status ASC`);
};

export default { find };
