import express from "express";
const router = express.Router();
import db from "../db/connect.js";
import IssuesController from "../controllers/IssuesController.js";

router.get("/issues", IssuesController.getAllIssuesByProjectId);
router.get("/issues/all", IssuesController.getAllIssues);
router.get("/issue/:issueId", IssuesController.getIssue);
router.put("/issue/:issueId", IssuesController.updateIssue);

router.post("/issues/create", (req, res) => {
  db.query(
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

      db.query(
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
