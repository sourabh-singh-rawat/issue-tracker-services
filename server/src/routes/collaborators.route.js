import express from "express";
const router = express.Router();
import { auth } from "../../src/middlewares/auth.middleware.js";

import CollaboratorController from "../../src/controllers/collaborator/index.js";

router.get("/collaborators", auth, CollaboratorController.index);

export default router;
