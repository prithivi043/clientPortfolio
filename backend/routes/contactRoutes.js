import express from "express";
import { body } from "express-validator";
import { handleContactForm } from "../controllers/contactController.js";

const router = express.Router();

/* =======================
   SAFE GET HANDLER
   ======================= */
router.get("/", (req, res) => {
  res.status(200).json({ status: "Contact API active" });
});

/* =======================
   POST CONTACT FORM
   ======================= */
router.post(
  "/",
  [
    body("name").trim().notEmpty(),
    body("email").isEmail(),
    body("phone").trim().isLength({ min: 7 }),
    body("message").trim().notEmpty(),
  ],
  handleContactForm
);

export default router;
