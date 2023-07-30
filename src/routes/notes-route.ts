import express from 'express';
import { verifyToken } from '../middleware/verifytoken';
import { create } from '../controllers/notes-controller';

const router = express.Router();

router.post('/notes', verifyToken, create);

export default router;
