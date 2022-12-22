/* eslint-disable import/extensions */
import express from 'express';

import UserController from '../controllers/user/index.js';

const router = express.Router();

router.post('/users', UserController.create);
router.get('/users/:id', UserController.show);
router.patch('/users/:id', UserController.update);
router.delete('/users/:id', UserController.destroy);

export default router;
