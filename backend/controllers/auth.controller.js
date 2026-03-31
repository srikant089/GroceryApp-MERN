import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from "../models/user.model.js";

//register user : /api/auth/register
export const register = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password} = req.body;
        if(!name || !email || !password){
            return res
                .status(422)
                .json({
                    message:"All fields are required",
                    success:false
                });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            console.log(existingUser);
            return res
                .status(409)
                .json({
                    message:"Email already exists",
                    success:false
                });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        
        const token = await jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SCREET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly:true,
            secure: process.env.APP_MODE === "production",  // use secure cookie in production
            sameSite: process.env.APP_MODE === "production"? "none" : "strict", // helps prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7day
        })

        return res
            .status(201)
            .json({
                message: "User registered successfully",
                success: true,
                user: {
                    name: user.name,
                    email: user.email,
                }
            });

    } catch (error) {
        console.log('Error in register', error);
        res.status(500).json({ message: 'Internal Server Error', success: false});
    }

}

//login user : /api/auth/login
export const login = async (req, res) => {
    try {
        console.log(req.body)
        const {email, password} = req.body;
        if(!email || !password){
            return res
                .status(422)
                .json({
                    message:"All fields are required",
                    success:false
                });
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res
                .status(422)
                .json({
                    message:"Invalid Email or Password",
                    success:false
                });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res
                .status(422)
                .json({
                    message:"Invalid Email or Password",
                    success:false
                });
        }
        const token = await jwt.sign(
            {   
                userId: user._id,
                cartItems: user.cartItems,
                role: user.role,
            },
            process.env.JWT_SCREET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly:true,
            secure: process.env.APP_MODE === "production",  // use secure cookie in production
            sameSite: process.env.APP_MODE === "production"? "none" : "strict", // helps prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7day
        })

        return res
            .status(200)
            .json({
                message: "Logged in successfully",
                success: true,
                user: {
                    name: user.name,
                    email: user.email,
                }
            });

    } catch (error) {
        console.log('Error in register', error);
        res.status(500).json({ message: 'Internal Server Error', success: false});
    }

}

//logout user : /api/auth/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly:true,
            secure: process.env.APP_MODE === "production",  // use secure cookie in production
            sameSite: process.env.APP_MODE === "production"? "none" : "strict", // helps prevent CSRF attacks
        })

        return res
            .status(200)
            .json({
                message: "User Logged out successfully",
                success: true,
            });
    } catch (error) {
        console.log('Error in register', error);
        res.status(500).json({ message: 'Internal Server Error', success: false});
    }

}

//check auth user : /api/auth/isAuthUser
export const isAuthUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        if(!userId) {
            res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }

        const user = await User.findById(userId).select("-password,-role")
        return res
            .status(200)
            .json({
                user,
                success: true,
            });
    } catch (error) {
        console.log('Error in register', error);
        res.status(500).json({ message: 'Internal Server Error', success: false});
    }

}