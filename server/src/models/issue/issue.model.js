import db from '../../config/db.config.js';
import { selectIssuesQuery } from './utils/select-issues-query.utils.js';

const insertOne = ({
  name,
  description,
  status,
  priority,
  reporterId,
  assigneeId,
  dueDate,
  projectId,
}) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  db.query(
    `
    INSERT INTO
      issues (name, description, status, priority, reporter_id, due_date, project_id, assignee_id)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING 
      *
    `,
    [
      name,
      description,
      status,
      priority,
      reporterId,
      dueDate,
      projectId,
      assigneeId,
    ],
  );

const find = async (options) => {
  const { query, colValues } = selectIssuesQuery(options);
  return db.query(query, colValues);
};

const findOne = (id) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  db.query(
    `
    SELECT 
      issues.id as "id",
      issues.name as "name",
      issues.description as "description",
      issues.status as "status",
      issues.priority as "priority",
      issues.due_date as "dueDate",
      issues.project_id as "projectId",
      issues.created_at as "createdAt",
      issues.assignee_id as "assigneeId",
      projects.name as "projectName",
      projects.owner_id as "projectOwnerId"
    FROM 
      issues 
    JOIN 
      projects ON issues.project_id = projects.id
    WHERE
      issues.id = $1`,
    [id],
  );

const updateOne = (id, document) => {
  // eslint-disable-next-line no-param-reassign
  if (document.assignee_id === 0) document.assignee_id = null;

  // remove undefined values from document
  Object.keys(document).forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    if (document[key] === undefined) delete document[key];
  });

  let query = Object.keys(document)
    .reduce(
      (prev, cur, index) => `${prev} ${cur}=$${index + 1},`,
      'UPDATE issues SET ',
    )
    .slice(0, -1);

  query += ` WHERE id='${id}' RETURNING *`;

  return db.query(query, Object.values(document));
};

const deleteOne = (id) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  db.query('DELETE FROM issues WHERE id=$1 RETURNING *', [id]);

const rowCount = (options) => {
  const { query, colValues } = selectIssuesQuery(options);
  return db.query(query, colValues);
};

export default {
  insertOne,
  findOne,
  find,
  updateOne,
  deleteOne,
  rowCount,
};
