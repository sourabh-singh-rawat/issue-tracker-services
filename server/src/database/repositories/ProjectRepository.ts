import db from '../DatabaseContext.js';
import toSnakeCase from '../../utils/to-snake-case.util.js';

interface projectDto {
  ownerId: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
}

/**
 * Adds a new project to the database
 * @param {Object} project - The project to be added. Takes the following properties:
 *  - ownerId: the id of the user creating the project
 *  - name: the name of the project
 *  - description: the description of the project
 *  - status: the status of the project
 *  - start_date: the start date of the project
 *  - end_date: the end date of the project
 * @returns {Promise} A promise that resolves to the newly added project.
 */

export const insertOne = async ({
  ownerId,
  name,
  description,
  status,
  startDate,
  endDate,
}: projectDto): Promise<any> =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (
    await db.query(
      ` 
        INSERT INTO projects
          (owner_id, name, description, status, start_date, end_date)
        VALUES
          ($1, $2, $3, $4, $5, $6)
        RETURNING
          *
        `,
      [ownerId, name, description, status, startDate, endDate],
    )
  ).rows[0];

/**
 * Finds all projects in the database
 * @param {Object} options
 * @returns {Promise} A promise that resolves to an array of projects
 */
export const find = (options: any) => {
  return db.query(`SELECT * FROM find_projects($1, $2)`, [options.id, 5]);
};

//
export const findOne = (o: any) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  {
    const { projectId, memberId } = o;
    return db.query(
      `
    SELECT 
      id,
      name,
      owner_id as "ownerId",
      description,
      start_date as "startDate",
      status,
      updated_at as "updatedAt",
      end_date as "endDate",
      created_at as "createdAt",
      deleted_at as "deletedAt"
    FROM projects
    WHERE 
      id = $1 
      AND 
      $2 IN (
              SELECT member_id
              FROM   project_members
              WHERE  project_id = $1
            )
    `,
      [projectId, memberId],
    );
  };

export const updateOne = (o: any) => {
  const { id, body } = o;
  const columns = Object.keys(body);
  const values = Object.values(body);

  const setClause = columns
    .map((column, index) => `${toSnakeCase(column)} = $${index + 1}`)
    .join(', ');

  const query = `
    UPDATE projects   
    SET ${setClause}
    WHERE id = '${id}'
    RETURNING *
  `;

  return db.query(query, values);
};

/**
 * Deletes a project from the database
 * @param {*} id
 * @returns {Promise} A promise that resolves to the deleted project
 */
export const deleteOne = (id: string) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  db.query(
    `
    DELETE FROM 
      projects 
    WHERE
      id=$1
    RETURNING *`,
    [id],
  );

export const statusCount = (o: any) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  {
    const { projectId, memberId } = o;
    return db.query(
      `
    SELECT
      issue_status_types.id, 
      issue_status_types.name, 
      issue_status_types.description, 
      COUNT(issues.status), -- total count
      -- count for last week
      (
        SELECT COUNT(*)
        FROM issues 
        WHERE 
          project_id = $1 AND 
          $2 IN (
                  SELECT member_id
                  FROM   project_members
                  WHERE  project_id = $1
                )
           AND status = issue_status_types.id
           AND created_at BETWEEN (NOW() - INTERVAL '1 WEEK') AND NOW()
      ) as "weeklyCount"
    FROM
      (
        SELECT *
        FROM issues 
        WHERE 
          project_id = $1 AND 
          $2 IN (
                  SELECT member_id
                  FROM   project_members
                  WHERE  project_id = $1
                )
      ) as issues
    RIGHT OUTER JOIN
      issue_status_types ON issue_status_types.id = issues.status
    GROUP BY
      issue_status_types.id
    ORDER BY
      issue_status_types.rank_order
    `,
      [projectId, memberId],
    );
  };

export const rowCount = () => {
  // const { query, colValues } = buildProjectsQuery(options, 'projects');
  // return db.query(query, colValues);
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