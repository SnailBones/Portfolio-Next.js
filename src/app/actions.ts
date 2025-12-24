"use server";

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Use process.cwd() instead of __dirname for Next.js compatibility
  const logFilePath = path.join(process.cwd(), "emails.log");

  function writeToFile(logMessage: string) {
    fs.appendFileSync(logFilePath, logMessage);
  }
  const logMessage = `${new Date().toISOString()} \n Name: ${name}, Email: ${email}, \n Message: ${message}\n`;
  writeToFile(logMessage);

  const mailOptions = {
    from: process.env.EMAIL, // Required in Nodemailer v7
    to: "aidhendrickson@gmail.com", // List of recipients
    subject: "Someone reached out on ailanth.us",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
    html: `<b>Name:</b>${name}<br><b>Email:</b> ${email}<br><b>Message:</b> ${message}`, // HTML body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    writeToFile(`Email sent: ${info.response}\n\n`);
    return info;
  } catch (error) {
    console.log(error);
    writeToFile(
      "email is " +
        process.env.EMAIL +
        " password is" +
        process.env.PASSWORD +
        "\n"
    );
    writeToFile(`Error sending email: ${error}\n\n`);
    throw error;
  }
}
