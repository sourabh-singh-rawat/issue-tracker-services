export const selectIssuesQuery = ({
  reporter_id,
  filterOptions,
  pagingOptions,
  sortOptions: { field = "issues.status", order = "asc" },
}) => {
  Object.keys(filterOptions).forEach((option) => {
    if (!filterOptions[option]) delete filterOptions[option];
  });

  Object.keys(pagingOptions).forEach((option) => {
    if (!pagingOptions[option]) delete pagingOptions[option];
  });

  let index = 0;
  let select = `
  SELECT *, 
    issues.id as id, 
    issues.name as "name", 
    users.name as "reporter_name", 
    users.id as "user_id",
    issues.creation_date as "creation_date",
    users.creation_date as "user_creation_date"
  FROM issues INNER JOIN users ON issues.reporter_id = users.id `;
  let condition = `WHERE project_id IN (SELECT project_id FROM project_members WHERE user_id='${reporter_id}') `;
  let orderBy = "ORDER BY ";
  let pagination = "";

  // WHERE CONDITION
  if (Object.keys(filterOptions).length !== 0) {
    condition += Object.keys(filterOptions)
      .reduce((prev, cur) => {
        index++;
        return prev + cur + "=$" + index + " AND ";
      }, "AND ")
      .slice(0, -4);
  }

  // ORDER BY
  orderBy += field + " " + order + " ";

  // LIMIT and OFFSET
  if (Object.keys(pagingOptions).length !== 0) {
    pagination = Object.keys(pagingOptions).reduce((prev, cur) => {
      index++;
      return prev + cur.toUpperCase() + " $" + index + " ";
    }, " ");
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
