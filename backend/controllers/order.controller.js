import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// get all order for admin : /api/seller/order/all
export const getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find()
        .populate("item.product address")
        .sort({createdAt: -1});
        res
        .status(200)
        .json({ 
            message: 'Orders fetched successfully',
            success: true,
            orders
        });
    } catch (error) {
        console.log('Error in getUserOrder', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });
    }
}

// Place order COD : /api/order/place
export const placeOrderCOD= async(req,res) => {
    try {

        console.log(req.body);
        const userId = req.user.userId;
        const { 
            cartItems,
            totalAmount,
            address
        } = req.body;
        
        // validate request body
        if(!cartItems || !totalAmount || !address) {

            return res
            .status(400)
            .json({ 
                message:"all fields are required",
                success: false
            });
        }
        let amount = await cartItems.reduce(async(acc, item) => {
            const product = await Product.findById(item._id);
            item.productId = product._id;
            item.price = product.price;
            item.offerPrice = product.offerPrice;
            item.image = product.image[0];

            return (await acc) + (product.offerPrice * item.quantity);
        }, 0);

        // Add tax charfe 2%
        amount = Math.floor((amount * 2) / 100);        

        //create a new order
        const newOrder = new Order({
            userId,
            items:cartItems,
            amount:totalAmount,
            address,
            paymentType: "COD", // Cash on Delivery
            status:"Pending",
            isPad: false,
        });

        //Save the order to database
        const order = await newOrder.save();

        return res
            .status(200)
            .json({ 
                message:"Order placed successfully",
                success: true
            });
        
    } catch (error) {
        console.log('Error in placeOrderCOD', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });
    }
    
}

//order details for individual user: /api/order/user
export const getUserOrder = async(req, res) => {
    try {
        const userId = req.user;

        const orders = await Order.find({
            userId,
            $or:[
                {paymentMethd: "COD"},
                { isPaid: true}
            ],
        })
        .populate("item.product address")
        .sort({createdAt: -1});
        res
        .status(200)
        .json({ 
            message: 'User orders fetched successfully',
            success: true,
            orders
        });

    } catch (error) {
        console.log('Error in getUserOrder', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });
    }
}
