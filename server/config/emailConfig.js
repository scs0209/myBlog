require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "asd123644@gmail.com",
    pass: "yfkwzpcedinhhito",
  },
  secure: true,
});

module.exports = transporter;
