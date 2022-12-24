/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export

import toSnakeCase from '../../../utils/toSnakeCase.util.js';

export const selectIssuesQuery = ({
  reporterId,
  filterOptions,
  pagingOptions,
  sortOptions: { field = 'issues.status', order = 'asc' },
}) => {
  Object.keys(filterOptions).forEach((option) => {
    // eslint-disable-next-line no-param-reassign
    if (!filterOptions[option]) delete filterOptions[option];
  });

  Object.keys(pagingOptions).forEach((option) => {
    // eslint-disable-next-line no-param-reassign
    if (!pagingOptions[option]) delete pagingOptions[option];
  });

  let index = 0;
  const select = `
  SELECT
    issues.id,
    issues.name,
    issues.status,
    issues.priority, 
    issues.reporter_id as "reporterId",
    issues.project_id as "projectId",
    issues.assignee_id as "assigneeId",
    issues.due_date as "dueDate",
    issues.created_at as "createdAt",
    users.id as "reporterId",
    users.name as "reporterName",
    users.photo_url as "reporterPhotoUrl"
  FROM 
    issues
  JOIN 
    project_members ON project_members.id = issues.reporter_id
  JOIN
    users ON users.id = project_members.member_id`;

  let condition = `
  WHERE 
    issues.project_id IN (
      SELECT
        project_id
      FROM 
        project_members 
      WHERE 
        member_id='${reporterId}'
      )
    `;
  let orderBy = 'ORDER BY ';
  let pagination = '';

  // WHERE CONDITION
  if (Object.keys(filterOptions).length !== 0) {
    condition += Object.keys(filterOptions)
      .reduce((prev, cur) => {
        index += 1;
        return `${prev + toSnakeCase(cur)}=$${index} AND `;
      }, 'AND ')
      .slice(0, -4);
  }

  // ORDER BY
  orderBy += `${field} ${order} `;

  // LIMIT and OFFSET
  if (Object.keys(pagingOptions).length !== 0) {
    pagination = Object.keys(pagingOptions).reduce((prev, cur) => {
      index += 1;
      return `${prev + cur.toUpperCase()} $${index} `;
    }, ' ');
  }

  // FINAL QUERY
  const query = select + condition + orderBy + pagination;

  return {
    query,
    colValues: [
      ...Object.values(filterOptions),
      ...Object.values(pagingOptions),
    ],
  };
};
