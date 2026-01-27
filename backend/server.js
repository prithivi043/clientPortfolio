import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import serverless from "serverless-http";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

/* CORS */
app.use(
  cors({
    origin: [
      "https://client1-portfolio-puce.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

/* favicon safe */
app.get("/favicon.ico", (req, res) => res.status(204).end());

/* rate limiter */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

/* routes */
app.use("/api/contact", contactLimiter, contactRoutes);

app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

/* =========================
   LOCAL DEV ONLY
   ========================= */
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

/* =========================
   VERCEL EXPORT
   ========================= */
export const handler = serverless(app);
