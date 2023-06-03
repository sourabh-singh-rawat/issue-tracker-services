import express from 'express';

import UserController from '../controllers/UserController.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/users', auth.verify, UserController.createNewUser);
router.get('/users/:id', auth.verify, UserController.getUser);
router.patch('/users/:id', auth.verify, UserController.updateUser);
router.delete('/users/:id', auth.verify, UserController.deleteUser);

export default router;
