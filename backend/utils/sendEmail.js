import axios from "axios";

export const sendEmail = async ({ to, subject, text }) => {
  if (!process.env.BREVO_API_KEY || !process.env.SENDER_EMAIL) {
    throw new Error("Missing Brevo environment variables");
  }

  try {
    const response = await axios.post(
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
        timeout: 8000,
      }
    );

    return response.data;
  } catch (error) {
    const brevoError =
      error.response?.data?.message || error.response?.data || error.message;

    console.error("BREVO ERROR:", brevoError);

    throw new Error("Brevo email failed");
  }
};
