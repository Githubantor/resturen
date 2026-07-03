import { Router } from "express";
import mongoose from "mongoose";
import Contact from "../models/Contact.js";
import { dbReady } from "../config/db.js";

const router = Router();
const fallback = [];

function useDB() {
  return dbReady() && mongoose.connection.readyState === 1;
}

router.post("/", async (req, res) => {
  try {
    if (useDB()) {
      const data = await Contact.create(req.body);
      return res.status(201).json({ success: true, data });
    }
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }
    const entry = { id: Date.now(), name, email, subject, message, createdAt: new Date() };
    fallback.unshift(entry);
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
