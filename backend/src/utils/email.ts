import nodemailer from 'nodemailer';
import { EmailOptions } from '@/types';

const transporter = nodemailer.createTransporter({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
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
    console.log(`Email sent successfully to ${options.to}`);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
};

export const sendOTPEmail = async (email: string, otp: string, type: string): Promise<void> => {
  const subject = getOTPEmailSubject(type);
  const html = getOTPEmailTemplate(otp, type);
  
  await sendEmail({
    to: email,
    subject,
    html,
    text: `Your verification code is: ${otp}`
  });
};

export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #7C3AED;">STB Everywhere - Password Reset</h2>
      <p>You requested a password reset for your STB Everywhere account.</p>
      <p>Click the button below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; background-color: #7C3AED; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Reset Password</a>
      <p>If you didn't request this reset, please ignore this email.</p>
      <p>This link will expire in 24 hours.</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 12px;">STB Everywhere - Secure Banking Platform</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'STB Everywhere - Password Reset Request',
    html,
    text: `Reset your password: ${resetUrl}`
  });
};

const getOTPEmailSubject = (type: string): string => {
  switch (type) {
    case 'LOGIN_MFA':
      return 'STB Everywhere - Login Verification Code';
    case 'PASSWORD_RESET':
      return 'STB Everywhere - Password Reset Code';
    case 'PHONE_VERIFICATION':
      return 'STB Everywhere - Phone Verification Code';
    case 'EMAIL_VERIFICATION':
      return 'STB Everywhere - Email Verification Code';
    default:
      return 'STB Everywhere - Verification Code';
  }
};

const getOTPEmailTemplate = (otp: string, type: string): string => {
  const purpose = type === 'LOGIN_MFA' ? 'complete your login' : 
                  type === 'PASSWORD_RESET' ? 'reset your password' :
                  type === 'PHONE_VERIFICATION' ? 'verify your phone number' :
                  'verify your email address';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #7C3AED;">STB Everywhere</h2>
      <p>Your verification code to ${purpose} is:</p>
      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
        <h1 style="color: #7C3AED; font-size: 32px; margin: 0; letter-spacing: 8px;">${otp}</h1>
      </div>
      <p>This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.</p>
      <p>If you didn't request this code, please ignore this email.</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 12px;">STB Everywhere - Secure Banking Platform</p>
    </div>
  `;
};