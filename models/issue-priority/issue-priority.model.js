import db from "../../services/db.service.js";

const find = () => {
  return db.query(`
  SELECT 
    * 
  FROM 
    issue_priority_types`);
};

export default { find };
