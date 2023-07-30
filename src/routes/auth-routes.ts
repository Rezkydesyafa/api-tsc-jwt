import express from 'express';
import { Token, login, logout, register } from '../controllers/auth-controller';
const router = express.Router();

router.post('/user', register);
router.post('/user/login', login);
router.delete('/user/logout', logout);
router.get('/user/token', Token);

export default router;
