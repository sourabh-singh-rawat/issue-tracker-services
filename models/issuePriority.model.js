import db from "../services/db.service.js";

const find = () => {
  return db.query(`SELECT * FROM issue_priority`);
};

export default { find };
