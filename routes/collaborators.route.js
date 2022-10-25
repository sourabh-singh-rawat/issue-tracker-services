import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.middleware.js";
import Collaborators from "../controllers/collaborator.controller.js";

router.get("/collaborators", auth, Collaborators.index);

export default router;
