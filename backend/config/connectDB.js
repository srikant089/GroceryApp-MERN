import mongoose from "mongoose";
export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONOGO_URL);
        console.log("mongDB connected successfully");
    } catch (error) {
        console.error("Error conneting to  MongoDB", error);
        process.exit();
    }
};