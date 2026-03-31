import Product from '../models/product.model.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// for seller use
// add product : /api/seller/addProduct
export const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            offerPrice,
            category,
            inStock
        } = req.body;

        if(!name || !description || !price|| !offerPrice || !category || !inStock){
            return res
                .status(422)
                .json({
                    message:"All fields are required",
                    success:false
                });
        }

        const file = req?.files;
        if(!file) {
            return res.status(400).json({
                mgs: 'Image is required',
                success: false,
            });
        }
        
        const images = req.files;
        let imageUrl = await Promise.all(
            images.map(async (item)=> {
                let result = await cloudinary.uploader.upload(
                    item.path,
                    {
                        folder:'groceryApp',
                        resource_type: "image",
                    }
                );
                return result.url;                    
            })            
        );

        await Product.create({
            name,
            description,
            price,
            offerPrice,
            category,
            inStock,
            image: imageUrl,
        });
        return res
            .status(200)
            .json({
                message: "Product added successfully",
                success: true,
            });
    } catch (error) {
        console.log('Error in register', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}

// update product : /api/seller/product
export const updateProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            offerPrice,
            category,
            inStock
        } = req.body;

        const { id } = req.params;

        const product = await Product.findById(id);
        if(!product) {
            return res
                .status(404)
                .json({
                    message: "Product not found",
                    success: false,
                });
        }

        if(req?.files) {
            const images = req.files;
            let imageUrl = await Promise.all(
                images.map(async (item)=> {
                    let result = await cloudinary.uploader.upload(
                        item.path,
                        {
                            folder:'groceryApp',
                            resource_type: "image",
                        }
                    );
                    return result.url;                    
                })
               
            );

            console.log(imageUrl);
            await Product.findByIdAndUpdate(
                id,
                { image: imageUrl },
                { new:true }
            );
        }

        await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                offerPrice,
                category,
                inStock:!inStock
            },
            {new:true}
        );
        return res
            .status(200)
            .json({
                message: "Product updated successfully",
                success: true,
            });
    } catch (error) {
        console.log('Error in register', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}

// change stock : /api/seller/product/:id/stock
export const changeStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { inStock } = req.body;

        let product = await Product.findById(id);
        if(!product) {
            return res
                .status(404)
                .json({
                    message: "Product not found",
                    success: false,
                });
        }
        
        product = await Product.findByIdAndUpdate(id, { inStock: !inStock }, { new: true });
        return res
            .status(200)
            .json({
                message: "Stock updated successfully",
                success: true,
                product
            });
    } catch (error) {
        console.log('Error in register', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}

// change stock : /api/seller/product/:id/status
export const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        let product = await Product.findById(id);
        if(!product) {
            return res
                .status(404)
                .json({
                    message: "Product not found",
                    success: false,
                });
        }
        
        product = await Product.findByIdAndUpdate(id, { status:!status }, { new: true });
        return res
            .status(200)
            .json({
                message: "Stock updated successfully",
                success: true,
                product
            });
    } catch (error) {
        console.log('Error in register', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}

//for user use
// get products : /api/products/list
export const getProducts = async(req, res) =>{
    try {
        const products = await Product.find();
        return res
            .status(200)
            .json({
                message: "Products fetch successfully",
                success: true,
                products
            });
    } catch (error) {
        console.log('Error in register', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}

// get product : /api/product/:id
export const getProduct = async(req, res) =>{
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if(!product) {
            return res
                .status(404)
                .json({
                    message: "Product not found",
                    success: false,
                });
        }
        return res
            .status(200)
            .json({
                message: "Product fetch successfully",
                success: true,
                product
            });
    } catch (error) {
        console.log('Error in register', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}


// get product Category : /api/product/:category
export const getProductCategory = async(req, res) =>{
    try {
        const { category } = req.params;
        const products = await Product.find({category});
        return res
            .status(200)
            .json({
                message: "Product fetch successfully",
                success: true,
                products
            });
    } catch (error) {
        console.log('Error in register', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}
