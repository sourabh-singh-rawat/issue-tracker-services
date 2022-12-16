import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.middleware.js";

import IssueCommentController from "../../src/controllers/issue-comment/index.js";
import IssueController from "../../src/controllers/issue/index.js";
import IssueTaskController from "../../src/controllers/issue-task/index.js";

router.post("/issues", auth, IssueController.create);
router.post("/issues/tasks", auth, IssueTaskController.create);
router.post("/issues/comments", auth, IssueCommentController.create);
router.get("/issues", auth, IssueController.index);
router.get("/issues/status", auth, IssueController.indexStatus);
router.get("/issues/priority", auth, IssueController.indexPriority);
router.get("/issues/:id", auth, IssueController.show);
router.get("/issues/:id/tasks", IssueTaskController.index);
router.get("/issues/:id/tasks/:taskId", auth, IssueTaskController.show);
router.get("/issues/:id/comments", auth, IssueCommentController.index);
router.patch("/issues/:id", auth, IssueController.update);
router.patch("/issues/:id/tasks/:taskId", auth, IssueTaskController.update);
router.patch(
  "/issues/:id/comments/:commentId",
  auth,
  IssueCommentController.update
);
router.delete("/issues/:id", auth, IssueController.destroy);
router.delete("/issues/:id/tasks/:taskId", auth, IssueTaskController.destroy);
router.delete(
  "/issues/:id/comments/:commentId",
  auth,
  IssueCommentController.destroy
);

export default router;
