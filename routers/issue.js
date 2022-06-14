import express from "express";
const router = express.Router();
import IssueController from "../controllers/IssueController.js";

router.post("/issues", IssueController.create);
router.get("/issues", IssueController.index);
router.get("/issues/:id", IssueController.show);
router.patch("/issues/:id", IssueController.update);
router.delete("/issues/:id", IssueController.destroy);

export default router;
