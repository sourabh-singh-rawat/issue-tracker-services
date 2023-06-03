/* eslint-disable import/named */

import express from 'express';
import auth from '../middlewares/auth.middleware.js';

import TeamController from '../controllers/TeamController.js';

const router = express.Router();

// router.post('/teams', auth, TeamController.create);
// router.post('/teams/:id/members', TeamController.createMember);
// router.get('/teams', TeamController.index);
// router.get('/teams/:id', TeamController.show);
// router.get('/teams/:id/members', TeamController.indexMembers);
// router.patch('/teams/:id', TeamController.update);

export default router;
