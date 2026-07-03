import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`MongoDB unavailable — running with in-memory storage`);
  }
};

export const dbReady = () => isConnected;
export default connectDB;
