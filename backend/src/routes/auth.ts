import { Router } from 'express';
import { AuthController } from '@/controllers/authController';
import { authRateLimit } from '@/middlewares/rateLimiter';
import { asyncHandler } from '@/middlewares/errorHandler';

const router = Router();

// Authentication routes with rate limiting
router.post('/register', authRateLimit, asyncHandler(AuthController.register));
router.post('/login', authRateLimit, asyncHandler(AuthController.login));
router.post('/logout', asyncHandler(AuthController.logout));
router.post('/refresh', asyncHandler(AuthController.refreshToken));

// Password reset flow
router.post('/forgot-password', authRateLimit, asyncHandler(AuthController.requestPasswordReset));
router.post('/reset-password', authRateLimit, asyncHandler(AuthController.resetPassword));
router.post('/verify-reset-token', asyncHandler(AuthController.verifyResetToken));

// OTP/MFA routes
router.post('/send-otp', authRateLimit, asyncHandler(AuthController.sendOTP));
router.post('/verify-otp', authRateLimit, asyncHandler(AuthController.verifyOTP));

// Email verification
router.post('/verify-email', asyncHandler(AuthController.verifyEmail));
router.post('/resend-verification', authRateLimit, asyncHandler(AuthController.resendVerification));

export default router;