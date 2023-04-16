/* eslint-disable import/named */
import express from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import AuthController from '../controllers/auth/index.js';

const router = express.Router();

router.post('/auth/createToken', auth, AuthController.createToken);
router.post('/auth/verifyToken', AuthController.verifyToken);

export default router;
