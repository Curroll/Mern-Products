import mongoose from "mongoose";

export const connectDB = async ()=> {
     try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDb Conneted ✅`)
     } catch (error) {
        console.log(`Error ${error.message}`);
        process.exit(1 )
     }
}