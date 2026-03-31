import express from 'express';
import { upload } from '../config/multer.js';
import authSeller from '../middlewares/seller.middleware.js';
import {
    sellerLogin,
    sellerLogout,
    isAuthUser
}  from '../controllers/seller.controller.js';

import {
    addProduct,
    updateProduct,
    getProduct,
    changeStock,
    changeStatus,
    getProducts,
}  from '../controllers/product.controller.js';


import { 
    addCategory,
    updateCategory,
    getsingleCategory,
    changeStatus as changeCategoryStatus,
    getCategory,
    
}  from '../controllers/category.controller.js';

import { getAllOrders }  from '../controllers/order.controller.js';

const router = express.Router();

router.post('/login', sellerLogin);
router.post('/logout', authSeller(['SELLER']), sellerLogout);
router.get('/isAuthUser', authSeller(['SELLER']), isAuthUser);

router.post('/product', upload.array('image'), authSeller(['SELLER']), addProduct);
router.put('/product/:id', upload.array('image'), authSeller(['SELLER']), updateProduct);
router.get('/product', authSeller(['SELLER']), getProducts);
router.get('/product/:id', authSeller(['SELLER']), getProduct);
router.patch('/product/:id/stock', authSeller(['SELLER']), changeStock);
router.patch('/product/:id/status', authSeller(['SELLER']), changeStatus);

router.post('/category', authSeller(['SELLER']), upload.single('image'), addCategory);
router.put('/category/:id', authSeller(['SELLER']), upload.single('image'), updateCategory);
router.get('/category', authSeller(['SELLER']), getCategory);
router.get('/category/:id', authSeller(['SELLER']), getsingleCategory);
router.patch('/category/:id/status', authSeller(['SELLER']), changeCategoryStatus);

router.get('/getAllOrders', authSeller(['SELLER']), getAllOrders);

export default router;