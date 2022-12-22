/* eslint-disable import/extensions */
import db from '../../config/db.config.js';

const find = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  db.query(`
    SELECT 
      id,
      name,
      color,
      description,
      rank_order as "rankOrder",
      created_at as "createdAt",
      updated_at as "updatedAt",
      deleted_at as "deletedAt"
    FROM 
      project_status_types
    ORDER BY 
      rank_order ASC`);

export default { find };
