const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,      // your gmail
    pass: process.env.ADMIN_EMAIL_PASS, // app password
  },
});

module.exports = transporter;
