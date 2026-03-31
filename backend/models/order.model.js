import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required:true,
                ref: "Product"
            },
            weight: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            offerPrice: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
        }        
    ],
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Address"
    },
    status:{
        type: String,
        default: "Order Placed"
    },
    paymentType: {
        type: String,
        required: true,
        default: "COD"
    },
    isPaid: {
        type:Boolean,
        required: true,
        default: false
    },
},{timestamps: true});

const Order = mongoose.model("order", orderSchema);
export default Order;