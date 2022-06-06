import express from "express";
import pool from "../db/connect.js";
const router = express.Router();

router.put("/issue/:issueId", (req, res) => {
  const { issueId } = req.params;
  const { projectId } = req.query;
  const { field, value } = req.body;
  const mapFieldToQuery = {
    name: "UPDATE issues SET name = $1 WHERE id  = $2",
    description: "UPDATE issues SET description = $1 WHERE id  = $2",
  };

  pool.query(
    "SELECT * FROM issues WHERE project_id = $1",
    [projectId],
    (error) => {
      if (error) {
        console.log(` Cannot get the project with project id: ${projectId}`);
        return res.status(404);
      }

      pool.query(mapFieldToQuery[field], [value, issueId], (error, result) => {
        if (error) return res.status(400).send("Error: cannot update");
        return res.send(result.rows[0]);
      });
    }
  );
});

router.get("/issues", (req, res) => {
  const { projectId } = req.query;
  if (projectId)
    return pool.query(
      `SELECT *, issues.due_date AS "dueDate" FROM issues WHERE project_id = $1`,
      [projectId],
      (error, result) => {
        if (error) {
          console.log("Cannot find issues with project", error);
          return res.status(404);
        }

        return res.send(result.rows);
      }
    );
  else
    pool.query(
      `SELECT *, due_date AS "dueDate" FROM issues`,
      (error, result) => {
        if (error) {
          console.log("Cannot fetch issues from issue table", error);
          return res.status(404);
        }

        res.send(result.rows);
      }
    );
});

router.get("/issue/:issueId", (req, res) => {
  const { issueId } = req.params;
  if (issueId) {
    pool.query(
      ` SELECT 
          i.id, i.name, i.description, i.status, i.priority, i.reporter, i.assignee, 
          i.due_date AS "dueDate",
          i.project_id AS "projectId",
          p.name AS "projectName",
          p.owner_uid AS "projectOwnerUid"
        FROM issues AS i JOIN projects AS p ON i.project_id = p.id 
        WHERE i.id = $1`,
      [issueId],
      (error, result) => {
        if (error) {
          console.log("Cannot fetch issue", error);
          return res.status(404);
        }

        return res.send(result.rows[0]);
      }
    );
  }
});

router.post("/issues/create", (req, res) => {
  pool.query(
    `CREATE TABLE IF NOT EXISTS issues (
      id SERIAL,
      name VARCHAR(255),
      description VARCHAR(255),
      status VARCHAR(50),
      priority VARCHAR(50),
      reporter VARCHAR(255),
      assignee VARCHAR(255),
      due_date DATE,
      project_id INTEGER,

      PRIMARY KEY (id),
      FOREIGN KEY (project_id) REFERENCES projects(id)
    )`,
    (error) => {
      if (error) {
        console.log("Error creating table", error);
        return res.status(404);
      }

      const {
        name,
        description,
        status,
        priority,
        reporter,
        assignee,
        dueDate,
        projectId,
      } = req.body;

      pool.query(
        `INSERT INTO issues (name, description, status, priority, reporter, assignee, due_date, project_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          name,
          description,
          status,
          priority,
          reporter,
          assignee,
          dueDate,
          projectId,
        ],
        (error) => {
          if (error) {
            console.log("Error adding issue to issues table", error);
            return res.status(404);
          }

          console.log("Issue added in the database");
          return res.status(200);
        }
      );
    }
  );
});

export default router;
