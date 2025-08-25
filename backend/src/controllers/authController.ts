import { Request, Response } from 'express';
import { AuthService } from '@/services/authService';
import { 
  registerSchema, 
  loginSchema, 
  passwordResetRequestSchema, 
  passwordResetSchema,
  otpVerificationSchema 
} from '@/utils/validation';
import { createError } from '@/middlewares/errorHandler';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const validatedData = registerSchema.parse(req.body);
    
    const result = await AuthService.register(validatedData);
    
    res.status(201).json({
      success: true,
      message: result.message,
      data: { user: result.user }
    });
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { identifier, password, rememberMe } = loginSchema.parse(req.body);
    
    const result = await AuthService.login(identifier, password);
    
    // Set refresh token as httpOnly cookie if remember me is enabled
    if (rememberMe) {
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
    }
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        requiresMfa: result.requiresMfa
      }
    });
  }

  static async logout(req: Request, res: Response): Promise<void> {
    const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
    
    if (refreshToken) {
      await AuthService.logout(refreshToken);
    }
    
    res.clearCookie('refreshToken');
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
    
    if (!refreshToken) {
      throw createError('Refresh token required', 401);
    }
    
    const result = await AuthService.refreshToken(refreshToken);
    
    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: result
    });
  }

  static async requestPasswordReset(req: Request, res: Response): Promise<void> {
    const { identifier } = passwordResetRequestSchema.parse(req.body);
    
    await AuthService.requestPasswordReset(identifier);
    
    res.json({
      success: true,
      message: 'If an account with this information exists, password reset instructions have been sent.'
    });
  }

  static async verifyResetToken(req: Request, res: Response): Promise<void> {
    const { token } = req.body;
    
    if (!token) {
      throw createError('Reset token required', 400);
    }
    
    const isValid = await AuthService.verifyResetToken(token);
    
    res.json({
      success: true,
      message: 'Token verified successfully',
      data: { valid: isValid }
    });
  }

  static async resetPassword(req: Request, res: Response): Promise<void> {
    const { token, newPassword } = passwordResetSchema.parse(req.body);
    
    await AuthService.resetPassword(token, newPassword);
    
    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  }

  static async sendOTP(req: Request, res: Response): Promise<void> {
    const { userId, type, method } = req.body;
    
    if (!userId || !type || !method) {
      throw createError('Missing required fields: userId, type, method', 400);
    }
    
    await AuthService.generateOTP({ userId, type, method });
    
    res.json({
      success: true,
      message: `OTP sent via ${method}`
    });
  }

  static async verifyOTP(req: Request, res: Response): Promise<void> {
    const { userId, code, type } = otpVerificationSchema.parse(req.body);
    
    const isValid = await AuthService.verifyOTP(userId, code, type);
    
    if (!isValid) {
      throw createError('Invalid or expired OTP', 400);
    }
    
    res.json({
      success: true,
      message: 'OTP verified successfully'
    });
  }

  static async verifyEmail(req: Request, res: Response): Promise<void> {
    const { token } = req.body;
    
    if (!token) {
      throw createError('Verification token required', 400);
    }
    
    await AuthService.verifyEmail(token);
    
    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  }

  static async resendVerification(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    
    if (!email) {
      throw createError('Email required', 400);
    }
    
    await AuthService.resendVerification(email);
    
    res.json({
      success: true,
      message: 'Verification email sent'
    });
  }
}