import express from "express";
const router = express.Router();
import ProjectsController from "../controllers/ProjectsController.js";

router.post("/projects/create", ProjectsController.createProject);
router.get("/projects/:id", ProjectsController.getProject);
router.get("/projects", ProjectsController.getAllProjects);
router.patch("/project/:id", ProjectsController.updateProject);

export default router;
