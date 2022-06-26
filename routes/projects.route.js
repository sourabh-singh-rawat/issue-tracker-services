import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.middleware.js";
import ProjectController from "../controllers/project.controller.js";

router.post("/projects", ProjectController.create);
router.get("/projects", auth, ProjectController.index);
router.get("/projects/:id", ProjectController.show);
router.get("/projects/:id/members", ProjectController.indexProjectMembers);
router.patch("/projects/:id", ProjectController.update);
router.delete("/projects/:id", ProjectController.destroy);

export default router;
