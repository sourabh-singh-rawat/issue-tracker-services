const express = require("express");
const router = express.Router();
const pool = require("../database");

router.put("/issue/:issueId", (req, res) => {
  const { issueId } = req.params;
  const { projectId } = req.query;
  const { field, newVal } = req.body;

  const mapFieldToQuery = {
    issue_name:
      "UPDATE issues SET issue_name = $1 WHERE issue_id = $2 AND project_id = $3",
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
      pool.query(
        mapFieldToQuery[field],
        [newVal, issueId, projectId],
        (error, result) => {
          if (error) return res.status(400).send("Error: cannot update");
          return res.send(result.rows[0]);
        }
      );
    }
  );
});

// single issue
router.get("/issue/:issueId", (req, res) => {
  const { issueId } = req.params;
  if (issueId) {
    pool.query(
      "SELECT * FROM issues JOIN projects ON  issues.project_id = projects.id where issue_id = $1",
      [issueId],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(404).send("Cannot fetch issue");
        }
        console.log(result.rows[0]);
        return res.send(result.rows[0]);
      }
    );
  }
});

router.get("/issues", (req, res) => {
  // check query parameters
  const { project_id } = req.query;

  if (project_id) {
    return pool.query(
      "SELECT * FROM issues WHERE project_id = $1",
      [project_id],
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .send("Cannot fetch issues from project with id " + project_id);
        }
        return res.send(result.rows);
      }
    );
  }

  pool.query("SELECT * FROM issues", (error, result) => {
    if (error) {
      return res.status(500).end("Error fetching issues from issue table");
    }
    res.send(result.rows);
  });
});

router.post("/issues/create", (req, res) => {
  const {
    issue_name,
    issue_description,
    project_name,
    project_id,
    issue_reporter,
    issue_priority,
    issue_status,
    issue_assignee,
    due_date,
  } = req.body;
  console.log(req.body);

  // storing this data in a database
  // creating a new issue in issue table
  pool.query(
    `CREATE TABLE IF NOT EXISTS issues (
      issue_id SERIAL,
      issue_name VARCHAR(255),
      issue_description VARCHAR(255),
      project_name VARCHAR(255),
      project_id INTEGER ,
      issue_reporter VARCHAR(255),
      issue_priority VARCHAR(255),
      issue_status VARCHAR(255),
      issue_assignee VARCHAR(255),
      due_date VARCHAR(255),

      PRIMARY KEY (issue_id),
      FOREIGN KEY (project_id) REFERENCES projects(id)
    )`,
    (error, result) => {
      if (error) {
        return res.status(500).send("Error creating table");
      }

      // adding a new issue to the issues table
      pool.query(
        `INSERT INTO issues (issue_name, issue_description, project_name, project_id, issue_reporter, issue_priority, issue_status, issue_assignee, due_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          issue_name,
          issue_description,
          project_name,
          project_id,
          issue_reporter,
          issue_priority,
          issue_status,
          issue_assignee,
          due_date,
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
