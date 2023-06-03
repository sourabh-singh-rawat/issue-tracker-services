import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.post('/auth/createToken', auth.verify, AuthController.createToken);
router.post('/auth/verifyToken', AuthController.verifyToken);

export default router;