import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initDatabase } from "./db/db.js";
import dashboardRoutes from "./routes/dashboard.js";
import adminRoutes from "./routes/admin.js";
import paymentRoutes from "./routes/payment.js";
import webhookRoutes from "./routes/webhook.js";
import authRoutes from "./routes/auth.js";

// Initialiser la connexion à la base de données
initDatabase();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTEND_URL || "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

// Webhook needs raw body; mount before express.json()
app.use("/api/webhook", express.raw({ type: "application/json" }), webhookRoutes);

app.use(express.json());

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log("Payment routes available at /api/payment");
  if (!process.env.DATABASE_URL) {
    console.log("📦 SQLite database will be created automatically");
  }
});
