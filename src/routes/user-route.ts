import express from 'express';
import { getUser, login, register } from '../controllers/user-controller';
import { verifyToken } from '../middleware/verifytoken';

const router = express.Router();

router.get('/user', verifyToken, getUser);
router.post('/user', register);
router.post('/user/login', login);

export default router;
