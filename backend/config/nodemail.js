import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = nodemailer.createTransport({
  port: 587,
  service: 'gmail',
  auth: {
    user: 'samspsmzajtmk@gmail.com',
    pass: process.env.NODEMAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
