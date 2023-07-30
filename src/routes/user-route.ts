import express from 'express';
import { getUser } from '../controllers/user-controller';
import { verifyToken } from '../middleware/verifytoken';

const router = express.Router();

router.get('/user', verifyToken, getUser);

export default router;
