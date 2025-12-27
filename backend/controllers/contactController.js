import { validationResult } from "express-validator";
import { sendEmail } from "../utils/sendEmail.js";

export const handleContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const { name, email, phone, message } = req.body;

  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "Alert: Message from Client",
      text: `You have received a new message from a client.

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`,
    });

    await sendEmail({
      to: email,
      subject: "We received your message",
      text: `Hi ${name},

Thank you for contacting us. We will get back to you shortly.

Regards,
Support Team`,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("EMAIL ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "Email sending failed" });
  }
};
