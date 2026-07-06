import mongoose from "mongoose";

let isConnected = false;
let connecting = null;
let lastError = null;

const connectDB = async () => {
  if (connecting) return connecting;
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    const msg = "MONGODB_URI not set";
    console.warn(msg);
    lastError = msg;
    return;
  }

  connecting = mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

  try {
    const conn = await connecting;
    isConnected = true;
    lastError = null;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    lastError = err.message;
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
export const getLastError = () => lastError;
export default connectDB;
