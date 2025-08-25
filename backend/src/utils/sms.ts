import { createError } from '@/middlewares/errorHandler';

export const sendSMS = async (phoneNumber: string, message: string): Promise<void> => {
  // This is a placeholder for SMS integration
  // You would integrate with a service like Twilio, AWS SNS, or a local SMS provider
  
  if (!process.env.SMS_API_KEY || !process.env.SMS_API_URL) {
    console.log(`SMS would be sent to ${phoneNumber}: ${message}`);
    return;
  }

  try {
    // Example integration with a generic SMS API
    const response = await fetch(process.env.SMS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SMS_API_KEY}`
      },
      body: JSON.stringify({
        to: phoneNumber,
        message: message,
        from: 'STB Bank'
      })
    });

    if (!response.ok) {
      throw new Error(`SMS API responded with status: ${response.status}`);
    }

    console.log(`SMS sent successfully to ${phoneNumber}`);
  } catch (error) {
    console.error('SMS sending failed:', error);
    throw new Error('Failed to send SMS');
  }
};

export const sendOTPSMS = async (phoneNumber: string, otp: string, type: string): Promise<void> => {
  const purpose = type === 'LOGIN_MFA' ? 'complete your login' : 
                  type === 'PASSWORD_RESET' ? 'reset your password' :
                  type === 'PHONE_VERIFICATION' ? 'verify your phone number' :
                  'verify your account';

  const message = `STB Everywhere: Your verification code to ${purpose} is: ${otp}. This code expires in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.`;
  
  await sendSMS(phoneNumber, message);
};