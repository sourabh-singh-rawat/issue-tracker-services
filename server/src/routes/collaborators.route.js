/* eslint-disable import/named */

import express from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import CollaboratorController from '../controllers/collaborator/index.js';

const router = express.Router();

router.get('/collaborators', auth, CollaboratorController.index);

export default router;
