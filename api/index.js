import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import reservationRoutes from "../server/routes/reservations.js";
import contactRoutes from "../server/routes/contact.js";
import menuRoutes from "../server/routes/menu.js";
import connectDB from "../server/config/cluster.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../server/.env") });

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/menu", menuRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Sweettable API is running" });
});

connectDB();

export default app;
