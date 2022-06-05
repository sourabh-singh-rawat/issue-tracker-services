const express = require("express");
const router = express.Router();
const pool = require("../database");

router.put("/issue/:issueId", (req, res) => {
  const { issueId } = req.params;
  const { projectId } = req.query;
  const { field, value } = req.body;
  console.log(field, value, projectId);
  const mapFieldToQuery = {
    name: "UPDATE issues SET name = $1 WHERE id  = $2",
    description: "UPDATE issues SET description = $1 WHERE id  = $2",
  };

  pool.query(
    "SELECT * FROM issues WHERE project_id = $1",
    [projectId],
    (error, result) => {
      if (error)
        return res.send(
          "Error: Cannot get the project with project id: " + projectId
        );

      // update
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
          return res
            .status(404)
            .send("Cannot fetch issues from project with id " + projectId);
        }

        return res.send(result.rows);
      }
    );
  else
    pool.query(
      `SELECT *, due_date AS "dueDate" FROM issues`,
      (error, result) => {
        if (error) {
          return res.status(404).end("Cannot fetch issues from issue table");
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
          console.log(error);
          return res.status(404).send("Cannot fetch issue");
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
    (error, result) => {
      if (error) {
        return res.status(500).send("Error creating table");
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

      // adding a new issue to the issues table
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
        (error, result) => {
          if (error) {
            return console.log("Error adding issue to issues table", error);
          }

          console.log("Issue added to issues table");
          return res.status(200).send("Issue added to issues table");
        }
      );
    }
  );
});

module.exports = router;
