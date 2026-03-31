import Address from '../models/address.model.js';

// add address : /api/address/add
export const addAddress = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { 
            firstName,
            lastName,
            email,
            phone,
            street,
            city,
            state,
            country,
            zipCode,
        } = req.body;

        if(
            !firstName || !lastName || !email 
            || !phone || !street || !city 
            || !state || !country || !zipCode
        ){
            return res
                .status(422)
                .json({
                    message:"All fields are required",
                    success:false
                });
        }

        const address = await Address.create({
            userId,
            firstName,
            lastName,
            email,
            phone,
            street,
            city,
            state,
            country,
            zipCode,
        });
        return res
            .status(201)
            .json({
                message: "Address added successfully",
                success: true,                
            });

    } catch (error) {
        console.log('Error in register', error);
        res.status(500).json({ message: 'Internal Server Error', success: false});
    }
}

// get address : /api/address/get
export const getAddress = async(req, res) => {
    try {
        const userId = req.user.userId;
        const addresses = await Address.find({ userId }).sort({ createdAt: -1});
        return res
            .status(201)
            .json({
                message: "Address added successfully",
                success: true,
                addresses                
            });
    } catch (error) {
        console.log('Error in register', error);
        res.status(500).json({ message: 'Internal Server Error', success: false});
    }
}