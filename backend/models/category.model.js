import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    
    text: {
        type: String,
        required: true,
    },    
    path: {
        type: String,
        required: true,
    },
    bgColor: {
        type: String,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,

    },
},{ minimize: false });

const Category = mongoose.model("category", categorySchema);

export default Category;