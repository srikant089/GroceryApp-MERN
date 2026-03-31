import express from 'express';
import { getProducts, getProduct, getProductCategory }  from '../controllers/product.controller.js';

const router = express.Router();

router.get('', getProducts);
router.get('/:category',  getProductCategory);
router.get('/:id',  getProduct);

export default router;