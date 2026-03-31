import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import Category from '../models/category.model.js';

// for seller use
// add category : /api/seller/addCategory
export const addCategory = async (req, res) => {
    try {
        const {
            text,
            path,
            bgColor,
        } = req.body;

        if(!text || !path || !bgColor){
            return res
                .status(422)
                .json({
                    message:"All fields are required",
                    success:false
                });
        }

        const file = req?.file?.path;
        if(!file) {
            return res.status(400).json({
                mgs: 'Image is required',
                success: false,
            });
        }

        const uploadResponse = await cloudinary.uploader.upload(
            file,
            {
                folder:'groceryApp',
                resource_type: "image",
            }
        );

        let imageUrl = uploadResponse?.secure_url ? uploadResponse.secure_url : '';
        const category = await Category.create({
            text,
            path,
            bgColor,
            image: imageUrl,
        });

        return res
            .status(200)
            .json({
                message: "Category added successfully",
                success: true,
            });
    } catch (error) {
        console.log('Error in addCategory', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}

// update category : /api/seller/category
export const updateCategory = async (req, res) => {
    try {
        const {
            text,
            path,
            bgColor,
        } = req.body;
        
        const { id } = req.params;

        const category = await Category.findById(id);
        if(!category) {
            return res
                .status(404)
                .json({
                    message: "Category not found",
                    success: false,
                });
        }

        if(!text || !path || !bgColor){
            return res
                .status(422)
                .json({
                    message:"All fields are required",
                    success:false
                });
        } 

        if(req?.files) {
            const file = req.file.path;
            const uploadResponse = await cloudinary.uploader.upload(
                file,
                {
                    folder:'groceryApp',
                    resource_type: "image",
                }
            );

            let imageUrl = uploadResponse?.resource_url ? uploadResponse.resource_url : '';
            await Category.findByIdAndUpdate(
                id,
                { image: imageUrl },
                { new: true }
            );            
        }

        await Category.findByIdAndUpdate(
            id,
            {
                text,
                path,
                bgColor,
            },
            {new:true}
        );

        return res
            .status(200)
            .json({
                message: "Category updated successfully",
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

// change stock : /api/seller/category/:id/status
export const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        let category = await Category.findById(id);
        if(!category) {
            return res
                .status(404)
                .json({
                    message: "Product not found",
                    success: false,
                });
        }
        
        await Category.findByIdAndUpdate(id, { status:!category.status }, { new: true });
        return res
            .status(200)
            .json({
                message: "Status updated successfully",
                success: true,
            });
    } catch (error) {
        console.log('Error in category changeStatus', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}

// get single category : /api/category/:id
export const getsingleCategory = async(req, res) =>{
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if(!category) {
            return res
                .status(404)
                .json({
                    message: "Category not found",
                    success: false,
                });
        }
        return res
            .status(200)
            .json({
                message: "Product fetch successfully",
                success: true,
                category
            });
    } catch (error) {
        console.log('Error in getSingleCategory', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}


//for user use
// get category : /api/seller/category
// get category : /api/category
export const getCategory = async(req, res) =>{
    try {
        const categories = await Category.find();
        return res
            .status(200)
            .json({
                message: "Category fetch successfully",
                success: true,
                categories
            });
    } catch (error) {
        console.log('Error in getCategory', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}