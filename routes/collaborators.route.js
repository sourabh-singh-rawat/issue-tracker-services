import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.middleware.js";
import Collaborators from "../controllers/collaborators.controller.js";

router.get("/collaborators", auth, Collaborators.index);

export default router;
