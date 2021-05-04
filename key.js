require("dotenv").config();

const pinCode = process.env.PINCODE;
const email = process.env.EMAIL;
const age = process.env.AGE;

const mailAuth = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
};

module.exports = { pinCode, email, age, mailAuth };
