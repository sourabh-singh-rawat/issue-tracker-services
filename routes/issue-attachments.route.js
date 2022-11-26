import express from "express";
const router = express.Router();

import IssueAttachments from "../controllers/issue-attachment.controller.js";

router.post("/issues/:id/attachments", IssueAttachments.create);
router.get("/issues/:id/attachments", IssueAttachments.index);
router.get("/issues/:id/attachments", IssueAttachments.destroy);

export default router;
