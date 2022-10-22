import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.middleware.js";

import IssueController from "../controllers/issue.controller.js";

router.post("/issues", auth, IssueController.create);
router.post("/issues/tasks", auth, IssueController.createTask);
router.post("/issues/comments", auth, IssueController.createComment);
router.get("/issues", auth, IssueController.index);
router.get("/issues/status", auth, IssueController.indexStatus);
router.get("/issues/priority", auth, IssueController.indexPriority);
router.get("/issues/:id", auth, IssueController.show);
router.get("/issues/:id/tasks", auth, IssueController.indexTasks);
router.get("/issues/:id/tasks/:taskId", auth, IssueController.showTask);
router.get("/issues/:id/comments", auth, IssueController.indexComments);
router.patch("/issues/:id", auth, IssueController.update);
router.patch("/issues/:id/tasks/:taskId", auth, IssueController.updateTask);
router.patch(
  "/issues/:id/comments/:commentId",
  auth,
  IssueController.updateComment
);
router.delete("/issues/:id", auth, IssueController.destroy);
router.delete("/issues/:id/tasks/:taskId", auth, IssueController.destroyTask);
router.delete(
  "/issues/:id/comments/:commentId",
  auth,
  IssueController.destroyComment
);

export default router;
