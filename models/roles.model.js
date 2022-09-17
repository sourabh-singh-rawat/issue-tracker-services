import db from "../services/db.service.js";

const find = () => {
  return db.query(`SELECT * FROM roles`);
};

export default { find };
