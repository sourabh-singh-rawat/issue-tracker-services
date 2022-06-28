import db from "../config/connect.config.js";

const find = () => {
  return db.query(`SELECT * FROM issue_priority`);
};

export default { find };
