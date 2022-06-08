import express from "express";
const router = express.Router();
import db from "../db/connect.js";
import IssuesController from "../controllers/IssuesController.js";

router.post("/issues/create", IssuesController.createIssue);
router.get("/issues", IssuesController.getAllIssuesByProjectId);
router.get("/issues/all", IssuesController.getAllIssues);
router.get("/issues/:issueId", IssuesController.getIssue);
router.patch("/issues/:issueId", IssuesController.updateIssue);

export default router;
