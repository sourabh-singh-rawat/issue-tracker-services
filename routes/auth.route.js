import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/createToken", AuthController.createToken);
router.post("/auth/verifyToken", AuthController.verifyToken);

export default router;
