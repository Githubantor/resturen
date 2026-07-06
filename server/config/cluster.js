import mongoose from "mongoose";

let isConnected = false;
let connecting = null;

const connectDB = async () => {
  if (connecting) return connecting;
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI not set — running with in-memory storage");
    return;
  }

  connecting = mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
    socketTimeoutMS: 45000,
  });

  try {
    const conn = await connecting;
    isConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`MongoDB unavailable (${err.message}) — running with in-memory storage`);
  } finally {
    connecting = null;
  }
};

export const ensureDB = async () => {
  if (isConnected) return true;
  await connectDB();
  return isConnected;
};

export const dbReady = () => isConnected;
export default connectDB;
