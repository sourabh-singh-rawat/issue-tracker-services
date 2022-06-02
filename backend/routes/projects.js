const express = require("express");
const router = express.Router();
const pool = require("../database");

router.put("/project/:projectid", (req, res) => {
  const { projectid } = req.params;
  const { newFieldValue } = req.body;

  pool.query(
    "SELECT * FROM projects WHERE id = $1",
    [projectid],
    (error, result) => {
      if (error)
        return res.send(
          "Error: Cannot get the project with project id: " + projectid
        );

      // update
      pool.query(
        "UPDATE projects SET name = $1 WHERE id = $2",
        [newFieldValue, projectid],
        (error, result) => {}
      );
      return res.send(result.rows[0]);
    }
  );
});

router.get("/projects/:projectId", (req, res) => {
  const { projectId } = req.params;

  // Search this id in Projects Database
  pool.query(
    `SELECT * FROM projects WHERE id = $1`,
    [projectId],
    (error, result) => {
      if (error) return res.status(500).send("Cannot find project in database");

      const {
        id,
        name,
        description,
        owner_uid,
        owner_email,
        start_date,
        end_date,
      } = result;

      res.send(result.rows[0]);
    }
  );
});

router.get("/projects", (req, res) => {
  // TODO: confirm authentication and then send data back
  pool.query(`SELECT * FROM projects`, (error, result) => {
    if (error) {
      return res.status(500).send("Error getting projects");
    }
    return res.status(200).json(result.rows);
  });
});

router.post("/projects/create", (req, res) => {
  // description: Add a project
  // response:
  //   status:
  //     200: Success
  //     500: Error
  //   data:
  //     string: "Project added to projects table"
  const {
    projectName,
    projectDescription,
    projectOwnerUID,
    projectOwnerEmail,
    startDate,
    endDate,
  } = req.body;
  // Create projects table if not exits
  pool.query(
    `CREATE TABLE IF NOT EXISTS projects (
      id SERIAL,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      owner_uid VARCHAR(255) NOT NULL,
      owner_email VARCHAR(255) NOT NULL,
      start_date DATE,
      end_date DATE,
      number_of_issues INTEGER,
      PRIMARY KEY (id),
      FOREIGN KEY (owner_uid) REFERENCES users(uid)
    )`,
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error creating table");
      }

      // Add project to projects table
      pool.query(
        `INSERT INTO projects (name, description, owner_uid, owner_email, start_date, end_date)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          projectName,
          projectDescription,
          projectOwnerUID,
          projectOwnerEmail,
          startDate,
          endDate,
        ],
        (error, result) => {
          if (error) {
            return console.log("Error adding project to projects table", error);
          }

          console.log("Project added to projects table");
          return res.status(200).send("Project added to projects table");
        }
      );
    }
  );
});

module.exports = router;
