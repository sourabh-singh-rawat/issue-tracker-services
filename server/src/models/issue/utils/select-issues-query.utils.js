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
  SELECT
    issues.id,  issues.name, issues.status, issues.priority, issues.created_at, issues.reporter_id, issues.project_id, issues.assignee_id, issues.due_date,
    users.id as "reporter_id", users.name as "reporter_name", users.photo_url as "reporter_photo_url"
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
        member_id='${reporter_id}'
      )
    `;
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
