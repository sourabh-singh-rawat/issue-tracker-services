/* eslint-disable import/named */

import express from 'express';
import { auth } from '../middlewares/auth.middleware.js';

import IssueController from '../controllers/issue/index.js';
import IssueTaskController from '../controllers/issue-task/index.js';
import IssueCommentController from '../controllers/issue-comment/index.js';

const router = express.Router();

router.post('/issues', auth, IssueController.create);
router.post('/issues/tasks', auth, IssueTaskController.create);
router.post('/issues/comments', auth, IssueCommentController.create);
router.get('/issues', auth, IssueController.index);
router.get('/issues/status', auth, IssueController.indexStatus);
router.get('/issues/priority', auth, IssueController.indexPriority);
router.get('/issues/:id', auth, IssueController.show);
router.get('/issues/:id/tasks', IssueTaskController.index);
router.get('/issues/:id/tasks/:taskId', auth, IssueTaskController.show);
router.get('/issues/:id/comments', auth, IssueCommentController.index);
router.patch('/issues/:id', auth, IssueController.update);
router.patch('/issues/:id/tasks/:taskId', auth, IssueTaskController.update);
router.patch(
  '/issues/:id/comments/:commentId',
  auth,
  IssueCommentController.update,
);
router.delete('/issues/:id', auth, IssueController.destroy);
router.delete('/issues/:id/tasks/:taskId', auth, IssueTaskController.destroy);
router.delete(
  '/issues/:id/comments/:commentId',
  auth,
  IssueCommentController.destroy,
);

export default router;
