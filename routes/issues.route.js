import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.middleware.js";

import IssueController from "../controllers/issue.controller.js";

router.post("/issues", IssueController.create);
router.get("/issues", auth, IssueController.index);
router.get("/issues/status", IssueController.indexIssueStatus);
router.get("/issues/priority", IssueController.indexIssuePriority);
router.get("/issues/:id", IssueController.show);
router.patch("/issues/:id", IssueController.update);
router.delete("/issues/:id", IssueController.destroy);

export default router;
