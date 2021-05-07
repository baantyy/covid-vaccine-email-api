const nodemailer = require("nodemailer");
const { mailAuth, email, emailFrom } = require("./key");

const mailService = async (available = false, html = "", cb = () => 0) => {
  try {
    const time = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const info = await nodemailer.createTransport(mailAuth).sendMail({
      from: `Covid Vaccine <${emailFrom}>`,
      to: email,
      replyTo: emailFrom,
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
