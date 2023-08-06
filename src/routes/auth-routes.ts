import express from 'express';
import { Token, login, logout, register } from '../controllers/auth-controller';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);
router.get('/user/token', Token);

export default router;
