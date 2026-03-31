import express from 'express';
import { placeOrderCOD, getUserOrder }  from '../controllers/order.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'


const router = express.Router();

router.post('/cod', authMiddleware(['USER']), placeOrderCOD);
router.get('/user', authMiddleware(['USER']), getUserOrder);

export default router;