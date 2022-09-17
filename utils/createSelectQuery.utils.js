export const createSelectQuery = (
  {
    options,
    pagingOptions,
    sortOptions: { field = "name", order = "asc" },
    whereClause,
  },
  table1
) => {
  // Remove all the props with falsey values
  Object.keys(options).forEach((option) => {
    if (!options[option]) delete options[option];
  });

  Object.keys(pagingOptions).forEach((option) => {
    if (!pagingOptions[option]) delete pagingOptions[option];
  });

  let index = 0;
  let select = "SELECT * FROM " + table1 + " ";
  let condition = "";
  let orderBy = "ORDER BY ";
  let pagination = "";

  // WHERE CONDITION
  if (Object.keys(options).length !== 0) {
    condition = Object.keys(options)
      .reduce((prev, cur) => {
        index++;
        return prev + cur + "=$" + index + " AND ";
      }, `WHERE `)
      .slice(0, -4);
  }

  // ORDER BY
  orderBy += field + " " + order;

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
    colValues: [...Object.values(options), ...Object.values(pagingOptions)],
  };
};
