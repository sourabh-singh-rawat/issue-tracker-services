import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.middleware.js";

import IssueController from "../controllers/issue.controller.js";

router.post("/issues", auth, IssueController.create);
router.post("/issues/tasks", IssueController.createTask);
router.post("/issues/comments", auth, IssueController.createComment);
router.get("/issues", auth, IssueController.index);
router.get("/issues/status", IssueController.indexStatus);
router.get("/issues/priority", IssueController.indexPriority);
router.get("/issues/:id", auth, IssueController.show);
router.get("/issues/:id/tasks", IssueController.indexTasks);
router.get("/issues/:id/tasks/:taskId", IssueController.showTask);
router.get("/issues/:id/comments", IssueController.indexComments);
router.patch("/issues/:id", auth, IssueController.update);
router.patch("/issues/:id/tasks/:taskId", auth, IssueController.updateTask);
router.patch("/issues/:id/comments/:commentId", IssueController.updateComment);
router.delete("/issues/:id", auth, IssueController.destroy);
router.delete("/issues/:id/tasks/:taskId", IssueController.destroyTask);
router.delete(
  "/issues/:id/comments/:commentId",
  IssueController.destroyComment
);

export default router;
