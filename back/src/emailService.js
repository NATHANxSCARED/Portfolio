import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import ContactEmail from './emails/ContactEmail.js';

let transporter;

// Initialize the transporter based on environment
const initializeTransporter = () => {
  if (process.env.SMTP_HOST === 'smtp.gmail.com') {
    // Gmail configuration
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Mailtrap or other SMTP configuration
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
};

// Send contact email
export const sendContactEmail = async (contactData) => {
  try {
    if (!transporter) {
      initializeTransporter();
    }

    const emailHtml = render(
      ContactEmail({
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
      })
    );

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Portfolio Contact: ${contactData.subject}`,
      html: emailHtml,
      replyTo: contactData.email,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Verify transporter connection
export const verifyTransporter = async () => {
  try {
    if (!transporter) {
      initializeTransporter();
    }
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('SMTP connection failed:', error);
    return false;
  }
};
