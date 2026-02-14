import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONODB_URL);
        console.log(`MONGODB Connected Successfully ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MONGODB Connection Failed', error);
    }
}

export default connectDB;