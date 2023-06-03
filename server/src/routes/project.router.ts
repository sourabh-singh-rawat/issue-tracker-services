/* eslint-disable import/named */

import express from 'express';
import auth from '../middlewares/auth.middleware.js';

import ProjectController from '../controllers/ProjectController.js';

const router = express.Router();

// router.post('/projects', auth.verify, ProjectController.create);
// router.post(
//   '/projects/:id/members',
//   auth.verify,
//   ProjectController.createMember,
// );
// router.post(
//   '/projects/:id/members/invite',
//   auth.verify,
//   ProjectController.invite,
// );
// router.get('/projects', auth.verify, ProjectController.index);
// router.get('/projects/status', auth.verify, ProjectController.indexStatus);
// router.get(
//   '/projects/members/roles',
//   auth.verify,
//   ProjectController.indexMemberRoles,
// );
// router.get('/projects/:id', auth.verify, ProjectController.show);
// router.get(
//   '/projects/:id/members',
//   auth.verify,
//   ProjectController.indexMembers,
// );
// router.get(
//   '/projects/:id/issuesStatusCount',
//   auth.verify,
//   ProjectController.showIssuesStatusCount,
// );
// router.get('/projects/:id/members/confirm', ProjectController.confirmInvite);
// router.get(
//   '/projects/:id/activity',
//   auth.verify,
//   ProjectController.indexActivity,
// );
// router.patch('/projects/:id', auth.verify, ProjectController.update);
// router.delete('/projects/:id', auth.verify, ProjectController.destroy);

export default router;
