export const selectIssueTasks = ({
  id,
  filterOptions,
  pagingOptions,
  sortOptions,
}) => {
  const { field = "created_at", order = "asc" } = sortOptions;

  Object.keys(filterOptions).forEach((option) => {
    if (!option) delete filterOptions[option];
  });

  Object.keys(pagingOptions).forEach((option) => {
    if (!option) delete pagingOptions[option];
  });

  Object.keys(sortOptions).forEach((option) => {
    if (!option) delete sortOptions[option];
  });

  let index = 0;
  let select = `
    SELECT 
      id,
      description,
      completed,
      due_date as "dueDate",
      issue_id as "issueId",
      member_id as "memberId",
      created_at as "createdAt",
      updated_at as "updatedAt",
      deleted_at as "deletedAt"
    FROM issue_tasks
    `;
  let condition = `WHERE issue_id='${id}'::uuid `;
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
