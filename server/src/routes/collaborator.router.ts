import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import CollaboratorController from '../controllers/CollaboratorController.js';

const router = express.Router();

router.get('/collaborators', auth.verify, CollaboratorController.index);

export default router;
