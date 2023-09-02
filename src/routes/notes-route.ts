import express from 'express';
import { verifyToken } from '../middleware/verifytoken';
import {
  create,
  remove,
  search,
  update,
} from '../controllers/notes-controller';

const router = express.Router();

router.post('/notes', verifyToken, create);
router.get('/notes', verifyToken, search);
router.patch('/notes/:id', verifyToken, update);
router.delete('/notes/:id', verifyToken, remove);

export default router;
