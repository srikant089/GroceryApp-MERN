import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/connectDB.js';
import { connectCloudinary } from './config/cloudinary.js';

import authRoute from './routes/auth.routes.js';
import sellerRoute from './routes/seller.routes.js';
import categoryRoute from './routes/category.routes.js';
import productRoute from './routes/product.routes.js';
import cartRoute from './routes/cart.routes.js';
import orderRoute from './routes/order.routes.js';
import addessRoute from './routes/address.routes.js';
import paymentRoute from './routes/payment.routes.js';


const app = express();
const allowedOrigins = ["http://localhost:5173"];
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(cookieParser());

//api endpointes
app.get("/",(req,res)=>{
    res.send("hello");
})

app.use('/api/auth', authRoute);
app.use('/api/seller', sellerRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/address', addessRoute);
app.use('/api/payment', paymentRoute);

app.listen(PORT, () => {
    connectDB();
    connectCloudinary();
    console.log(`server is runing on port ${PORT}`);
})