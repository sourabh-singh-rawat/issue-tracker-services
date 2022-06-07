import db from "../db/connect.js";

// GET ALL ISSUES
const getAll = () => {
  return db.query(`SELECT *, issues.due_date AS "dueDate" FROM issues`);
};

// GET ALL ISSUES BY PROJECTID
const getAllByProjectId = (id) => {
  return db.query(
    `SELECT *, issues.due_date AS "dueDate" FROM issues WHERE project_id = $1`,
    [id]
  );
};

// GET ISSUE
const getOne = (id) => {
  return db.query(
    `SELECT 
     i.id, i.name, i.description, i.status, i.priority, i.reporter, i.assignee, 
     i.due_date AS "dueDate",
     i.project_id AS "projectId",
     p.name AS "projectName",
     p.owner_uid AS "projectOwnerUid"
     FROM issues AS i JOIN projects AS p ON i.project_id = p.id 
     WHERE i.id = $1`,
    [id]
  );
};

// UPDATE ISSUE
const updateOne = (issueId, field, value) => {
  const map = {
    name: "UPDATE issues SET name = $1 WHERE id = $2",
    description: "UPDATE issues SET description = $1 WHERE id  = $2",
  };

  return db.query(map[field], [value, issueId]);
};

export default { getAll, getAllByProjectId, getOne, updateOne };
