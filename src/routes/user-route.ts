import express from 'express';
import { Update, getUser } from '../controllers/user-controller';
import { verifyToken } from '../middleware/verifytoken';

const router = express.Router();

router.get('/user', verifyToken, getUser);
router.patch('/user', verifyToken, Update);

export default router;
