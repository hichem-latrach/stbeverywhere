import nodemailer from 'nodemailer';
import { EmailOptions } from '../types';

const transporter = nodemailer.createTransporter({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
};

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h2 style="color: #2563eb;">Welcome to STB Everywhere Connect!</h2>
      <p>Thank you for registering with us. Please verify your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Verify Email Address
        </a>
      </div>
      <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #6b7280;">${verificationUrl}</p>
      <p>This verification link will expire in 24 hours.</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px;">
        If you didn't create an account with STB Bank, please ignore this email.
      </p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Verify Your Email Address - STB Bank',
    html,
    text: `Welcome to STB Bank! Please verify your email by visiting: ${verificationUrl}`
  });
};

export const sendPasswordResetEmail = async (email: string, token: string): Promise<void> => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h2 style="color: #dc2626;">Password Reset Request</h2>
      <p>You requested to reset your password for your STB Bank account.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #6b7280;">${resetUrl}</p>
      <p>This reset link will expire in 1 hour.</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px;">
        If you didn't request this password reset, please ignore this email and your password will remain unchanged.
      </p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Password Reset Request - STB Bank',
    html,
    text: `Reset your password by visiting: ${resetUrl}`
  });
};

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h2 style="color: #2563eb;">Your Verification Code</h2>
      <p>Use the following code to complete your login:</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1f2937;">
          ${otp}
        </div>
      </div>
      <p>This code will expire in 10 minutes.</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px;">
        If you didn't request this code, please contact our support team immediately.
      </p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Your Verification Code - STB Bank',
    html,
    text: `Your verification code is: ${otp}`
  });
};