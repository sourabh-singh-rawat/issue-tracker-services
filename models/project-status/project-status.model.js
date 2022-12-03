import db from "../../configs/db.config.js";

const find = () => {
  return db.query(`
    SELECT 
      * 
    FROM 
      project_status_types`);
};

export default { find };
