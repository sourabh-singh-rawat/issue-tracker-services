import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.middleware.js";

import TeamController from "../controllers/team.controller.js";

router.post("/teams", auth, TeamController.create);
router.post("/teams/:id/members", TeamController.createMember);
router.get("/teams", TeamController.index);
router.get("/teams/:id", TeamController.show);
router.get("/teams/:id/members", TeamController.indexMembers);
router.patch("/teams/:id", TeamController.update);

export default router;
