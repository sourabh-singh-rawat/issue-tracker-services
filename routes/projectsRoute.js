import express from "express";
import pool from "../db/connect.js";
const router = express.Router();

router.put("/project/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { field, value } = req.body;
  const mapFieldToQuery = {
    name: "UPDATE projects SET name = $1 WHERE id = $2",
    status: "UPDATE projects SET status = $1 WHERE id = $2",
    description: "UPDATE projects SET description = $1 WHERE id = $2",
    startDate: "UPDATE projects SET start_date = $1 WHERE id = $2",
    endDate: "UPDATE projects SET end_date = $1 WHERE id = $2",
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
  pool.query(`SELECT * FROM projects`, (error, result) => {
    if (error) {
      return res.status(500).send("Error getting projects");
    }
    return res.status(200).json(result.rows);
  });
});

router.post("/projects/create", (req, res) => {
  const { name, description, ownerUid, ownerEmail, startDate, endDate } =
    req.body;

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
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error creating table");
      }

      // Add project to projects table
      pool.query(
        `INSERT INTO projects (name, description, owner_uid, owner_email, start_date, end_date)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [name, description, ownerUid, ownerEmail, startDate, endDate],
        (error, result) => {
          if (error) {
            return console.log("Error adding project to projects table", error);
          }

          console.log(result.rows[0]);
          console.log("Project added to projects table");
          return res.status(200).send(result.rows[0]);
        }
      );
    }
  );
});

export default router;
