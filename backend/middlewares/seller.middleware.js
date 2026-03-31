import jwt from 'jsonwebtoken';

const authSeller = (roles=[]) => { 
    return (req, res, next) => {
        try {
            
            const {sellerToken}  = req.cookies;
            if (!sellerToken) {
                res.status(401).json({success:false, message:"Unauthorized"});
            }

            const decoded = jwt.verify(sellerToken, process.env.JWT_SCREET);
            if (decoded) {
                req.user = decoded;
                if(req.user.email != process.env.SELLER_EMAIL){
                    return res
                    .status(401)
                    .json({
                        success:false,
                        message:"Unauthorized."
                    });
                }

                if(roles.length > 0 && !roles.includes('SELLER')) {
                    return res
                    .status(403)
                    .json({
                        success:false,
                        message:"Access Denied."
                    })
                }
            }
            next();
        } catch (error) {
            console.log("ERROR in authMiddleware", error);
            res.status(500).json({success:false, message:"Internal Server Error."});
        }	

    }
}

export default authSeller;
