import { Router } from "express";
import mongoose from "mongoose";
import Reservation from "../models/Reservation.js";
import { dbReady } from "../config/cluster.js";

const router = Router();
const fallback = [];

function useDB() {
  return dbReady() && mongoose.connection.readyState === 1;
}

router.post("/", async (req, res) => {
  try {
    if (useDB()) {
      const data = await Reservation.create(req.body);
      return res.status(201).json({ success: true, data });
    }
    const { name, email, phone, date, time, guests, message } = req.body;
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }
    const entry = { id: Date.now(), name, email, phone, date, time, guests, message: message || "", createdAt: new Date() };
    fallback.unshift(entry);
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    if (useDB()) {
      const data = await Reservation.find().sort({ createdAt: -1 });
      return res.json({ success: true, data });
    }
    res.json({ success: true, data: fallback });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
