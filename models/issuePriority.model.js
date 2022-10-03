import db from "../services/db.service.js";

const find = function findIssuePriority() {
  return db.query(`SELECT * FROM issue_priority`);
};

export default { find };
