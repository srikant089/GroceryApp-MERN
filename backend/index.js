import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/connectDB.js';
import { connectCloudinary } from './config/cloudinary.js';

import authRoutes from './routes/auth.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import addessRoutes from './routes/address.routes.js';


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

app.use('/api/auth', authRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/address', addessRoutes);

app.listen(PORT, () => {
    connectDB();
    connectCloudinary();
    console.log(`server is runing on port ${PORT}`);
})