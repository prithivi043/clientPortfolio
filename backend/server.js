import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

/* =======================
   CORS CONFIG
   ======================= */
app.use(
  cors({
    origin: [
      "https://client1-portfolio-puce.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

/* =======================
   IGNORE FAVICON REQUEST
   ======================= */
app.get("/favicon.ico", (req, res) => res.status(204).end());

/* =======================
   RATE LIMITER
   ======================= */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

/* =======================
   ROUTES
   ======================= */
app.use("/api/contact", contactLimiter, contactRoutes);

/* =======================
   HEALTH CHECK
   ======================= */
app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

/* =======================
   IMPORTANT FOR VERCEL
   ======================= */
export default app;
