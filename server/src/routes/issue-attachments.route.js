import express from "express";
const router = express.Router();

import IssueAttachmentController from "../../src/controllers/issue-attachment/index.js";

router.post("/issues/:id/attachments", IssueAttachmentController.create);
router.get("/issues/:id/attachments", IssueAttachmentController.index);

export default router;
