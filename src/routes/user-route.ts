import express from 'express';
import { getUser, register } from '../controllers/user-controller';

const router = express.Router();

router.get('/user', getUser);
router.post('/user', register);

export default router;
