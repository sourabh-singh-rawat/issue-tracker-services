import db from "../../services/db.service.js";

const find = () => {
  return db.query(`SELECT * FROM issue_status ORDER BY status ASC`);
};

export default { find };
