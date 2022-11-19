import db from "../../services/db.service.js";

const find = () => {
  return db.query(`SELECT * FROM project_status_types`);
};

export default { find };
