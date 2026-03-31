import express from 'express';
import {processPayment, paymentVerification, sendAPIKey} from '../controllers/paymentController.js';
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router();

//payment
router.post('/process', authMiddleware(['USER']), processPayment);
router.post('/paymentVerification', authMiddleware(['USER']), paymentVerification);
router.get('/getKey', authMiddleware(['USER']), sendAPIKey);

export default router;