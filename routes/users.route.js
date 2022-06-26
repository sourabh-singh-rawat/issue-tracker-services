import express from "express";
const router = express.Router();

import UserController from "../controllers/user.controller.js";

router.post("/users", UserController.create); // create user
router.get("/users", UserController.index); // get a list of users
router.get("/users/:id", UserController.show); // get specific user
router.patch("/users/:id", UserController.update); // update specific user
router.delete("/users/:id", UserController.destroy); // delete specific user

export default router;
