import { Router } from 'express';
import { UserController } from '@/controllers/userController';
import { authenticateToken, requireClient } from '@/middlewares/auth';
import { asyncHandler } from '@/middlewares/errorHandler';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Client profile routes
router.get('/profile', requireClient, asyncHandler(UserController.getProfile));
router.put('/profile', requireClient, asyncHandler(UserController.updateProfile));
router.post('/change-password', requireClient, asyncHandler(UserController.changePassword));

// User's own requests
router.get('/requests', requireClient, asyncHandler(UserController.getUserRequests));
router.get('/transactions', requireClient, asyncHandler(UserController.getUserTransactions));
router.get('/accounts', requireClient, asyncHandler(UserController.getUserAccounts));

export default router;