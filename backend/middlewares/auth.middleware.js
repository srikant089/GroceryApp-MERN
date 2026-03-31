import jwt from 'jsonwebtoken';

const authMiddleware = (roles=[]) => { 
    return (req, res, next) => {
        try {
            
            const {token}  = req.cookies;
            if (!token) {
                res.status(401).json({success:false, message:"Unauthorized"});
            }

            const decoded = jwt.verify(token, process.env.JWT_SCREET);
            if (decoded) {
                req.user = decoded;
                if(roles.length > 0 && !roles.includes(req.user.role)) {
                    return res.status(403).json({success:false, message:"Access Denied."})
                }
            }
            next();
        } catch (error) {
            console.log("ERROR in authMiddleware", error);
            res.status(500).json({success:false, message:"Internal Server Error."});
        }	

    }
}

export default authMiddleware;