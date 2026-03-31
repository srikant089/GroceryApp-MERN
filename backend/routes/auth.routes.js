import express from 'express';
import { isAuthUser, login, logout, register }  from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware(['USER']), logout);
router.get('/isAuth', authMiddleware(['USER']), isAuthUser);

export default router;