import express from 'express';
import { verifyToken } from '../middleware/verifytoken';
import { create, get, remove, update } from '../controllers/notes-controller';

const router = express.Router();

router.post('/notes', verifyToken, create);
router.get('/notes', verifyToken, get);
router.patch('/notes/:id', verifyToken, update);
router.delete('/notes/:id', verifyToken, remove);

export default router;
