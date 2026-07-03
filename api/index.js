import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import reservationRoutes from "../server/routes/reservations.js";
import contactRoutes from "../server/routes/contact.js";
import menuRoutes from "../server/routes/menu.js";
import connectDB, { dbReady } from "../server/config/cluster.js";
import Reservation from "../server/models/Reservation.js";
import Contact from "../server/models/Contact.js";
import MenuItem from "../server/models/MenuItem.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../server/.env") });

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/menu", menuRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Sweettable API is running", mongodb: dbReady() });
});

app.get("/api/data", async (req, res) => {
  if (!dbReady()) return res.json({ connected: false, message: "MongoDB not connected" });
  try {
    const [reservations, contacts, menuItems] = await Promise.all([
      Reservation.find().sort({ createdAt: -1 }).limit(50).lean(),
      Contact.find().sort({ createdAt: -1 }).limit(50).lean(),
      MenuItem.find().sort({ category: 1, name: 1 }).lean(),
    ]);
    res.json({ connected: true, counts: { reservations: reservations.length, contacts: contacts.length, menuItems: menuItems.length }, reservations, contacts, menuItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

connectDB();

export default app;
