import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("MenuItem", menuItemSchema);
