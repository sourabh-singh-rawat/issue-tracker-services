import db from '../../../data/db.config.js';

const find = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  db.query(`
  SELECT 
    * 
  FROM 
    issue_priority_types`);

export default { find };
