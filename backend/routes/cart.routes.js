import express from 'express';
import { getUserCart,addToCart, updateCart,removeItemFromCart }  from '../controllers/cart.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'


const router = express.Router();
router.post('/add', authMiddleware(['USER']), addToCart);
router.put('/:id', authMiddleware(['USER']), updateCart);
router.patch('/removeItemFromCart', authMiddleware(['USER']), removeItemFromCart);
router.get('', authMiddleware(['USER']), getUserCart);

export default router;