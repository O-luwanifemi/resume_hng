import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { google } from "googleapis";

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

    const transport = nodemailer.createTransport({
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
      from: `${email}`,
      to: process.env.PRIMARY_EMAIL,
      subject: `${sender}: From Your Portfolio`,
      text: `${message}`,
      html: `<p>${message}</p>`,
      replyTo: `${email}`,
    };

    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (error) {
    return error;
  }
};
