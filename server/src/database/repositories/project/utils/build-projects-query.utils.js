/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */

import toSnakeCase from '../../../../utils/to-snake-case.util.js';

export const buildProjectsQuery = ({
  id,
  options,
  pagingOptions,
  sortOptions: { field = 'name', order = 'asc' },
}) => {
  // Remove all the props with falsey values
  Object.keys(options).forEach((option) => {
    if (!options[option]) delete options[option];
  });

  Object.keys(pagingOptions).forEach((option) => {
    if (!pagingOptions[option]) delete pagingOptions[option];
  });

  let index = 0;
  let whereClause = `
    WHERE 
      id IN (
        SELECT project_id 
        FROM project_members 
        WHERE member_user_id='${id}'
        )
  `;

  // WHERE CONDITION
  if (Object.keys(options).length > 0) {
    whereClause += Object.keys(options)
      .map((column) => {
        index += 1;
        return `${column.toUpperCase()} $${index}`;
      })
      .join(' AND ');
  }

  // ORDER BY
  const orderByClause = `ORDER BY ${toSnakeCase(field)} ${order}`;

  // LIMIT and OFFSET
  let limitClause = '';
  if (Object.keys(pagingOptions).length !== 0) {
    limitClause = Object.keys(pagingOptions)
      .map((column) => {
        index += 1;
        return `${column.toUpperCase()} $${index}`;
      })
      .join(' ');
  }

  const query = `
    SELECT * FROM projects
    ${whereClause}
    ${orderByClause}
    ${limitClause}
  `;
  const values = [...Object.values(options), ...Object.values(pagingOptions)];

  console.log(query);

  return {
    query,
    colValues: values,
  };
};