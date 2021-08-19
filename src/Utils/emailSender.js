import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { emailTemplate } from "./emailTemplate.js";

dotenv.config();

const CLIENT_ID = process.env.GOOGLECLOUD_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLECLOUD_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendMail = async (sender, email, message) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "oAuth2",
        user: process.env.OAUTH_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: sender + " " + email,
      to: process.env.PRIMARY_EMAIL,
      subject: `${sender}: From Your Website`,
      html: await emailTemplate(email, message),
      replyTo: email,
    };

    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (error) {
    return error;
  }
};
