import axios from "axios";

export const sendEmail = async ({ to, subject, text }) => {
  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "Contact Form",
      },
      to: [{ email: to }],
      subject,
      textContent: text,
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
};
