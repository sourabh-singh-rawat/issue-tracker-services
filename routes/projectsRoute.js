import express from "express";
const router = express.Router();
import ProjectsController from "../controllers/ProjectsController.js";

router.get("/projects", ProjectsController.getAllProjects);
router.get("/projects/:id", ProjectsController.getProject);
router.patch("/projects/:id", ProjectsController.updateProject);
router.post("/projects/create", ProjectsController.createProject);

export default router;
