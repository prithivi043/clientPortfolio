import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

/* =======================
   CORS CONFIG (IMPORTANT)
   ======================= */
app.use(
  cors({
    origin: [
      "https://client1-portfolio-puce.vercel.app", // frontend
      "http://localhost:5173", // local dev
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

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
   HEALTH CHECK (OPTIONAL)
   ======================= */
app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

/* =======================
   EXPORT FOR VERCEL
   ======================= */
export default app;
