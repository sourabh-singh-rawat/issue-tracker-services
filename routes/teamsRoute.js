import express from "express";
import pool from "../db/connect.js";
const router = express.Router();

router.get("/teams", (req, res) => {
  // get all teams
});

export default router;
