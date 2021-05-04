const nodemailer = require("nodemailer");
const { mailAuth, email } = require("./key");

const mailService = async (available = false, html = "", cb = () => 0) => {
  try {
    const from = "baaantyyy@gmail.com";
    const time = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const info = await nodemailer.createTransport(mailAuth).sendMail({
      from: `Covid Vaccine <${from}>`,
      to: email,
      replyTo: from,
      subject: `Covid Vaccine ${
        available ? "Available" : "Unavailable"
      } - ${time}`,
      html,
    });
    if (info.messageId) {
      cb(false, true);
    } else {
      cb(true, false);
    }
  } catch (e) {
    cb(true, false);
  }
};

module.exports = { mailService };
