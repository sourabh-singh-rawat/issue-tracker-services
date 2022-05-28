const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/issues/:issueId", (req, res) => {
  const { issueId } = req.params;

  if (issueId) {
    pool.query(
      "SELECT * FROM issues WHERE issueid = $1",
      [issueId],
      (error, result) => {
        if (error) {
          return res.status(500).send("Cannot fetch issue");
        }
        res.send(result.rows[0]);
      }
    );
  }
});

router.get("/issues", (req, res) => {
  // check query parameters
  const { project_id } = req.query;

  if (project_id) {
    return pool.query(
      "SELECT * FROM issues WHERE projectid = $1",
      [project_id],
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .send("Cannot fetch issues from project with id " + project_id);
        }
        res.send(result.rows);
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
    issueName,
    issueDescription,
    projectName,
    projectId,
    issueReporter,
    issuePriority,
    issueStatus,
    issueAssignee,
    dueDate,
  } = req.body;

  // storing this data in a database
  // creating a new issue in issue table
  pool.query(
    `CREATE TABLE IF NOT EXISTS issues (
      issueId SERIAL,
      issueName VARCHAR(255),
      issueDescription VARCHAR(255),
      projectName VARCHAR(255),
      projectId INTEGER ,
      issueReporter VARCHAR(255),
      issuePriority VARCHAR(255),
      issueStatus VARCHAR(255),
      issueAssignee VARCHAR(255),
      dueDate VARCHAR(255),

      PRIMARY KEY (issueId),
      FOREIGN KEY (projectId) REFERENCES projects(id)
    )`,
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error creating table");
      }

      // adding a new issue to the issues table
      pool.query(
        `INSERT INTO issues (issueName, issueDescription, projectName, projectId, issueReporter, issuePriority, issueStatus, issueAssignee, dueDate)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          issueName,
          issueDescription,
          projectName,
          projectId,
          issueReporter,
          issuePriority,
          issueStatus,
          issueAssignee,
          dueDate,
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
