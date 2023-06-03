/* eslint-disable import/named */

import express from 'express';
import auth from '../middlewares/auth.middleware.js';

import IssueController from '../controllers/IssueController.js';
import IssueTaskController from '../controllers/IssueTaskController.js';
import IssueCommentController from '../controllers/IssueCommentController.js';

const router = express.Router();

router.post('/issues', auth.verify, IssueController.create);
router.post('/issues/tasks', auth.verify, IssueTaskController.create);
router.post('/issues/comments', auth.verify, IssueCommentController.create);
router.get('/issues', auth.verify, IssueController.index);
router.get('/issues/status', auth.verify, IssueController.indexStatus);
router.get('/issues/priority', auth.verify, IssueController.indexPriority);
router.get('/issues/:id', auth.verify, IssueController.show);
router.get('/issues/:id/tasks', IssueTaskController.index);
router.get('/issues/:id/tasks/:taskId', auth.verify, IssueTaskController.show);
router.get('/issues/:id/comments', auth.verify, IssueCommentController.index);
router.patch('/issues/:id', auth.verify, IssueController.update);
router.patch(
  '/issues/:id/tasks/:taskId',
  auth.verify,
  IssueTaskController.update,
);
router.patch(
  '/issues/:id/comments/:commentId',
  auth.verify,
  IssueCommentController.update,
);
router.delete('/issues/:id', auth.verify, IssueController.destroy);
router.delete(
  '/issues/:id/tasks/:taskId',
  auth.verify,
  IssueTaskController.destroy,
);
router.delete(
  '/issues/:id/comments/:commentId',
  auth.verify,
  IssueCommentController.destroy,
);

export default router;
