/* eslint-disable import/extensions */
import express from 'express';

import IssueAttachmentController from '../controllers/issue-attachment/index.js';

const router = express.Router();

router.post('/issues/:id/attachments', IssueAttachmentController.create);
router.get('/issues/:id/attachments', IssueAttachmentController.index);

export default router;
