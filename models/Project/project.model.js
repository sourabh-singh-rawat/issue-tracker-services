import db from "../../configs/db.config.js";
import { selectProjectsQuery } from "./utils/select-projects-query.utils.js";
import ProjectMember from "../../models/project-member/project-member.model.js";
import projectMemberRole from "../project-member-roles/project-member-roles.model.js";

/**
 * Adds a new project to the database
 * @param {Object} project - The project to be added. Takes the following properties:
 * - id: the id of the user creating the project
 * - name: the name of the project
 * - description: the description of the project
 * - status: the status of the project
 * - start_date: the start date of the project
 * - end_date: the end date of the project
 * @returns {Promise} A promise that resolves to the newly added project.
 */
const insertOne = async ({
  id,
  name,
  description,
  status,
  startDate,
  endDate,
}) => {
  const pool = await db.connect();
  try {
    await db.query("BEGIN");

    // Insert project into projects table
    // TODO: Add a check to make sure the user is not already a member of the project
    const createdProject = (
      await db.query(
        ` 
        INSERT INTO projects
          (owner_id, name, description, status, start_date, end_date)
        VALUES
          ($1, $2, $3, $4, $5, $6)
        RETURNING
          *
        `,
        [id, name, description, status, startDate, endDate]
      )
    ).rows[0];

    // Select default project member role
    const defaultRole = (await projectMemberRole.find()).rows[0].id;

    // Insert project owner into project_members table
    await ProjectMember.insertOne({
      roleId: defaultRole,
      projectId: createdProject.id,
      memberId: id,
    });

    await db.query("COMMIT");

    return createdProject;
  } catch (error) {
    await db.query("ROLLBACK");

    return error;
  } finally {
    pool.release();
  }
};

/**
 * Finds all projects in the database
 * @param {Object} options
 * @returns {Promise} A promise that resolves to an array of projects
 */
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

/**
 * Deletes a project from the database
 * @param {*} id
 * @returns {Promise} A promise that resolves to the deleted project
 */
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
