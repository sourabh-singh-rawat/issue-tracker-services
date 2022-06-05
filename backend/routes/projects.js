const express = require("express");
const router = express.Router();
const pool = require("../database");

router.put("/project/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { field, value } = req.body;
  const mapFieldToQuery = {
    name: "UPDATE projects SET name = $1 WHERE id = $2",
    status: "UPDATE projects SET status = $1 WHERE id = $2",
    description: "UPDATE projects SET description = $1 WHERE id = $2",
    start_date: "UPDATE projects SET start_date = $1 WHERE id = $2",
    end_date: "UPDATE projects SET end_date = $1 WHERE id = $2",
  };
  console.log(field, value, projectId);

  pool.query(
    "SELECT * FROM projects WHERE id = $1",
    [projectId],
    (error, result) => {
      if (error)
        return res.send(
          "Error: Cannot get the project with project id: " + projectId
        );

      pool.query(
        mapFieldToQuery[field],
        [value, projectId],
        (error, result) => {
          console.log(error);
          if (error) return res.status(400).send("Error: cannot update");
          return res.send(result.rows[0]);
        }
      );
    }
  );
});

router.get("/projects/:projectId", (req, res) => {
  const { projectId } = req.params;

  pool.query(
    `SELECT * FROM projects WHERE id = $1`,
    [projectId],
    (error, result) => {
      if (error) return res.status(404).send("Cannot find project in database");
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
      id TEXT,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      owner_uid VARCHAR(255) NOT NULL,
      owner_email VARCHAR(255) NOT NULL,
      start_date TIMESTAMP WITH TIME ZONE,
      end_date TIMESTAMP WITH TIME ZONE,
      status VARCHAR(25),

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
