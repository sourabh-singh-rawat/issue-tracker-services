import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import ProjectController from "../controllers/project.controller.js";

const router = express.Router();

router.post("/projects", auth, ProjectController.create);
router.post("/projects/:id/members", auth, ProjectController.createMember);
router.post("/projects/:id/members/invite", auth, ProjectController.invite);
router.get("/projects", auth, ProjectController.index);
router.get("/projects/status", ProjectController.indexStatus);
router.get("/projects/members/roles", auth, ProjectController.indexRoles);
router.get("/projects/:id", auth, ProjectController.show);
router.get("/projects/:id/members", ProjectController.indexMembers);
router.get(
  "/projects/:id/issuesStatusCount",
  auth,
  ProjectController.showIssuesStatusCount
);
router.get("/projects/:id/members/confirm", ProjectController.confirmInvite);
router.patch("/projects/:id", auth, ProjectController.update);
router.delete("/projects/:id", ProjectController.destroy);

export default router;
