import db from "../../config/db.config.js";

const insertOne = async ({ typeId, projectId, userId }) => {
  return db.query(
    `
      INSERT INTO 
        project_activities (type_id, project_id, user_id)
      VALUES
        ($1, $2, $3);
    `,
    [typeId, projectId, userId]
  );
};

const find = async ({ projectId, memberId }) => {
  return db.query(
    `
      SELECT
        pa.id, 
        pat.name as "acitivityName", 
        pat.description as "activityDescription",
        pa.type_id as "activityTypeId", 
        pa.project_id as "projectId", 
        pa.user_id as "userId", 
        pa.created_at as "createdAt", 
        pa.updated_at as "updatedAt",
        users.name as "userName", 
        users.email as "userEmail"
      FROM
        project_activities AS pa
      INNER JOIN 
        users
          ON pa.user_id = users.id
      INNER JOIN
        project_activity_types AS pat
          ON pa.type_id = pat.id
      WHERE
        pa.project_id = $1
        AND 
        $2 IN (
          SELECT member_id
          FROM   project_members
          WHERE  project_id = $1
        )
      ORDER BY
        pa.created_at DESC;
    `,
    [projectId, memberId]
  );
};

export default { insertOne, find };
