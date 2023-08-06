import express from 'express';
import { Update, getUser } from '../controllers/user-controller';
import { verifyToken } from '../middleware/verifytoken';

const router = express.Router();

router.get('/users', verifyToken, getUser);
router.patch('/users', verifyToken, Update);

export default router;
