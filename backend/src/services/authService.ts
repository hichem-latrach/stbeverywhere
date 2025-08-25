import { prisma } from '@/server';
import { hashPassword, comparePassword, generateSecureToken, generateOTP } from '@/utils/password';
import { generateAccessToken, generateRefreshToken } from '@/utils/jwt';
import { sendOTPEmail, sendPasswordResetEmail } from '@/utils/email';
import { RegisterData, LoginResponse, OtpOptions } from '@/types';
import { createError } from '@/middlewares/errorHandler';

export class AuthService {
  static async register(data: RegisterData): Promise<{ user: any; message: string }> {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { cinNumber: data.cinNumber }
        ]
      }
    });

    if (existingUser) {
      throw createError('User with this email or CIN already exists', 409);
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        fullName: data.fullName,
        firstName: data.firstName,
        lastName: data.lastName,
        cinNumber: data.cinNumber,
        phoneNumber: data.phoneNumber,
        role: 'CLIENT',
        status: 'PENDING_VERIFICATION'
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        firstName: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    // Create initial KYC record
    await prisma.kycInfo.create({
      data: {
        userId: user.id,
        dateOfBirth: new Date(data.dateOfBirth),
        cinNumber: data.cinNumber,
        primaryNationality: 'Tunisian'
      }
    });

    return {
      user,
      message: 'Account created successfully. Please verify your email to activate your account.'
    };
  }

  static async login(identifier: string, password: string): Promise<LoginResponse> {
    // Find user by email or CIN
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { cinNumber: identifier }
        ]
      }
    });

    if (!user) {
      throw createError('Invalid credentials', 401);
    }

    if (user.status === 'SUSPENDED') {
      throw createError('Account is suspended. Please contact support.', 403);
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.passwordHash);
    if (!isValidPassword) {
      throw createError('Invalid credentials', 401);
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Store refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        status: user.status
      },
      accessToken,
      refreshToken,
      requiresMfa: false // Can be enhanced later
    };
  }

  static async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    // Verify refresh token exists and is valid
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true }
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw createError('Invalid or expired refresh token', 401);
    }

    // Generate new tokens
    const tokenPayload = {
      userId: tokenRecord.user.id,
      email: tokenRecord.user.email,
      role: tokenRecord.user.role
    };

    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    // Replace old refresh token
    await prisma.refreshToken.update({
      where: { id: tokenRecord.id },
      data: {
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  }

  static async logout(refreshToken: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken }
    });
  }

  static async requestPasswordReset(identifier: string): Promise<void> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { cinNumber: identifier }
        ]
      }
    });

    if (!user) {
      // Don't reveal if user exists for security
      return;
    }

    // Generate reset token
    const resetToken = generateSecureToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store reset token
    await prisma.passwordReset.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt
      }
    });

    // Send reset email
    await sendPasswordResetEmail(user.email, resetToken);
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetRecord = await prisma.passwordReset.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!resetRecord || resetRecord.used || resetRecord.expiresAt < new Date()) {
      throw createError('Invalid or expired reset token', 400);
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword);

    // Update password and mark token as used
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetRecord.userId },
        data: { passwordHash }
      }),
      prisma.passwordReset.update({
        where: { id: resetRecord.id },
        data: { used: true }
      })
    ]);
  }

  static async generateOTP(options: OtpOptions): Promise<string> {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES || '10') * 60 * 1000));

    // Store OTP
    await prisma.otpCode.create({
      data: {
        code: otp,
        userId: options.userId,
        type: options.type,
        expiresAt
      }
    });

    // Send OTP based on method
    if (options.method === 'email') {
      const user = await prisma.user.findUnique({
        where: { id: options.userId },
        select: { email: true }
      });
      
      if (user) {
        await sendOTPEmail(user.email, otp, options.type);
      }
    }
    // SMS implementation would go here

    return otp;
  }

  static async verifyOTP(userId: number, code: string, type: string): Promise<boolean> {
    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        userId,
        code,
        type: type as any,
        used: false,
        expiresAt: { gt: new Date() }
      }
    });

    if (!otpRecord) {
      return false;
    }

    // Mark OTP as used
    await prisma.otpCode.update({
      where: { id: otpRecord.id },
      data: { used: true }
    });

    return true;
  }

  static async verifyResetToken(token: string): Promise<boolean> {
    const resetRecord = await prisma.passwordReset.findUnique({
      where: { token }
    });

    return !!(resetRecord && !resetRecord.used && resetRecord.expiresAt > new Date());
  }

  static async verifyEmail(token: string): Promise<void> {
    // This would typically verify an email verification token
    // For now, we'll just mark the user as verified
    const user = await prisma.user.findFirst({
      where: { email: { contains: token } } // Simplified for demo
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true }
      });
    }
  }

  static async resendVerification(email: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (user && !user.isVerified) {
      // Send verification email (simplified)
      await sendOTPEmail(email, 'VERIFY', 'EMAIL_VERIFICATION');
    }
  }
}