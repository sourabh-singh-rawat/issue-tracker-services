import db from "../../config/db.config.js";

const find = () => {
  return db.query(`
    SELECT 
      * 
    FROM 
      project_status_types
    ORDER BY 
      rank_order ASC`);
};

export default { find };
