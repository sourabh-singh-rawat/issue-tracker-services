import express from "express";
const router = express.Router();
import ProjectMember from "../models/projectMember.model.js";

router.get("/collaborators", async (req, res) => {
  const { uid } = req.query;
  try {
    // Every project of user
    const result = (await ProjectMember.findPeopleRelatedToUid(uid)).rows;

    // Every team of user

    res.send({ rows: result, rowCount: -1 });
  } catch (error) {
    res.status(500);
  }
});

export default router;
