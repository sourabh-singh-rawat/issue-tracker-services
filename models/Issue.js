import db from "../db/connect.js";

const insertOne = ({
  name,
  description,
  status,
  priority,
  reporter,
  assigned_to,
  due_date,
  project_id,
  // team_id,
}) => {
  return db.query(
    `INSERT INTO issues (name, description, status, priority, reporter, assigned_to, due_date, project_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      name,
      description,
      status,
      priority,
      reporter,
      assigned_to,
      due_date,
      project_id,
      // team_id,
    ]
  );
};

const find = ({
  options,
  pagingOptions,
  sortOptions: { field = "due_date", order = "DESC" },
}) => {
  // Remove all the props with falsey values
  Object.keys(options).forEach((option) => {
    if (!options[option]) delete options[option];
  });

  Object.keys(pagingOptions).forEach((option) => {
    if (!pagingOptions[option]) delete pagingOptions[option];
  });

  let index = 0;
  let select = "SELECT * FROM issues ";
  let condition = "";
  let orderBy = "ORDER BY ";
  let pagination = "";

  // WHERE CONDITION
  if (Object.keys(options).length !== 0) {
    condition = Object.keys(options)
      .reduce((prev, cur) => {
        index++;
        return prev + cur + "=$" + index + " AND ";
      }, "WHERE ")
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

  return db.query(query, [
    ...Object.values(options),
    ...Object.values(pagingOptions),
  ]);
};

const findOne = (id) => {
  return db.query(
    `SELECT 
     i.id, i.name, i.description, i.status, i.priority, i.reporter,i.assigned_to, i.due_date,
     i.project_id, i.creation_date,
     p.name as "project_name",
     p.owner_uid as "owner_uid"
     FROM issues AS i JOIN projects AS p ON i.project_id = p.id 
     WHERE i.id = $1`,
    [id]
  );
};

const updateOne = (id, document) => {
  let query = Object.keys(document)
    .reduce(
      (prev, cur, index) => prev + " " + cur + "=$" + (index + 1) + ",",
      "UPDATE issues SET"
    )
    .slice(0, -1);

  query += " WHERE id='" + id + "' RETURNING *";

  return db.query(query, Object.values(document));
};

const deleteOne = (id) =>
  db.query(`DELETE FROM issues WHERE id=$1 RETURNING *`, [id]);

const rowCount = () => db.query(`SELECT count(*) FROM issues`);

export default { insertOne, findOne, find, updateOne, deleteOne, rowCount };
