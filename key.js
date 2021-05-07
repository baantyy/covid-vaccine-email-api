require("dotenv").config();

const age = process.env.AGE;
const email = process.env.EMAIL;
const emailFrom = process.env.EMAIL_FROM;
const pinCode = process.env.PINCODE;

const mailAuth = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
};

module.exports = { age, pinCode, email, emailFrom, mailAuth };
