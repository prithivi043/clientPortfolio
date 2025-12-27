import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/contact",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
  contactRoutes
);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
