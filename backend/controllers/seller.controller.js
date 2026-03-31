import jwt from 'jsonwebtoken';

//seller login : /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
            const token = await jwt.sign(
                {   
                    email: email,
                    role: 'SELLER',
                },
                process.env.JWT_SCREET,
                { expiresIn: "7d" }
            );
    
            res.cookie("sellerToken", token, {
                httpOnly:true,
                secure: process.env.APP_MODE === "production",  // use secure cookie in production
                sameSite: process.env.APP_MODE === "production"? "none" : "strict", // helps prevent CSRF attacks
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7day
            })

            return res
            .status(200)
            .json({
                message:"Login successfully",
                success: true,       
            });
        }
        
    } catch (error) {
        console.log('Error in sellerLogin', error);
        res.status(500).json({ message: 'Internal Server Error', success: false});
    }

}

//seller logout: /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly:true,
            secure: process.env.APP_MODE === "production",  // use secure cookie in production
            sameSite: process.env.APP_MODE === "production"? "none" : "strict", // helps prevent CSRF attacks
        })

        return res
            .status(200)
            .json({
                message: "Seller Logged out successfully",
                success: true,
            });
    } catch (error) {
        console.log('Error in sellerLogout', error);
        res.status(500).json({ message: 'Internal Server Error', success: false});
    }

}

//check auth seller : /api/seller/isAuthUser
export const isAuthUser = async (req, res) => {
    try {
        return res
            .status(200)
            .json({                
                success: true,
            });
    } catch (error) {
        console.log('Error in register', error);
        res.status(500).json({ message: 'Internal Server Error', success: false});
    }

}