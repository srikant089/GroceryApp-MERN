import express from "express";
import { addAddress, getAddress }  from '../controllers/address.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get('', authMiddleware(['USER']), getAddress);
router.post('/add', authMiddleware(['USER']), addAddress);

export default router;