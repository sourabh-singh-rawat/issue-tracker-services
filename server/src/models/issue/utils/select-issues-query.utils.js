export const selectIssuesQuery = ({
  reporterId,
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
        id='${reporterId}'
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
