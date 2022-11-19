import db from "../../services/db.service.js";
import { selectProjectsQuery } from "./utils/select-projects-query.utils.js";
import ProjectMember from "../../models/project-member/project-member.model.js";

const insertOne = async ({
  id,
  name,
  description,
  start_date,
  end_date,
  status,
}) => {
  const pool = await db.connect();
  try {
    await db.query("BEGIN");

    const project = (
      await db.query(
        ` 
        INSERT INTO projects
          (name, description, status, owner_id, start_date, end_date)
        VALUES
          ($1, $2, $3, $4, $5, $6)
        RETURNING
          *
        `,
        [name, description, status, id, start_date, end_date]
      )
    ).rows[0];

    await ProjectMember.insertOne({
      member_role: "8b9ee047-bbdd-4ebe-a2d0-81449cda0fb7",
      project_id: project.id,
      member_id: id,
    });

    await db.query("COMMIT");

    return project;
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  } finally {
    pool.release();
  }
};

const find = (options) => {
  const { query, colValues } = selectProjectsQuery(options);
  return db.query(query, colValues);
};

const findOne = (id) => {
  return db.query(
    `SELECT 
      * 
    FROM 
      projects 
    WHERE 
      id = $1`,
    [id]
  );
};

const updateOne = (id, project) => {
  let query = Object.keys(project).reduce((prev, cur, index) => {
    return prev + " " + cur + "=$" + (index + 1) + ",";
  }, "UPDATE projects SET");
  query = query.slice(0, -1);
  query += " WHERE id='" + id + "' RETURNING *";

  return db.query(query, Object.values(project));
};

const deleteOne = (id) => {
  return db.query(
    `
    DELETE FROM 
      projects 
    WHERE
      id=$1
    RETURNING *`,
    [id]
  );
};

const statusCount = (id) => {
  return db.query(
    `
    SELECT
      issue_status_types.id, issue_status_types.name, issue_status_types.description, COUNT(issues.status) 
    FROM
      (SELECT * FROM issues where project_id = $1) as issues
    RIGHT OUTER JOIN
      issue_status_types ON issue_status_types.id = issues.status
    GROUP BY
      issue_status_types.id
    ORDER BY
      issue_status_types.rank_order
    `,
    [id]
  );
};

const rowCount = (options) => {
  const { query, colValues } = selectProjectsQuery(options, "projects");
  return db.query(query, colValues);
};

export default {
  insertOne,
  find,
  findOne,
  updateOne,
  deleteOne,
  statusCount,
  rowCount,
};
