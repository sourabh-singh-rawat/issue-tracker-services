import express from "express";
const router = express.Router();

import UserController from "../controllers/user.controller.js";

router.post("/users", UserController.create);
// router.get("/users", UserController.index);
router.get("/users/:id", UserController.show);
router.patch("/users/:id", UserController.update);
router.delete("/users/:id", UserController.destroy);

export default router;
