import express from "express";
const router = express.Router();
import ProjectController from "../controllers/ProjectController.js";

router.post("/projects", ProjectController.create);
router.get("/projects", ProjectController.index);
router.get("/projects/:id", ProjectController.show);
router.patch("/projects/:id", ProjectController.update);
router.delete("/projects/:id", ProjectController.destroy);

export default router;
