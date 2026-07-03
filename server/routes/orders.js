import { Router } from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import { dbReady } from "../config/cluster.js";

const router = Router();
const fallback = [];

function useDB() {
  return dbReady() && mongoose.connection.readyState === 1;
}

router.post("/", async (req, res) => {
  try {
    if (useDB()) {
      const data = await Order.create(req.body);
      return res.status(201).json({ success: true, data });
    }
    const { items, total, customer, instructions } = req.body;
    if (!items?.length || !customer?.name || !customer?.email || !customer?.phone || !customer?.address) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }
    const entry = { id: Date.now(), items, total, customer, instructions: instructions || "", status: "pending", createdAt: new Date() };
    fallback.unshift(entry);
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    if (useDB()) {
      const data = await Order.find().sort({ createdAt: -1 });
      return res.json({ success: true, data });
    }
    res.json({ success: true, data: fallback });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
